"use client";
import React, { useEffect, useState } from "react";
import Header from "./pricing-components/Header";
import Details from "./pricing-components/Details";
import Contact from "./pricing-components/Contact";
import Faqs from "./pricing-components/Faqs";
import Navigation from "@/app/common/components/Navigation";
import Footer from "@/app/common/components/Footer";
import Modal from "@/app/common/components/Modal";
import Values from "./pricing-components/Values";
import { Mixpanel } from "@/utils/mixpanel";

const Pricing = () => {
  useEffect(() => {
    Mixpanel.track("Pricing Page viewed");
  }, []);
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
