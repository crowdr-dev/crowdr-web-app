import React from 'react'
import styles from '../pricing-styles/Details.module.css'
import Image from 'next/image'

export default function Details () {
  return (
    <section className={styles.details}>
      <div className='py-10 flex flex-col items-center justify-center gap-8 md:w-5/6 mx-auto my-0'>
        <p className='text-[24px] leading-[44px] text-[#EBECED] md:text-[32px] text-center'>
          If you raise{' '}
          <span className='rounded-[8px] bg-[#393E46] border-[1px] border-[#D0D5DD] py-[10px] px-[14px] text-[#EBECED]'>1,000,000</span> from
          donors. You receive <span className="font-bold text-[#EBECED]">₦980,000</span>. 
        </p>
        <p className="text-[24px] leading-[44px] text-[#EBECED] md:text-[32px] text-center mt-2">Transaction fee: ₦20,000</p>
      </div>
    </section>
  )
}
