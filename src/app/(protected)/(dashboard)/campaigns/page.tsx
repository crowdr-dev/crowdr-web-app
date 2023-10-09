import Image from "next/image";
import { Button, GrayButton, WhiteButton } from "../dashboard-components/Button";
import Pill from "../dashboard-components/Pill";

import FileDownloadIcon from "../../../../../public/svg/file-download.svg"
import ArrowUpIcon from "../../../../../public/svg/arrow-up.svg"
import AltArrowUpIcon from "../../../../../public/temp/arrow-up.svg"
import FilterIcon from "../../../../../public/svg/filter.svg"
import { label } from "../dashboard-components/Label";

const Campaigns = () => {
  return (
    <div>
      <hgroup className="mb-[5px]">
        <h1 className="text-2xl font-semibold text-[#101828] mb-[5px]">
          Campaigns
        </h1>
        <p className="text-[15px] text-[#667085]">
          Manage campaigns and earnings
        </p>
      </hgroup>

      {/* action buttons */}
      <div className="flex justify-between items-center mb-10">
        <div className="inline-flex rounded-md" role="group">
          <button
            type="button"
            className="px-4 py-[10px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            Custom
          </button>
          <button
            type="button"
            className="px-4 py-[10px] text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            7 days
          </button>
          <button
            type="button"
            className="px-4 py-[10px] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            24 hours
          </button>
        </div>

        <div className="flex">
          <WhiteButton text="Export Report" iconUrl={FileDownloadIcon} shadow className="mr-3" />
          <Button text="Withdraw Donations" />
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-[repeat(3,_minmax(0,_350px))] gap-5 mb-[44px]">
        {/* TODO: get background image */}
        <div className="bg-primary bg- rounded-[5px] py-[22.5px] px-[21px]">
          <p className="text-sm text-white mb-2">Total Raised</p>
          <p className="text-2xl text-white mb-2">N235,880.70</p>
          <div className="flex items-center">
            <p className="flex items-center mr-[10px]"><Image src={AltArrowUpIcon} alt="arrow up icon" className="inline-block mr-1" /> <span className="text-white">100%</span></p>
            <p className="text-white">vs yesterday</p>
          </div>
        </div>

        <div className="bg-[#F8F8F8] rounded-[5px] py-[22.5px] px-[21px]">
          <p className="text-sm text-[#292A2E] mb-2">Total Campaigns</p>
          <p className="text-2xl text-[#0C0C0C] mb-2">2</p>
          <div className="flex items-center">
            <p className="flex items-center mr-[10px]"><Image src={ArrowUpIcon} alt="arrow up icon" className="inline-block mr-1" /> <span className="text-primary">100%</span></p>
            <p className="text-[#5C636E]">vs yesterday</p>
          </div>
        </div>

        <div className="bg-[#F8F8F8] rounded-[5px] py-[22.5px] px-[21px]">
          <p className="text-sm text-[#292A2E] mb-2">Campaign Views</p>
          <p className="text-2xl text-[#0C0C0C] mb-2">19,830</p>
          <div className="flex items-center">
            <p className="flex items-center mr-[10px]"><Image src={ArrowUpIcon} alt="arrow up icon" className="inline-block mr-1" /> <span className="text-primary">100%</span></p>
            <p className="text-[#5C636E]">vs yesterday</p>
          </div>
        </div>
      </div>

      {/* all campaigns x filters */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-[#292A2E]">All Campaigns</h2>
        <GrayButton text="Filters" iconUrl={FilterIcon} />
      </div>

      {/* campaigns */}
      <div className="grid grid-cols-[repeat(2,_minmax(0,_550px))] gap-x-[10px] gap-y-[40px]">
        <div className="bg-white border border-[rgba(57, 62, 70, 0.08)] rounded-xl py-[26px] px-[24px]">
          <div className="mb-[10px]">{label('completed')}</div>

          <div className="flex justify-between items-center mb-[19px]">
            <p className="text-lg text-black">Help Nicholas go back to college</p>
            <Pill label="Education" />
          </div>

          <div className="bg-[#F9F9F9] rounded-lg p-4 mb-[12px]">
            <p className="text-sm text-[#667085] mb-1"><span className="text-[#292A2E]">Goal</span> N286,000/N286,000</p>
            {/* progress */}
            <div className="flex items-center">
              <div className="grow h-2 mr-3">
                <div className="bg-primary h-full w-full rounded-full"></div>
              </div>
              <p className="text-[#344054]">100%</p>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-[13px] text-[#5C636E]">
              <p className="mb-2.5"><span className="text-black font-medium">Views:</span> <span className="text-[#5C636E] font">3,200</span></p>
              <p className="mb-2.5"><span className="text-black font-medium">Donors:</span> <span>182</span></p>
              <p className="mb-2.5"><span className="text-black font-medium">Duration:</span> <span>1d 16h</span></p>
            </div>
            <GrayButton text="Update campaign" textColor="#667085" outlineColor="transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
