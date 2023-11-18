"use client"
import { useEffect, useState } from "react"
import CampaignCard from "../dashboard-components/CampaignCard"
import { Button, GrayButton, WhiteButton } from "../dashboard-components/Button"
import TextInput from "../dashboard-components/TextInput"
import StatCard from "../dashboard-components/StatCard"
import Pagination from "../dashboard-components/Pagination"
import { useUser } from "../utils/useUser"
import { getUser } from "@/app/api/user/getUser"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"

import { ICampaign, CampaignResponse } from "@/app/common/types/Campaign"
import { BiSearch } from "react-icons/bi"
import FileDownloadIcon from "../../../../../public/svg/file-download.svg"
import FilterIcon from "../../../../../public/svg/filter.svg"
import { IPagination } from "@/app/common/types/Common"

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([])
  const [pagination, setPagination] = useState<IPagination>()
  const [page, setPage] = useState(1)
  const user = useUser()
  console.log(pagination)

  useEffect(() => {
    const fetchCampaigns = async () => {
      const query = new URLSearchParams({ page: `${page}`, perPage: '4' })
      const endpoint = `/api/v1/my-campaigns?${query}`

      try {
        const user = await getUser()
        const headers = {
          "Content-Type": "multipart/form-data",
          "x-auth-token": user?.token!,
        }
        const { success, data } = await makeRequest<{
          success: boolean
          data: CampaignResponse
        }>(endpoint, {
          headers,
          method: "GET",
        })
        setCampaigns(data.campaigns)
        setPagination(data.pagination)
      } catch (error) {
        const message = extractErrorMessage(error)
        // toast({ title: "Oops!", body: message, type: "error" })
      }
    }

    fetchCampaigns()
  }, [page])

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
        {/* button group */}
        <div className="inline-flex rounded-md" role="group">
          <button
            type="button"
            className="px-4 py-[10px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Custom
          </button>
          <button
            type="button"
            className="px-4 py-[10px] text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            7 days
          </button>
          <button
            type="button"
            className="px-4 py-[10px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            24 hours
          </button>
        </div>

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
        {/* TODO: get background image */}
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

      <div className="flex md:hidden mb-[23px] md:mb-[9px]">
        <WhiteButton
          text="Export Report"
          iconUrl={FileDownloadIcon}
          shadow
          className="mr-3"
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
          value=""
          onChange={() => null}
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
      <div className="grid md:grid-cols-[repeat(2,_minmax(0,_550px))] 2xl:grid-cols-3 gap-x-[10px] gap-y-3 md:gap-y-[40px] mb-10">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>

      {/* pagination */}
      {pagination && <Pagination currentPage={page} pageCount={pagination.perPage} totalPages={pagination.total} onPageChange={setPage} />}
    </div>
  )
}

export default Campaigns
