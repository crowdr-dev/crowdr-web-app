"use client";
import React,{ useState } from 'react'
import Navigation from '../shared-components/Navigation'
import Footer from '../shared-components/Footer'
import OurPolicies from './policies-components/OurPolicies'
import Modal from "../shared-components/Modal";
import WaitlistForm from "../home/home-components/WaitlistForm";

export default function page() {
       const [modalIsOpen, setModalIsOpen] = useState(false);

       const openModal = () => {
         setModalIsOpen(true);
       };
     
       const closeModal = () => {
         setModalIsOpen(false);
       };
  return (
    <div>
       <Navigation openModal={openModal}/>
       <OurPolicies />
       <Footer />
       <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </Modal>
    </div>
  )
}
