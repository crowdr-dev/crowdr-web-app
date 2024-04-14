"use client";
import Faq from "./home/home-components/Faq";
import Header from "./home/home-components/Header";
import Steps from "./home/home-components/Steps";
import Benefits from "./home/home-components/Benefits";
import Community from "./home/home-components/Community";
import { useState } from "react";
import WaitlistForm from "./home/home-components/WaitlistForm";
import OldModal from "./common/components/OldModal";
import Footer from "./common/components/Footer";
import Navigation from "./common/components/Navigation";
import Todo from "./home/home-components/Todo";
import WhyCrowdr from "./home/home-components/WhyCrowdr";
import Happening from "./home/home-components/Happening";
import Partners from "./home/home-components/Partners";
import { Metadata } from "next";


export default function Home() {

  return (
    <main>
      <Navigation />
      <main className="font-satoshi">
        <Header />
        {/* <OurFeaturesAnimation /> */}
        <Todo />
        {/* <Steps openModal={openModal} /> */}
        <WhyCrowdr  />
        <Happening/>
        <Partners/>
        {/* <Benefits /> */}
        <Faq />
        <Community />
        <Footer />
      </main>
    </main>
  );
}
