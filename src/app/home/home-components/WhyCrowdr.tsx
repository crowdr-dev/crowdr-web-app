import React from 'react'
import Image from "next/image";

const WhyCrowdr = () => {

    const content = [
        {
            id: 1,
            title: "Support your community",
            description: "Impact your community by volunteering and donating to our catalog of non-profit initiatives.",
        }, {
            id: 2,
            title: "Support your community",
            description: "Impact your community by volunteering and donating to our catalog of non-profit initiatives.",
        },
        {
            id: 3,
            title: "Network and make new friends",
            description: "Expand your circle by connecting with other like-minded individuals."
        },
        {
            id: 4,
            title: "Network and make new friends",
            description: "Expand your circle by connecting with other like-minded individuals."
        }
    ]
    return (
        <div className='bg-[#181A1D] py-16 flex flex-col items-center justify-center w-full relative'>
            <div className='px-6 w-full md:w-[80%] flex flex-col item-start'>
                <h2 className="text-white md:text-[42px]">Why Crowdr?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    {
                        content.map((item) => (
                            <div key={item.id} className="flex flex-row items-center justify-start gap-[24px]">
                                <Image
                                    src="/svg/heart-why.svg"
                                    width={48}
                                    height={48}
                                    alt="hero-section"
                                />
                                <div className='flex flex-col items-start gap-1'>
                                    <h4 className="text-[#E6F8F0] text-[20px] md:text-[24px] text-start">{item.title}</h4>
                                    <p className="text-[#A4A6AA] text-sm md:text-[16px] text-start">{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Image
                src="/svg/yellow-leaf.svg"
                width={48}
                height={48}
                alt="hero-section"
                className='absolute bottom-0 right-0'
            />
        </div>
    )
}

export default WhyCrowdr