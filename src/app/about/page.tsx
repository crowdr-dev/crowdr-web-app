"use client";
import React, { useState } from "react";
import Navigation from "../shared-components/Navigation";
import Footer from "../shared-components/Footer";
import Header from "./about-components/Header";
import Image from "next/image";
import People from "../../../public/images/many-people.png";
import Details from "./about-components/Details";
import Accomplishments from "./about-components/Accomplishments";
import Contact from "./about-components/Contact";
import Team from "./about-components/Team";
import Modal from "../shared-components/Modal";
import WaitlistForm from "../home/home-components/WaitlistForm";

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
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </Modal>
    </div>
  );
};

export default AboutUs;
