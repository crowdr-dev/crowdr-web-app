"use client";
import React, { useState } from "react";
import Header from "./pricing-components/Header";
import Details from "./pricing-components/Details";
import Contact from "./pricing-components/Contact";
import Faqs from "./pricing-components/Faqs";
import Navigation from "@/app/common/components/Navigation";
import Footer from "@/app/common/components/Footer";
import Modal from "@/app/common/components/Modal";
import Values from "./pricing-components/Values";

const Pricing = () => {
  return (
    <div className="font-satoshi">
      <Navigation />
      <Header />
      <Details />
      {/* <Accomplishments /> */}
      <Faqs />
      <Values/>
      <Footer />
    </div>
  );
};

export default Pricing;
