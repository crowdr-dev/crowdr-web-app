'use client'

import { useState, useEffect, use } from 'react'
import { getUser } from '@/app/api/user/getUser'
import ProgressBar from '../../../../(protected)/(dashboard)/dashboard-components/ProgressBar'
import ExploreCard from '../../../../(protected)/(dashboard)/dashboard-components/ExploreCard'
import Filter from '../../../../(protected)/(dashboard)/dashboard-components/Filter'
import Input from '../../../../(protected)/(dashboard)/dashboard-components/Input'
import Checkbox from '../../../../(protected)/(dashboard)/dashboard-components/Checkbox'
import Select from '../../../../(protected)/(dashboard)/dashboard-components/Select'
import { Button } from '../../../../(protected)/(dashboard)/dashboard-components/Button'
import { getSingleCampaign } from '@/app/api/campaigns/getCampaigns'
import makeRequest from '@/utils/makeRequest'
import { extractErrorMessage } from '@/utils/extractErrorMessage'
import { useToast } from '@/app/common/hooks/useToast'
import Navigation from '@/app/common/components/Navigation'
import Footer from '@/app/common/components/Footer'
import Modal from '@/app/common/components/Modal'
import WaitlistForm from '@/app/home/home-components/WaitlistForm'

const PROGRESS_COUNT = 8

const activeTabStyle = 'text-[#00B964]  border-b-2 border-[#00B964]'
const inActiveTabStyle = 'text-[#667085]'
const genderOptions = [
  {
    name: 'Male',
    value: 'male'
  },
  {
    name: 'Female',
    value: 'female'
  }
]

const ageRange = [
  {
    name: '18 - 25',
    value: '18 - 25'
  },
  {
    name: '26 - 35',
    value: '26 - 35'
  },
  {
    name: '36 - 45',
    value: '36 - 45'
  },
  {
    name: '46 - 55',
    value: '46 - 55'
  },
  {
    name: '56 and above',
    value: '56 and above'
  }
]

export default function DonateOrVolunteer ({
  params
}: {
  params: { id: string }
}) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [campaign, setCampaign] = useState<any>()
  const [tab, setTab] = useState('')

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const fetchSingleCampaign = async () => {
    const singleCampaign = await getSingleCampaign(params.id)
    setCampaign(singleCampaign)
  }

  interface initTypes {
    amount?: string
    fullName?: ''
    email?: string
  }

  const initProps: initTypes = {
    amount: '',
    fullName: '',
    email: ''
  }

  const [donationInputs, setDonationInputs] = useState(initProps)

  const updateProps = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const inputName = event.target.name
    setDonationInputs((prevState: initTypes) => {
      return {
        ...prevState,
        [inputName]: newValue
      }
    })
  }

  const areAllInputsFilled = () => {
    return Object.values(donationInputs).every(value => value.trim() !== '');
  };

  const [checkboxValues, setCheckboxValues] = useState({
    isAnonymous: false,
    shouldShareDetails: false,
    isSubscribedToPromo: false
  })

  const updateCheckbox = (key: string, value: boolean) => {
    setCheckboxValues(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  useEffect(() => {
    fetchSingleCampaign()
    setTab(
      campaign?.campaignType === 'fundraiseAndVolunteer'
        ? 'donate'
        : campaign?.campaignType === 'fundraise'
        ? 'donate'
        : 'volunteer'
    )
  }, [params.id, campaign?.campaignType])

  const totalDonationAmount = campaign?.fundraise?.fundingGoalDetails.reduce(
    (accumulator: number, current: { amount: number }) => {
      return accumulator + current.amount
    },
    0
  )

  const userDetails = campaign?.user
  const donatedAmount = campaign?.totalAmountDonated?.[0].amount
  const currency = campaign?.fundraise?.fundingGoalDetails[0].currency

  const donate = async () => {
    setLoading(true)
    const user = await getUser()

    if (!user) {
      return null
    }
    const headers = {
      'x-auth-token': user.token
    }

    const endpoint = '/api/v1/payments/initiate'

    const payload = {
      campaignId: params.id,
      campaignDonorId: campaign.userId,
      amount: donationInputs.amount,
      email: donationInputs.email,
      fullName: donationInputs.fullName,
      currency: currency,
      isAnonymous: checkboxValues.isAnonymous,
      shouldShareDetails: checkboxValues.shouldShareDetails,
      isSubscribedToPromo: checkboxValues.isSubscribedToPromo
    }

    try {
      const { data } = await makeRequest(endpoint, {
        method: 'POST',
        headers,
        payload: JSON.stringify(payload)
      })

      window.open(data.authorization_url, '_blank', 'noopener,noreferrer')
      window.location.href = '/explore-campaigns'
      toast({ title: 'Success!', body: data.message, type: 'success' })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const message = extractErrorMessage(error)
      toast({ title: 'Oops!', body: message, type: 'error' })
    }
  }

  
  return (
    <div>
      <Navigation openModal={openModal} />
      <div className='p-8 bg-[#E7F0EE]'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h3 className='text-2xl text-black font-semibold'>
              {campaign?.campaignType === 'fundraise' ? 'Donate' : 'Volunteer'}
            </h3>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-12 min-w-full md:grid-cols-2'>
          <ExploreCard
            name={userDetails?.organizationName}
            tier={userDetails?.userType}
            header={campaign?.title}
            subheader={campaign?.story}
            totalAmount={campaign?.fundraise?.fundingGoalDetails[0].amount}
            currentAmount={donatedAmount}
            timePosted={campaign?.fundraise?.startOfFundraise}
            slideImages={[
              campaign?.campaignCoverImage?.url,
              ...(campaign?.campaignAdditionalImages || [])
            ]}
            donateImage={campaign?.campaignCoverImage?.url}
            routeTo={``}
            avatar={
              'https://res.cloudinary.com/crowdr/image/upload/v1697259678/hyom8zz9lpmeyuhe6fss.jpg'
            }
            campaignType={campaign?.campaignType}
          />
          <div>
            <div>
              {campaign?.campaignType === 'fundraiseAndVolunteer' ? (
                <>
                  <span
                    className={`text-sm p-3 cursor-pointer ${
                      tab === 'donate' ? activeTabStyle : inActiveTabStyle
                    }`}
                    onClick={() => {
                      setTab('donate')
                    }}
                  >
                    Donate
                  </span>
                  <span
                    className={`text-sm p-3 ml-4 cursor-pointer ${
                      tab === 'volunteer' ? activeTabStyle : inActiveTabStyle
                    }`}
                    onClick={() => {
                      setTab('volunteer')
                    }}
                  >
                    Volunteer
                  </span>
                </>
              ) : campaign?.campaignType === 'fundraise' ? (
                <span
                  className={`text-sm p-3 cursor-pointer ${
                    tab === 'donate' ? activeTabStyle : inActiveTabStyle
                  }`}
                  onClick={() => {
                    setTab('donate')
                  }}
                >
                  Donate
                </span>
              ) : (
                <span
                  className={`text-sm p-3 ml-4 cursor-pointer ${
                    tab === 'volunteer' ? activeTabStyle : inActiveTabStyle
                  }`}
                  onClick={() => {
                    setTab('volunteer')
                  }}
                >
                  Volunteer
                </span>
              )}
            </div>
            <hr className='mt-[9px]' />

            {tab === 'volunteer' ? (
              <div className='mt-6'>
                <div className='bg-[#F9F9F9] p-4'>
                  <p className='text-sm text-[#667085]'>
                    {' '}
                    <span className='text-[#000]'>Goal</span> 35/70 Volunteers
                  </p>
                  <ProgressBar
                    bgColor='#00B964'
                    percent={(PROGRESS_COUNT / 10) * 100}
                  />
                  <p className='mt-3 text-sm opacity-50'>240 applications</p>
                </div>

                <h3 className='mt-2 text-base'>Apply</h3>
                <div className='mt-4'>
                  <Input
                    label={'Full name'}
                    placeholder='Ajayi Akintomiwa G.'
                    name='fullName'
                    id='fullName'
                  />
                  <Input
                    label={'Email address'}
                    placeholder='tomiwa@crowdr.com'
                    name='emailAddress'
                    id='emailAddress'
                  />
                  <Select
                    label={'Gender'}
                    name='gender'
                    id='gender'
                    options={genderOptions}
                  />

                  <Select
                    label={'Age Range'}
                    name='ageRange'
                    id='ageRange'
                    options={ageRange}
                  />

                  <Input
                    label={'Address'}
                    placeholder='Lagos, NG'
                    name='address'
                    id='address'
                  />
                  <div className='flex flex-col items-start w-full'>
                    <label
                      htmlFor='bio'
                      className='text-[14px] text-[#344054] mb-[6px]'
                    >
                      Tell us a bit about yourself and why you’re interested in
                      this project!
                    </label>
                    <textarea
                      id='bio'
                      className='w-full text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]'
                    />
                  </div>
                </div>

                <Button text='Apply' className='w-full mt-4 !justify-center' />
              </div>
            ) : (
              <div className='mt-6'>
                <div className='bg-[#F9F9F9] p-4'>
                  <p className='text-sm text-[#667085]'>
                    {' '}
                    <span className='text-[#000]'>Goal</span>{' '}
                    {currency?.toLowerCase() === 'naira' && 'N'}
                    {donatedAmount}/{currency?.toLowerCase() === 'naira' && 'N'}
                    {totalDonationAmount}
                  </p>
                  <ProgressBar
                    bgColor='#00B964'
                    percent={(donatedAmount / totalDonationAmount) * 100}
                  />
                  <p className='mt-3 text-sm opacity-50'>
                    {campaign?.campaignDonors?.length} Donation(s)
                  </p>
                </div>

                <div className='mt-4'>
                  <Input
                    label={'Donation Amount'}
                    placeholder='N10.00'
                    name='amount'
                    id='amount'
                    type='number'
                    onChange={updateProps}
                    value={donationInputs.amount}
                  />
                  <Input
                    label={'Full name'}
                    placeholder='Ajayi Akintomiwa G.'
                    name='fullName'
                    id='fullName'
                    onChange={updateProps}
                    value={donationInputs.fullName}
                  />
                  <Input
                    label={'Email address'}
                    placeholder='tomiwa@crowdr.com'
                    name='email'
                    id='email'
                    onChange={updateProps}
                    value={donationInputs.email}
                  />
                  <div className='flex flex-col mt-[30px]'>
                    <Checkbox
                      id={'1'}
                      label={
                        "Don't display my name publicly on the fundraiser."
                      }
                      checked={checkboxValues.isAnonymous}
                      onChange={newValue =>
                        updateCheckbox('isAnonymous', newValue)
                      }
                    />
                    <Checkbox
                      id={'2'}
                      label={
                        "I'm delighted to share my name and email with this charity to receive updates on other ways I can help."
                      }
                      checked={checkboxValues.shouldShareDetails}
                      onChange={newValue =>
                        updateCheckbox('shouldShareDetails', newValue)
                      }
                    />
                    <Checkbox
                      id={'3'}
                      label={
                        'Get occasional marketing updates from Crowdr. You may unsubscribe at any time.'
                      }
                      checked={checkboxValues.isSubscribedToPromo}
                      onChange={newValue =>
                        updateCheckbox('isSubscribedToPromo', newValue)
                      }
                    />
                  </div>
                </div>

                <Button
                  text='Donate'
                  className='w-full mt-4 !justify-center'
                  onClick={donate}
                  loading={loading}
                  disabled={areAllInputsFilled()}
                />

                <div className='mt-10'>
                  <div className='flex flex-row items-start justify-between'>
                    <p className='text-[#292A2E] text-base'>
                      {campaign?.donorsCount} Total Donors
                    </p>

                    <Filter query='Top Donors' />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </Modal>
    </div>
  )
}
