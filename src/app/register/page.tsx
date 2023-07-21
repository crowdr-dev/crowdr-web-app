"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import AccountDetails from "./components/AccountDetails";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      {/* <Intro /> */}
      <AccountDetails />
    </div>
  );
};

export default AboutUs;
