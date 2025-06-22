"use client";
import Faq from "./_components/home/home-components/Faq";
import Header from "./_components/home/home-components/Header";
import Community from "./_components/home/home-components/Community";
import { useEffect, useState } from "react";
import Footer from "./common/components/Footer";
import Navigation from "./common/components/Navigation";
import Todo from "./_components/home/home-components/Todo";
import WhyCrowdr from "./_components/home/home-components/WhyCrowdr";
import Happening from "./_components/home/home-components/Happening";
import Partners from "./_components/home/home-components/Partners";
import { Mixpanel } from "../utils/mixpanel";
import ForeignDonationsBanner from "./_components/home/home-components/ForeignDonationsBanner";

export default function Home() {
  useEffect(() => {
    Mixpanel.track("Home Page viewed");
  }, []);
  return (
    <main>
      <Navigation />
      <main className="font-satoshi">
        <ForeignDonationsBanner />
        <Header />
        <Todo />
        <WhyCrowdr />
        <Happening />
        <Partners />
        <Faq />
        <Community />
        <Footer />
      </main>
    </main>
  );
}
