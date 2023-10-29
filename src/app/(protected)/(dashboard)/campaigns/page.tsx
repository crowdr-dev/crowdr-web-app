import CampaignCard from "../dashboard-components/CampaignCard";
import { Button, GrayButton, WhiteButton } from "../dashboard-components/Button";

import FileDownloadIcon from "../../../../../public/svg/file-download.svg"
import FilterIcon from "../../../../../public/svg/filter.svg"
import StatCard from "../dashboard-components/StatCard";

const Campaigns = () => {
  return (
    <div>
      {/* page title x subtitle */}
      <hgroup className="mb-[5px]">
        <h1 className="text-2xl font-semibold text-[#101828] mb-[5px]">
          Campaigns
        </h1>
        <p className="text-[15px] text-[#667085]">
          Manage campaigns and earnings
        </p>
      </hgroup>

      {/* action buttons */}
      <div className="flex justify-between items-center mb-5 md:mb-10">
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

        <div className="hidden md:flex">
          <WhiteButton text="Export Report" iconUrl={FileDownloadIcon} shadow className="mr-3" />
          <Button text="Withdraw Donations" />
        </div>
      </div>

      {/* stats */}
      <div className="grid md:grid-cols-[repeat(3,_minmax(0,_350px))] gap-5 mb-[23px] md:mb-[44px]">
        {/* TODO: get background image */}
        <StatCard title="Total Raised" figure="N235,880.70" percentageChange={100} time="yesterday" pattern />
        <StatCard title="Total Campaigns" figure="2" percentageChange={100} time="yesterday" colorScheme="light" />
        <StatCard title="Campaign Views" figure="19,830" percentageChange={100} time="yesterday" colorScheme="light" />
      </div>

      <div className="flex md:hidden mb-[9px]">
          <WhiteButton text="Export Report" iconUrl={FileDownloadIcon} shadow className="mr-3" />
          <Button text="Withdraw Donations" />
      </div>

      {/* all campaigns x filters */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-[#292A2E]">All Campaigns</h2>
        <GrayButton text="Filters" iconUrl={FilterIcon} />
      </div>

      {/* campaigns */}
      <div className="grid grid-cols-[repeat(2,_minmax(0,_550px))] gap-x-[10px] gap-y-[40px]">
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
        <CampaignCard />
      </div>
    </div>
  );
};

export default Campaigns;
