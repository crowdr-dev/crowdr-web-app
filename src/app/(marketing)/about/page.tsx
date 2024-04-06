"use client";
import React, { useState } from "react";
import Header from "./about-components/Header";
import Image from "next/image";
import Details from "./about-components/Details";
import Contact from "./about-components/Contact";
import Team from "./about-components/Team";
import Navigation from "@/app/common/components/Navigation";
import Footer from "@/app/common/components/Footer";
import OldModal from "@/app/common/components/OldModal";
import WaitlistForm from "@/app/home/home-components/WaitlistForm";
import Values from "./about-components/Values";

const AboutUs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="font-satoshi" >
      <Navigation openModal={openModal} />
      <Header />
      <Details />
      {/* <Accomplishments /> */}
      <Team />
      <Values/>
      <Contact />
      <Footer />
      <OldModal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </OldModal>
    </div>
  );
};

export default AboutUs;
