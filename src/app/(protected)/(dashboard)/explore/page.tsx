import {
  Campaign,
  DonatedAmount,
  getCampaigns
} from '@/app/api/campaigns/getCampaigns'
import Avatar from '../../../../../public/temp/avatar.png'
import Filter from '../dashboard-components/Filter'
import ExploreCard from '../dashboard-components/ExploreCard'
import DynamicExplore from '../dashboard-components/DynamicExplore'

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

export type CampaignProps = {
  _id: string
  userId: string
  category: string
  title: string
  story: string
  campaignType: string
  campaignStatus: string
  campaignCoverImage: CampaignImage
  campaignAdditionalImages: CampaignImage[]
  campaignViews: number
  fundraise: {
    fundingGoalDetails: FundraisingGoalProps[]
    startOfFundraise: string
    endOfFundraise: string
  }
  totalAmountDonated: DonatedAmount[]
  user: {
    _id: string
    interests: string[]
    organizationId: string
    organizationName: string
    userType: string
  }
}
export default async function Explore () {
  const campaigns = await getCampaigns(1)

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
        {Array.isArray(campaigns?.campaigns) &&
          campaigns?.campaigns?.map((campaign: Campaign, index: number) => {
            const userDetails = campaign?.user
            const donatedAmount = campaign?.totalAmountDonated?.[0].amount
            const urlsOnly = campaign.campaignAdditionalImages.map(
              item => item.url
            )
            return (
              <ExploreCard
                name={userDetails?.organizationName}
                tier={userDetails?.userType}
                header={campaign?.title}
                subheader={campaign?.story}
                totalAmount={campaign.fundraise?.fundingGoalDetails[0].amount}
                currentAmount={donatedAmount}
                timePosted={campaign.fundraise?.startOfFundraise}
                slideImages={[
                  campaign?.campaignCoverImage?.url,
                  ...(urlsOnly || [])
                ]}
                donateImage={
                  'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg'
                }
                routeTo={`/explore/donate-or-volunteer/${campaign._id}`}
                avatar={Avatar}
                key={index}
                campaignType={campaign.campaignType}
              />
            )
          })}
      </div>
      <DynamicExplore hasNextPage={campaigns?.pagination?.hasNextPage} isProtected={true}/>
    </div>
  )
}
