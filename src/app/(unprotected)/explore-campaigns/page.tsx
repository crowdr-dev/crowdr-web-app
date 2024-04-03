'use client'

import { Campaign, getCampaigns } from '@/app/api/campaigns/getCampaigns'
import ExploreCard from '../../(protected)/(dashboard)/dashboard-components/ExploreCard'
import { useState, useEffect } from 'react'
import Navigation from '@/app/common/components/Navigation'
import Footer from '@/app/common/components/Footer'
import OldModal from '@/app/common/components/OldModal'
import WaitlistForm from '@/app/home/home-components/WaitlistForm'
import Head from 'next/head'
import NavBar from './components/NavBar'

export default function DynamicExplore () {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [page, setPage] = useState(1)

  const [hasNextPage, setHasNextPage] = useState<any>()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const loadCampaigns = async () => {
    try {
      const newCampaigns = await getCampaigns(page)
      setHasNextPage(newCampaigns?.pagination.hasNextPage)

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

  const handleSeeMore = () => {
    setPage(prevPage => prevPage + 1)
    loadCampaigns()
  }
  return (
    <div className='font-satoshi'>
      <Head>
        <title>Explore campaigns</title>
        <meta
          name='description'
          content={'Explore campaigns and spread love by donating.'}
        />
        <meta property='og:title' content={'Explore campaigns'} />
        <meta
          property='og:description'
          content='Explore campaigns and spread love by donating.'
        />
      </Head>
      <NavBar />
      <div className='py-10 px-10 md:px-40 relative h-screen'>
        <div className='flex flex-col gap-[5px]'>
          <h2 className='text-[18px] md:text-[24px] font-normal text-[#000]'>Explore</h2>
          <p className='text-[14px] font-normal'>
            Explore campaigns and spread love by donating.{' '}
          </p>
        </div>
        <div className='grid grid-cols-1 gap-2.5 min-w-full md:grid-cols-2'>
          {Array.isArray(campaigns) &&
            campaigns?.map((campaign: Campaign, index: number) => {
              const urlsOnly = campaign.campaignAdditionalImages.map(
                item => item.url
              )

              const userDetails = campaign?.user
              const donatedAmount = campaign?.totalAmountDonated?.[0].amount
              return (
                <ExploreCard
                  name={userDetails?.organizationName}
                  tier={userDetails?.userType}
                  header={campaign?.title}
                  subheader={campaign?.story}
                  totalAmount={campaign.fundraise?.fundingGoalDetails[0].amount}
                  currentAmount={donatedAmount}
                  timePosted={campaign?.campaignStartDate}
                  volunteer={campaign?.volunteer}
                  slideImages={[
                    campaign?.campaignCoverImage?.url,
                    ...(urlsOnly || [])
                  ]}
                  donateImage={
                    'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg'
                  }
                  routeTo={`/explore-campaigns/donate-or-volunteer/${campaign._id}`}
                  avatar={
                    'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg'
                  }
                  key={index}
                  campaignType={campaign.campaignType}
                />
              )
            })}
          {hasNextPage && (
            <div className='flex justify-end items-center mt-4'>
              <span onClick={handleSeeMore} className={'cursor-pointer'}>
                See more
              </span>
            </div>
          )}
          {campaigns?.length < 1 && (
            <p className='absolute inset-0 flex justify-center items-center text-center font-semibold text-[30px]'>
              No campaigns available at this moment.
            </p>
          )}
        </div>
      </div>

      <Footer />
      <OldModal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </OldModal>
    </div>
  )
}
