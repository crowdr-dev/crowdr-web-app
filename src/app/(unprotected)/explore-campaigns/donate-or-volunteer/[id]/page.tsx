"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getUser } from "@/app/api/user/getUser";
import ProgressBar from "../../../../(protected)/(dashboard)/dashboard-components/ProgressBar";
import ExploreCard from "../../../../(protected)/(dashboard)/dashboard-components/ExploreCard";
import Filter from "../../../../(protected)/(dashboard)/dashboard-components/Filter";
import Input from "../../../../(protected)/(dashboard)/dashboard-components/Input";
import Checkbox from "../../../../(protected)/(dashboard)/dashboard-components/Checkbox";
import Select from "../../../../(protected)/(dashboard)/dashboard-components/Select";
import { Button } from "../../../../common/components/Button";
import { getSingleCampaign } from "@/app/api/campaigns/getCampaigns";
import makeRequest from "@/utils/makeRequest";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import HeartHand from "../../../../../../public/svg/hand-holding-heart.svg";
import { useToast } from "@/app/common/hooks/useToast";
import Link from "next/link";
import OldModal from "@/app/common/components/OldModal";
import WaitlistForm from "@/app/home/home-components/WaitlistForm";
import { formatAmount } from "@/app/(protected)/(dashboard)/common/utils/currency";
import { calculateTransactionFee, formatCurrency } from "@/utils/seperateText";
import Footer from "@/app/common/components/Footer";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import Loading from "@/app/loading";
import { useModal } from "@/app/common/hooks/useModal";
import { Mixpanel } from "@/utils/mixpanel";

const activeTabStyle = "text-[#00B964]  border-b-2 border-[#00B964]";
const inActiveTabStyle = "text-[#667085]";
const genderOptions = [
  {
    name: "Male",
    value: "male"
  },
  {
    name: "Female",
    value: "female"
  }
];

const ageRange = [
  {
    name: "18 - 25",
    value: "18 - 25"
  },
  {
    name: "26 - 35",
    value: "26 - 35"
  },
  {
    name: "36 - 45",
    value: "36 - 45"
  },
  {
    name: "46 - 55",
    value: "46 - 55"
  },
  {
    name: "56 and above",
    value: "56 and above"
  }
];

export default function DonateOrVolunteer({
  params
}: {
  params: { id: string };
}) {
  const toast = useToast();
  const modal = useModal();
  const iframeRef = useRef<any>();
  const [redirectUrl, setRedirectUrl] = useState("");
  const [loadingCampaign, setLoadingCampaign] = useState(true);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<any>();
  const [tab, setTab] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchSingleCampaign = async () => {
    const singleCampaign = await getSingleCampaign(params.id, true);
    setCampaign(singleCampaign);
    setLoadingCampaign(false);
  };

  interface initTypes {
    amount?: string;
    fullName?: "";
    email?: string;
  }

  const initProps: initTypes = {
    amount: "",
    fullName: "",
    email: ""
  };

  const [donationInputs, setDonationInputs] = useState(initProps);

  const updateProps = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setDonationInputs((prevState: initTypes) => {
      return {
        ...prevState,
        [inputName]: newValue
      };
    });
  };

  interface initVolunteerTypes {
    fullName: string;
    email?: string;
    phoneNumber: string;
    gender: string;
    ageRange: string;
    address: string;
    about: string;
  }

  const initVolunteerProps: initVolunteerTypes = {
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    ageRange: "",
    address: "",
    about: ""
  };

  const [volunteerInputs, setVolunteerInputs] = useState(initVolunteerProps);

  const updateVolunteerProps = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setVolunteerInputs((prevState: initVolunteerTypes) => {
      return {
        ...prevState,
        [inputName]: newValue
      };
    });
  };

  const [checkboxValues, setCheckboxValues] = useState({
    isAnonymous: false,
    shouldShareDetails: false,
    isSubscribedToPromo: false
  });

  const updateCheckbox = (key: string, value: boolean) => {
    setCheckboxValues((prevState) => ({
      ...prevState,
      [key]: value
    }));
  };

  useEffect(() => {
    Mixpanel.track(
      campaign?.campaignType === "fundraiseAndVolunteer"
        ? "Donation campaign viewed"
        : "Volunteer campaign viewed"
    );
    fetchSingleCampaign();
    setTab(
      campaign?.campaignType === "fundraiseAndVolunteer"
        ? "donate"
        : campaign?.campaignType === "fundraise"
        ? "donate"
        : "volunteer"
    );
  }, [params.id, campaign?.campaignType, redirectUrl]);

  const totalDonationAmount = campaign?.fundraise?.fundingGoalDetails.reduce(
    (accumulator: number, current: { amount: number }) => {
      return accumulator + current.amount;
    },
    0
  );
  const userDetails = campaign?.user;
  const donatedAmount = campaign?.totalAmountDonated?.[0].amount;
  const currency = campaign?.fundraise?.fundingGoalDetails[0].currency;

  const donate = async () => {
    setLoading(true);
    const endpoint = "/api/v1/payments/initiate";

    const payload = {
      campaignId: params.id,
      amount: donationInputs.amount,
      email: donationInputs.email,
      fullName: donationInputs.fullName,
      currency: currency,
      isAnonymous: checkboxValues.isAnonymous,
      shouldShareDetails: checkboxValues.shouldShareDetails,
      isSubscribedToPromo: checkboxValues.isSubscribedToPromo,
      callback_url: window.location.href,
      cancel_url: `${window.location.href}?cancelled=true`
    };

    checkboxValues.isAnonymous && Mixpanel.track("Anonymous Donation");
    try {
      const { data } = await makeRequest(endpoint, {
        method: "POST",
        payload: JSON.stringify(payload)
      });
      Mixpanel.track("Routes to Paystack Gateway");

      setRedirectUrl(data.authorization_url);
      setLoading(false);
    } catch (error) {
      Mixpanel.track("Error completing donation");
      setLoading(false);
      const message = extractErrorMessage(error);
      toast({ title: "Oops!", body: message, type: "error" });
    }
  };

  const volunteer = async () => {
    setLoading(true);
    const endpoint = `/api/v1/campaigns/${params.id}/volunteer`;

    const payload = {
      userId: campaign.userId,
      phoneNumber: volunteerInputs.phoneNumber,
      email: volunteerInputs.email,
      fullName: volunteerInputs.fullName,
      ageRange: volunteerInputs.ageRange,
      gender: volunteerInputs.gender,
      address: volunteerInputs.address,
      about: volunteerInputs.about
    };

    try {
      const { data } = await makeRequest(endpoint, {
        method: "POST",
        payload: JSON.stringify(payload)
      });
      toast({ title: "Success!", body: data.message, type: "success" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const message = extractErrorMessage(error);
      toast({ title: "Oops!", body: message, type: "error" });
    }
  };

  const urlsOnly = campaign?.campaignAdditionalImages.map(
    (item: { url: string }) => item.url
  );

  const areAllInputsFilled = (input: any) => {
    return Object.values(input).every((value) => value !== "");
  };

  const closeIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = "about:blank"; // Reset iframe source
      iframeRef.current = null;
    }
    setRedirectUrl(""); // Reset redirect URL
    modal.hide(); // Hide modal
    scrollTo(0, 0); // Scroll to top of page
    setDonationInputs(initProps); // Reset donation inputs
  };

  const checkIframeUrl = () => {
    const iframe = iframeRef.current;
    if (redirectUrl && iframe) {
      const iframeUrl = iframe.contentWindow?.location.href;
      if (
        (iframeUrl && iframeUrl.includes("reference")) ||
        (iframeUrl && iframeUrl.includes("cancelled"))
      ) {
        // Check for specific URL indicating success
        closeIframe();
        if (iframeUrl.includes("reference")) {
          Mixpanel.track("Successful Donation");

          toast({
            title: "Success",
            body: "Donation successful",
            type: "success"
          });
        }
      }
    }
  };

  useEffect(() => {
    if (redirectUrl) {
      modal.show(
        <iframe
          src={redirectUrl}
          style={{ height: "100vh", width: "100%", background: "#fff" }}
          id="paystack-gateway"
          ref={iframeRef}></iframe>
      );
      const intervalId = setInterval(checkIframeUrl, 1000); // Check URL every second
      return () => clearInterval(intervalId);
    }
  }, [redirectUrl]);

  if (loadingCampaign) return <Loading />;

  return (
    <div className="font-satoshi">
      <NavBar />
      <div className="py-10 px-6 md:px-40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl text-black font-semibold">
              {campaign?.campaignType === "fundraiseAndVolunteer"
                ? "Donate and Volunteer"
                : campaign?.campaignType === "fundraise"
                ? "Donate"
                : "Volunteer"}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-12 min-w-full md:grid-cols-2">
          <ExploreCard
            name={
              userDetails?.userType === "individual"
                ? userDetails?.fullName
                : userDetails?.organizationName
            }
            tier={userDetails?.userType}
            header={campaign?.title}
            subheader={campaign?.story}
            totalAmount={campaign?.fundraise?.fundingGoalDetails[0].amount}
            currency={campaign?.fundraise?.fundingGoalDetails[0].currency}
            currentAmount={donatedAmount}
            timePosted={campaign?.campaignEndDate}
            volunteer={campaign?.volunteer}
            avatar={campaign?.photo?.url || ""}
            slideImages={[
              campaign?.campaignCoverImage?.url,
              ...(urlsOnly || [])
            ]}
            donateImage={campaign?.campaignCoverImage?.url}
            routeTo={``}
            category={campaign?.category}
            campaignType={campaign?.campaignType}
          />
          <div>
            <div>
              {campaign?.campaignType === "fundraiseAndVolunteer" ? (
                <>
                  <span
                    className={`text-sm p-3 cursor-pointer ${
                      tab === "donate" ? activeTabStyle : inActiveTabStyle
                    }`}
                    onClick={() => {
                      setTab("donate");
                    }}>
                    Donate
                  </span>
                  <span
                    className={`text-sm p-3 ml-4 cursor-pointer ${
                      tab === "volunteer" ? activeTabStyle : inActiveTabStyle
                    }`}
                    onClick={() => {
                      setTab("volunteer");
                    }}>
                    Volunteer
                  </span>
                </>
              ) : campaign?.campaignType === "fundraise" ? (
                <span
                  className={`text-sm p-3 cursor-pointer ${
                    tab === "donate" ? activeTabStyle : inActiveTabStyle
                  }`}
                  onClick={() => {
                    setTab("donate");
                  }}>
                  Donate
                </span>
              ) : (
                <span
                  className={`text-sm p-3 ml-4 cursor-pointer ${
                    tab === "volunteer" ? activeTabStyle : inActiveTabStyle
                  }`}
                  onClick={() => {
                    setTab("volunteer");
                  }}>
                  Volunteer
                </span>
              )}
            </div>
            <hr className="mt-[9px]" />

            {tab === "volunteer" ? (
              <div className="mt-6">
                <div className="bg-[#F9F9F9] p-4 mb-2">
                  <p className="mt-1 text-sm opacity-50">
                    {campaign?.totalNoOfCampaignVolunteers} applications
                  </p>
                </div>

                <h3 className="mt-3 text-base text-[#292A2E]">Apply</h3>
                <div className="mt-4">
                  <Input
                    label={"Full name"}
                    placeholder="John doe"
                    name="fullName"
                    id="fullName"
                    value={volunteerInputs.fullName}
                    onChange={updateVolunteerProps}
                  />
                  <Input
                    label={"Email address"}
                    placeholder="example@crowdr.com"
                    name="email"
                    id="email"
                    value={volunteerInputs.email}
                    onChange={updateVolunteerProps}
                  />

                  <Input
                    label={"Phone number"}
                    placeholder="08012345678"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={volunteerInputs.phoneNumber}
                    onChange={updateVolunteerProps}
                  />
                  <Select
                    label={"Gender"}
                    name="gender"
                    id="gender"
                    options={genderOptions}
                    value={volunteerInputs.gender}
                    onChange={updateVolunteerProps}
                  />

                  <Select
                    label={"Age Range"}
                    name="ageRange"
                    id="ageRange"
                    options={ageRange}
                    value={volunteerInputs.ageRange}
                    onChange={updateVolunteerProps}
                  />

                  <Input
                    label={"Address"}
                    placeholder="Lagos, NG"
                    name="address"
                    id="address"
                    value={volunteerInputs.address}
                    onChange={updateVolunteerProps}
                  />
                  <div className="flex flex-col items-start w-full">
                    <label
                      htmlFor="about"
                      className="text-[14px] text-[#344054] mb-[6px]">
                      Tell us a bit about yourself and why you’re interested in
                      this project!
                    </label>
                    <textarea
                      id="about"
                      className="w-full text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]"
                      value={volunteerInputs.about}
                      onChange={updateVolunteerProps}
                      name="about"
                    />
                  </div>
                </div>

                <Button
                  text="Apply"
                  className="w-full mt-4 !justify-center"
                  disabled={!areAllInputsFilled(volunteerInputs)}
                  loading={loading}
                  onClick={volunteer}
                />

                <div className="mt-10">
                  <div className="flex flex-row items-start justify-between mb-2">
                    <p className="text-[#292A2E] text-base">
                      {campaign?.totalNoOfCampaignVolunteers > 0 &&
                        campaign?.totalNoOfCampaignVolunteers}{" "}
                      Total Volunteer(s)
                    </p>
                  </div>
                  <div className="flex items-start flex-col gap-5 mb-8">
                    {campaign?.campaignVolunteers
                      ?.slice(0, 5)
                      .map(
                        (
                          donor: { fullName: string; amount: string },
                          index: number
                        ) => {
                          return (
                            <div
                              className="flex items-center flex-row justify-start"
                              key={index}>
                              <div className="p-2 bg-[#F8F8F8] rounded-full">
                                <Image
                                  src={HeartHand}
                                  alt="menu"
                                  className="bg-F8F8F8"
                                />
                              </div>
                              <div className="flex flex-col gap-[1px] ml-4">
                                <p className="text-[#344054] text-sm">
                                  {donor?.fullName}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>
                  {campaign?.totalNoOfCampaignVolunteers > 0 && (
                    <Link
                      className="cursor-pointer p-4 bg-[#F8F8F8] text-[#344054] w-fit mt-8 rounded-lg"
                      href={`/explore/donate-or-volunteer/${campaign._id}/all-donations`}>
                      See all
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <div className="bg-[#F9F9F9] p-4">
                  <p className="text-sm text-[#667085] mb-2">
                    {" "}
                    <span className="text-[#000]">Goal</span>{" "}
                    {formatAmount(donatedAmount, currency?.toLowerCase())} /{" "}
                    {formatAmount(totalDonationAmount, currency?.toLowerCase())}
                  </p>
                  <ProgressBar
                    bgColor="#00B964"
                    percent={(donatedAmount / totalDonationAmount) * 100}
                  />
                  <p className="mt-3 text-sm opacity-50">
                    {campaign?.campaignDonors?.length} Donation(s)
                  </p>
                </div>

                <div className="mt-4">
                  <Input
                    label={"Donation Amount"}
                    placeholder="N10.00"
                    name="amount"
                    id="amount"
                    type="number"
                    onChange={updateProps}
                    value={donationInputs.amount}
                    info={`Our payment processor charges a small donation fulfillment fee. ${
                      donationInputs.amount &&
                      `This brings your total to ${formatCurrency(
                        calculateTransactionFee(
                          parseFloat(donationInputs.amount)
                        ) + parseFloat(donationInputs.amount)
                      )}`
                    }`}
                    formattedValue={
                      donationInputs.amount &&
                      formatCurrency(
                        calculateTransactionFee(
                          parseFloat(donationInputs.amount)
                        ) + parseFloat(donationInputs.amount)
                      )
                    }
                  />
                  <Input
                    label={"Full name"}
                    placeholder="John doe"
                    name="fullName"
                    id="fullName"
                    onChange={updateProps}
                    value={donationInputs.fullName}
                  />
                  <Input
                    label={"Email address"}
                    placeholder="example@crowdr.com"
                    name="email"
                    id="email"
                    onChange={updateProps}
                    value={donationInputs.email}
                  />
                  <div className="flex flex-col mt-[30px]">
                    <Checkbox
                      id={"1"}
                      label={
                        "Don't display my name publicly on the fundraiser."
                      }
                      checked={checkboxValues.isAnonymous}
                      onChange={(newValue) =>
                        updateCheckbox("isAnonymous", newValue)
                      }
                    />
                    <Checkbox
                      id={"2"}
                      label={
                        "I'm delighted to share my name and email with this charity to receive updates on other ways I can help."
                      }
                      checked={checkboxValues.shouldShareDetails}
                      onChange={(newValue) =>
                        updateCheckbox("shouldShareDetails", newValue)
                      }
                    />
                    <Checkbox
                      id={"3"}
                      label={
                        "Get occasional marketing updates from Crowdr. You may unsubscribe at any time."
                      }
                      checked={checkboxValues.isSubscribedToPromo}
                      onChange={(newValue) =>
                        updateCheckbox("isSubscribedToPromo", newValue)
                      }
                    />
                  </div>
                </div>

                <Button
                  text="Donate"
                  className="w-full mt-4 !justify-center"
                  onClick={donate}
                  loading={loading}
                  disabled={!areAllInputsFilled(donationInputs)}
                />

                <div className="mt-10">
                  <div className="flex flex-row items-start justify-between mb-2">
                    <p className="text-[#292A2E] text-base">
                      {campaign?.totalNoOfCampaignDonors > 0 &&
                        campaign?.totalNoOfCampaignDonors}{" "}
                      Total Donor(s)
                    </p>

                    <Filter query="Top Donors" />
                  </div>
                  <div className="flex items-start flex-col gap-5 mb-8">
                    {campaign?.campaignDonors?.slice(0, 5).map(
                      (
                        donor: {
                          fullName: string;
                          amount: string;
                          isAnonymous: boolean;
                        },
                        index: number
                      ) => {
                        return (
                          <div
                            className="flex items-center flex-row justify-start"
                            key={index}>
                            <div className="p-2 bg-[#F8F8F8] rounded-full">
                              <Image
                                src={HeartHand}
                                alt="menu"
                                className="bg-F8F8F8"
                              />
                            </div>
                            <div className="flex flex-col gap-[1px] ml-4">
                              <p className="text-[#344054] text-sm">
                                {donor?.isAnonymous
                                  ? "Anonymous"
                                  : donor?.fullName}
                              </p>
                              <span className="text-[13px] text-[#667085]">
                                Donated{" "}
                                {formatAmount(parseInt(donor?.amount), "naira")}{" "}
                                to this campaign
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                  {campaign?.totalNoOfCampaignDonors > 0 && (
                    <Link
                      className="cursor-pointer p-4 bg-[#F8F8F8] text-[#344054] w-fit mt-8 rounded-lg"
                      href={`/login`}>
                      See all
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <OldModal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </OldModal>
    </div>
  );
}
