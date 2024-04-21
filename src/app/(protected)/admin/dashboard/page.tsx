"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAtomValue, useSetAtom } from "jotai"
import { useQuery } from "react-query"
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

import { IPagination, Nullable, QF } from "@/app/common/types"
import { IWithdrawalResponse } from "@/app/common/types/Withdrawal"
import { IkycResponse } from "@/app/common/types/Kyc"
import SearchIcon from "../../../../../public/svg/search.svg"
import FilterIcon from "../../../../../public/svg/filter-2.svg"
import TempLogo from "../../../../../public/temp/c-logo.png"
import UserIcon from "../../../../../public/svg/user-01.svg"

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

  const { data: kycData, refetch: refetchKycs } = useQuery(
    ["getKYC", user?.token, kycPage],
    fetchKyc,
    {
      enabled: Boolean(user?.token),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  )
  kycService.refreshKyc = refetchKycs

  const { data: withdrawalData, refetch: refetchWithdrawals } = useQuery(
    ["getWithdrawal", user?.token, withdrawalsPage],
    fetchWithdrawal,
    {
      enabled: Boolean(user?.token),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  )
  withdrawalService.refreshWithdrawal = refetchWithdrawals

  const selectedView = searchParams.get("view") || "KYC"
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
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* toggle buttons x search x filters */}
      <div className="flex justify-between items-center px-4 py-3">
        <ButtonGroup buttons={tablePickerButtons} selected={selectedView} />

        <div className="flex gap-3 items-center w-[515px]">
          <TextInput
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
            placeholder="Search"
            iconUrl={SearchIcon}
            styles={{
              input: "text-base",
              wrapper: "grow",
            }}
          />

          <Button
            text="Filters"
            bgColor="#FFF"
            textColor="#344054"
            iconUrl={FilterIcon}
            shadow
            className="font-semibold"
          />
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

interface IKycs {
  kycs: ReturnType<typeof mapKycResponseToView>
  pagination: IPagination
}

interface IWithdrawals {
  withdrawals: ReturnType<typeof mapWithdrawalResponseToView>
  pagination: IPagination
}

const ITEMS_PER_PAGE = "5"

const fetchKyc: QF<Nullable<IKycs>, [Nullable<string>, number]> = async ({
  queryKey,
}) => {
  const [_, token, page] = queryKey

  if (token) {
    const query = new URLSearchParams({
      page: `${page}`,
      perPage: ITEMS_PER_PAGE,
    })
    const endpoint = `/api/v1/admin/kyc?${query}`

    const headers = {
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<IkycResponse>(endpoint, {
        headers,
        method: "GET",
      })
      // console.log(data)
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

const fetchWithdrawal: QF<
  Nullable<IWithdrawals>,
  [Nullable<string>, number]
> = async ({ queryKey }) => {
  const [_, token, page] = queryKey

  if (token) {
    const query = new URLSearchParams({
      page: `${page}`,
      perPage: ITEMS_PER_PAGE,
    })
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

const items = [
  {
    id: "0",
    title: "Crowdr Africa",
    detail: "Help Makinde attend school",
    date: "N4,000,000",
    extra: "some",
    imageUrl: TempLogo,
    altImageUrl: UserIcon,
    status: "Approved",
  },
  {
    id: "1",
    title: "Crowdr Africa",
    detail: "Help Makinde attend school",
    date: "N4,000,000",
    extra: "some",
    imageUrl: TempLogo,
    altImageUrl: UserIcon,
    status: "Pending",
  },
  {
    id: "2",
    title: "Crowdr Africa",
    detail: "Help Makinde attend school",
    date: "N4,000,000",
    extra: "some",
    imageUrl: TempLogo,
    altImageUrl: UserIcon,
    status: "Approved",
  },
  {
    id: "3",
    title: "Crowdr Africa",
    detail: "Help Makinde attend school",
    date: "N4,000,000",
    extra: "some",
    imageUrl: TempLogo,
    altImageUrl: UserIcon,
    status: "Approved",
  },
  {
    id: "4",
    title: "Crowdr Africa",
    detail: "Help Makinde attend school",
    date: "N4,000,000",
    extra: "some",
    imageUrl: TempLogo,
    altImageUrl: UserIcon,
    status: "Pending",
  },
]

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
