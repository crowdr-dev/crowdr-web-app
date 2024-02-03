"use client"
import { useState } from "react"
import { useQuery } from "react-query"
import { useUser } from "../../common/hooks/useUser"
import moment from "moment"
import makeRequest from "@/utils/makeRequest"
import { mapCampaignResponseToView } from "../../common/utils/campaign"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import { keys } from "../../utils/queryKeys"

import { Button, GrayButton } from "../../dashboard-components/Button"
import Detail from "../../dashboard-components/Detail"
import Pagination from "../../dashboard-components/Pagination"
import Table from "../../dashboard-components/Table"
import Tabs from "../../dashboard-components/Tabs"
import CampaignPageSkeleton from "../../dashboard-components/skeletons/CampaignPageSkeleton"
import ProgressBar from "../../dashboard-components/ProgressBar"
import Text from "../../dashboard-components/Text"
import { pill } from "../../dashboard-components/Pill"

import { Doubt, QF, Route } from "@/app/common/types"
import { IFundraiseVolunteerCampaign } from "@/app/common/types/Campaign"
import { IDonationResponse, IVolunteerResponse } from "@/app/common/types/DonationsVolunteering"
import { IUser } from "@/app/api/user/getUser"

import FileDownloadIcon from "../../../../../../public/svg/file-download.svg"
import { formatAmount } from "../../common/utils/currency"

const Campaign = ({ params }: Route) => {
  const [donorsPage, setDonorsPage] = useState(1)
  const [volunteersPage, setVolunteersPage] = useState(1)
  const user = useUser()

  const { data: campaign } = useQuery(
    [keys.campaignPage.details, user?.token, params.id],
    fetchCampaign,
    {
      enabled: Boolean(user?.token),
    }
  )

  const { data: donors } = useQuery(
    [keys.campaignPage.donors, user?.token, params.id, donorsPage],
    fetchDonors,
    {
      enabled: Boolean(user?.token),
    }
  )

  const { data: volunteers } = useQuery(
    [keys.campaignPage.volunteers, user?.token, params.id, volunteersPage],
    fetchVolunteers,
    {
      enabled: Boolean(user?.token),
    }
  )

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
              {campaign.percentage !== undefined ? (
                <div className="bg-[#F9F9F9] rounded-lg p-4 mb-[12px] md:mb-3">
                  <p className="text-sm text-[#667085] mb-1">
                    <span className="text-[#292A2E]">Goal</span>{" "}
                    {campaign.fundsGotten}/{campaign.fundingGoal}
                  </p>
                  <ProgressBar percent={campaign.percentage} showValue />
                </div>
              ) : (
                <div className="h-20 m-3" />
              )}

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
        ) : (
          <CampaignPageSkeleton />
        )}
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
      {campaign && (
        <Tabs>
          {/fundraise/i.test(campaign.campaignType) && (
            <Tabs.Item heading="Donors">
              {donors && (
                <>
                  <Table className="hidden md:block mb-9">
                    <Table.Head>
                      <Table.HeadCell>Donors</Table.HeadCell>
                      <Table.HeadCell>Amount</Table.HeadCell>
                      <Table.HeadCell>Date & time</Table.HeadCell>
                    </Table.Head>

                    <Table.Body>
                      {donors.donors.map((donation, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{donation.title}</Table.Cell>
                          <Table.Cell>{donation.detail}</Table.Cell>
                          <Table.Cell>{donation.date}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>

                  <div className="flex flex-col md:hidden">
                    {donors.donors.map((donation, index) => (
                      <Detail key={index} {...donation} />
                    ))}
                  </div>
                </>
              )}

              {donors && donors.donors.length !== 0 && (
                <Pagination
                  currentPage={donors.pagination.currentPage}
                  perPage={donors.pagination.perPage}
                  total={donors.pagination.total}
                  onPageChange={setDonorsPage}
                  className="px-[18px] py-4"
                />
              )}
            </Tabs.Item>
          )}

          {/volunteer/i.test(campaign.campaignType) && (
            <Tabs.Item heading="Volunteers">
              {volunteers && (
                <>
                  <Table className="hidden md:block mb-9">
                    <Table.Head>
                      <Table.HeadCell>Volunteers</Table.HeadCell>
                      <Table.HeadCell>Duration</Table.HeadCell>
                      <Table.HeadCell>Date & time</Table.HeadCell>
                    </Table.Head>

                    <Table.Body>
                      {volunteers.volunteers.map((volunteer, index) => (
                        <Table.Row key={index}>
                          <Table.Cell>{volunteer.title}</Table.Cell>
                          <Table.Cell>{volunteer.detail}</Table.Cell>
                          <Table.Cell>{volunteer.date}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>

                  <div className="flex flex-col md:hidden">
                    {volunteers.volunteers.map((volunteer, index) => (
                      <Detail key={index} {...volunteer} />
                    ))}
                  </div>
                </>
              )}

              {volunteers && volunteers.volunteers.length !== 0 && (
                <Pagination
                  currentPage={volunteers.pagination.currentPage}
                  perPage={volunteers.pagination.perPage}
                  total={volunteers.pagination.total}
                  onPageChange={setVolunteersPage}
                  className="px-[18px] py-4"
                />
              )}
            </Tabs.Item>
          )}
        </Tabs>
      )}
    </div>
  )
}

export default Campaign

type ICampaignView = ReturnType<typeof mapCampaignResponseToView>

type IDonors = {
  donors: ReturnType<typeof mapDonationsResponseToView>
  pagination: IDonationResponse["pagination"]
}

type IVolunteers = {
  volunteers: ReturnType<typeof mapVolunteeringResponseToView>
  pagination: IVolunteerResponse["pagination"]
}

const ITEMS_PER_PAGE = "4"
const DATE_FORMAT = "ddd DD MMM, YYYY; hh:mm A"

const fetchCampaign: QF<Doubt<ICampaignView>, [Doubt<string>, string]> = async ({
  queryKey,
}) => {
  const [_, token, campaignId] = queryKey

  if (token) {
    const headers = {
      "Content-Type": "multipart/form-data",
      "x-auth-token": token,
    }

    const endpoint = `/api/v1/my-campaigns/${campaignId}`

    try {
      const { data } = await makeRequest<IFundraiseVolunteerCampaign>(endpoint, {
        headers,
        method: "GET",
      })

      const campaign = mapCampaignResponseToView(data)
      return campaign
    } catch (error) {
      const message = extractErrorMessage(error)
      throw new Error(message)
    }
  }
}

const fetchDonors: QF<Doubt<IDonors>, [Doubt<string>, string, number]> = async ({
  queryKey,
}) => {
  const [_, token, campaignId, donorsPage] = queryKey

  if (token) {
    const query = new URLSearchParams({
      page: `${donorsPage}`,
      perPage: ITEMS_PER_PAGE,
    })
    const endpoint = `/api/v1/campaigns/${campaignId}/donations?${query}`

    const headers = {
      "Content-Type": "multipart/form-data",
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<IDonationResponse>(endpoint, {
        headers,
        method: "GET",
      })

      return {
        donors: mapDonationsResponseToView(data.donations),
        pagination: data.pagination,
      }
    } catch (error) {
      const message = extractErrorMessage(error)
      throw new Error(message)
    }
  }
}

const fetchVolunteers: QF<Doubt<IVolunteers>, [Doubt<string>, string, number]> = async ({ queryKey }) => {
  const [_, token, campaignId, volunteersPage] = queryKey

  if (token) {
    const query = new URLSearchParams({
      page: `${volunteersPage}`,
      perPage: ITEMS_PER_PAGE,
    })
    const endpoint = `/api/v1/campaigns/${campaignId}/volunteers?${query}`

    const headers = {
      "Content-Type": "multipart/form-data",
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<IVolunteerResponse>(endpoint, {
        headers,
        method: "GET",
      })

      return {
        volunteers: mapVolunteeringResponseToView(data.volunteers),
        pagination: data.pagination,
      }
    } catch (error) {
      const message = extractErrorMessage(error)
      throw new Error(message)
    }
  }
}

function mapDonationsResponseToView(donations: IDonationResponse["donations"]) {
  return donations.map((donation) => ({
    title: donation.fullName,
    detail: formatAmount(Number(donation.amount), donation.currency),
    date: moment(donation.createdAt).format(DATE_FORMAT),
  }))
}

function mapVolunteeringResponseToView(
  volunteering: IVolunteerResponse["volunteers"]
) {
  return volunteering.map((volunteer) => ({
    title: volunteer.fullName,
    detail: volunteer.gender,
    date: moment(volunteer.createdAt).format(DATE_FORMAT),
  }))
}
