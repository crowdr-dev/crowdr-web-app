"use client"
import { useEffect, useState } from "react";
import StatCard from "../../admin-dashboard-components/StatCard";
import ButtonGroup from "../../admin-dashboard-components/ButtonGroup";
import TextInput from "@/app/common/components/TextInput";
import DropdownTrigger from "@/app/common/components/DropdownTrigger";
import { Button } from "@/app/common/components/Button";
import Pagination from "../../admin-dashboard-components/Pagination";
import Table from "../../admin-dashboard-components/Table";
import Image from "next/image";
import makeRequest from "@/utils/makeRequest";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { Nullable } from "@/app/common/types";
import { useDebounceCallback } from "usehooks-ts";

import SearchIcon from "../../../../../../public/svg/search.svg"
import FilterIcon from "../../../../../../public/svg/filter-2.svg"
import campaignService from "../../common/services/campaign";

const Campaigns = () => {
  const [searchText, setSearchText] = useState("")
  const [activeFilter, setActiveFilter] = useState("Pending")

  useEffect(() => {
    campaignService.getCampaigns().then(campaigns => console.log(campaigns))
  })

  // const setSearch = useDebounceCallback(
  //   () =>
  //     setSearchText((prevSearchText) => {
  //       setFilter((prevFilter) => {
  //         return {
  //           ...prevFilter,
  //           [selectedView]: {
  //             ...prevFilter[selectedView],
  //             username: prevSearchText,
  //           },
  //         }
  //       })

  //       return prevSearchText
  //     }),
  //   1000
  // )
  
  const tableFilterButtons = [
    {
      label: "Pending",
      onClick: () => {},
    },
    {
      label: "Active",
      onClick: () => {},
    },
    {
      label: "Completed",
      onClick: () => {},
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
        {dummyStats &&
          dummyStats.map((stat, index) => <StatCard key={index} {...stat} />)}
      </div>

      {/* toggle buttons x search x filters */}
      <div className="flex justify-between items-center px-4 py-3">
        <ButtonGroup buttons={tableFilterButtons} selected={activeFilter} />

        <div className="flex gap-3 items-center w-[515px]">
          <TextInput
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              // resetPage()
              // setSearch()
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
          {/* <div
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
          </div> */}
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
        {/* {selectedView === "KYC" && kycData && (
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
        )} */}

        {/* Withdrawals */}
        {/* {selectedView === "Withdrawals" && withdrawalData && (
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
        )} */}
      </div>
    </div>
  );
}

export default Campaigns;

// type Token = Nullable<string>
// type Stats = Nullable<IStats>
// const fetchStats: QF<Stats, [Token]> = async ({ queryKey }) => {
//   const [_, token] = queryKey

//   if (token) {
//     const query = new URLSearchParams({
//       kycStatus: "pending",
//       withdrawalStatus: "in-review",
//     })
//     const endpoint = `/api/v1/admin/dashboard?${query}`

//     const headers = {
//       "x-auth-token": token,
//     }

//     try {
//       const { data } = await makeRequest<StatsResponse>(endpoint, {
//         headers,
//         method: "GET",
//       })

//       const pendingCampaigns = {
//         title: "Pending Campaigns",
//         value: data.KYCs,
//       }

//       const activeCampaigns = {
//         title: "Active Campaigns",
//         value: data.withdrawals,
//       }

//       const completedCampaigns = {
//         title: "Completed Campaigns",
//         value: data.users,
//       }

//       return [pendingCampaigns, activeCampaigns, completedCampaigns]
//     } catch (error) {
//       const message = extractErrorMessage(error)
//       throw new Error(message)
//     }
//   }
// }

const dummyStats = [
  {
    title: "Pending Campaigns",
    value: 123,
  },
  {
    title: "Active Campaigns",
    value: 456,
  },
  {
    title: "Completed Campaigns",
    value: 789,
  },
]