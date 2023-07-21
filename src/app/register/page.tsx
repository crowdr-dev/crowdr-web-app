"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import AccountDetails from "./components/AccountDetails";
import Confirmation from "./components/Confirmation";
import OrganizationDetails from "./components/OrganizationDetails";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      {/* <Intro /> */}
      {/* <AccountDetails /> */}
      {/* <Confirmation /> */}
      <OrganizationDetails />
    </div>
  );
};

export default AboutUs;
