'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mail, 
  Instagram, 
  Twitter, 
  Copy, 
  ExternalLink 
} from 'lucide-react';
import { Button } from '@/app/common/components/Button';
import CampaignProgress from '../../../dashboard-components/CampaignProgress';
import OngoingCampaign from '../../../dashboard-components/OngoingCampaign';
import RecentDonors from '../../../dashboard-components/RecentDonors';
import ActiveCampaign from '../../../dashboard-components/ActiveCampaigns';

// Types 
interface OrganizationProfile {
  id: string;
  name: string;
  type: string;
  logo: string;
  coverImage: string;
  bio: string;
  isVerified: boolean;
  profileLink: string;
  stats: {
    totalRaised: number;
    totalRaisedFormatted: string;
    livesImpacted: number;
    activeCampaigns: number;
    totalCampaigns: number;
    currency: string;
  };
  socials: {
    email?: string;
    instagram?: string;
    twitter?: string;
  };
}

interface Campaign {
    id: string;
    title: string;
    image: string;
    category: string;
    description: string;
    goal: {
      amount: number;
      raised: number;
      currency: string;
    };
    donationCount: number;
    percentComplete: number;
    status: 'active' | 'completed' | 'ongoing';
  }

  
interface Donor {
  id: string;
  name: string;
  amount: number;
  currency: string;
  timeAgo: string;
  isAnonymous: boolean;
}

const campaignsData: Campaign[] = [
  {
    id: 'mirabel-centre',
    title: 'Support Mirabel Centre',
    image: '/images/mirabel-centre.jpg',
    category: 'Education',
    description: 'Every survivor of sexual and gender-based violence (SGBV) deserves a chance to heal, rebuild and thrive. That\'s why Mirabel Centre has been a beacon of hope in Lagos since 2013. As the leading Sexual Assault Referral Centre (SARC), they provide free, compassionate support to survivors through medical care, counseling, medications, skills training, and so much more.',
    goal: {
      amount: 5200,
      raised: 3640,
      currency: '£'
    },
    donationCount: 32,
    percentComplete: 70,
    status: 'ongoing'
  },
  {
    id: 'nicholas-college',
    title: 'Help Nicholas go back to college',
    image: '/images/nicholas.jpg',
    category: 'Education',
    description: 'Nicholas is a brilliant student who needs support to continue his education.',
    goal: {
      amount: 10000,
      raised: 10000,
      currency: 'NGN',
    },
    donationCount: 145,
    percentComplete: 100,
    status: 'completed'
  },
  {
    id: 'nicholas-college-2',
    title: 'Help Nicholas go back to college',
    image: '/images/nicholas.jpg',
    category: 'Education',
    description: 'Nicholas is continuing his masters degree and needs additional support.',
    goal: {
      amount: 15000,
      raised: 15000,
      currency: 'NGN'
    },
    donationCount: 210,
    percentComplete: 100,
    status: 'completed'
  }
];

  
const donorsData: Donor[] = [
  {
    id: 'donor-1',
    name: 'Nimat Craig',
    amount: 5400,
    currency: 'N',
    timeAgo: '5 hours ago',
    isAnonymous: false
  },
  {
    id: 'donor-2',
    name: 'Akintomiwa Ajayi',
    amount: 5400,
    currency: 'N',
    timeAgo: '6 hours ago',
    isAnonymous: false
  },
  {
    id: 'donor-3',
    name: 'Ade Ayegbo',
    amount: 5400,
    currency: 'N',
    timeAgo: '6 hours ago',
    isAnonymous: false
  },
  {
    id: 'donor-4',
    name: 'Nathaniel Hide',
    amount: 5400,
    currency: 'N',
    timeAgo: '6 hours ago',
    isAnonymous: true
  }
];
  

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

// Tab Component
const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm ${
        isActive 
          ? "bg-white text-black border border-gray-200" 
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
};

// Sample Data
const organizationData: OrganizationProfile = {
  id: 'beauty-hut',
  name: 'Beauty Hut',
  type: 'Organization',
  logo: '/images/beauty-hut-logo.svg',
  coverImage: '/images/beauty-hut-cover.jpg',
  bio: 'At Beauty Hut, we\'re a female-founded brand with a deep commitment to supporting women. We believe in ensuring survivors have access to the care they need to reclaim their strength and dignity. This is where you come in...',
  isVerified: true,
  profileLink: 'beautyhut.org',
  stats: {
    totalRaised: 200000,
    totalRaisedFormatted: '$200,000',
    livesImpacted: 2000,
    activeCampaigns: 1,
    totalCampaigns: 10,
    currency: '$'
  },
  socials: {
    email: 'info@beautyhut.org',
    instagram: 'beautyhut',
    twitter: 'beautyhut'
  }
};

const OrganizationProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Campaigns");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const ongoingCampaign = campaignsData.find(c => c.status === 'ongoing');
    if (ongoingCampaign) {
      setSelectedCampaign(ongoingCampaign);
    }
  }, []);

  const handleDonate = () => {
    console.log('Donation process initiated');
    // Implement donation logic here
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${organizationData.profileLink}`);
    // Show toast or notification
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Two-column layout for the entire page */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2">
          {/* Main card with cover photo and organization info */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm mb-8">
            {/* Cover photo with logo */}
            <div className="relative h-64 w-full bg-pink-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  src="/images/beauty-hut-logo.svg" 
                  alt="Beauty Hut" 
                  width={280} 
                  height={180}
                />
              </div>
            </div>

            {/* Profile section */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-start mb-4 md:mb-0">
                  <div className="h-16 w-16 rounded-full bg-pink-100 p-2 mr-4 flex-shrink-0">
                    <Image 
                      src="/images/beauty-hut-logo.svg" 
                      alt="Beauty Hut" 
                      width={64} 
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h1 className="text-xl font-bold mr-2">{organizationData.name}</h1>
                      <span className="text-sm bg-gray-100 text-gray-800 px-1 py-0.5 rounded">🇺🇸</span>
                    </div>
                    <p className="text-gray-600 mb-2">{organizationData.type}</p>
                    <button 
                      onClick={handleCopyLink}
                      className="text-green-600 flex items-center text-sm hover:underline"
                    >
                      <span>Copy Profile Link</span>
                      <ExternalLink size={14} className="ml-1" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {organizationData.socials.email && (
                    <a 
                      href={`mailto:${organizationData.socials.email}`}
                      className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200"
                    >
                      <Mail size={20} />
                    </a>
                  )}
                  {organizationData.socials.instagram && (
                    <a 
                      href={`https://instagram.com/${organizationData.socials.instagram}`}
                      className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {organizationData.socials.twitter && (
                    <a 
                      href={`https://twitter.com/${organizationData.socials.twitter}`}
                      className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Bio section */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Bio</h2>
                <p className="text-gray-700">{organizationData.bio}</p>
              </div>
            </div>
          </div>

          {/* Campaign stats */}
          <CampaignProgress stats={organizationData.stats} />

          {/* Tabs */}
          <div className="mt-8 mb-6 flex space-x-2">
            <Tab 
              label="Campaigns" 
              isActive={activeTab === "Campaigns"} 
              onClick={() => setActiveTab("Campaigns")} 
            />
            <Tab 
              label="Media" 
              isActive={activeTab === "Media"} 
              onClick={() => setActiveTab("Media")} 
            />
            <Tab 
              label="Members" 
              isActive={activeTab === "Members"} 
              onClick={() => setActiveTab("Members")} 
            />
          </div>

          {/* Tab Content */}
          {activeTab === 'Campaigns' && (
            <>
              {/* Active campaigns */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold mb-2">Active Campaigns</h2>
                <p className="text-gray-600 mb-4">View all present and active campaigns of Beauty Hut and feel free to donate.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campaignsData
                    .filter(campaign => campaign.status === 'ongoing')
                    .map(campaign => (
                      <ActiveCampaign
                        key={campaign.id}
                        id={campaign.id}
                        title={campaign.title}
                        image={campaign.image}
                        category={campaign.category}
                        goal={{
                          amount: campaign.goal.amount,
                          currency: campaign.goal.currency
                        }}
                        raised={campaign.goal.raised}
                        percentComplete={campaign.percentComplete}
                        logoImg="/images/beauty-hut-logo.svg"
                        organizationName={organizationData.name}
                      />
                    ))}
                </div>
              </div>

              {/* Previous campaigns */}
              <div className="mb-10">
                <h2 className="text-lg font-semibold mb-2">Previous Campaigns</h2>
                <p className="text-gray-600 mb-4">These campaigns were successfully completed thanks to people like you.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campaignsData
                    .filter(campaign => campaign.status === 'completed')
                    .map(campaign => (
                      <ActiveCampaign
                        key={campaign.id}
                        id={campaign.id}
                        title={campaign.title}
                        image={campaign.image}
                        category={campaign.category}
                        goal={{
                          amount: campaign.goal.amount,
                          currency: campaign.goal.currency
                        }}
                        raised={campaign.goal.raised}
                        percentComplete={campaign.percentComplete}
                        logoImg="/images/beauty-hut-logo.svg"
                        organizationName={organizationData.name}
                      />
                    ))}
                </div>
              </div>

             
            </>
          )}

          {activeTab === 'Media' && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Outreaches/Campaign Media</h2>
              <p className="text-gray-600 mb-4">Here are images to show that we are using every penny effectively</p>
              
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-gray-200 rounded aspect-square h-auto">
                    {/* Placeholder for media images */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Members' && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-medium mb-2">Team Members</h3>
              <p className="text-gray-600">No team members information available at this time.</p>
            </div>
          )}
        </div>

        {/* Right column (1/3) - Ongoing Campaign */}
        <div className="lg:col-span-1 h-full">
          {selectedCampaign && (
            <OngoingCampaign
              campaign={{
                id: selectedCampaign.id,
                title: selectedCampaign.title,
                organizationName: organizationData.name,
                description: selectedCampaign.description,
                logo: '/images/mirabel-centre-logo.png',
                goal: {
                  amount: selectedCampaign.goal.amount,
                  raised: selectedCampaign.goal.raised,
                  currency: selectedCampaign.goal.currency
                },
                donationCount: selectedCampaign.donationCount
              }}
              onDonate={handleDonate}
            />
          )}
           {/* Donors list */}
           {selectedCampaign && (
                <RecentDonors
                  donors={donorsData}
                  totalDonors={32}
                  campaignId={selectedCampaign.id}
                />
              )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfilePage;