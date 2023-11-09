'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { RFC } from '@/types/Component'
import { Button } from './Button'
import ProgressBar from './ProgressBar'
import moment from 'moment'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import Menu from '../../../../../public/svg/menu.svg'

type ExploreCardProps = {
  name: string
  tier: string
  header?: string
  subheader?: string
  totalAmount: number
  currentAmount: number
  donateImage: any
  slideImages: string[]
  routeTo?: string
  avatar: any
  timePosted?: string
}

const ExploreCard: RFC<ExploreCardProps> = props => {
  const {
    name,
    tier,
    avatar,
    header,
    subheader,
    totalAmount,
    slideImages,
    currentAmount,
    donateImage,
    routeTo,
    timePosted
  } = props

  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleReadMore = () => {
    setIsCollapsed(!isCollapsed)
  }

  const wordsArray = subheader?.split(' ')

  const displayText = isCollapsed
    ? wordsArray?.slice(0, 30).join(' ')
    : subheader
  const progress = currentAmount / totalAmount

  return (
    <div className='p-6 rounded-xl border-[#393e4614] border mt-8'>
      <div className='flex items-center justify-between '>
        <div className='flex items-center'>
          <Image
            src={avatar}
            alt='user-avatar'
            width={40}
            height={40}
            className='rounded-full'
          />
          <div className='pl-3'>
            <h3 className='text-sm font-normal text-[#344054]'>{name}</h3>
            <h4 className='text-xs font-normal text-[#667085]'>{tier}</h4>
          </div>
        </div>
        <Image src={Menu} alt='menu' />
      </div>

      <div className='mt-4 mb-6'>
        {slideImages?.length > 1 ? (
          <Carousel
            autoPlay
            useKeyboardArrows
            showIndicators={false}
            stopOnHover
            swipeable
            showStatus={false}
            infiniteLoop
          >
            {slideImages?.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt='donate'
                  className='h-56 object-center object-cover rounded-lg'
                  width={500}
                  height={400}
                  style={{
                    width: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Image
            src={slideImages[0]}
            alt='donate'
            className='h-56 object-center object-cover rounded-lg'
            width={500}
            height={400}
            style={{
              width: '100%',
              objectFit: 'cover'
            }}
          />
        )}
        <div className='my-5'>
          <h3 className='font-semibold text-lg'>{header}</h3>
          <p className='text-sm mt-2 '>
            {displayText}
            {isCollapsed && wordsArray && wordsArray.length > 30 && '... '}
            {wordsArray && wordsArray.length > 30 && (
              <span onClick={toggleReadMore} className='text-[#667085]'>
                {isCollapsed ? 'See More' : 'See Less'}
              </span>
            )}
          </p>
          <h4 className='mt-5 text-[#667085] text-sm'>
            {moment(timePosted, 'YYYYMMDD').fromNow()}
          </h4>
        </div>
        <div className='bg-[#F9F9F9] p-4'>
          <p className='text-sm text-[#667085] mb-[10px]'>
            {' '}
            <span className='text-[#000]'>Goal</span> N{currentAmount}/N
            {totalAmount}
          </p>
          <ProgressBar bgColor='#00B964' percent={progress * 100} />
        </div>
      </div>

      <Button text='Donate' href={routeTo} />
    </div>
  )
}

export default ExploreCard
