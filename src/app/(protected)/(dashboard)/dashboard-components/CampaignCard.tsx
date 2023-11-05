import ProgressBar from "./ProgressBar";
import { GrayButton } from "./Button";
import { label } from "./Label";
import { pill } from "./Pill";

const CampaignCard = () => {
  return (
    <div className="bg-white border border-[rgba(57, 62, 70, 0.08)] rounded-xl py-[26px] px-[24px]">
      <div className="mb-2 md:mb-[10px]">{label("completed")}</div>

      <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-[19px]">
        <p className="text-lg text-black mb-2 md:mb-0">Help Nicholas go back to college</p>
        {pill("education")}
      </div>

      <div className="bg-[#F9F9F9] rounded-lg p-4 mb-[10px] md:mb-3">
        <p className="text-sm text-[#667085] mb-1">
          <span className="text-[#292A2E]">Goal</span> N286,000/N286,000
        </p>
        <ProgressBar percent={70} showValue />
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-end">
        <div className="text-[13px] text-[#5C636E] mb-2.5">
          <p className="mb-2.5">
            <span className="text-black font-medium">Views:</span>{" "}
            <span className="text-[#5C636E] font">3,200</span>
          </p>
          <p className="mb-2.5">
            <span className="text-black font-medium">Donors:</span>{" "}
            <span>182</span>
          </p>
          <p>
            <span className="text-black font-medium">Duration:</span>{" "}
            <span>1d 16h</span>
          </p>
        </div>
        <GrayButton
          text="Update campaign"
          textColor="#667085"
          outlineColor="transparent"
          styles={{outer: "self-end", inner: "px-8"}}
        />
      </div>
    </div>
  );
};

export default CampaignCard;
