"use client";
import Tabs from "../../dashboard-components/Tabs";
import Table from "../../dashboard-components/Table";
import Label from "../../dashboard-components/Label";
import Detail from "../../dashboard-components/Detail";
import { RFC } from "@/app/common/types";
import TextInput from "../../dashboard-components/TextInput";
import { useState } from "react";
import SelectInput from "../../dashboard-components/SelectInput";
import InputTitle from "../../dashboard-components/InputTitle";
import { WhiteButton } from "../../dashboard-components/Button";
import Button from "@/app/common/components/Button";
import { FormFields } from "@/app/common/hooks/useLoginForm";

const Payouts: RFC<BankFormProps> = ({ BankId }) => {
  const [input, setInput] = useState<any>();

  const isEdit = Boolean(BankId);
  const saveButtonText = isEdit ? "Save Changes" : "Add Bank Details";

  return (
    <div>
      <div className="w-[100%] pb-20 pt-[10px]">
        <div className="leading-[25px] text-[16px] cursor-pointer">
          <p>
            You have no connected bank account yet.{" "}
            <span className="text-[#FF5200]">Click here to add</span>
          </p>
        </div>

        <div className="flex w-[50%] flex-col  mb-6">
          <h2>Account Number</h2>
          <TextInput
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="2267350360"
            // icon={BiSearch}
            styles={{
              wrapper: "grow mr-[22px] block",
              input: "text-sm",
            }}
          />
        </div>

        <div className="flex w-[50%] flex-col  mb-6">
          <h2>Bank</h2>
          {/* <SelectInput
            name="BankType"
            options={BankTypes}
            rules={{
              required: "Bank type is required",
            }}
            ariaLabel="Bank Type"
          /> */}
        </div>

        <div className="flex w-[50%] flex-col  mb-6">
          <h2>Account Name</h2>
          <TextInput
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="This should auto generate"
            // icon={BiSearch}
            styles={{
              wrapper: "grow mr-[22px] block",
              input: "text-sm",
            }}
          />
        </div>

        <div className="flex md:justify-end justify-center items-center w-[50%] mb-5">
          <div className="">
            <WhiteButton text="Cancel" href="/" shadow className="mr-3" />
          </div>
          <div className="flex items-center justify-center ">
            <Button text={saveButtonText} />
          </div>
        </div>

        {/* Table */}
        <Tabs.Item heading="Reference">
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
                  <Table.Cell>{donation.refernceno}</Table.Cell>
                  <Table.Cell>{donation.amount}</Table.Cell>
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
        </Tabs.Item>
      </div>
    </div>
  );
};

export default Payouts;

const reference = [
  {
    refernceno: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    amount: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    refernceno: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    amount: "N40,000.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Failed",
  },
  {
    refernceno: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    amount: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    refernceno: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    amount: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Success",
  },
  {
    refernceno: "crowdr_test_bank_withdraw_PpHpXxz3uLMvj8Pi",
    amount: "N21,300.00",
    date: "Tue 26 Jul, 2022; 10:14 PM",
    status: "Failed",
  },
];

type BankFormProps = {
  submit: (formFields: FormFields) => void;
  BankId?: string;
};

function Option(value: string, label: string, isDisabled = false) {
  return { value, label, isDisabled };
}

const BankTypes = [
  Option("", "Select a Bank...", true),
  Option("access", "Access"),
  Option("zenith", "Zenith"),
  Option("uba", "UBA"),
];
