"use client";
import Collapsible from "react-collapsible";

export default function Faq() {
  return (
    <section className="faq">
      <div className="faq-container">
        <p className="faq-header-small">Frequently Asked Questions</p>
        <p className="faq-header-big">Get to know more about us</p>

        <div>
          {faqArr.map((faq: any) => (
            <div className="faq-collapsible-container">
              <Collapsible
                trigger={
                  <div className="flex justify-between">
                    <p className="faq-collapsible-header">{faq.heading}</p>
                    <div className="faq-collapsible-icon-close" />
                  </div>
                }
                triggerWhenOpen={
                  <div className="flex justify-between">
                    <p className="faq-collapsible-header">{faq.heading}</p>
                    <div className="faq-collapsible-icon-close" />
                  </div>
                }
              >
                <p className="pt-4 faq-collapsible-body">{faq.body}</p>
              </Collapsible>
            </div>
          ))}
        </div>

        <p className="faq-more-questions">
          Have more questions? Our team is happy to assist you!
        </p>

        <button className="btn-outline">Contact Us</button>
      </div>
    </section>
  );
}

const faqArr = [
  {
    heading: "When does the app launch?",
    body: "Our team is working tirelessly to fine-tune all the details of the app. We are projected to launch in Q3. You can sign up to join our private beta testing group and be among the first to find out when we launch!",
  },
  {
    heading: "What types of causes can be funded on Crowdr? ",
    body: "Crowdr is available to support all kinds of initiatives ranging from poverty eradication to mental health awareness. Crowdr can also be used to seek funding for personal and creative projects/initiatives.",
  },
  {
    heading: "Are there any fees associated with Crowdr? ",
    body: "In order to keep the app running and to provide safe and secure services, we deduct a transaction fee from each donation. ",
  },
  {
    heading: "Is there a vetting process for volunteers?",
    body: "Security is our top priority. Our vetting process involves government identification and/or biometrics. ",
  },
  {
    heading:
      "Can volunteers track participation for external uses? E.g. for school and visa applications?",
    body: "Yes, volunteer records will be available in each user’s profile. ",
  },
];
