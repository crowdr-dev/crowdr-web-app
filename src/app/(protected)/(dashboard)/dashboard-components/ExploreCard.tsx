"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RFC } from "@/app/common/types";
import { Button, WhiteButton } from "../../../common/components/Button";
import ProgressBar from "./ProgressBar";
import moment from "moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Menu from "../../../../../public/svg/menu.svg";
import ArrowRight from "../../../../../public/svg/new-arrow.svg";
import OldModal from "@/app/common/components/OldModal";
import { formatAmount } from "../common/utils/currency";
import { camelCaseToSeparated } from "@/utils/seperateText";
import { getInitials } from "./Header";
import useClipboard from "@/app/common/hooks/useClipboard";
import { IoMdClose } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";
import ShareCampaign from "@/app/common/components/share-campaign";

const ExploreCard: RFC<ExploreCardProps> = (props) => {
  const {
    id,
    name,
    tier,
    avatar,
    header,
    subheader,
    totalAmount,
    slideImages,
    currentAmount,
    donateImage,
    routeTo,
    timePosted,
    campaignType,
    category,
    volunteer,
    currency
  } = props;

  const { copied, copy } = useClipboard();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [shareModal, setShareModal] = useState(false);

  const [hover, setHover] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  let allSkills = volunteer?.skillsNeeded ? [...volunteer.skillsNeeded] : [];

  if (volunteer?.otherSkillsNeeded) {
    allSkills.push(volunteer.otherSkillsNeeded);
  }

  const aggregatedSkills = allSkills.join(", ");

  interface Add {
    skillNeeded: string;
    ageRange: string;
    genderPreference: string;
    volunteerCommitment: string;
  }

  const additionalDetails: Add = {
    skillNeeded: aggregatedSkills ?? "",
    ageRange: volunteer?.ageRange ?? "",
    genderPreference: volunteer?.genderPreference ?? "",
    volunteerCommitment: volunteer?.requiredCommitment ?? ""
  };

  const toggleReadMore = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeShareModal = () => {
    setShareModal(false);
  };

  const wordsArray = subheader?.split(" ");

  const displayText = isCollapsed
    ? wordsArray?.slice(0, 30).join(" ")
    : subheader;
  const progress = totalAmount ? currentAmount / totalAmount : 0;

  const settings = (images: string[]) => {
    return {
      dots: true,
      infinite: false,
      speed: 500,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: hover ? true : false,
      swipeToSlide: true,
      nextArrow: (
        <Image
          src={ArrowRight}
          alt="arrow-right"
          className={`${currentSlide === 0 && "slick-disabled"}`}
          onMouseEnter={() => setHover(true)}
        />
      ),
      prevArrow: (
        <Image
          src={ArrowRight}
          alt="arrow-right"
          className={`${
            currentSlide === images.length - 1 && "slick-disabled"
          }`}
          onMouseEnter={() => setHover(true)}
        />
      ),
      afterChange: (current: number) => setCurrentSlide(current)
    };
  };

  return (
    <div className="p-6 rounded-xl border-[#393e4614] border mt-8 h-fit bg-white">
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          {avatar ? (
            <Image
              src={avatar}
              alt="user-avatar"
              width={40}
              height={40}
              className="rounded-full !w-10 !h-10 object-cover"
            />
          ) : (
            <div className="rounded-full bg-[#00B964] flex flex-row items-center justify-center h-[40px] w-[40px] font-bold text-white">
              {getInitials(name)}
            </div>
          )}

          <div className="pl-3">
            <h3 className="text-sm font-normal text-[#344054]">{name}</h3>
            <h4 className="text-xs font-normal text-[#667085]">{tier}</h4>
          </div>
        </div>
        {/* <Image src={Menu} alt='menu' /> */}
      </div>

      <div className="mt-4 mb-6 relative">
        <div className="absolute z-10 bg-[#F8F8F8] rounded-[25px] py-1 px-2 mt-[14px] ml-[14px] text-[#0B5351] capitalize opacity-80 text-sm">
          {category}
        </div>
        {!!slideImages && (
          <div>
            {slideImages?.length > 1 ? (
              <Slider {...settings(slideImages)}>
                {slideImages?.map((image, index) => {
                  return (
                    <div key={index}>
                      <OldModal isOpen={modalIsOpen} onClose={closeModal}>
                        <div
                          className="relative p-12"
                          style={{
                            background: "rgba(76, 76, 76, 0)"
                          }}>
                          <IoMdClose
                            size={30}
                            className="absolute top-0 right-0 my-4 mx-4 bg-white p-1 rounded-full z-10 cursor-pointer"
                            onClick={closeModal}
                          />
                          <Image
                            src={slideImages[currentSlide]}
                            alt="donate"
                            className="h-60 object-center object-cover rounded-none"
                            width={500}
                            height={500}
                            style={{
                              objectFit: "unset",
                              height: "60vh",
                              minWidth: "400px",
                              width: "100%"
                            }}
                          />
                        </div>
                      </OldModal>

                      <Image
                        src={image}
                        alt="donate"
                        className="h-60 object-center object-cover rounded-lg cursor-pointer"
                        width={500}
                        height={400}
                        style={{
                          width: "100%",
                          maxWidth: "100%",
                          objectFit: "cover"
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={() => {
                          openModal();
                        }}
                      />
                    </div>
                  );
                })}
              </Slider>
            ) : (
              <>
                <OldModal isOpen={modalIsOpen} onClose={closeModal}>
                  <div
                    className="relative p-12"
                    style={{
                      background: "rgba(76, 76, 76, 0)"
                    }}>
                    <IoMdClose
                      size={30}
                      className="absolute top-0 right-0 my-4 mx-4 bg-white p-1 rounded-full z-10 cursor-pointer"
                      onClick={closeModal}
                    />
                    <Image
                      src={!!slideImages && slideImages[0]}
                      alt="donate"
                      className="h-60 object-center object-cover rounded-none"
                      width={500}
                      height={500}
                      style={{
                        objectFit: "unset",
                        height: "60vh",
                        minWidth: "400px",
                        width: "100%"
                      }}
                    />
                  </div>
                </OldModal>
                <Image
                  src={!!slideImages && slideImages[0]}
                  alt="donate"
                  className="h-60 object-center object-cover rounded-lg  cursor-pointer"
                  width={500}
                  height={400}
                  style={{
                    width: "100%",
                    objectFit: "cover"
                  }}
                  onClick={() => {
                    openModal();
                  }}
                />
              </>
            )}
          </div>
        )}
        <div className="my-5">
          <h3 className="font-semibold text-[18px]">{header}</h3>
          <p className="mt-2 break-words text-sm">
            {displayText}
            {isCollapsed && wordsArray && wordsArray.length > 30 && "... "}
            {wordsArray && wordsArray.length > 30 && (
              <span
                onClick={toggleReadMore}
                className="text-[#00B964] cursor-pointer pl-1">
                {isCollapsed ? "See more" : "See less"}
              </span>
            )}
          </p>
          {!routeTo && campaignType?.toLowerCase().includes("volunteer") && (
            <div className="mt-4 gap-4">
              {Object.entries(additionalDetails).map(([key, value], index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-start gap-2 mb-2">
                  <h4 className="text-sm">{camelCaseToSeparated(key)}:</h4>
                  <h4 className="text-[#667085] text-sm capitalize">{value}</h4>
                </div>
              ))}
              <h4 className="text-sm">Additional Note</h4>
              <h4 className="text-[#667085] text-sm capitalize">
                {volunteer?.additonalNotes}
              </h4>
            </div>
          )}
          <h4 className="mt-5 text-[#667085] text-sm">
            Ends {moment(timePosted, "YYYYMMDD").fromNow()}
          </h4>
        </div>
        {!!routeTo && campaignType?.includes("fundraise") && totalAmount && (
          <div className="bg-[#F9F9F9] p-4 rounded-[8px]">
            <p className="text-sm text-[#667085] mb-[4px]">
              {" "}
              <span className="text-[#000] text-sm">Goal</span>{" "}
              {currency && formatAmount(currentAmount, currency)}/
              {currency && formatAmount(totalAmount, currency)}
            </p>
            <ProgressBar bgColor="#00B964" percent={progress * 100} showValue />
          </div>
        )}
      </div>

      <OldModal isOpen={shareModal} onClose={closeShareModal}>
        <div
          className="relative p-12"
          style={{
            background: "rgba(76, 76, 76, 0)"
          }}>
          <ShareCampaign
            onClose={closeShareModal}
            campaignId={id}
            title={header}
            story={displayText}
            campaignCoverImage={slideImages?.[0]}
          />
        </div>
      </OldModal>

      {!!routeTo ? (
        <div className="flex flex-col w-full gap-3 mt-4">
          <Button
            text={
              campaignType === "fundraiseAndVolunteer"
                ? "Donate and Volunteer"
                : campaignType === "fundraise"
                ? "Donate"
                : "Volunteer"
            }
            className="w-full !justify-center"
            href={routeTo}
          />
          <Button
            text="Share Campaign"
            bgColor="#FFF"
            textColor="#344054"
            outlineColor="#D0D5DD"
            className="w-full !justify-center"
            onClick={() => {
              setShareModal(true);
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col item-center">
         <Button
            text="Share Campaign"
            bgColor="#FFF"
            textColor="#344054"
            outlineColor="#D0D5DD"
            className="w-full !justify-center"
            onClick={() => {
              setShareModal(true);
            }}
          />
          <a
            className="text-[#00B964] text-[13px] underline mt-4 text-center cursor-pointer"
            href="mailto:support@oncrowdr.com">
            Report Organiser
          </a>
        </div>
      )}
    </div>
  );
};

export default ExploreCard;

type VolunteerDetails = {
  skillsNeeded: string[];
  otherSkillsNeeded?: string;
  ageRange: string;
  genderPreference: string;
  commitementStartDate: string;
  commitementEndDate: string;
  requiredCommitment: string;
  additonalNotes: string;
};
type ExploreCardProps = {
  id: string;
  name: string;
  tier: string;
  header?: string;
  subheader?: string;
  totalAmount?: number;
  currentAmount: number;
  donateImage: any;
  slideImages?: string[];
  routeTo?: string;
  avatar: any;
  timePosted?: string;
  campaignType?: string;
  category?: string;
  volunteer?: VolunteerDetails;
  currency?: string;
};
