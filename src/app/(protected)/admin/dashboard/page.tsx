"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAtomValue, useSetAtom } from "jotai"
import { useQuery } from "react-query"
import { useDebounceCallback } from "usehooks-ts"
import { useUser } from "../../(dashboard)/common/hooks/useUser"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/common/components/Button"
import TextInput from "@/app/common/components/TextInput"
import StatCard from "../admin-dashboard-components/StatCard"
import ButtonGroup from "../admin-dashboard-components/ButtonGroup"
import Table from "../admin-dashboard-components/Table"
import Pagination from "../admin-dashboard-components/Pagination"
import ModalTrigger, {
  modalStoreAtom,
} from "@/app/common/components/ModalTrigger"
import { label } from "../admin-dashboard-components/Label"
import makeRequest from "@/utils/makeRequest"
import { formatAmount } from "../../(dashboard)/common/utils/currency"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import kycService from "../common/services/kycService"
import withdrawalService from "../common/services/withdrawalService"
import { activeKycIdAtom } from "../admin-dashboard-components/KycPopup"
import { activeWithdrawalIdAtom } from "../admin-dashboard-components/WithdrawalPopup"
import { keys } from "../../(dashboard)/utils/queryKeys"

import { IPagination, Nullable, QF } from "@/app/common/types"
import { IWithdrawalResponse } from "@/app/common/types/Withdrawal"
import { IkycResponse } from "@/app/common/types/Kyc"
import SearchIcon from "../../../../../public/svg/search.svg"
import FilterIcon from "../../../../../public/svg/filter-2.svg"
import TempLogo from "../../../../../public/temp/c-logo.png"
import UserIcon from "../../../../../public/svg/user-01.svg"
import DropdownTrigger from "@/app/common/components/DropdownTrigger"

const Dashboard = () => {
  const [searchText, setSearchText] = useState("")
  const [campaignsPage, setCampaignsPage] = useState(1)
  const [kycPage, setKycPage] = useState(1)
  const [withdrawalsPage, setWithdrawalsPage] = useState(1)
  const modalStore = useAtomValue(modalStoreAtom)
  const setActiveKycId = useSetAtom(activeKycIdAtom)
  const setActiveWithdrawalIdAtom = useSetAtom(activeWithdrawalIdAtom)
  const searchParams = useSearchParams()
  const route = useRouter()
  const user = useUser()

  const [filter, setFilter] = useState<{
    [K in FilterKeys]: { status?: Status<K>; username?: string }
  }>({
    KYC: {},
    Withdrawals: {},
  })

  const setSearch = useDebounceCallback(
    () =>
      setSearchText((prevSearchText) => {
        setFilter((prevFilter) => {
          return {
            ...prevFilter,
            [selectedView]: {
              ...prevFilter[selectedView],
              username: prevSearchText,
            },
          }
        })

        return prevSearchText
      }),
    1000
  )

  const { data: stats } = useQuery(
    [keys.admin.stats, user?.token],
    fetchStats,
    {
      enabled: Boolean(user?.token),
      refetchOnWindowFocus: false,
    }
  )

  const { data: kycData, refetch: refetchKycs } = useQuery(
    [keys.admin.kycs, user?.token, kycPage, filter.KYC],
    fetchKyc,
    {
      enabled: Boolean(user?.token),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  )
  kycService.refreshKyc = refetchKycs

  const { data: withdrawalData, refetch: refetchWithdrawals } = useQuery(
    [keys.admin.withdrawals, user?.token, withdrawalsPage, filter.Withdrawals],
    fetchWithdrawal,
    {
      enabled: Boolean(user?.token),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  )
  withdrawalService.refreshWithdrawal = refetchWithdrawals

  const selectedView = (searchParams.get("view") || "KYC") as FilterKeys
  const tablePickerButtons = [
    // {
    //   label: "Campaigns",
    //   onClick: () => route.push("/admin/dashboard?view=Campaigns"),
    // },
    {
      label: "KYC",
      onClick: () => route.push("/admin/dashboard?view=KYC"),
    },
    {
      label: "Withdrawals",
      onClick: () => route.push("/admin/dashboard?view=Withdrawals"),
    },
  ]

  const resetPage = () => {
    switch (selectedView) {
      case "KYC":
        setKycPage(1)

      case "Withdrawals":
        setWithdrawalsPage(1)
    }
  }

  return (
    <div>
      {/* page title x subtitle */}
      <hgroup className="mb-3">
        <h1 className="text-3xl font-semibold text-[#101828] mb-0.5">
          Welcome back, Admin
        </h1>
        <p className=" text-[#475467]">
          Upload, Track and manage the expert’s tasks.
        </p>
      </hgroup>

      {/* stats */}
      <div className="flex gap-6 px-8 pt-8 mb-8">
        {stats &&
          stats.map((stat, index) => <StatCard key={index} {...stat} />)}
      </div>

      {/* toggle buttons x search x filters */}
      <div className="flex justify-between items-center px-4 py-3">
        <ButtonGroup buttons={tablePickerButtons} selected={selectedView} />

        <div className="flex gap-3 items-center w-[515px]">
          <TextInput
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              resetPage()
              setSearch()
            }}
            placeholder="Search"
            iconUrl={SearchIcon}
            styles={{
              input: "text-base",
              wrapper: "grow",
            }}
          />

          <DropdownTrigger
            triggerId="withdrawalsFilterBtn"
            targetId="dropdownDefaultRadio"
            options={{ placement: "bottom-end" }}
          >
            <Button
              text="Filters"
              bgColor="#FFF"
              textColor="#344054"
              iconUrl={FilterIcon}
              shadow
              className="font-semibold"
            />
          </DropdownTrigger>

          {/* filter dropdown */}
          <div
            id="dropdownDefaultRadio"
            className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
          >
            <ul className="p-3 space-y-3 text-sm text-gray-700">
              {_filter[selectedView].map((filter) => (
                <li key={filter.value}>
                  <div className="flex items-center">
                    <input
                      id={filter.value}
                      type="radio"
                      value={filter.value}
                      name={selectedView}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                      onChange={() => {
                        resetPage()
                        setFilter((prev) => {
                          return {
                            ...prev,
                            [selectedView]: {
                              status: filter.value as Status<
                                typeof selectedView
                              >,
                            },
                          }
                        })
                      }}
                    />
                    <label
                      htmlFor={filter.value}
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      {filter.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-center px-4 py-3">
              <Button
                text="Clear"
                bgColor="#FFF"
                textColor="#344054"
                shadow
                className="grow !justify-center font-semibold"
                onClick={() => {
                  setFilter({ KYC: {}, Withdrawals: {} })
                  const radioButtons = document.querySelectorAll<HTMLInputElement>(
                    'input[type="radio"]'
                  )
                  radioButtons.forEach((button) => {
                    button.checked = false
                  })
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="mb-8" />

      {/* table */}
      <div className="px-8">
        {/* Campaigns */}
        {/* {selectedView === "Campaigns" && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Target Amount</Table.HeadCell>
              <Table.HeadCell>Request Type</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {items.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <div className="flex items-center gap-3 font-medium">
                      <Image src={item.imageUrl} alt="" className="shrink-0" />
                      {item.title}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {<div className="font-medium">{item.detail}</div>}
                  </Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>
                  <Table.Cell>{item.extra}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/view-campaign/${item.id}`}
                        className="font-semibold text-sm text-[#475467] cursor-pointer"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        className="font-semibold text-sm text-[#6941C6]"
                      >
                        Approve
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Pagination
              currentPage={campaignsPage}
              perPage={5}
              total={20}
              onPageChange={setCampaignsPage}
            />
          </Table>
        )} */}

        {/* KYC */}
        {selectedView === "KYC" && kycData && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Account Name</Table.HeadCell>
              <Table.HeadCell>Account Type</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {kycData.kycs.map((kyc, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <div className="flex items-center gap-3 font-medium">
                      <div className="grid place-items-center h-10 w-10 shrink-0 border border-black/10 bg-[#F2F4F7] rounded-full">
                        <Image src={kyc.imageUrl} alt="" className="shrink-0" />
                      </div>
                      {kyc.accountName}
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    {
                      <div className="font-medium">
                        {toTitleCase(kyc.accountType)}
                      </div>
                    }
                  </Table.Cell>

                  <Table.Cell>{label(kyc.status)}</Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-3">
                      <ModalTrigger id="kycPopup">
                        <button
                          type="button"
                          className="font-semibold text-sm text-[#475467] cursor-pointer"
                          onClick={() => setActiveKycId(kyc.id)}
                        >
                          View
                        </button>
                      </ModalTrigger>

                      {kyc.status.match(/pending/i) ? (
                        <ModalTrigger id="kycPopup">
                          <button
                            type="button"
                            className="font-semibold text-sm text-[#00B964]"
                            onClick={() => setActiveKycId(kyc.id)}
                          >
                            Approve
                          </button>
                        </ModalTrigger>
                      ) : (
                        <button
                          type="button"
                          className="font-semibold text-sm text-[#F04438]"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Pagination
              currentPage={kycPage}
              perPage={5}
              total={kycData.pagination.total}
              onPageChange={setKycPage}
            />
          </Table>
        )}

        {/* Withdrawals */}
        {selectedView === "Withdrawals" && withdrawalData && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Account Name</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Withdrawal Amount</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {withdrawalData.withdrawals.map((withdrawal, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <div className="flex items-center gap-3 font-medium">
                      <Image
                        src={withdrawal.imageUrl}
                        alt=""
                        className="shrink-0"
                      />
                      {withdrawal.accountName}
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    {
                      <div className="font-medium">
                        {withdrawal.campaignTitle}
                      </div>
                    }
                  </Table.Cell>

                  <Table.Cell>{withdrawal.amount}</Table.Cell>

                  <Table.Cell>{label(withdrawal.status)}</Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-3">
                      <ModalTrigger id="withdrawalPopup">
                        <button
                          className="font-semibold text-sm text-[#475467] cursor-pointer"
                          onClick={() =>
                            setActiveWithdrawalIdAtom(withdrawal.id)
                          }
                        >
                          View
                        </button>
                      </ModalTrigger>

                      <ModalTrigger id="withdrawalPopup">
                        <button
                          type="button"
                          className="font-semibold text-sm text-[#6941C6]"
                          onClick={() =>
                            setActiveWithdrawalIdAtom(withdrawal.id)
                          }
                        >
                          Approve
                        </button>
                      </ModalTrigger>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Pagination
              currentPage={withdrawalsPage}
              perPage={5}
              total={withdrawalData.pagination.total}
              onPageChange={setWithdrawalsPage}
            />
          </Table>
        )}
      </div>
    </div>
  )
}

export default Dashboard

const ITEMS_PER_PAGE = "5"
interface IKycs {
  kycs: ReturnType<typeof mapKycResponseToView>
  pagination: IPagination
}

interface IWithdrawals {
  withdrawals: ReturnType<typeof mapWithdrawalResponseToView>
  pagination: IPagination
}

type IStats = {
  title: string
  value: number
}[]

interface StatsResponse {
  users: number
  withdrawals: number
  KYCs: number
}

type FilterKeys = keyof typeof _filter
type Status<K extends FilterKeys> = (typeof _filter)[K][number]["value"]

type Token = Nullable<string>
type Stats = Nullable<IStats>
const fetchStats: QF<Stats, [Token]> = async ({ queryKey }) => {
  const [_, token] = queryKey

  if (token) {
    const endpoint = `/api/v1/admin/dashboard`

    const headers = {
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<StatsResponse>(endpoint, {
        headers,
        method: "GET",
      })

      const pendingCampaigns = {
        title: "Pending Campaigns",
        value: data.KYCs, // TODO: DOESN'T RETURN CAMPAIGNS
      }

      const pendingWithdrawals = {
        title: "Pending Withdrawals",
        value: data.withdrawals, // TODO: DOESN'T RETURN JUST PENDING WITHDRAWALS
      }

      const totalUser = {
        title: "Total Users",
        value: data.users,
      }

      return [pendingCampaigns, pendingWithdrawals, totalUser]
    } catch (error) {
      const message = extractErrorMessage(error)
      throw new Error(message)
    }
  }
}

type Kycs = Nullable<IKycs>
type Page = number
type KycFilter = Nullable<{ status?: Status<"KYC">; username?: string }>
const fetchKyc: QF<Kycs, [Token, Page, KycFilter]> = async ({ queryKey }) => {
  const [_, token, page, filter] = queryKey

  if (token) {
    const query = new URLSearchParams({
      page: `${page}`,
      perPage: ITEMS_PER_PAGE,
    })

    if (filter?.status) {
      query.append("status", filter.status)
    }

    if (filter?.username) {
      query.append("username", filter.username)
    }

    const endpoint = `/api/v1/admin/kyc?${query}`

    const headers = {
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<IkycResponse>(endpoint, {
        headers,
        method: "GET",
      })

      return {
        kycs: mapKycResponseToView(data.kycs),
        pagination: data.pagination,
      }
    } catch (error) {
      const message = extractErrorMessage(error)
      throw new Error(message)
    }
  }
}

type Withdrawals = Nullable<IWithdrawals>
type WithdrawalFilter = Nullable<{
  status?: Status<"Withdrawals">
  username?: string
}>
const fetchWithdrawal: QF<
  Withdrawals,
  [Token, Page, WithdrawalFilter]
> = async ({ queryKey }) => {
  const [_, token, page, filter] = queryKey

  if (token) {
    const query = new URLSearchParams({
      page: `${page}`,
      perPage: ITEMS_PER_PAGE,
    })

    if (filter?.status) {
      query.append("status", filter.status)
    }

    if (filter?.username) {
      query.append("username", filter.username)
    }

    const endpoint = `/api/v1/admin/withdrawals?${query}`

    const headers = {
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<IWithdrawalResponse>(endpoint, {
        headers,
        method: "GET",
      })
      // console.log(data)
      return {
        withdrawals: mapWithdrawalResponseToView(data.withdrawals),

        pagination: data.pagination,
      }
    } catch (error) {
      const message = extractErrorMessage(error)
      throw new Error(message)
    }
  }
}

const stats = [
  {
    title: "Pending Campaigns",
    value: "50",
  },
  {
    title: "Pending Withdrawals",
    value: "1,020",
  },
  {
    title: "Total Users",
    value: "1000",
  },
]

const _filter = {
  KYC: [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
    {
      label: "Completed",
      value: "completed",
    },
  ],
  Withdrawals: [
    {
      label: "In-Review",
      value: "in-review",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
    {
      label: "Approved",
      value: "approved",
    },
  ],
} as const

function mapKycResponseToView(kycs: IkycResponse["kycs"]) {
  return kycs.map((kyc) => ({
    id: kyc._id,
    accountName: kyc.user.organizationName || kyc.user.fullName,
    accountType: kyc.user.userType,
    status: kyc.status || "pending",
    imageUrl: TempLogo,
  }))
}

function mapWithdrawalResponseToView(
  withdrawals: IWithdrawalResponse["withdrawals"]
) {
  return withdrawals.map((withdrawal) => {
    const [{ currency, amount }] = withdrawal.totalAmountDonated
    const formattedAmount = formatAmount(amount, currency)

    return {
      id: withdrawal._id,
      accountName: withdrawal.user.organizationName || withdrawal.user.fullName,
      campaignTitle: withdrawal.campaign.title,
      status: withdrawal.status,
      amount: formattedAmount,
      imageUrl: TempLogo,
    }
  })
}

function toTitleCase(str: string) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase())
}
