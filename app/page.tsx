"use client";
import Faq from "./home/home-components/Faq";
import Header from "./home/home-components/Header";
import Community from "./home/home-components/Community";
import { useEffect, useState } from "react";
import Footer from "./common/components/Footer";
import Navigation from "./common/components/Navigation";
import Todo from "./home/home-components/Todo";
import WhyCrowdr from "./home/home-components/WhyCrowdr";
import Happening from "./home/home-components/Happening";
import Partners from "./home/home-components/Partners";
import { Mixpanel } from "../utils/mixpanel";
import ForeignDonationsBanner from "./home/home-components/ForeignDonationsBanner";

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
