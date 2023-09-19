import React from "react";
import styles from '../about-styles/Header.module.css';

export default function Header() {
  return (
    <section className={styles.headerContainer}>
       <h1 className={styles.headerHeading}>
           Build community
           <br />
           through <span >giving.</span>
         </h1>
      <p className={styles.headerPara}>
        Our mission is to empower individuals and communities by providing a
        platform that facilitates social good through crowdfunding &
        volunteering.
      </p>
    </section>
  );
}
