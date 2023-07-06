import React from "react";
import styles from "../about-styles/Details.module.css";

export default function Details() {
  return (
    <section className={styles.details}>
      <section className={styles.detailsContainer}>
        <h2 className={styles.detailsHeading}>Here’s what we do</h2>
        <aside className={styles.detailsPara}>
          <p>
            Social good initiatives in Nigeria, and Africa at large, are grossly
            underserved.
          </p>
          <p>
            Our app aims to make it easy for anyone to raise funds and support
            for their projects, causes, and businesses, while also fostering a
            sense of community and collaboration among our users. Our ultimate
            goal is to help build a more inclusive and innovative society where
            everyone has the chance to succeed.
          </p>
          <p>
            Our team comprises professionals with years of experience in their
            various fields. We are all equally passionate about advancing social
            good and the charity industry on the continent.
          </p>
        </aside>
      </section>

      <section className={styles.detailsContainer}>
        <div className={styles.ceo}>
          <p className={styles.imagePlaceholder} />
          <div >
            <p className={styles.ceoName}>Adaobi Ajegbo<br />
            Founder, CEO</p>
          </div>
        </div>

        <aside className={styles.inspiration}>
          “We were inspired to start this initiative after the Nigerian #EndSARS
          protests in October 2020. Well-meaning individuals sought to show up
          for protests and other civic actions but there was no infrastructure
          in place to facilitate an uprising of this scale. Crowdr is a platform
          connecting people to causes they care about in Africa; either by
          helping them find volunteer events or simplifying the donation process
          - or both.”
        </aside>
      </section>
    </section>
  );
}
