"use client";
import React, { useEffect, useState } from "react";
import Header from "./pricing-components/Header";
import Details from "./pricing-components/Details";
import Contact from "./pricing-components/Contact";
import Faqs from "./pricing-components/Faqs";
import Navigation from "../../common/components/Navigation";
import Footer from "../../common/components/Footer";
import Modal from "../../common/components/Modal";
import Values from "./pricing-components/Values";
import { Mixpanel } from "../../../utils/mixpanel";

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
