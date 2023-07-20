"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";

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
      <Intro />
    </div>
  );
};

export default AboutUs;
