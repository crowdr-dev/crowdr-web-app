"use client"
import { useState } from "react"
import Table from "../../dashboard-components/Table"
import Label from "../../dashboard-components/Label"
import Detail from "../../dashboard-components/Detail"
import AccountForm from "./AccountForm"
import AccountFormContext, { FormFields } from "../utils/useAccountForm"

const PaymentPage = () => {
  const [showForm, setShowForm] = useState(false)

  const submit = async (formFields: FormFields) => {
    console.log(formFields)
  }

  return (
    <div>
      {showForm ? (
        <AccountFormContext>
          <AccountForm onSubmit={submit} onCloseForm={() => setShowForm(false)} />
        </AccountFormContext>

        // <div className="max-w-lg flex justify-between items-center bg-[#F9FAFB] rounded-lg border border-[rgba(228,231,236,0.7)] pt-4 pb-[9px] px-[18px] mb-[33px] md:mb-6">
        //   <div className="text-sm text-[#667085]">
        //     <p className="text-black">Guaranty Trust Bank</p>
        //     <p>210805002</p>
        //     <p>Save the whales</p>
        //   </div>

        //   <div className="text-sm text-[#FF5200] underline">
        //     Edit details
        //   </div>
        // </div>
      ) : (
        <div className="flex flex-col md:flex-row text-sm md:text-base font-medium whitespace-pre mb-10 md:mb-8">
          <p>You have no connected bank account yet. </p>
          <p
            onClick={() => setShowForm(true)}
            className="text-[#F26C27] cursor-pointer"
          >
            Click here to add
          </p>
        </div>
      )}

      <Table className="hidden md:block mb-9">
        <Table.Head>
          <Table.HeadCell>Reference No</Table.HeadCell>
          <Table.HeadCell>detail</Table.HeadCell>
          <Table.HeadCell>Date & time</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>

        <Table.Body>
          {payments.map((donation, index) => (
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
        {payments.map((donation, index) => (
          <Detail key={index} {...donation} />
        ))}
      </div>
    </div>
  )
}

export default PaymentPage

const payments = [
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

function Option(value: string, label: string, isDisabled = false) {
  return { value, label, isDisabled }
}
