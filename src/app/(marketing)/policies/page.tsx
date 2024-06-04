"use client";
import React, { useEffect, useState } from "react";
import Navigation from "@/app/common/components/Navigation";
import Footer from "@/app/common/components/Footer";
import OurPolicies from "./policies-components/OurPolicies";
import OldModal from "@/app/common/components/OldModal";
import WaitlistForm from "@/app/home/home-components/WaitlistForm";
import { Mixpanel } from "@/utils/mixpanel";

export default function Policies() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    Mixpanel.track("Policies Page viewed");
  }, []);
  return (
    <div className="font-satoshi">
      <Navigation openModal={openModal} />
      <OurPolicies />
      <Footer />
      <OldModal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </OldModal>
    </div>
  );
}
