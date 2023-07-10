import React from "react";
import styles from "../about-styles/Team.module.css";
import Ada from "../../../../public/images/Ada.jpg";
import Tritima from "../../../../public/images/Tritima.jpg";
import Jerry from "../../../../public/images/Jerry.jpeg";
import Busola from "../../../../public/images/Busola.jpg";
import Idris from "../../../../public/images/Idris.jpg";
import Tomiwa from "../../../../public/images/Tomiwa.jpg";
import Ade from "../../../../public/images/Ade.jpg";
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
  { name: "Tritima Achigbu", position: "Co-Founder, CEO", photo: Tritima },
  { name: "Jerry Chibuokem", position: "Full-Stack Dev, CTO", photo: Jerry },
  { name: "Busola Omosipe", position: "Frontend Developer", photo: Busola },
  { name: "Idris Abdul-Lateef", position: "Frontend Developer", photo: Idris },
  { name: "Akintomiwa Ajayi", position: "Product Designer", photo: Tomiwa },
  { name: "Ade Abegunde", position: "Brand Designer", photo: Ade },
];
