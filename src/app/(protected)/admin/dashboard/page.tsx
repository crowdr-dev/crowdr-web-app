"use client"
import { useReducer, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
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
import DropdownTrigger from "@/app/common/components/DropdownTrigger"
import CircularProgress from "../admin-dashboard-components/CircularProgress"
import { label } from "../admin-dashboard-components/Label"
import makeRequest from "@/utils/makeRequest"
import { formatAmount } from "../../(dashboard)/common/utils/currency"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import campaignService from "../common/services/campaign"
import kycService from "../common/services/kyc"
import withdrawalService from "../common/services/withdrawal"
import { activeKycIdAtom } from "../admin-dashboard-components/KycPopup"
import { activeWithdrawalIdAtom } from "../admin-dashboard-components/WithdrawalPopup"
import { userCountAtom } from "../admin-dashboard-components/Sidebar"
import { keys } from "../../(dashboard)/utils/queryKeys"

import {
  CampaignType,
  IGetCampaignsParams,
  RunningStatus,
} from "../common/services/campaign/models/GetCampaigns"
import {
  IGetKycsParams,
  Kyc,
  KycStatus,
} from "../common/services/kyc/models/GetKycs"
import {
  IGetWithdrawalsParams,
  Withdrawal,
  WithdrawalStatus,
} from "../common/services/withdrawal/models/GetWithdrawals"
import { IPagination, Nullable, QF } from "@/app/common/types"

import SearchIcon from "../../../../../public/svg/search.svg"
import FilterIcon from "../../../../../public/svg/filter-2.svg"
import TempLogo from "../../../../../public/temp/c-logo.png"
import UserIcon from "../../../../../public/svg/user-01.svg"

const Dashboard = () => {
  const [searchText, setSearchText] = useState("")

  const [campaignsPage, setCampaignsPage] = useState(1)
  const [kycPage, setKycPage] = useState(1)
  const [withdrawalsPage, setWithdrawalsPage] = useState(1)

  const [tableParams, setTableParams] = useReducer(filterReducer, {
    campaigns: { page: 1, perPage: 10 },
    kycs: { page: 1, perPage: 10 },
    withdrawals: { page: 1, perPage: 10 },
  })

  const modalStore = useAtomValue(modalStoreAtom)
  const setActiveKycId = useSetAtom(activeKycIdAtom)
  const setActiveWithdrawalIdAtom = useSetAtom(activeWithdrawalIdAtom)
  const [userCount, setUserCount] = useAtom(userCountAtom)
  const searchParams = useSearchParams()
  const route = useRouter()
  const user = useUser()

  const view = searchParams.get("view")
  const selectedTable = (
    view && view in _filter ? view : "campaigns"
  ) as FilterKeys

  const [filter, setFilter] = useState<{
    [K in FilterKeys]: { status?: Status<K>; username?: string }
  }>({
    campaigns: {},
    kycs: {},
    withdrawals: {},
  })

  const setSearch = useDebounceCallback(
    () =>
      setSearchText((text) => {
        selectedTable === "campaigns"
          ? setTableParams({
              table: "campaigns",
              params: { title: text, page: 1 },
            })
          : setTableParams({
              table: selectedTable,
              params: { username: text, page: 1 },
            })

        return text
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
          if (userData.value !== userCount) {
            setUserCount(userData.value)
          }
        }
      },
    }
  )

  const queryConfig = {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  }

  const { data: campaignData } = useQuery({
    queryKey: ["GET /admin/campaigns", tableParams.campaigns],
    queryFn: () => campaignService.getCampaigns(tableParams.campaigns),
    onSuccess: (data) => setCampaignsPage(data.pagination.currentPage),
    enabled: Boolean(user) && selectedTable === "campaigns",
    ...queryConfig,
  })

  const { data: kycData, refetch: refetchKycs } = useQuery({
    queryKey: ["GET /admin/kyc", tableParams.kycs],
    queryFn: () => kycService.getKycs(tableParams.kycs),
    onSuccess: (data) => setKycPage(data.pagination.currentPage),
    enabled: Boolean(user) && selectedTable === "kycs",
    ...queryConfig,
  })

  const { data: withdrawalData, refetch: refetchWithdrawals } = useQuery({
    queryKey: ["GET /admin/withdrawals", tableParams.withdrawals],
    queryFn: () => withdrawalService.getWithdrawals(tableParams.withdrawals),
    onSuccess: (data) => setWithdrawalsPage(data.pagination.currentPage),
    enabled: Boolean(user) && selectedTable === "withdrawals",
    ...queryConfig,
  })

  kycService.refreshKyc = refetchKycs
  withdrawalService.refreshWithdrawal = refetchWithdrawals

  const tablePickerButtons = [
    {
      id: "campaigns",
      label: "Campaigns",
      onClick: () => {
        const view: FilterKeys = "campaigns"
        route.replace(`/admin/dashboard?view=${view}`)
      },
    },
    {
      id: "kycs",
      label: "KYC",
      onClick: () => {
        const view: FilterKeys = "kycs"
        route.replace(`/admin/dashboard?view=${view}`)
      },
    },
    {
      id: "withdrawals",
      label: "Withdrawals",
      onClick: () => {
        const view: FilterKeys = "withdrawals"
        route.replace(`/admin/dashboard?view=${view}`)
      },
    },
  ]

  const resetPage = () => {
    setTableParams({ table: selectedTable, type: "reset" })
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
        <ButtonGroup buttons={tablePickerButtons} selected={selectedTable} />

        <div className="flex gap-3 items-center w-[515px]">
          <TextInput
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              // resetPage()
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
              {_filter[selectedTable].map((filter) => (
                <li key={filter.value}>
                  <div className="flex items-center">
                    <input
                      id={filter.value}
                      type="radio"
                      value={filter.value}
                      name={selectedTable}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                      onChange={() => {
                        // resetPage()
                        // setFilter((tables) => {
                        //   return {
                        //     ...tables,
                        //     [selectedTable]: {
                        //       status: filter.value as Status<
                        //         typeof selectedTable
                        //       >,
                        //     },
                        //   }
                        // })

                        switch (selectedTable) {
                          case "campaigns":
                            setTableParams({
                              table: "campaigns",
                              params: {
                                page: 1,
                                runningStatus: filter.value as RunningStatus,
                              },
                            })
                            break

                          case "kycs":
                            setTableParams({
                              table: "kycs",
                              params: {
                                page: 1,
                                status: filter.value as KycStatus,
                              },
                            })
                            break

                          case "withdrawals":
                            setTableParams({
                              table: "withdrawals",
                              params: {
                                page: 1,
                                status: filter.value as WithdrawalStatus,
                              },
                            })
                            break
                        }
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
                  // setFilter({ campaigns: {}, kycs: {}, withdrawals: {} })
                  resetPage()
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
        {selectedTable === "campaigns" && campaignData && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Raised Amount</Table.HeadCell>
              <Table.HeadCell>Target Amount</Table.HeadCell>
              <Table.HeadCell>Campaign Type</Table.HeadCell>
              <Table.HeadCell>Progress</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {campaignData.campaigns.map((campaign, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <div className="flex items-center gap-3 font-medium">
                      <Image src={TempLogo} alt="" className="shrink-0" />
                      {campaign.user.fullName || campaign.user.organizationName}
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    {<div className="font-medium">{campaign.title}</div>}
                  </Table.Cell>

                  <Table.Cell>
                    {
                      <div className="font-medium">
                        {campaign.user.userType}
                      </div>
                    }
                  </Table.Cell>

                  <Table.Cell>
                    {campaign.campaignType == CampaignType.Fundraise ||
                    campaign.campaignType == CampaignType.FundraiseVolunteer
                      ? `₦${campaign.totalAmountDonated[0].amount}`
                      : "--"}
                  </Table.Cell>

                  <Table.Cell>
                    {campaign.campaignType == CampaignType.Fundraise ||
                    campaign.campaignType == CampaignType.FundraiseVolunteer
                      ? `₦${campaign.fundraise.fundingGoalDetails[0].amount}`
                      : "--"}
                  </Table.Cell>

                  <Table.Cell>
                    {(() => {
                      switch (campaign.campaignType) {
                        case CampaignType.Fundraise:
                          return "Fundraise"
                        case CampaignType.Volunteer:
                          return "Volunteer"
                        case CampaignType.FundraiseVolunteer:
                          return "Fundraise/Volunteer"
                        default:
                          return "--"
                      }
                    })()}
                  </Table.Cell>

                  <Table.Cell>
                    <div className="text-center">
                      {campaign.campaignType == CampaignType.Fundraise ||
                      campaign.campaignType ==
                        CampaignType.FundraiseVolunteer ||
                      (campaign.fundraise &&
                        campaign.fundraise.fundingGoalDetails[0].amount ===
                          0) ? (
                        <CircularProgress
                          percent={(
                            (campaign.totalAmountDonated[0].amount /
                              campaign.fundraise.fundingGoalDetails[0].amount) *
                            100
                          ).toFixed(0)}
                        />
                      ) : (
                        "--"
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

            <Pagination
              currentPage={campaignsPage}
              perPage={campaignData.pagination.perPage}
              total={campaignData.pagination.total}
              onPageChange={(page) =>
                setTableParams({ table: "campaigns", params: { page } })
              }
            />
          </Table>
        )}

        {/* KYC */}
        {selectedTable === "kycs" && kycData && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Account Name</Table.HeadCell>
              <Table.HeadCell>Account Type</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {mapKycResponseToView(kycData.kycs).map((kyc, index) => (
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
              perPage={kycData.pagination.perPage}
              total={kycData.pagination.total}
              onPageChange={setKycPage}
            />
          </Table>
        )}

        {/* Withdrawals */}
        {selectedTable === "withdrawals" && withdrawalData && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Account Name</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Withdrawal Amount</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {mapWithdrawalResponseToView(withdrawalData.withdrawals).map(
                (withdrawal, index) => (
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
                )
              )}
            </Table.Body>

            <Pagination
              currentPage={withdrawalsPage}
              perPage={withdrawalData.pagination.perPage}
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

// type Kycs = Nullable<IKycs>
// type Page = number
// type KycFilter = Nullable<{ status?: Status<"kycs">; username?: string }>
// const fetchKyc: QF<Kycs, [Token, Page, KycFilter]> = async ({ queryKey }) => {
//   const [_, token, page, filter] = queryKey

//   if (token) {
//     const query = new URLSearchParams({
//       page: `${page}`,
//       perPage: ITEMS_PER_PAGE,
//     })

//     if (filter?.status) {
//       query.append("status", filter.status)
//     }

//     if (filter?.username) {
//       query.append("username", filter.username)
//     }

//     const endpoint = `/api/v1/admin/kyc?${query}`

//     const headers = {
//       "x-auth-token": token,
//     }

//     try {
//       const { data } = await makeRequest<IkycResponse>(endpoint, {
//         headers,
//         method: "GET",
//       })

//       return {
//         kycs: mapKycResponseToView(data.kycs),
//         pagination: data.pagination,
//       }
//     } catch (error) {
//       const message = extractErrorMessage(error)
//       throw new Error(message)
//     }
//   }
// }

// type Withdrawals = Nullable<IWithdrawals>
// type WithdrawalFilter = Nullable<{
//   status?: Status<"withdrawals">
//   username?: string
// }>
// const fetchWithdrawal: QF<
//   Withdrawals,
//   [Token, Page, WithdrawalFilter]
// > = async ({ queryKey }) => {
//   const [_, token, page, filter] = queryKey

//   if (token) {
//     const query = new URLSearchParams({
//       page: `${page}`,
//       perPage: ITEMS_PER_PAGE,
//     })

//     if (filter?.status) {
//       query.append("status", filter.status)
//     }

//     if (filter?.username) {
//       query.append("username", filter.username)
//     }

//     const endpoint = `/api/v1/admin/withdrawals?${query}`

//     const headers = {
//       "x-auth-token": token,
//     }

//     try {
//       const { data } = await makeRequest<IWithdrawalResponse>(endpoint, {
//         headers,
//         method: "GET",
//       })

//       return {
//         withdrawals: mapWithdrawalResponseToView(data.withdrawals),

//         pagination: data.pagination,
//       }
//     } catch (error) {
//       const message = extractErrorMessage(error)
//       throw new Error(message)
//     }
//   }
// }

const _filter = {
  campaigns: [
    { label: "Upcoming", value: RunningStatus.Upcoming },
    { label: "Active", value: RunningStatus.Active },
    { label: "Completed", value: RunningStatus.Completed },
  ],
  kycs: [
    {
      label: "Pending",
      value: KycStatus.Pending,
    },
    {
      label: "Rejected",
      value: KycStatus.Rejected,
    },
    {
      label: "Completed",
      value: KycStatus.Completed,
    },
  ],
  withdrawals: [
    {
      label: "In-Review",
      value: WithdrawalStatus.InReview,
    },
    {
      label: "Rejected",
      value: WithdrawalStatus.Rejected,
    },
    {
      label: "Approved",
      value: WithdrawalStatus.Approved,
    },
  ],
} as const

function mapKycResponseToView(kycs: Kyc[]) {
  return kycs.map((kyc) => ({
    id: kyc._id,
    accountName: kyc.user.organizationName || kyc.user.fullName,
    accountType: kyc.user.userType,
    status: kyc.verificationStatus || "pending",
    imageUrl: TempLogo,
  }))
}

function mapWithdrawalResponseToView(withdrawals: Withdrawal[]) {
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

interface TableParams {
  campaigns: Partial<IGetCampaignsParams>
  kycs: Partial<IGetKycsParams>
  withdrawals: Partial<IGetWithdrawalsParams>
}
// interface Action {
//   table: FilterKeys
//   type?: "patch" | "reset"
//   params?: any
// }
type ActionBase = {
  type?: "patch" | "reset"
}
type Action = ActionBase &
  (
    | { table: "campaigns"; params?: Partial<IGetCampaignsParams> }
    | { table: "kycs"; params?: Partial<IGetKycsParams> }
    | { table: "withdrawals"; params?: Partial<IGetWithdrawalsParams> }
  )

function filterReducer(tableParams: TableParams, action: Action) {
  const { table, params = {}, type = "patch" } = action
  const perPage = 10

  // switch (table) {
  //   case "campaigns":
  //     return (type === 'patch' ? { ...params, campaigns: params } : {page: 1})
  //   case "kycs":
  //     return { ...params, kycs: params }
  //   case "withdrawals":
  //     return { ...params, withdrawals: params }
  //   default:
  //     return params
  // }

  switch (type) {
    case "patch":
      return {
        ...tableParams,
        [table]: { ...tableParams[table], ...params, perPage },
      }
    case "reset":
      return {
        ...tableParams,
        [table]: { page: 1, perPage },
      }
    default:
      return tableParams
  }
}
