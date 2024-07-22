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
    heading: "How do I start a campaign?",
    text: "Please click the “Start a Campaign” button to create an account! After that, please click here for a comprehensive step-by-step guide for creating a campaign. This guide is also located on our blog. If you run into any issues, please don’t hesitate to email us at support@oncrowdr.com.",
  },
  {
    heading: "Who do I contact if I have tech issues?",
    text: "We are happy to help! Please email us at support@oncrowdr.com. Please ensure you attach screenshots or video recordings of the issue you are facing so we can assist as soon as possible.",
  },
  {
    heading: "What types of causes does Crowdr support?",
    text: "Simply, anything that betters your life or that of another person! Issues supported on Crowdr range from poverty eradication to mental health awareness.",
  },
  {
    heading: "Does Crowdr offer business or personal loans?",
    text: "No, we don’t offer loans. Crowdr is a crowdfunding platform — you will have to create a campaign and then share your campaign to others to donate to you.",
  },
  {
    heading: "How do you ensure campaigns are legitimate?",
    text: "Our vetting process includes verifying government ID such as one’s NIN, BVN and driver’s license.",
  },
  {
    heading: "Can volunteers track participation for external uses like visa interviews?",
    text: "Yes, volunteer records will be available in each user’s profile.",
  },
  {
    heading: "How much does it cost to use Crowdr?",
    text: "It doesn’t cost anything to set up a campaign! However, to keep our app up and running, we do deduct transaction and processing fees. For more information, please visit the Pricing section.",
  },
 
];
