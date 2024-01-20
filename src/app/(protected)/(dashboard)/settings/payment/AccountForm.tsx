import { useFormContext } from "react-hook-form"
import TextInput from "../../dashboard-components/TextInput"
import { Button } from "../../dashboard-components/Button"
import AccountFormContext, { FormFields } from "../utils/useAccountForm"
import { RFC } from "@/app/common/types"
import { Option } from "../../common/utils/form"
import NumberInput from "../../dashboard-components/NumberInput"
import SelectInput from "../../dashboard-components/SelectInput"
import { useEffect } from "react"
import { IBankDetail } from "./page"

const AccountForm: RFC<AccountFormProps> = ({
  onSubmit,
  onCloseForm,
  accountDetails,
}) => {
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useFormContext() as AccountFormContext

  useEffect(() => {
    if (accountDetails) reset({
      accountNumber: accountDetails.accountNumber,
      bankName: accountDetails.bankName,
      accountName: accountDetails.accountName,
    })
  }, [accountDetails])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg flex flex-col gap-[26px] mb-[33px] md:mb-[35px]"
    >
      <div className="flex flex-col gap-5 mb-[33px] md:mb-[31px]">
        <TextInput
          name="accountNumber"
          rules={{
            required: "Account number is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Enter a valid account number",
            },
          }}
          label="Account number"
        />

        <SelectInput
          name="bankName"
          rules={{
            required: "Bank is required",
          }}
          options={banks}
          label="Bank"
          ariaLabel="Bank"
        />

        <TextInput
          name="accountName"
          rules={{
            required: "Account name is required",
          }}
          label="Account name"
          ariaLabel="Account name"
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-end gap-3">
        <Button
          onClick={onCloseForm}
          text="Cancel"
          textColor="#344054"
          bgColor="white"
          outlineColor="#D0D5DD"
          className="grow md:grow-0 !justify-center"
        />
        <Button
          text="Save changes"
          buttonType="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          className="grow md:grow-0 !justify-center"
        />
      </div>
    </form>
  )
}

export default AccountForm

type AccountFormProps = {
  onSubmit: (formFields: FormFields) => void
  onCloseForm: () => void
  accountDetails?: IBankDetail
}

const banks = [
  Option("", "Select a bank...", true),
  Option("Access Bank", "Access"),
  Option("Zenith Bank", "Zenith"),
  Option("United Bank for Africa", "UBA"),
  Option("Guarantee Trust Bank", "GT Bank"),
]
