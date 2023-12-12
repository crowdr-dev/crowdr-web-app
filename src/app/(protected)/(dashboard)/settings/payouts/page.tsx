"use client"
import Tabs from "../../dashboard-components/Tabs"
import Table from "../../dashboard-components/Table"
import Label from "../../dashboard-components/Label"
import Detail from "../../dashboard-components/Detail"

const payouts = () => {
  return (
    <div>
      <div className="w-[100%] pb-20 pt-[10px]">
        <div className="leading-[25px] text-[16px] cursor-pointer">
          <p>
            You have no connected bank account yet.{" "}
            <span className="text-[#FF5200]">Click here to add</span>
          </p>
        </div>

        {/* Table */}
        <Table className="hidden md:block mb-9">
          <Table.Head>
            <Table.HeadCell>Refernce No</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Date & time</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>

          <Table.Body>
            {reference.map((donation, index) => (
              <Table.Row key={index}>
                <Table.Cell>{donation.title}</Table.Cell>
                <Table.Cell>{donation.detail}</Table.Cell>
                <Table.Cell>{donation.date}</Table.Cell>
                <Table.Cell>
                  {donation.status.match(/success/i) ? (
                    <Label text={donation.status} />
                  ) : (
                    <Label
                      text={donation.status}
                      textColor="#B42318"
                      bgColor="#FEF3F2"
                    />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className="flex flex-col md:hidden">
          {reference.map((donation, index) => (
            <Detail key={index} {...donation} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default payouts

const reference = [
  {
    title: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    detail: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    title: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    detail: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Failed",
  },
  {
    title: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    title: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    title: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    detail: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Failed",
  },
]
