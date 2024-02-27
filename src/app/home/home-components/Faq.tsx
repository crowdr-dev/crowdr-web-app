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
    heading: "When does the app launch?",
    text: "Our team is working tirelessly to fine-tune all the details of the app. We are projected to launch in Q3. You can sign up to join our private beta testing group and be among the first to find out when we launch!",
  },
  {
    heading: "What types of causes can be funded on Crowdr? ",
    text: "Crowdr is available to support all kinds of initiatives ranging from poverty eradication to mental health awareness. Crowdr can also be used to seek funding for personal and creative projects/initiatives.",
  },
  {
    heading: "Are there any fees associated with Crowdr? ",
    text: "In order to keep the app running and to provide safe and secure services, we deduct a transaction fee from each donation. ",
  },
  {
    heading: "Is there a vetting process for fundraisers and volunteers?",
    text: "Security is our top priority. Our vetting process involves government identification and/or biometrics. ",
  },
  {
    heading:
      "Can volunteers track participation for external uses? E.g. for school and visa applications?",
    text: "Yes, volunteer records will be available in each user’s profile. ",
  },
];
