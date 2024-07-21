"use client"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useUser } from "@/app/(protected)/(dashboard)/common/hooks/useUser"
import StatCard from "../../admin-dashboard-components/StatCard"
import ButtonGroup from "../../admin-dashboard-components/ButtonGroup"
import TextInput from "@/app/common/components/TextInput"
import DropdownTrigger from "@/app/common/components/DropdownTrigger"
import { Button } from "@/app/common/components/Button"
import Pagination from "../../admin-dashboard-components/Pagination"
import Table from "../../admin-dashboard-components/Table"
import Image from "next/image"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import { Nullable } from "@/app/common/types"
import { useDebounceCallback } from "usehooks-ts"
import userService from "../../common/services/user"

import {
  CampaignType,
  IGetCampaignsParams,
  RunningStatus,
} from "../../common/services/campaign/models/GetCampaigns"

import SearchIcon from "../../../../../../public/svg/search.svg"
import FilterIcon from "../../../../../../public/svg/filter-2.svg"
import TempLogo from "../../../../../../public/temp/c-logo.png"
import CircularProgress from "../../admin-dashboard-components/CircularProgress"
import {
  IGetUsersParams,
  UserType,
} from "../../common/services/user/models/GetUsers"
import Label from "../../admin-dashboard-components/Label"

const Users = () => {
  const user = useUser()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [activeFilter, setActiveFilter] = useState<UserType | "">("")
  const [params, setParams] = useState<Partial<IGetUsersParams>>({
    page,
  })

  const { data } = useQuery({
    queryKey: ["GET /admin/users", params],
    queryFn: () => userService.getUsers(params),
    onSuccess: (data) => setPage(data.pagination.currentPage),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: Boolean(user),
  })

  const setSearch = useDebounceCallback(
    () =>
      setSearchText((text) => {
        setParams({ ...params, page: 1, name: text })
        setPage(1)

        return text
      }),
    1000
  )

  const tableFilterButtons = [
    {
      id: "",
      label: "All",
      onClick: () => {
        setActiveFilter("")
        setParams({ ...params, userType: ""})
      },
    },
    {
      id: UserType.Individual,
      label: "Individuals",
      onClick: () => {
        setActiveFilter(UserType.Individual)
        setParams({ ...params, userType: UserType.Individual })
      },
    },
    {
      id: UserType.NonProfit,
      label: "Organizations",
      onClick: () => {
        setActiveFilter(UserType.NonProfit)
        setParams({ ...params, userType: UserType.NonProfit })
      },
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
        {data && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email Address</Table.HeadCell>
              <Table.HeadCell>Verification Status</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {data.results.map((user, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <div className="flex items-center gap-3 font-medium">
                      <Image src={TempLogo} alt="" className="shrink-0" />
                      {user.fullName || user.organizationName}
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    {<div className="font-medium">{user.email}</div>}
                  </Table.Cell>

                  <Table.Cell>
                    {user.isEmailVerified ? (
                      <Label text="Verified" dotColor="#17B26A" />
                    ) : (
                      <Label text="Unverified" dotColor="#F04438" />
                    )}
                  </Table.Cell>

                  <Table.Cell>{user.userType}</Table.Cell>

                  <Table.Cell></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

            <Pagination
              currentPage={data.pagination.currentPage}
              perPage={data.pagination.perPage}
              total={data.pagination.total}
              onPageChange={(page) => {
                setParams({ ...params, page })
                setPage(page)
              }}
            />
          </Table>
        )}
      </div>
    </div>
  )
}

export default Users

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
