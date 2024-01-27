"use client"
import Image from "next/image"
import { useState } from "react"
import { useQuery } from "react-query"
import { useUser } from "../../common/hooks/useUser"
import { useModal } from "@/app/common/hooks/useModal"
import { useToast } from "@/app/common/hooks/useToast"
import { Button } from "../../dashboard-components/Button"
import Table from "../../dashboard-components/Table"
import Detail from "../../dashboard-components/Detail"
import Pagination from "../../dashboard-components/Pagination"
import StatCard from "../../dashboard-components/StatCard"
import StatCardSkeleton from "../../dashboard-components/skeletons/StatCardSkeleton"
import CompletionCard from "../../dashboard-components/CompletionCard"
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
import DollarIcon from "../../../../../../public/svg/dollar.svg"

const Withdrawal = () => {
  const [page, setPage] = useState(1)
  const user = useUser()
  const modal = useModal()
  const toast = useToast()

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

  const withdraw = async (campaignId: string) => {
    if (user) {
      const endpoint = `/api/v1/withdrawals/request`
      const headers = {
        "x-auth-token": user.token,
      }
      const payload = { campaignId }

      try {
        const { success, message } = await makeRequest(endpoint, {
          headers,
          method: "POST",
          payload: JSON.stringify(payload),
        })

        if (success) {
          activateWithdrawalCompletionModal()
        }
      } catch (error) {
        const message = extractErrorMessage(error)
        toast({ title: "Oops!", body: message, type: "error" })
      }
    }
  }

  const activateWithdrawalModal = (campaign: ICampaignView) => {
    modal.show(
      <CompletionCard
        title={`You’re making a withdrawal of ${campaign.fundsGotten}`}
        text={
          <p className="text-sm text-[#475467] md:text-justify md:pr-2">
            You are making a withdrawal from the{" "}
            <span className="text-[#00B964]">{campaign.title}</span> campaign.
          </p>
        }
        primaryButton={{
          label: "Withdraw Funds",
          onClick: () => {
            modal.hide()
            withdraw(campaign._id)
          },
        }}
        secondaryButton={{ label: "Cancel", onClick: modal.hide }}
        clearModal={modal.hide}
        icon={
          <div
            style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
            className="grid place-items-center rounded-[10px] border border-[#EAECF0] p-4"
          >
            <Image src={DollarIcon} alt="" />
          </div>
        }
      />
    )
  }

  const activateWithdrawalCompletionModal = () => {
    modal.show(
      <CompletionCard
        title={`Your withdrawal has been submitted for review`}
        text={`Your money is on its way to your bank account. Thank you for choosing Crowdr.`}
        primaryButton={{
          label: "Back to Dashboard",
          onClick: modal.hide,
        }}
        clearModal={modal.hide}
      />
    )
  }

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
          onClick={() => activateWithdrawalModal(campaign)}
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
                      // disabled={!campaign.isCompleted}
                      onClick={() => activateWithdrawalModal(campaign)}
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
