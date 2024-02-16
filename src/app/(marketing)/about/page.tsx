"use client";
import React, { useState } from "react";
import Header from "./about-components/Header";
import Image from "next/image";
import People from "../../../../public/images/many-people.png";
import Details from "./about-components/Details";
import Accomplishments from "./about-components/Accomplishments";
import Contact from "./about-components/Contact";
import Team from "./about-components/Team";
import Navigation from "@/app/common/components/Navigation";
import Footer from "@/app/common/components/Footer";
import OldModal from "@/app/common/components/OldModal";
import WaitlistForm from "@/app/home/home-components/WaitlistForm";

const AboutUs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <Navigation openModal={openModal} />
      <Header />
      <Image src={People} alt="crowd" style={{ width: "100%" }} priority />
      <Details />
      <Accomplishments />
      <Team />
      <Contact />
      <Footer />
      <OldModal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </OldModal>
    </div>
  );
};

export default AboutUs;
