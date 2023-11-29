import { useState } from "react"
import Detail from "../../dashboard-components/Detail"
import Label from "../../dashboard-components/Label"
import Pagination from "../../dashboard-components/Pagination"
import Table from "../../dashboard-components/Table"
import Tabs from "../../dashboard-components/Tabs"

const Campaign = () => {
  const [page, setPage] = useState(1)

  return (
    <div>
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
                    <Label text={donation.status} />
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
                    <Label text={donation.status} />
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

export default Campaign

const donations = [
  {
    title: "Help Tife pay her college fees",
    detail: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    title: "Support 400 kids get a backpack",
    detail: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    title: "Help Crowdr raise $300M",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    title: "Film Documentary: Ocean Conservation",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    title: "Support 400 kids get a backpack",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
]
