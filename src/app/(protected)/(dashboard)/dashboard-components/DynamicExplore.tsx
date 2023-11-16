
'use client'

import { getCampaigns } from '@/app/api/campaigns/getCampaigns'
import Avatar from '../../../../../public/temp/avatar.png'
import ExploreCard from '../dashboard-components/ExploreCard'
import { useState, useEffect } from 'react'

type FundraisingGoalProps = {
    amount: number
    currency: string
}

type CampaignImage = {
    _id: string
    url: string
    public_id: string
    id: string
}


type CampaignProps = {
    _id: string
    userId: string
    category: string
    title: string
    story: string
    campaignType: string
    campaignStatus: string
    campaignCoverImage: CampaignImage
    campaignAdditionalImagesUrl: string[]
    campaignViews: number
    fundraise: {
        fundingGoalDetails: FundraisingGoalProps[]
        startOfFundraise: string
        endOfFundraise: string
    }
}


export default function DynamicExplore() {
    const [campaigns, setCampaigns] = useState<CampaignProps[]>([]);
    const [page, setPage] = useState(2);

    const loadCampaigns = async () => {
        const newCampaigns = await getCampaigns(page, 10);

        if (Array.isArray(newCampaigns)) {
            setCampaigns(prevCampaigns => [...prevCampaigns, ...newCampaigns]);
        } else {

            console.error("Received data is not an array of campaigns");
        }
    };


    useEffect(() => {
        loadCampaigns();
    }, []);


    const handleSeeMore = () => {
        setPage(prevPage => prevPage + 1);
        loadCampaigns();
    };
    return (
        <>
            <div className='grid grid-cols-1 gap-2.5 min-w-full md:grid-cols-2 '>
                {Array.isArray(campaigns) && campaigns?.map((campaign: CampaignProps, index: number) => (
                    <ExploreCard
                        name='Nicholas'
                        tier='Individual'
                        header={campaign.title}
                        subheader={campaign.story}
                        totalAmount={campaign.fundraise.fundingGoalDetails[0].amount}
                        currentAmount={6000}
                        timePosted={campaign.fundraise.startOfFundraise}
                        slideImages={[campaign.campaignCoverImage?.url, ...(campaign.campaignAdditionalImagesUrl || [])]}
                        donateImage={
                            'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg'
                        }
                        routeTo={`/explore/donate-or-volunteer/${campaign._id}`}
                        avatar={Avatar}
            campaignType={campaign?.campaignType}
                        key={index}
                    />
                ))}
            </div>
            <div className='flex justify-end items-center mt-4'>
                <span onClick={handleSeeMore} className="cursor-pointer">See more</span>
            </div>
        </>
    )
}
