
import Link from 'next/link'
import Image from 'next/image'
import Test from '../dashboard-components/Test'
import { getCampaigns } from '@/app/api/campaigns/getCampaigns'
import Avatar from '../../../../../public/temp/avatar.png'
import Donate from '../../../../../public/images/donate.png'
import ProgressBar from '../dashboard-components/ProgressBar'
import Filter from '../dashboard-components/Filter'
import { Button } from '../dashboard-components/Button'
import ExploreCard from '../dashboard-components/ExploreCard'
import DynamicExplore from '../dashboard-components/DynamicExplore'

const PROGRESS_COUNT = 8

type FundraisingGoalProps = {
  amount: number
  currency: string
}
export type CampaignProps = {
  _id: string
  userId: string
  category: string
  title: string
  story: string
  campaignType: string
  campaignStatus: string
  campaignCoverImageUrl: string
  campaignAdditionalImagesUrl: string[]
  campaignViews: number
  fundraise: {
    fundingGoalDetails: FundraisingGoalProps[]
    startOfFundraise: string
    endOfFundraise: string
  }
}
export default async function Explore () {
  const campaigns = await getCampaigns()
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-2xl text-black'>
            Welcome to Crowdr, Akintomiwa! 💚
          </h3>
          <p className='text-sm text-[#61656B]'>
            Explore campaigns and spread love by donating.{' '}
          </p>
        </div>
        <div>
          <Filter query='Trending' />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-2.5 min-w-full md:grid-cols-2'>
        {Array.isArray(campaigns) && campaigns?.map((campaign: CampaignProps, index: number) => (
          <ExploreCard
            name='Nicholas'
            tier='Individual'
            header={campaign.title}
            subheader={campaign.story}
            totalAmount={campaign.fundraise.fundingGoalDetails[0].amount}
            currentAmount={6000}
            timePosted={campaign.fundraise.startOfFundraise}
            slideImages={["https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg","https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg","https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg"]}
            donateImage={
              'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg'
            }
            routeTo={`/explore/donate-or-volunteer/${campaign._id}`}
            avatar={Avatar}
            key={index}
          />
        ))}
      </div>
      <DynamicExplore/>

    </div>
  )
}
