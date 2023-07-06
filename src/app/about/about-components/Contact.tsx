import React from 'react'
import styles from "../about-styles/Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.contact}>
       <h1 className={styles.contactHeader}>Have a question? Our team is happy to assist you!</h1>
       <p className={styles.contactPara}>Ask about app updates, services, partnerships and more.</p>
       <div className={styles.border} />
       <button className='btn-outline'>Contact Us</button>
    </section>
  )
}
