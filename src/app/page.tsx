"use client";
import Faq from "./home/home-components/Faq";
import OurFeaturesAnimation from "./home/home-components/Sectors";
import Header from "./home/home-components/Header";
import Steps from "./home/home-components/Steps";
import Benefits from "./home/home-components/Benefits";
import Community from "./home/home-components/Community";
import { useState } from "react";
import WaitlistForm from "./home/home-components/WaitlistForm";
import Modal from "./common/components/Modal";
import Footer from "./common/components/Footer";
import Navigation from "./common/components/Navigation";

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <main>
      <Navigation openModal={openModal} />
      <main>
        <Header openModal={openModal} />
        <OurFeaturesAnimation />
        <Steps openModal={openModal} />
        <Benefits />
        <Faq />
        <Community openModal={openModal} />
        <Footer />
      </main>
      <div id="#modals" />
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </Modal>
    </main>
  );
}
