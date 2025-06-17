import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatAmount } from '../common/utils/currency';

interface Donor {
  id: string;
  name: string;
  amount: number;
  currency: string;
  timeAgo: string;
  isAnonymous: boolean;
}

interface RecentDonorsProps {
  donors: Donor[];
  totalDonors: number;
  campaignId: string;
}

const RecentDonors: React.FC<RecentDonorsProps> = ({ 
  donors, 
  totalDonors,
  campaignId 
}) => {
  return (
    <div className="mt-8">
      <div className="flex flex-row items-start justify-between mb-4">
        <p className="text-[#292A2E] font-medium text-base">
          {totalDonors > 0 && totalDonors} Total Donor{totalDonors !== 1 ? 's' : ''}
        </p>
        
        <div className="relative">
          <select className="appearance-none bg-transparent border-none text-sm font-medium text-gray-600 cursor-pointer pr-6 focus:outline-none">
            <option>Top Donors</option>
            <option>Most Recent</option>
          </select>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8L2 4H10L6 8Z" fill="#667085"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex items-start flex-col gap-5 mb-8">
        {donors.map((donor) => (
          <div className="flex items-center flex-row justify-start w-full" key={donor.id}>
            <div className="p-2 bg-[#F8F8F8] rounded-full">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18.2998C14.4183 18.2998 18 14.7181 18 10.2998C18 5.88153 14.4183 2.2998 10 2.2998C5.58172 2.2998 2 5.88153 2 10.2998C2 14.7181 5.58172 18.2998 10 18.2998Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10.2998L9 12.2998L13 8.2998" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col gap-[1px] ml-4 flex-grow">
              <p className="text-[#344054] text-sm">
                {donor.isAnonymous ? "Anonymous" : donor.name}
              </p>
              <span className="text-[13px] text-[#667085]">
                Donated {formatAmount(donor.amount, donor.currency)} to this campaign
              </span>
            </div>
            <div className="text-xs text-gray-500">{donor.timeAgo}</div>
          </div>
        ))}
      </div>
      
      {totalDonors > donors.length && (
        <Link
          className="cursor-pointer p-4 bg-[#F8F8F8] text-[#344054] inline-block rounded-lg hover:bg-[#EAEAEA] transition-colors"
          href={`/explore/c/${campaignId}/all-donations`}
        >
          See all
        </Link>
      )}
    </div>
  );
};

export default RecentDonors;