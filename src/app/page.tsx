"use client";
import Faq from "./home/home-components/Faq";
import OurFeaturesAnimation from "./home/home-components/Sectors";
import Header from "./home/home-components/Header";
import Steps from "./home/home-components/Steps";
import Benefits from "./home/home-components/Benefits";
import Community from "./home/home-components/Community";
import { useState } from "react";
import WaitlistForm from "./home/home-components/WaitlistForm";
import OldModal from "./common/components/OldModal";
import Footer from "./common/components/Footer";
import Navigation from "./common/components/Navigation";
import Todo from "./home/home-components/Todo";
import WhyCrowdr from "./home/home-components/WhyCrowdr";
import Happening from "./home/home-components/Happening";
import Partners from "./home/home-components/Partners";

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
      <main className="font-satoshi">
        <Header openModal={openModal} />
        {/* <OurFeaturesAnimation /> */}
        <Todo />
        {/* <Steps openModal={openModal} /> */}
        <WhyCrowdr  />
        <Happening/>
        <Partners/>
        {/* <Benefits /> */}
        <Faq />
        <Community openModal={openModal} />
        <Footer />
      </main>
      <div id="#modals" />
      <OldModal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </OldModal>
    </main>
  );
}
