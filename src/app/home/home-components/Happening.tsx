import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { RFC } from '@/app/common/types'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import '../home-styles/happening.css'
import ProgressBar from '@/app/(protected)/(dashboard)/dashboard-components/ProgressBar'
import { formatAmount } from '@/app/(protected)/(dashboard)/common/utils/currency'
import useWindowSize from '@/app/common/hooks/useWindowSize'
import { useRouter } from 'next/navigation'
import { Campaign, getCampaigns } from '@/app/api/campaigns/getCampaigns'

type ExploreCardProps = {
  name: string
  tier: string
  header?: string
  donateImage?: any
  slideImages?: string[]
  timePosted?: string
  campaignType: string
  category?: string
  totalAmount: number
  currentAmount: number
  routeTo: string
}

const ExploreCard: RFC<ExploreCardProps> = props => {
  const {
    name,
    tier,
    header,
    slideImages,
    category,
    currentAmount,
    totalAmount,
    campaignType,
    routeTo
  } = props

  const [hover, setHover] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()


  const settings = (images: string[]) => {
    return {
      dots: true,
      infinite: false,
      speed: 500,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      arrows: hover ? true : false,
      swipeToSlide: true,
      nextArrow: (
        <Image
          src={'/svg/new-arrow.svg'}
          alt='arrow-right'
          className={`${currentSlide === 0 && 'slick-disabled'}`}
          onMouseEnter={() => setHover(true)}
        />
      ),
      prevArrow: (
        <Image
          src={'/svg/new-arrow.svg'}
          alt='arrow-right'
          className={`${
            currentSlide === images.length - 1 && 'slick-disabled'
          }`}
          onMouseEnter={() => setHover(true)}
        />
      ),
      afterChange: (current: number) => setCurrentSlide(current)
    }
  }

  const progress = currentAmount / totalAmount
  return (
    <div className='p-4 rounded-xl border-[#393e4614] border h-fit bg-white w-full cursor-pointer' onClick={()=>{router.push(routeTo)}}>
      <div className='relative'>
        <div className='absolute z-10 bg-[#F8F8F8] rounded-[25px] py-1 px-2 mt-[14px] ml-[14px] text-[#0B5351] capitalize opacity-80 text-sm'>
          {category}
        </div>
        {!!slideImages && (
          <div>
            {slideImages?.length > 1 ? (
              <Slider {...settings(slideImages)}>
                {slideImages?.map((image, index) => {
                  return (
                    <div key={index}>
                      <Image
                        src={image}
                        alt='donate'
                        className='h-60 object-center object-cover rounded-lg'
                        width={500}
                        height={400}
                        style={{
                          width: '100%',
                          maxWidth: '100%',
                          objectFit: 'cover'
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                      />
                    </div>
                  )
                })}
              </Slider>
            ) : (
              <Image
                src={!!slideImages && slideImages[0]}
                alt='donate'
                className='h-60 object-center object-cover rounded-lg'
                width={500}
                height={400}
                style={{
                  width: '100%',
                  objectFit: 'cover'
                }}
              />
            )}
          </div>
        )}
        <div className='my-4'>
          <h3 className='font-semibold text-[18px]'>{header}</h3>
        </div>
        {campaignType.includes('fundraise') && (
          <div className='bg-[#F9F9F9] p-4 rounded-[8px]'>
            <p className='text-sm text-[#667085] mb-[4px]'>
              {' '}
              <span className='text-[#000] text-sm'>Goal</span>{' '}
              {formatAmount(currentAmount, 'naira')}/
              {formatAmount(totalAmount, 'naira')}
            </p>
            <ProgressBar bgColor='#00B964' percent={progress * 100} showValue />
          </div>
        )}
      </div>
    </div>
  )
}

const Happening = () => {
  const width = useWindowSize(800)
  const router = useRouter()

  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [page, setPage] = useState(1)

  const loadCampaigns = async () => {
    try {
      const newCampaigns = await getCampaigns(page)
      const campaignsArray = newCampaigns?.campaigns as Campaign[]

      if (Array.isArray(campaignsArray) && campaignsArray.length > 0) {
        setCampaigns(prevCampaigns => [...prevCampaigns, ...campaignsArray])
      } else {
        console.error(
          "Received data is not an array of campaigns or it's empty"
        )
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    }
  }

  useEffect(() => {
    loadCampaigns()
  }, [])

  return (
    <section className='happening'>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-6'>
        <div>
          <h4 className='text-[20px] md:text-[24px] text-[#393E46] font-normal'>
            Happening near you{' '}
          </h4>
          <p className='text-[24px] md:text-[42px] text-[#181A1D] font-medium'>
            Campaigns in your local area
          </p>
        </div>
        {width && (
          <div className='flex flex-row items-center gap-4'>
            <button className='btn-primary'>Start a campaign</button>
            <button
              className='btn-outline'
              onClick={() => router.push('explore-campaigns')}
            >
              View all campaigns
            </button>
          </div>
        )}
      </div>
      <div className='flex flex-col md:flex-row  items-center md:items-start justify-between w-full gap-4'>
      {Array.isArray(campaigns) &&
          campaigns?.slice(0,3).map((campaign: Campaign, index: number) => {
            const urlsOnly = campaign.campaignAdditionalImages.map(
              item => item.url
            )

            console.log("volunteer",campaigns )

            const userDetails = campaign?.user
            const donatedAmount = campaign?.totalAmountDonated?.[0].amount
            return (
              <ExploreCard
                name={userDetails?.organizationName}
                tier={userDetails?.userType}
                header={campaign?.title}
                category={campaign?.category}
                totalAmount={campaign.fundraise?.fundingGoalDetails[0].amount}
                currentAmount={donatedAmount}
                timePosted={campaign?.campaignStartDate}
                slideImages={[
                  campaign?.campaignCoverImage?.url,
                  ...(urlsOnly || [])
                ]}
                routeTo={`/explore-campaigns/donate-or-volunteer/${campaign._id}`}
                key={index}
                campaignType={campaign.campaignType}
              />
            )
          })}
          {
            campaigns?.length < 1 && <p className='text-center w-full font-bold text-lg my-6'>No campaigns available at this moment</p>
          }
      </div>

      {!width && (
        <div className='flex flex-col items-center gap-4 mt-6'>
          <button className='btn-primary'>Start a campaign</button>
          <button
            className='btn-outline'
            onClick={() => router.push('explore-campaigns')}
          >
            View all campaigns
          </button>
        </div>
      )}
    </section>
  )
}

export default Happening
