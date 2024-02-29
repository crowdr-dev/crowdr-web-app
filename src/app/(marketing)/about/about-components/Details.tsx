import React from "react";
import styles from "../about-styles/Details.module.css";
import Ada from "../../../../../public/images/team/Ada.jpg";
import Image from "next/image";

export default function Details() {
  return (
    <section className={styles.details}>
      <div className="py-16 flex flex-col items-center justify-center gap-8 md:w-5/6 mx-auto my-0">
        <p className="text-[24px] leading-[44px] text-[#101828] md:text-[36px] text-center">“We were inspired to build Crowdr after witnessing the will-power of Nigerians during the ENDSars protest despite the lack of infrastructure to  .”</p>
      </div>
    </section>
  );
}
