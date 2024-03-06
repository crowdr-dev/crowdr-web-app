"use client";
import React, { useState } from "react";
import Header from "./pricing-components/Header";
import Details from "./pricing-components/Details";
import Contact from "./pricing-components/Contact";
import Faqs from "./pricing-components/Faqs";
import Navigation from "@/app/common/components/Navigation";
import Footer from "@/app/common/components/Footer";
import Modal from "@/app/common/components/Modal";
import WaitlistForm from "@/app/home/home-components/WaitlistForm";
import Values from "./pricing-components/Values";

const Pricing = () => {
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
      <Details />
      {/* <Accomplishments /> */}
      <Faqs />
      <Values/>
      <Footer />
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </Modal>
    </div>
  );
};

export default Pricing;
