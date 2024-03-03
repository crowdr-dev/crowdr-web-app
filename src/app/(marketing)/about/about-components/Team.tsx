import React from "react";
import styles from "../about-styles/Team.module.css";
import Ada from "../../../../../public/images/team/Ada.jpg";
import Tritima from "../../../../../public/images/team/Tritima.jpg";
import Jerry from "../../../../../public/images/team/Jerry.jpeg";
import Busola from "../../../../../public/images/team/Busola2.jpg";
import Idris from "../../../../../public/images/team/Idris.jpg";
import Tomiwa from "../../../../../public/images/team/Tomiwa.jpg";
import Ade from "../../../../../public/images/team/Ade.jpg";
import Daniel from "../../../../../public/images/team/Daniel2.jpg"
import Image from "next/image";

export default function Team() {
  return (
    <section className={styles.team}>
      <h2 className="text-center text-[24px] md:text-[36px] text-[#101828] font-medium leading-[44px]">Meet the Crowdr Clan</h2>
      <p className="text-center text-sm md:text-[20px] text-[#475467] leading-[30px] mt-5">We’re a curious and diverse team passionate about making it <br/> easier for people to do good in their communities.</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'>
        {teamMembers.map(({ name, photo, position,bio}) => {
          return (
            <div className="h-[330px] min-w-[240px] p-6 bg-[#F9FAFB] flex flex-col items-center justify-start" key={name}>
               <Image className='rounded-full w-[96px] h-[96px] object-cover mb-5' src={photo} alt={name} width={96} height={96}/> 
              <p className='text-[18px] font-medium leading-[28px]'>{name}</p>
              <p className="text-sm font-[300] mt-2 text-center">{position}</p>
              <p className="text-sm font-[300] mt-2 text-center">{bio}</p>
              <div className="flex flex-row items-center justify-center gap-4 mt-4">
                <Image src='/svg/twitter-bland.svg' alt={"twitter"} width={20} height={20} />
                <Image src="/svg/linkedin-bland.svg"alt={"linkedin"} width={20} height={20} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const teamMembers = [
  { name: "Adaobi Ajegbo", position: "Founder, CEO", photo: Ada, bio: "Ex-Orca Live. Product designer with 3+ years of experience." },
  { name: "Tritima Achigbu", position: "Co-Founder, CMO", photo: Tritima, bio: "Finance and marketing professional with 5+ years of experience." },
  { name: "Jerry Chibuokem", position: "Full-Stack Dev, CTO", photo: Jerry, bio: "Ex-Andela, Ex-Coursera. Software engineer with 4+ years of experience."},
  { name: "Akintomiwa Ajayi", position: "Product Designer", photo: Tomiwa, bio: "Product designer with 4+ years of experience." },
  { name: "Ayomide Yusuf", position: "Product Designer", photo: Tomiwa, bio: "Product designer with 3+ years of experience." },
  { name: "Rokiat Sulaimon", position: "Product Manager", photo: Tomiwa, bio: "Project manager with 2+ years of experience." },
  { name: "Daniel Arikawe", position: "Frontend Developer", photo: Daniel, bio: "Senior frontend engineer with 4+ years of experience." },
  { name: "Idris Abdul-Lateef", position: "Frontend Developer", photo: Idris, bio: "Lead CX at Wealthsimple. Former PagerDuty and Sqreen."},
  { name: "Oluchi", position: "Backend Developer", photo: Idris, bio: "Lead backend dev at Clearbit. Former Clearbit and Loom."},
  { name: "Tochi Nwachukwu", position: "Backend Developer", photo: Idris, bio: "Lead backend dev at Clearbit. Former Clearbit and Loom."},
  { name: "Sylvia Adimike", position: "Backend Developer", photo: Idris, bio: "Lead backend dev at Clearbit. Former Clearbit and Loom."},
];
