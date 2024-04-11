"use client"
import Image from "next/image"
import { atom, useAtom } from "jotai"
import { Button, GrayButton } from "@/app/common/components/Button"
import TextInput from "@/app/common/components/TextInput"
import ModalTrigger, {
  modalStoreAtom,
} from "@/app/common/components/ModalTrigger"

import { CgSpinner } from "react-icons/cg"
import XMark from "../../../../../public/svg/x-mark.svg"
import { useEffect, useState } from "react"
import withdrawalService, {
  IWithdrawal,
} from "../common/services/withdrawalService"
import { useUser } from "../../(dashboard)/common/hooks/useUser"
import { useToast } from "@/app/common/hooks/useToast"
import otpService from "../common/services/otpService"
import { extractErrorMessage } from "@/utils/extractErrorMessage"
import Text from "../../(dashboard)/dashboard-components/Text"

export const activeWithdrawalIdAtom = atom<string | null>(null)
export const withdrawalToRejectAtom = atom<{ id: string; otp: string } | null>(
  null
)

const WithdrawalPopup = () => {
  const [adminOtp, setAdminOtp] = useState("")
  const [withdrawalData, setWithdrawalData] = useState<IWithdrawal | null>(null)
  const [activeWithdrawalId, setActiveWithdrawalId] = useAtom(
    activeWithdrawalIdAtom
  )
  const [modalStore] = useAtom(modalStoreAtom)
  const [_, setWithdrawalToReject] = useAtom(withdrawalToRejectAtom)
  const [isApproving, setIsApproving] = useState(false)
  const user = useUser()
  const toast = useToast()
  const otpIsFilled = adminOtp.length > 0
  const isOrganization = withdrawalData?.user.userType === "non-profit"
  const withdrawalApproved = withdrawalData?.status === "approved"

  useEffect(() => {
    if (user && activeWithdrawalId) {
      withdrawalService
        .fetchWithdrawal({
          withdrawalId: activeWithdrawalId,
          authToken: user.token,
        })
        .then((res) => setWithdrawalData(res))

      const modal = modalStore.get("withdrawalPopup")!
      modal._options.onHide = () => {
        setAdminOtp("")
        setActiveWithdrawalId(null)
        setWithdrawalData(null)
      }
    } else {
      setWithdrawalData(null)
      setIsApproving(false)
    }
  }, [activeWithdrawalId])

  const generateToken = async () => {
    if (user) {
      const res = await otpService.generateOtp(user.token)
      toast({ title: "OTP created!", body: `OTP sent to ${res.email}` })
    }
  }

  const approveWithdrawal = async () => {
    if (user && activeWithdrawalId) {
      setIsApproving(true)

      try {
        const res = await withdrawalService.changeWithdrawalStatus({
          withdrawalId: activeWithdrawalId,
          adminOtp: adminOtp,
          authToken: user.token,
          status: "approved",
        })

        const withdrawalData = await withdrawalService.fetchWithdrawal({
          withdrawalId: activeWithdrawalId,
          authToken: user.token,
        })

        setWithdrawalData(withdrawalData)
        setIsApproving(false)
        toast({ title: "Withdrawal Approved" })

        withdrawalService.refreshWithdrawal()
      } catch (error) {
        setIsApproving(false)
        const message = extractErrorMessage(error)
        toast({ title: "Oops!", body: message })
      }
    }
  }

  if (withdrawalData)
    return (
      <div className="grow max-w-[1031px] bg-white px-[50px] py-10 mb-11 border max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-11">
          <h2 className="font-semibold text-2xl text-black">Withdrawal</h2>
          <ModalTrigger id="withdrawalPopup" type="hide">
            <Image src={XMark} alt="" />
          </ModalTrigger>
        </div>

        <div className="flex flex-col gap-4 max-w-[440px] mb-[7px]">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#61656B]">
                {isOrganization ? "Organization" : "Individual"}
              </p>
              <h2 className="font-semibold text-2xl text-black">
                {withdrawalData.user.organizationName}
              </h2>
            </div>
            {isOrganization && (
              <p className="self-end font-semibold text-[#61656B]">
                4536673337
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            {!isOrganization && (
              <p className="text-xs text-[#61656B]">BVN Number</p>
            )}
            <Text
              characterLimit={128}
              expandText="Read more"
              className="text-sm text-[#393E46]"
            >
              {withdrawalData.campaign.story}
            </Text>
          </div>
        </div>

        <div className="px-[10px] max-w-[512px]">
          <div className="flex flex-col gap-[26px] pt-[10px] mb-10">
            <TextInput label="Account number" value="2108051917" disabled />
            <TextInput label="Bank" value="Access Bank" disabled />
            <TextInput label="Account name" value="John Doe" disabled />
          </div>

          {!withdrawalApproved && (
            <div className="max-w-xs mb-[55px]">
              <p
                className="text-primary text-xs mb-1.5 hover:underline cursor-pointer"
                onClick={generateToken}
              >
                Generate OTP
              </p>
              <TextInput
                value={adminOtp}
                onChange={(e) => setAdminOtp(e.target.value)}
                placeholder="Fill in OTP"
                controlled
              />
            </div>
          )}

          <div className="flex gap-6">
            <ModalTrigger id="withdrawalPopup" type="hide">
              <ModalTrigger id="kycRejectionForm">
                <GrayButton
                  text="Decline"
                  className="h-11 !w-[218px] !justify-center"
                  disabled={!otpIsFilled}
                  onClick={() =>
                    setWithdrawalToReject({
                      id: activeWithdrawalId!,
                      otp: adminOtp,
                    })
                  }
                />
              </ModalTrigger>
            </ModalTrigger>

            <Button
              text="Approve Withdrawal"
              loading={isApproving}
              disabled={!otpIsFilled || isApproving}
              className="h-11 !w-[218px] !justify-center"
              onClick={approveWithdrawal}
            />
          </div>
        </div>
      </div>
    )

  return <CgSpinner size="50px" className="animate-spin icon opacity-100" />
}

export default WithdrawalPopup
