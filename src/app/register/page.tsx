"use client";
import React, { useState } from "react";
import Footer from "../shared-components/Footer";
import Modal from "../shared-components/Modal";
import WaitlistForm from "../home/home-components/WaitlistForm";
import Navbar from "./components/Navbar";

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
      <Navbar />
      <Footer />
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </Modal>
    </div>
  );
};

export default AboutUs;
