"use client"
import { useState } from "react"
import { Button } from "@/app/common/components/Button"
import TextInput from "@/app/common/components/TextInput"
import StatCard from "../admin-dashboard-components/StatCard"

import SearchIcon from "../../../../../public/svg/search.svg"
import FilterIcon from "../../../../../public/svg/filter-2.svg"
import { Button as FlowButton } from "flowbite-react"
import ButtonGroup from "../admin-dashboard-components/ButtonGroup"

const Dashboard = () => {
  const [searchText, setSearchText] = useState("")
  const [selectedTable, setSelectedTable] = useState("Campaigns")

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
        {stats.map((stat) => (
          <StatCard {...stat} />
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
              wrapper: "grow"
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
