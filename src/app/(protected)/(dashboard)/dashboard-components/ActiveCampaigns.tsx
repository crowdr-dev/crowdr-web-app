import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from '@/utils/seperateText';

interface CampaignProps {
  id: string;
  title: string;
  image: string;
  category: string;
  goal: {
    amount: number;
    currency: string;
  };
  raised: number;
  percentComplete: number;
  logoImg?: string;
  organizationName?: string;
}

const ActiveCampaign: React.FC<CampaignProps> = ({
  id,
  title,
  image,
  category,
  goal,
  raised,
  percentComplete,
  logoImg,
  organizationName
}) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
      <div className="relative h-48 w-full">
        <Image 
          src={image} 
          alt={title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-xs px-2 py-1 rounded-full text-gray-700">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        {organizationName && (
          <div className="flex items-center gap-2 mb-2">
            {logoImg && (
              <Image 
                src={logoImg} 
                alt={organizationName}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="text-xs text-gray-600">{organizationName}</span>
          </div>
        )}
        
        <Link href={`/campaigns/${id}`}>
          <h3 className="font-medium text-base mb-2 hover:text-green-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Goal {formatCurrency(goal.amount)}</span>
            <span>{percentComplete}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveCampaign;