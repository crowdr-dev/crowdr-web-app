"use client";
import Faq from "./home/home-components/Faq";
import OurFeaturesAnimation from "./home/home-components/OurFeaturesAnimation";
import Navigation from "./shared-components/Navigation";
import Header from "./home/home-components/Header";
import Footer from "./shared-components/Footer";
import Steps from "./home/home-components/Steps";
import Benefits from "./home/home-components/Benefits";
import Community from "./home/home-components/Community";
import Modal from "./shared-components/Modal";
import { useState } from "react";
import WaitlistForm from "./home/home-components/WaitlistForm";

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
        <Steps />
        <Benefits />
        <Faq />
        <Community openModal={openModal}/>
        <Footer />
      </main>
      <div id="#modals" />
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </Modal>
    </main>
  );
}
