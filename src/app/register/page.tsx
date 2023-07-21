"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import AccountDetails from "./components/AccountDetails";
import Confirmation from "./components/Confirmation";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      {/* <Intro /> */}
      {/* <AccountDetails /> */}
      <Confirmation />
    </div>
  );
};

export default AboutUs;
