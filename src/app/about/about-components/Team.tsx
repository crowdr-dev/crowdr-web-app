import React from "react";
import styles from "../about-styles/Team.module.css";

export default function Team() {
  return (
    <section className={styles.team}>
      <h2 className={styles.teamHeading}>Meet Our team</h2>
      <div className={styles.teamMembers}>
        {teamMembers.map(({ name, position}) => {
          return (
            <div className={styles.teamMember}>
              <div className={styles.imagePlaceholder} />
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
  { name: "Adaobi Ajegbo", position: "Founder, CEO", photo: "" },
  { name: "Tritima Achigbu", position: "Co-founder, CEO", photo: "" },
  { name: "Jerry Chibuokem", position: "Full-Stack Dev, CTO", photo: "" },
  { name: "Busola Omosipe", position: "Backend Developer", photo: "" },
  { name: "Idris Abdul-Lateef", position: "Backend Developer", photo: "" },
  { name: "Akintomiwa Ajayi", position: "Product Designer", photo: "" },
  { name: "Ade Abegunde", position: "Brand Designer", photo: "" },
];
