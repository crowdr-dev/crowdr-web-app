"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/app/common/components/Button"
import TextInput from "@/app/common/components/TextInput"
import StatCard from "../admin-dashboard-components/StatCard"
import ButtonGroup from "../admin-dashboard-components/ButtonGroup"
import Table from "../admin-dashboard-components/Table"
import Pagination from "../admin-dashboard-components/Pagination"
import KycPopup from "../admin-dashboard-components/KycPopup"
import ModalTrigger from "@/app/common/components/ModalTrigger"
import { label } from "../admin-dashboard-components/Label"

import SearchIcon from "../../../../../public/svg/search.svg"
import FilterIcon from "../../../../../public/svg/filter-2.svg"
import TempLogo from "../../../../../public/temp/c-logo.png"
import UserIcon from "../../../../../public/svg/user-01.svg"

const Dashboard = () => {
  const [searchText, setSearchText] = useState("")
  const [selectedTable, setSelectedTable] = useState("Campaigns")
  const [campaignsPage, setCampaignsPage] = useState(1)
  const [kycPage, setKycPage] = useState(1)
  const [withdrawalsPage, setWithdrawalsPage] = useState(1)

  const tablePickerButtons = [
    {
      label: "Campaigns",
      onClick: () => setSelectedTable("Campaigns"),
    },
    {
      label: "KYC",
      onClick: () => setSelectedTable("KYC"),
    },
    {
      label: "Withdrawals",
      onClick: () => setSelectedTable("Withdrawals"),
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
        <ButtonGroup buttons={tablePickerButtons} selected={selectedTable} />

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
        {selectedTable === "Campaigns" && (
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
                      <Image src={item.imageUrl} alt="" />
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
        )}

        {/* KYC */}
        {selectedTable === "KYC" && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Target Amount</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {items.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <div className="flex items-center gap-3 font-medium">
                      <div className="grid place-items-center h-10 w-10 shrink-0 border border-black/10 bg-[#F2F4F7] rounded-full">
                        <Image src={item.altImageUrl} alt="" />
                      </div>
                      {item.title}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {<div className="font-medium">{item.detail}</div>}
                  </Table.Cell>
                  <Table.Cell>{item.date}</Table.Cell>
                  <Table.Cell>{label(item.status)}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/view-kyc/${item.id}`}
                        className="font-semibold text-sm text-[#475467] cursor-pointer"
                      >
                        View
                      </Link>
                      {item.status === "Approved" ? (
                        <ModalTrigger id="kycPopup">
                          <button
                            type="button"
                            className="font-semibold text-sm text-[#00B964]"
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
              total={20}
              onPageChange={setKycPage}
            />
          </Table>
        )}

        {/* Withdrawals */}
        {selectedTable === "Withdrawals" && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Withdrawal Amount</Table.HeadCell>
              <Table.HeadCell>Request Type</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {items.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <div className="flex items-center gap-3 font-medium">
                      <Image src={item.imageUrl} alt="" />
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
                        href={`/admin/view-withdrawal/${item.id}`}
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
              currentPage={withdrawalsPage}
              perPage={5}
              total={20}
              onPageChange={setWithdrawalsPage}
            />
          </Table>
        )}
      </div>

      {/* <div className="flex w-full">
        <KycPopup />
      </div> */}
    </div>
  )
}

export default Dashboard

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
