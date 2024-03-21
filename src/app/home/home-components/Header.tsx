import React from 'react'
import Image from "next/image";
import "../home-styles/header.css";

type Props = {
  openModal: () => void
}

export default function Header({ openModal }: Props) {
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
          <button className="btn-primary" onClick={openModal}>Start a Campaign</button>
          <button className="btn-outline">Join a Campaign</button>
        </div>
      </div>
      <Image
        src="/svg/hero-section.svg"
        width={500}
        height={500}
        alt="hero-section"
        className='w-full'
      />
    </section>
  )
}