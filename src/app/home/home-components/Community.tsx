import React from 'react'
import "../home-styles/community.css";

type Props = {
  openModal : () => void
}

export default function Community({openModal} : Props) {
  return (
       <section className='community'>
        <div className="flex flex-col md:flex-row justify-between ">
          <div className='flex flex-col items-start gap-5'>
            <h2 className="text-[24px] md:text-[48px] font-medium text-[#EBECED] leading-none">Be part of our <br/> community</h2>
            <p className="text-sm md:text-[18px] text-[#EBECED]">Get insider access to the Crowdr-verse, learn about the <br/>social-good ecosystem in Africa and more.</p>
            <button onClick={openModal} className="btn-primary !bg-[#F7CE50] !text-[#1F2227] w-full md:w-auto">Sign up</button>
          </div>
          
        </div>
     </section>
  )
}
