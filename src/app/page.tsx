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
import { Mixpanel } from "@/utils/mixpanel";

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
            🎉 Now accepting international donations in all major currencies.{" "}
          </p>
          <div className="flex flex-row items-center justify-center">
            <span
              className="text-[#079455] text-xl font-normal italic underline cursor-pointer ml-1"
              onClick={() => {
                window.open(
                  "https://blog.oncrowdr.com/email/dcebbedf-6c59-4583-a75b-6cd43cc4e58e/?ref=notes-from-team-crowdr-newsletter",
                  "_blank"
                );
              }}>
              {" "}
              Powered by Apple Pay
            </span>
          </div>
        </div>
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
