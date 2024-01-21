"use client"
import { useState } from "react"
import { useQuery } from "react-query"
import { useUser } from "../../common/hooks/useUser"
import { useToast } from "@/app/common/hooks/useToast"
import Image from "next/image"
import Table from "../../dashboard-components/Table"
import Label from "../../dashboard-components/Label"
import Detail from "../../dashboard-components/Detail"
import AccountForm from "./AccountForm"
import AccountFormContext, { FormFields } from "../utils/useAccountForm"
import makeRequest from "@/utils/makeRequest"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import { keys } from "../../utils/queryKeys"

import { QF } from "@/app/common/types"
import CaretIcon from "../../../../../../public/svg/caret.svg"
import { Button } from "../../dashboard-components/Button"

const PaymentPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [accountToEdit, setAccountToEdit] = useState<IBankDetail>()
  const user = useUser()
  const toast = useToast()

  const { data: bankDetails, refetch } = useQuery(
    [keys.settings.bankDetails, user?.token],
    fetchBankDetails,
    {
      enabled: Boolean(user?.token),
    }
  )

  const submit = async (formFields: FormFields) => {
    if (user) {
      const endpoint = `/api/v1/settings/bank-details/${
        accountToEdit ? accountToEdit._id : ""
      }`
      const headers = {
        "x-auth-token": user.token,
      }

      const payload = formFields

      try {
        const { success, message } = await makeRequest(endpoint, {
          headers,
          method: accountToEdit ? "PUT" : "POST",
          payload: JSON.stringify(payload),
        })

        if (success) {
          refetch()
          toast({ title: "Well done!", body: message })
          setShowForm(false)

          if (accountToEdit) setAccountToEdit(undefined)
        }
      } catch (error) {
        const message = extractErrorMessage(error)
        toast({ title: "Oops!", body: message, type: "error" })
      }
    }
  }

  const editAccount = (account: IBankDetail) => {
    setAccountToEdit(account)
    setShowForm(true)
  }

  const closeForm = () => {
    setAccountToEdit(undefined)
    setShowForm(false)
  }

  const mapBankDetailToView = (bankDetail: IBankDetail) => {
    return {
      title: bankDetail.accountName,
      detail: bankDetail.accountNumber,
      date: bankDetail.bankName,
      button: (
        <Button
          text="Edit"
          className="!h-9"
          onClick={() => editAccount(bankDetail)}
        />
      ),
    }
  }

  return (
    <div>
      {bankDetails && (
        <>
          {showForm ? (
            <AccountFormContext>
              <AccountForm
                onSubmit={submit}
                onCloseForm={closeForm}
                accountDetails={accountToEdit}
              />
            </AccountFormContext>
          ) : bankDetails.length !== 0 ? (
            // <div className="max-w-lg flex justify-between items-center bg-[#F9FAFB] rounded-lg border border-[rgba(228,231,236,0.7)] pt-4 pb-[9px] px-[18px] mb-[33px] md:mb-6">
            //   <div className="text-sm text-[#667085]">
            //     <p className="text-black">{bankDetails[0].bankName}</p>
            //     <p>{bankDetails[0].accountNumber}</p>
            //     <p>{bankDetails[0].accountName}</p>
            //   </div>
            //   <div onClick={() => editAccount(bankDetails[0])} className="text-sm text-[#FF5200] underline cursor-pointer">
            //     Edit details
            //   </div>
            // </div>
            <div className="flex flex-col md:flex-row text-sm md:text-base font-medium whitespace-pre mb-10 md:mb-8">
              <p>
                You have {bankDetails.length} connected bank account
                {bankDetails.length > 1 && "s"}.{" "}
              </p>
              <p
                onClick={() => setShowForm(true)}
                className="text-[#F26C27] cursor-pointer"
              >
                Add more
              </p>
            </div>
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

          {bankDetails.length !== 0 && (
            <>
              <Table className="hidden md:block mb-9">
                <Table.Head>
                  <Table.HeadCell>Account name</Table.HeadCell>
                  <Table.HeadCell>Account number</Table.HeadCell>
                  <Table.HeadCell>Bank</Table.HeadCell>
                  <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {bankDetails.map((bankDetail, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{bankDetail.accountName}</Table.Cell>
                      <Table.Cell>{bankDetail.accountNumber}</Table.Cell>
                      <Table.Cell>{bankDetail.bankName}</Table.Cell>
                      <Table.Cell>
                        <Button
                          text="Edit"
                          className="!h-9"
                          onClick={() => editAccount(bankDetail)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

              <div className="flex flex-col md:hidden mb-6">
                {bankDetails.map((bankDetail, index) => (
                  <Detail key={index} {...mapBankDetailToView(bankDetail)} />
                ))}
              </div>
            </>
          )}

          <details className="group mb-[34px] md:mb-10">
            <summary className="flex gap-[10px] text-primary cursor-pointer mb-2">
              Withdrawals
              <Image
                src={CaretIcon}
                alt=""
                className="group-open:-scale-y-[1]"
              />
            </summary>

            <Table className="hidden md:block mb-9">
              <Table.Head>
                <Table.HeadCell>Reference No</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
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
          </details>
        </>
      )}
    </div>
  )
}

export default PaymentPage

const fetchBankDetails: QF<
  IBankDetail[] | undefined,
  [string | undefined]
> = async ({ queryKey }) => {
  const [_, token] = queryKey

  if (token) {
    const endpoint = `/api/v1/settings/bank-details`
    const headers = {
      "x-auth-token": token,
    }

    try {
      const { data } = await makeRequest<IBankDetail[]>(endpoint, {
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

// Generated by https://quicktype.io

export interface IBankDetail {
  _id: string
  userId: string
  accountType: string
  accountNumber: string
  bankName: string
  accountName: string
  isVerifiedWithBVN: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
