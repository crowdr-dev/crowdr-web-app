import { useFormContext } from "react-hook-form"
import TextInput from "../../dashboard-components/TextInput"
import { Button } from "../../dashboard-components/Button"
import AccountFormContext, { FormFields } from "../utils/useAccountForm"
import { RFC } from "@/app/common/types"
import { Option } from "../../common/utils/form"
import NumberInput from "../../dashboard-components/NumberInput"
import SelectInput from "../../dashboard-components/SelectInput"

const AccountForm: RFC<AccountFormProps> = ({ onSubmit, onCloseForm }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext() as AccountFormContext

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg flex flex-col gap-[26px] mb-[33px] md:mb-[35px]"
    >
      <div className="flex flex-col gap-5 mb-[33px] md:mb-[31px]">
        <NumberInput
          name="accountNumber"
          rules={{
            required: "Account number is required",
          }}
          label="Account number"
        />

        <SelectInput
          name="bank"
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
}


const banks = [
  Option("", "Select a bank...", true),
  Option("access", "Access"),
  Option("zenith", "Zenith"),
  Option("uba", "UBA"),
]
