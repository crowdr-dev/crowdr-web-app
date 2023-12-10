"use client"
import { useEffect, useState } from "react"
import { useUser } from "../../common/hooks/useUser"
import makeRequest from "@/utils/makeRequest"
import { mapCampaignResponseToView } from "../../common/utils/campaign"

import { Button, GrayButton } from "../../dashboard-components/Button"
import Detail from "../../dashboard-components/Detail"
import Pagination from "../../dashboard-components/Pagination"
import Table from "../../dashboard-components/Table"
import Tabs from "../../dashboard-components/Tabs"
import CampaignPageSkeleton from "../../dashboard-components/skeletons/CampaignPageSkeleton"
import ProgressBar from "../../dashboard-components/ProgressBar"
import Text from "../../dashboard-components/Text"
import { pill } from "../../dashboard-components/Pill"

import { Route } from "@/app/common/types"
import { ICampaign } from "@/app/common/types/Campaign"

import FileDownloadIcon from "../../../../../../public/svg/file-download.svg"

const Campaign = ({ params }: Route) => {
  const [campaign, setCampaign] = useState<ICampaignView>()
  const [page, setPage] = useState(1)
  const user = useUser()

  useEffect(() => {
    if (user) {
      const fetchCampaign = async () => {
        try {
          const endpoint = `/api/v1/my-campaigns/${params.id}`
          const headers = {
            "Content-Type": "multipart/form-data",
            "x-auth-token": user.token,
          }

          const { data } = await makeRequest<ICampaign>(endpoint, {
            headers,
            method: "GET",
          })

          const campaign = mapCampaignResponseToView(data)
          setCampaign(campaign)
        } catch (error) {
          // const message = extractErrorMessage(error)
          // toast({ title: "Oops!", body: message, type: "error" })
        }
      }

      fetchCampaign()
    }
  }, [user])

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:mb-[90px]">
        {campaign ? (
          <div className="md:max-w-[570px] grow mb-[33px] md:mb-0">
            <div className="flex flex-col md:flex-row justify-between mb-[5px]">
              <p className="text-lg md:text-2xl text-black md:font-semibold">
                {campaign.title}
              </p>
              <div className="hidden md:block">{pill(campaign.category)}</div>
            </div>

            <Text
              characterLimit={128}
              expandText="Read more"
              className="md:hidden text-[#667085] text-[15px] md:text-[13px] mb-[9px]"
            >
              {campaign.story}
            </Text>

            <p className="hidden md:block text-[#667085] text-[15px] md:text-[13px] mb-8">
              {campaign.story}
            </p>

            <div className="md:hidden mb-[5px]">{pill(campaign.category)}</div>

            <div className="px-[10px] py-3 md:px-0 md:py-0">
              <div className="bg-[#F9F9F9] rounded-lg p-4 mb-[12px] md:mb-3">
                <p className="text-sm text-[#667085] mb-1">
                  <span className="text-[#292A2E]">Goal</span>{" "}
                  {campaign.fundingGoal}/{campaign.fundsGotten}
                </p>
                <ProgressBar percent={campaign.percentage} showValue />
              </div>

              <div className="flex flex-col md:flex-row justify-between md:items-end">
                <div className="flex flex-col gap-2.5 text-[13px] text-[#5C636E] px-[7px] mb-[13px] md:px-0 md:mb-0">
                  <p>
                    <span className="text-black font-medium">Views:</span>{" "}
                    <span className="text-[#5C636E] font">
                      {campaign.views}
                    </span>
                  </p>
                  <p>
                    <span className="text-black font-medium">Donors:</span>{" "}
                    <span>{campaign.donors}</span>
                  </p>
                  <p>
                    <span className="text-black font-medium">Duration:</span>{" "}
                    <span>{campaign.duration}</span>
                  </p>
                </div>

                <GrayButton
                  href={`/campaigns/create-or-edit-campaign/${campaign._id}`}
                  text="Update campaign"
                  textColor="#667085"
                  outlineColor="transparent"
                  className="self-end !px-7 !h-[44px]"
                />
              </div>
            </div>
          </div>
        ) : <CampaignPageSkeleton />}
        {/* TODO: ADD SKELETON LOADING */}

        <div className="flex items-start gap-3 mb-[23px] md:mb-[9px]">
          <Button
            text="Export Report"
            iconUrl={FileDownloadIcon}
            bgColor="#FFF"
            textColor="#344054"
            outlineColor="#D0D5DD"
          />
          <Button text="Withdraw Donations" />
        </div>
      </div>

      {/* donors x volunteers */}
      <Tabs>
        <Tabs.Item heading="Donors">
          <Table className="hidden md:block mb-9">
            <Table.Head>
              <Table.HeadCell>Donors</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Date & time</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {donations.map((donation, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{donation.title}</Table.Cell>
                  <Table.Cell>{donation.detail}</Table.Cell>
                  <Table.Cell>{donation.date}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <div className="flex flex-col md:hidden">
            {donations.map((donation, index) => (
              <Detail key={index} {...donation} />
            ))}
          </div>

          <Pagination
            total={50}
            currentPage={page}
            perPage={5}
            onPageChange={setPage}
            className="px-[18px] py-4"
          />
        </Tabs.Item>

        <Tabs.Item heading="Volunteers">
          <Table className="hidden md:block mb-9">
            <Table.Head>
              <Table.HeadCell>Volunteers</Table.HeadCell>
              <Table.HeadCell>Duration</Table.HeadCell>
              <Table.HeadCell>Date & time</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {donations.map((donation, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{donation.title}</Table.Cell>
                  <Table.Cell>{donation.detail}</Table.Cell>
                  <Table.Cell>{donation.date}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <div className="flex flex-col md:hidden">
            {donations.map((donation, index) => (
              <Detail key={index} {...donation} />
            ))}
          </div>

          <Pagination
            total={50}
            currentPage={page}
            perPage={5}
            onPageChange={setPage}
            className="px-[18px] py-4"
          />
        </Tabs.Item>
      </Tabs>
    </div>
  )
}

export default Campaign

const donations = [
  {
    title: "Help Tife pay her college fees",
    detail: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
  },
  {
    title: "Support 400 kids get a backpack",
    detail: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
  },
  {
    title: "Help Crowdr raise $300M",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
  },
  {
    title: "Film Documentary: Ocean Conservation",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
  },
  {
    title: "Support 400 kids get a backpack",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
  },
]

type ICampaignView = ReturnType<typeof mapCampaignResponseToView>
