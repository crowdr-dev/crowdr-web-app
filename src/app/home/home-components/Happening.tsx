import React from 'react'
import "../home-styles/happening.css";


const Happening = () => {
  return (
    <section className='happening'>
        <div className="flex flex-row items-center justify-between w-full pr-[30px]">
            <div>
                <h4 className="text-[20px] md:text-[24px] text-[#393E46] font-normal">Happening near you </h4>
                <p className="text-[24px] md:text-[42px] text-[#181A1D] font-medium">Campaigns in your local area</p>
            </div>
            <button className="btn-primary">Join Private Beta</button>
        </div>
        {/* Caurousel */}
    </section>
  )
}

export default Happening