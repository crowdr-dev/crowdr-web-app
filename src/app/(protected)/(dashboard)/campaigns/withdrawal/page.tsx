"use client"
import { useState } from "react"
import { useQuery } from "react-query"
import { useUser } from "../../common/hooks/useUser"
import { Button } from "../../dashboard-components/Button"
import Table from "../../dashboard-components/Table"
import Detail from "../../dashboard-components/Detail"
import Pagination from "../../dashboard-components/Pagination"
import StatCard from "../../dashboard-components/StatCard"
import StatCardSkeleton from "../../dashboard-components/skeletons/StatCardSkeleton"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import { formatAmount } from "../../common/utils/currency"
import {
  ICampaignView,
  mapCampaignResponseToView,
} from "../../common/utils/campaign"
import { keys } from "../../utils/queryKeys"

import { Doubt, IPagination, QF } from "@/app/common/types"
import { ICampaignStats } from "@/app/common/types/UserStats"
import { ICampaignResponse } from "@/app/common/types/Campaign"

const Withdrawal = () => {
  const [page, setPage] = useState(1)
  const user = useUser()

  const { data: stats } = useQuery(
    [keys.myCampaigns.stats, user?.token],
    fetchStats,
    {
      enabled: Boolean(user?.token),
    }
  )

  const { isPreviousData, data: campaigns } = useQuery(
    [keys.myCampaigns.campaigns, user?.token, page],
    fetchCampaigns,
    {
      enabled: Boolean(user?.token),
    }
  )

  const withdraw = (campaignId: string) => {}

  const mapCampaignToView = (campaign: ICampaignView) => {
    return {
      title: campaign.title,
      detail: campaign.fundsGotten || "",
      date: campaign.endDate,
      button: (
        <Button
          text="Withdraw"
          className="!h-9"
          disabled={!campaign.isCompleted}
          onClick={() => withdraw(campaign._id)}
        />
      ),
    }
  }

  return (
    <div>
      {/* page title x subtitle */}
      <hgroup className="mb-10">
        <h1 className="text-lg md:text-2xl font-semibold text-[#101828]">
          All Campaigns
        </h1>
      </hgroup>

      {/* stats */}
      <div className="grid md:grid-cols-[repeat(3,_minmax(0,_350px))] 2xl:grid-cols-3 gap-4 md:gap-5 mb-[23px] md:mb-[75px]">
        {stats ? (
          <>
            <StatCard
              title="Total Withdrawals"
              text={formatAmount(
                stats.totalAmountDonated[0].totalAmount,
                stats.totalAmountDonated[0].currency,
                { minimumFractionDigits: 2 }
              )}
              pattern
            />
            <StatCard
              title="All Campaigns"
              text={stats.totalNoOfCampaigns}
              colorScheme="light"
            />
            <StatCard
              title="Active Campaigns"
              text={stats.totalNoOfCampaigns}
              colorScheme="light"
            />
          </>
        ) : (
          Array.from({ length: 3 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))
        )}
      </div>

      {/* campaigns */}
      {campaigns && (
        <>
          <Table className="hidden md:block mb-20">
            <Table.Head>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Target Amount</Table.HeadCell>
              <Table.HeadCell>Amount Raised</Table.HeadCell>
              <Table.HeadCell>End Date</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {campaigns.campaigns.map((campaign, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{campaign.title}</Table.Cell>
                  <Table.Cell>{campaign.fundingGoal}</Table.Cell>
                  <Table.Cell>{campaign.fundsGotten}</Table.Cell>
                  <Table.Cell>{campaign.endDate}</Table.Cell>
                  <Table.Cell>
                    <Button
                      text="Withdraw"
                      disabled={!campaign.isCompleted}
                      onClick={() => withdraw(campaign._id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <div className="flex flex-col md:hidden">
            {campaigns.campaigns.map((campaign) => (
              <Detail key={campaign._id} {...mapCampaignToView(campaign)} />
            ))}
          </div>

          {/* pagination */}
          {campaigns && campaigns.campaigns.length !== 0 && (
            <Pagination
              currentPage={campaigns.pagination.currentPage}
              perPage={campaigns.pagination.perPage}
              total={campaigns.pagination.total}
              onPageChange={setPage}
              className="px-[18px] py-4"
            />
          )}
        </>
      )}
    </div>
  )
}

export default Withdrawal

type ICampaign = {
  campaigns: ICampaignView[]
  pagination: IPagination
}

const fetchStats: QF<Doubt<ICampaignStats>, [Doubt<string>]> = async ({
  queryKey,
}) => {
  const [_, token] = queryKey

  if (token) {
    const endpoint = `/api/v1/my-campaigns/summary`
    const headers = {
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<ICampaignStats>(endpoint, {
        headers,
        method: "GET",
      })

      return data
    } catch (error) {
      const message = extractErrorMessage(error)
      throw new Error(message)
    }
  }
}

const fetchCampaigns: QF<Doubt<ICampaign>, [Doubt<string>, number]> = async ({
  queryKey,
}) => {
  const [_, token, page] = queryKey

  if (token) {
    const query = new URLSearchParams({ page: `${page}`, perPage: "6" })
    const endpoint = `/api/v1/my-campaigns?${query}`
    const headers = {
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<ICampaignResponse>(endpoint, {
        headers,
        method: "GET",
      })

      return {
        campaigns: data.campaigns.map(mapCampaignResponseToView),
        pagination: data.pagination,
      }
    } catch (error) {
      const message = extractErrorMessage(error)
      throw new Error(message)
    }
  }
}
