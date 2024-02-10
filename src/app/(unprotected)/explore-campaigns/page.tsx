'use client'

import { Campaign, getCampaigns } from '@/app/api/campaigns/getCampaigns'
import ExploreCard from '../../(protected)/(dashboard)/dashboard-components/ExploreCard'
import { useState, useEffect } from 'react'
import Navigation from '@/app/common/components/Navigation';
import Footer from '@/app/common/components/Footer'
import Modal from '@/app/common/components/Modal';
import WaitlistForm from '@/app/home/home-components/WaitlistForm';

export default function DynamicExplore () {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [page, setPage] = useState(1)

  const [hasNextPage, setHasNextPage] = useState<any>()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


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
    <div>
     <Navigation openModal={openModal}/>
      <div className='grid grid-cols-1 gap-2.5 min-w-full md:grid-cols-2 p-10 bg-[#E7F0EE]'>
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
                avatar={'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg'}
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
      </div>
       <Footer />
       <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </Modal>
    </div>
  )
}
