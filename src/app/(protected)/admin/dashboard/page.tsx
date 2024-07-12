"use client"
import { useReducer, useState } from "react"
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
import kycService from "../common/services/kyc"
import withdrawalService from "../common/services/withdrawal"
import { activeKycIdAtom } from "../admin-dashboard-components/KycPopup"
import { activeWithdrawalIdAtom } from "../admin-dashboard-components/WithdrawalPopup"
import { userCountAtom } from "../admin-dashboard-components/Sidebar"
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

  // const [campaignsPage, setCampaignsPage] = useState(1)
  // const [kycPage, setKycPage] = useState(1)
  // const [withdrawalsPage, setWithdrawalsPage] = useState(1)

  const [page, dispatchPage] = useReducer(paginationReducer, {
    campaigns: 1,
    kycs: 1,
    withdrawals: 1,
  })

  const modalStore = useAtomValue(modalStoreAtom)
  const setActiveKycId = useSetAtom(activeKycIdAtom)
  const setActiveWithdrawalIdAtom = useSetAtom(activeWithdrawalIdAtom)
  const setUserCount = useSetAtom(userCountAtom)
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
      onSuccess: (stats) => {
        if (stats) {
          const userData = stats[2]
          setUserCount(userData.value)
        }
      },
    }
  )

  const { data: kycData, refetch: refetchKycs } = useQuery(
    [keys.admin.kycs, user?.token, page.kycs, filter.KYC],
    fetchKyc,
    {
      enabled: Boolean(user?.token),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  )
  kycService.refreshKyc = refetchKycs

  const { data: withdrawalData, refetch: refetchWithdrawals } = useQuery(
    [keys.admin.withdrawals, user?.token, page.withdrawals, filter.Withdrawals],
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
        dispatchPage({table: 'kycs', page: 1});

      case "Withdrawals":
        dispatchPage({table: 'withdrawals', page: 1});
    }
  }

  try {
    
  } catch {
    
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
                  const radioButtons =
                    document.querySelectorAll<HTMLInputElement>(
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
              currentPage={page.campaigns}
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
              currentPage={page.kycs}
              perPage={Number(ITEMS_PER_PAGE)}
              total={kycData.pagination.total}
              onPageChange={(page) => dispatchPage({ table: "kycs", page })}
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
              currentPage={page.withdrawals}
              perPage={Number(ITEMS_PER_PAGE)}
              total={withdrawalData.pagination.total}
              onPageChange={(page) =>
                dispatchPage({ table: "withdrawals", page })
              }
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

export type IStats = {
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
    const query = new URLSearchParams({
      kycStatus: "pending",
      withdrawalStatus: "in-review",
    })
    const endpoint = `/api/v1/admin/dashboard?${query}`

    const headers = {
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<StatsResponse>(endpoint, {
        headers,
        method: "GET",
      })

      const pendingKYCs = {
        title: "Pending KYCs",
        value: data.KYCs,
      }

      const pendingWithdrawals = {
        title: "Pending Withdrawals",
        value: data.withdrawals,
      }

      const totalUser = {
        title: "Total Users",
        value: data.users,
      }

      return [pendingKYCs, pendingWithdrawals, totalUser]
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
    status: kyc.verificationStatus || "pending",
    imageUrl: TempLogo,
  }))
}

function mapWithdrawalResponseToView(
  withdrawals: IWithdrawalResponse["withdrawals"]
) {
  return withdrawals.map((withdrawal) => {
    const [{ currency, payableAmount }] = withdrawal.totalAmountDonated
    const formattedAmount = formatAmount(payableAmount, currency)

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

interface PaginationState {
  campaigns: number
  kycs: number
  withdrawals: number
}
interface Action {
  table: "campaigns" | "kycs" | "withdrawals"
  page: number
}
function paginationReducer(page: PaginationState, action: Action) {
  switch (action.table) {
    case "campaigns":
      return { ...page, campaigns: action.page }
    case "kycs":
      return { ...page, kycs: action.page }
    case "withdrawals":
      return { ...page, withdrawals: action.page }
    default:
      return page
  }
}
