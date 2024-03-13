"use client";
import React,{ useState } from 'react'
import Navigation from '@/app/common/components/Navigation';
import Footer from '@/app/common/components/Footer'
import OurPolicies from './policies-components/OurPolicies'
import Modal from '@/app/common/components/Modal';
import WaitlistForm from '@/app/home/home-components/WaitlistForm';

export default function Policies() {
       const [modalIsOpen, setModalIsOpen] = useState(false);

       const openModal = () => {
         setModalIsOpen(true);
       };
     
       const closeModal = () => {
         setModalIsOpen(false);
       };
  return (
    <div className="font-satoshi">
       <Navigation openModal={openModal}/>
       <OurPolicies />
       <Footer />
       <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <WaitlistForm />
      </Modal>
    </div>
  )
}
