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
      <h2 className={styles.teamHeading}>Meet our team</h2>
      <div className={styles.teamMembers}>
        {teamMembers.map(({ name, photo, position}) => {
          return (
            <div className={styles.teamMember} key={name}>
               <Image  className={styles.imagePlaceholder} src={photo} alt={name}/> 
              <p className={styles.teamMemberName}>{name}</p>
              <p className={styles.teamMemberPosition}>{position}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const teamMembers = [
  { name: "Adaobi Ajegbo", position: "Founder, CEO", photo: Ada },
  { name: "Tritima Achigbu", position: "Co-Founder, CMO", photo: Tritima },
  { name: "Jerry Chibuokem", position: "Full-Stack Dev, CTO", photo: Jerry },
  { name: "Busola Omosipe", position: "Frontend Developer", photo: Busola },
  { name: "Idris Abdul-Lateef", position: "Frontend Developer", photo: Idris },
  { name: "Daniel Arikawe", position: "Frontend Developer", photo: Daniel },
  { name: "Akintomiwa Ajayi", position: "Product Designer", photo: Tomiwa },
  { name: "Ade Abegunde", position: "Brand Designer", photo: Ade },
];
