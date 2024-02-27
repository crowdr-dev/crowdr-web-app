import React from 'react'
import Image from 'next/image'
import "../home-styles/partners.css";

const Partners = () => {
    const partnerLogos = [
        "/svg/layers.svg","/svg/sisyphus.svg","/svg/circooles.svg","/svg/catalog.svg","/svg/quotient.svg"
    ]
  return (
    <section className='partners relative'>
        <h2 className="text-[24px] md:text-[42px] font-medium text-white">Our Partners</h2>
        <div className="grid grid-cols-2 md:flex md:flex-row items-start gap-4 md:items-center justify-between w-full mt-8">
            {
                    partnerLogos.map((logo, index) => (
                        <Image key={index} src={logo} alt="partner-logo" width={150} height={150}/>
                    ))
            }
            </div>
            <Image
                src="/svg/green-leaf.svg"
                width={48}
                height={48}
                alt="hero-section"
                className='absolute bottom-0 right-0'
            />
    </section>
  )
}

export default Partners