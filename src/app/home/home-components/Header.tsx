import React from 'react'
import Image from "next/image";
import "../home-styles/header.css";
import {useRouter} from 'next/navigation'

type Props = {
  openModal: () => void
}

export default function Header({ openModal }: Props) {
  const router = useRouter()
  return (
    <section className="cta">
      <div className="content">
        <div className="tag">
          <Image
            src="/svg/planet.svg"
            width={20}
            height={20}
            alt="planet"
          /> For individuals, non-profits & businesses</div>
        <h2 className="content-header">
          Build community
          through <span>giving.</span>
        </h2>
        <p className="">
          Crowdr helps you fundraise and find volunteering opportunities
          that make a change in our world.
        </p>
        <div className="button-group">
          <button className="btn-primary" onClick={() => router.push('signup')}>Start a Campaign</button>
          <button className="btn-outline" onClick={() => router.push('signup')}>Join a Campaign</button>
        </div>
      </div>
      <Image
        src="/svg/crowdr-hero-section.svg"
        width={500}
        height={500}
        alt="hero-section"
        //  -mt-[7rem] md:-mt-[16rem] 
        className='w-full
         -mt-[3rem] md:-mt-[16rem] 
         z-0'
      />
    </section>
  )
}