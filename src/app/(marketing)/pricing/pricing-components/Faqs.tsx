import React from 'react'
import styles from '../pricing-styles/Team.module.css'
import "../../../home/home-styles/faq.css";
import Collapsible from "react-collapsible";


import Image from 'next/image'

export default function Faqs () {
  return (
    <section className={styles.team}>
      <div className='flex flex-col md:flex-row items-start justify-between gap-8'>
        <div className='flex flex-col items-start'>
          <span className="text-sm text-[#00B964] ">Support</span>
        <h2 className='text-center text-[32px] md:text-[36px] text-[#101828] font-medium leading-[44px] mt-3'>
          FAQS
        </h2>
        <p className='text-start text-sm md:text-[18px] text-[#475467] leading-[28px] mt-5'>
        Everything you need to know about the product and billing. Can’t find the answer you’re looking for? Please reach out to our support team.
        </p>
        </div>
        <div>
          {faqArr.map((faq: { heading: string, text: string}, index) => (
            <div className="faq-collapsible-container" key={index}>
              <Collapsible
                trigger={
                  <div className="flex justify-between">
                    <p className="faq-collapsible-header !text-[18px]">{faq.heading}</p>
                    <Image src="/svg/plus-circle.svg" width={24} height={24} alt='accordion'/>
                  </div>
                }
                triggerWhenOpen={
                  <div className="flex justify-between">
                    <p className="faq-collapsible-header !text-[18px]">{faq.heading}</p>
                    <Image src="/svg/minus-circle.svg" width={24} height={24} alt='accordion'/>
                  </div>
                }
              >
                <p className="pt-4 faq-collapsible-body !text-sm">{faq.text}</p>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


const faqArr = [
  {
    heading: "What’s a transaction fee?",
    text: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    heading: "What types of causes can be funded on Crowdr? ",
    text: "Crowdr is available to support all kinds of initiatives ranging from poverty eradication to mental health awareness. Crowdr can also be used to seek funding for personal and creative projects/initiatives.",
  },
  {
    heading: "Are there any fees associated with Crowdr? ",
    text: "In order to keep the app running and to provide safe and secure services, we deduct a transaction fee from each donation. ",
  },
  {
    heading: "Is there a vetting process for fundraisers and volunteers?",
    text: "Security is our top priority. Our vetting process involves government identification and/or biometrics. ",
  },
  {
    heading:
      "Can volunteers track participation for external uses? E.g. for school and visa applications?",
    text: "Yes, volunteer records will be available in each user’s profile. ",
  },
];
