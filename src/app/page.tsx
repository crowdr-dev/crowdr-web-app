"use client";
import Faq from "./home/home-components/Faq";
import Header from "./home/home-components/Header";
import Steps from "./home/home-components/Steps";
import Benefits from "./home/home-components/Benefits";
import Community from "./home/home-components/Community";
import { useEffect, useState } from "react";
import WaitlistForm from "./home/home-components/WaitlistForm";
import OldModal from "./common/components/OldModal";
import Footer from "./common/components/Footer";
import Navigation from "./common/components/Navigation";
import Todo from "./home/home-components/Todo";
import WhyCrowdr from "./home/home-components/WhyCrowdr";
import Happening from "./home/home-components/Happening";
import Partners from "./home/home-components/Partners";
import { Mixpanel } from "@/utils/mixpanel";
import { FaApplePay } from "react-icons/fa";

export default function Home() {
  useEffect(() => {
    Mixpanel.track("Home Page viewed");
  }, []);
  return (
    <main>
      <Navigation />
      <main className="font-satoshi">
        <div className="bg-[#00CB6E69] text-xl py-4 flex flex-col md:flex-row items-center justify-center border-t border-b border-[#000000] px-3">
          <p className="text-[#000000] text-center font-bold">
            Now accepting international donations in all major currencies 🎉.  {" "}
          </p>
          <div className="flex flex-row items-center justify-center">
            <span className="text-[#000000] text-xl font-bold"> {" "}  Powered by</span>
            <FaApplePay
              className="mt-1 ml-2"
              size={50}
              color="#000"
              fill="#000"
            />.
          </div>
        </div>
        <Header />
        {/* <OurFeaturesAnimation /> */}
        <Todo />
        {/* <Steps openModal={openModal} /> */}
        <WhyCrowdr />
        <Happening />
        <Partners />
        {/* <Benefits /> */}
        <Faq />
        <Community />
        <Footer />
      </main>
    </main>
  );
}
