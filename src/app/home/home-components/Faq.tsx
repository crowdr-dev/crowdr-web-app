"use client";
import { openEmail } from "@/utils/openEmail";
import Image from "next/image";
import Collapsible from "react-collapsible";
import "../home-styles/faq.css";

export default function Faq() {
  return (
    <section className="faq">
      <div className="faq-container">
        <p className="faq-header">Frequently Asked Questions</p>
        <p className="faq-header-big mt-[20px]">We knew you would ask. See? We’re two peas in a pod.</p>

        <div>
          {faqArr.map((faq: { heading: string, text: string}, index) => (
            <div className="faq-collapsible-container" key={index}>
              <Collapsible
                trigger={
                  <div className="flex justify-between">
                    <p className="faq-collapsible-header">{faq.heading}</p>
                    <Image src="/svg/plus-circle.svg" width={24} height={24} alt='accordion'/>
                  </div>
                }
                triggerWhenOpen={
                  <div className="flex justify-between">
                    <p className="faq-collapsible-header">{faq.heading}</p>
                    <Image src="/svg/minus-circle.svg" width={24} height={24} alt='accordion'/>
                  </div>
                }
              >
                <p className="pt-4 faq-collapsible-body">{faq.text}</p>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqArr = [
  {
    heading: "What types of causes does Crowdr support?",
    text: "Simply, anything that betters your life or that of another person! Issues supported on Crowdr range from poverty eradication to mental health awareness.",
  },
  {
    heading: "How do you ensure campaigns are legitimate?",
    text: "Our vetting process includes verifying government ID such as one’s NIN, BVN and driver’s license.",
  },
  {
    heading: "Can volunteers track participation for external uses like visa interviews?",
    text: "Our vetting process includes verifying government ID such as one’s NIN, BVN and driver’s license.",
  },
  {
    heading: "How much does it cost to use Crowdr?",
    text: "It doesn’t cost anything to set up a campaign! However, to keep our app up and running, we do deduct transaction and processing fees. For more information, please visit the Pricing section.",
  },
];
