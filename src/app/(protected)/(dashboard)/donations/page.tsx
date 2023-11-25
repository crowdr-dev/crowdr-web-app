"use client"
import { useEffect, useState } from "react"
import StatCard from "../dashboard-components/StatCard"
import Tabs from "../dashboard-components/Tabs"
import Table from "../dashboard-components/Table"
import Pagination from "../dashboard-components/Pagination"
import { useUser } from "../utils/useUser"
import { getUser } from "@/app/api/user/getUser"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"

import { ICampaign } from "@/app/common/types/Campaign"
import Label from "../dashboard-components/Label"
import Detail from "../dashboard-components/Detail"

const Donations = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([])
  const user = useUser()
  const [page, setPage] = useState(1)

  // useEffect(() => {
  //   const fetchCampaigns = async () => {
  //     const query = new URLSearchParams({ page: "1", perPage: "10" })
  //     const endpoint = `/api/v1/my-campaigns?${query}`

  //     try {
  //       const user = await getUser()
  //       const headers = {
  //         "Content-Type": "multipart/form-data",
  //         "x-auth-token": user?.token!,
  //       }
  //       const { success, data } = await makeRequest<{
  //         success: boolean
  //         data: { campaigns: ICampaign[] }
  //       }>(endpoint, {
  //         headers,
  //         method: "GET",
  //       })
  //       setCampaigns(data.campaigns)
  //     } catch (error) {
  //       const message = extractErrorMessage(error)
  //       // toast({ title: "Oops!", body: message, type: "error" })
  //     }
  //   }

  //   fetchCampaigns()
  // }, [])

  return (
    <div>
      {/* page title x subtitle */}
      <hgroup className="mb-[5px]">
        <h1 className="text-lg md:text-2xl font-semibold text-[#101828] mb-[5px]">
          My Donations
        </h1>
        <p className="text-[15px] text-[#667085]">Manage your donations</p>
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
      </div>

      {/* stats */}
      <div className="grid md:grid-cols-[repeat(3,_minmax(0,_350px))] 2xl:grid-cols-3 gap-4 md:gap-5 mb-[23px] md:mb-[43px]">
        <StatCard title="Total Donations" text="N235,880.70" pattern />
        <StatCard title="All Campaigns" text="18" colorScheme="light" />
        <StatCard
          title="My Badge"
          text="Saviour"
          detail="Keep spreading love to unlock more badges!"
          colorScheme="light"
          iconUrl="/svg/badge.svg"
        />
      </div>

      {/* donations x volunteering */}
      <Tabs>
        <Tabs.Item heading="Donations">
          <Table className="hidden md:block mb-9">
            <Table.Head>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Date & time</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {donations.map((donation, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{donation.title}</Table.Cell>
                  <Table.Cell>{donation.detail}</Table.Cell>
                  <Table.Cell>{donation.date}</Table.Cell>
                  <Table.Cell>
                    {donation.status.match(/success/i) ? (
                      <Label text={donation.status} />
                    ) : (
                      <Label text={donation.status} textColor="#B42318" bgColor="#FEF3F2" />
                    )}
                  </Table.Cell>
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

        <Tabs.Item heading="Volunteering">
          <Table className="hidden md:block mb-9">
            <Table.Head>
              <Table.HeadCell>Campaign</Table.HeadCell>
              <Table.HeadCell>Skill needed</Table.HeadCell>
              <Table.HeadCell>Date & time</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {donations.map((donation, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{donation.detail}</Table.Cell>
                  <Table.Cell>{donation.skill}</Table.Cell>
                  <Table.Cell>{donation.date}</Table.Cell>
                  <Table.Cell>
                  {donation.status.match(/success/i) ? (
                      <Label text={donation.status} />
                    ) : (
                      <Label text={donation.status} textColor="#B42318" bgColor="#FEF3F2" />
                    )}
                  </Table.Cell>
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

export default Donations

const donations = [
  {
    title: "Help Tife pay her college fees",
    detail: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    skill: "Event Planning",
    status: "Success",
  },
  {
    title: "Support 400 kids get a backpack",
    detail: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    skill: "Marketing & Social Media",
    status: "Failed",
  },
  {
    title: "Help Crowdr raise $300M",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    skill: "Teaching & Training",
    status: "Success",
  },
  {
    title: "Film Documentary: Ocean Conservation",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    skill: "Photography",
    status: "Success",
  },
  {
    title: "Support 400 kids get a backpack",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    skill: "Event Planning",
    status: "Success",
  },
]
