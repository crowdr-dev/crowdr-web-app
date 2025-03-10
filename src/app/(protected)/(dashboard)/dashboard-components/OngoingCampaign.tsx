import React from 'react';
import Image from 'next/image';
import { Button } from '@/app/common/components/Button';
import ProgressBar from './ProgressBar';

interface OngoingCampaignProps {
  campaign: {
    id: string;
    title: string;
    organizationName: string;
    description: string;
    logo: string;
    goal: {
      amount: number;
      raised: number;
      currency: string;
    };
    donationCount: number;
  };
  onDonate: () => void;
}

const OngoingCampaign: React.FC<OngoingCampaignProps> = ({ campaign, onDonate }) => {
  const percentComplete = Math.round((campaign.goal.raised / campaign.goal.amount) * 100);
  
  const formatAmount = (amount: number, currency: string): string => {
    return `${currency}${amount.toLocaleString()}`;
  };
  
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="text-green-600 font-medium text-sm mb-3">Ongoing Campaign</div>
      </div>
      
      <div className="flex gap-3 mb-4">
        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
          <Image 
            src={campaign.logo} 
            alt={campaign.organizationName}
            width={40}
            height={40}
          />
        </div>
        
        <div>
          <h3 className="font-medium text-base">{campaign.title}</h3>
          <p className="text-sm text-gray-600">by {campaign.organizationName}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-700 mb-4">
          {campaign.description}
          <button className="text-green-600 ml-1 font-medium">view more</button>
        </p>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm">
            Goal {formatAmount(campaign.goal.raised, campaign.goal.currency)}/{formatAmount(campaign.goal.amount, campaign.goal.currency)}
          </span>
          <span className="text-sm font-medium">{percentComplete}%</span>
        </div>
        
        <ProgressBar
          bgColor="#00B964"
          percent={percentComplete}
        />
        
        <p className="text-xs text-gray-500 mt-2">{campaign.donationCount} donations</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Donation amount</label>
          <input 
            type="text" 
            placeholder="Enter amount" 
            className="border border-gray-200 rounded-lg p-2 text-sm"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm mb-1">Full name</label>
          <input 
            type="text" 
            placeholder="Enter your full name" 
            className="border border-gray-200 rounded-lg p-2 text-sm"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm mb-1">Email address</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="border border-gray-200 rounded-lg p-2 text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input type="checkbox" id="anonymous" className="rounded" />
          <label htmlFor="anonymous" className="text-xs">
            Don't display my name publicly on the fundraiser.
          </label>
        </div>
        
        <Button
          text="Donate"
          onClick={onDonate}
          className="w-full !justify-center bg-green-600 hover:bg-green-700"
        />
      </div>
    </div>
  );
};

export default OngoingCampaign;