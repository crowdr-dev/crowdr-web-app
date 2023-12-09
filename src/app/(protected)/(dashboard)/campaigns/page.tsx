"use client"
import { useEffect, useState } from "react"
import CampaignCard from "../dashboard-components/CampaignCard"
import { Button, GrayButton, WhiteButton } from "../dashboard-components/Button"
import TextInput from "../dashboard-components/TextInput"
import DateRange, { IDateRange } from "../dashboard-components/DateRange"
import StatCard from "../dashboard-components/StatCard"
import Pagination from "../dashboard-components/Pagination"
import CampaignCardSkeleton from "../dashboard-components/skeletons/CampaignCardSkeleton"
import { useUser } from "../common/hooks/useUser"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"

import { ICampaign, CampaignResponse } from "@/app/common/types/Campaign"
import { IPagination } from "@/app/common/types"
import { BiSearch } from "react-icons/bi"
import FileDownloadIcon from "../../../../../public/svg/file-download.svg"
import FilterIcon from "../../../../../public/svg/filter.svg"

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([])
  const [pagination, setPagination] = useState<IPagination>()
  const [initialised, setInitialised] = useState(false)
  const [page, setPage] = useState(1)
  const user = useUser()
  const [input, setInput] = useState<any>()

  useEffect(() => {
    const fetchCampaigns = async () => {
      const query = new URLSearchParams({ page: `${page}`, perPage: "4" })
      const endpoint = `/api/v1/my-campaigns?${query}`

      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          "x-auth-token": user?.token!,
        }
        const { success, data } = await makeRequest<CampaignResponse>(endpoint, {
          headers,
          method: "GET",
        })

        setCampaigns(data.campaigns)
        setPagination(data.pagination)

        if (!initialised) {
          setInitialised(true)
        }
      } catch (error) {
        const message = extractErrorMessage(error)
        // toast({ title: "Oops!", body: message, type: "error" })
      }
    }

    if (user) {
      fetchCampaigns()
    }
  }, [user, page])

  const handleRangeSelect = (dateRange: IDateRange) => {
    console.log(dateRange![0].format())
    console.log(dateRange![1].format())
  }

  return (
    <div>
      {/* page title x subtitle */}
      <hgroup className="mb-[5px]">
        <h1 className="text-lg md:text-2xl font-semibold text-[#101828] mb-[5px]">
          My Campaigns
        </h1>
        <p className="text-[15px] text-[#667085]">
          Manage campaigns and earnings
        </p>
      </hgroup>

      {/* action buttons */}
      <div className="flex justify-between items-center mb-5 md:mb-10">
        <DateRange onChange={handleRangeSelect} />

        <div className="hidden md:flex">
          <WhiteButton
            text="Export Report"
            iconUrl={FileDownloadIcon}
            shadow
            className="mr-3"
          />
          <Button text="Withdraw Donations" />
        </div>
      </div>

      {/* stats */}
      <div className="grid md:grid-cols-[repeat(3,_minmax(0,_350px))] 2xl:grid-cols-3 gap-4 md:gap-5 mb-[23px] md:mb-[44px]">
        <StatCard
          title="Total Raised"
          text="N235,880.70"
          percentage={100}
          time="yesterday"
          pattern
        />
        <StatCard
          title="Total Campaigns"
          text="2"
          percentage={100}
          time="yesterday"
          colorScheme="light"
        />
        <StatCard
          title="Campaign Views"
          text="19,830"
          percentage={100}
          time="yesterday"
          colorScheme="light"
        />
      </div>

      <div className="flex md:hidden gap-3 mb-[23px] md:mb-[9px]">
        <WhiteButton
          text="Export Report"
          iconUrl={FileDownloadIcon}
          shadow
        />
        <Button text="Withdraw Donations" />
      </div>

      {/* all campaigns x filters */}
      <h2 className="md:hidden text-lg text-[#292A2E] mb-[9px]">
        All Campaigns
      </h2>
      <div className="flex justify-between items-center mb-6">
        <h2 className="hidden md:block text-xl text-[#292A2E]">
          All Campaigns
        </h2>
        <TextInput
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            console.log(e.target.value)
          }}
          placeholder="Search campaigns"
          icon={BiSearch}
          styles={{
            wrapper: "grow mr-[22px] block md:hidden",
            input: "text-sm",
          }}
        />
        <GrayButton text="Filters" iconUrl={FilterIcon} />
      </div>

      {/* campaigns */}
      <div className="grid md:grid-cols-[repeat(2,_minmax(0,_550px))] 2xl:grid-cols-3 gap-x-[10px] gap-y-3 md:gap-y-[40px] mb-[30px] md:mb-10">
        {initialised
          ? campaigns.map((campaign) => (
            campaign.campaignType !== "volunteer" && <CampaignCard key={campaign._id} campaign={campaign} />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CampaignCardSkeleton key={index} />
            ))}
      </div>

      {/* pagination */}
      {pagination && campaigns.length !== 0 && (
        <Pagination
          currentPage={pagination.currentPage}
          perPage={pagination.perPage}
          total={pagination.total}
          onPageChange={setPage}
          className="px-4 py-3 md:p-0"
        />
      )}
    </div>
  )
}

export default Campaigns
