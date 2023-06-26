import Image from "next/image";
import Faq from "./components/Faq";
import OurFeaturesAnimation from "./components/OurFeaturesAnimation";

export default function Home() {
  return (
    <main>
      <section className="modal-backdrop hide-modal">
        <div className="modal-hold">
          <div className="join-waitlist-img-hold">
            <Image
              src="/assets/svg/join-waitlist.svg"
              alt="waitlist"
              width={200}
              height={200}
              className=""
            />
          </div>
          <form
            className="modal"
            name="simple-contact-form"
            action="https://formspree.io/f/mwkjzgvb"
            method="POST"
          >
            <h2 className="">Join the waitlist!</h2>
            <p className="">Be the first to know when we launch.</p>

            <div className="input-hold">
              <label htmlFor="fullname" className="">
                Full name
              </label>
              <input
                type="text"
                name="name"
                id="fullname"
                className=""
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="input-hold">
              <label htmlFor="email" className="">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className=""
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="input-hold">
              <label htmlFor="title" className="">
                Who are you?
              </label>
              <select name="message" id="title" className="" required>
                <option value="">Select title</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Non-profit organization">
                  Non-profit organization
                </option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>

            <button type="submit" className="">
              Submit
            </button>
          </form>
        </div>
      </section>

      <nav className="">
        <Image
          src="/svg/crowdr-logo.svg"
          alt="crowdr logo"
          width={76}
          height={20}
          className=""
        />
        <ul>
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#">About us</a>
          </li>
          <li>
            <a href="#">Contact us</a>
          </li>
        </ul>
        <button className="btn-outline">Join Private Beta</button>
      </nav>
      <main className="">
        <section className="cta">
          <div className="content">
            <h2 className="content-header">
              Build community
              <br />
              through <span>giving.</span>
            </h2>
            <p className="">
              Crowdr helps you fundraise and find volunteering opportunities
              that make a change in our world.
            </p>

            <button className="btn-standard">Join Private Beta</button>
          </div>
        </section>
        <section className="sectors">
          <OurFeaturesAnimation />
        </section>

        <section className="slogan">
          <p className="">STARTING A CAMPAIGN</p>
          <h2 className="">It takes three simple steps...</h2>

          <div className="steps">
            <div className="step">
              <div className="step-stage">
                <div className="">
                  <div className="dashed"></div>
                </div>
                <div className="">
                  <h1 className="">1</h1>
                </div>
                <div className="">
                  <div className="dashed"></div>
                </div>
              </div>
              <h3 className="">Sign up</h3>
              <p className="">It takes just 3 minutes.</p>
            </div>

            <div className="step">
              <div className="step-stage">
                <div className="">
                  <div className="dashed"></div>
                </div>
                <div className="">
                  <h1 className="">2</h1>
                </div>
                <div className="">
                  <div className="dashed"></div>
                </div>
              </div>
              <h3 className="">Create a campaign</h3>
              <p className="">Tell your story.</p>
            </div>
            <div className="step">
              <div className="step-stage">
                <div className="">
                  <div className="dashed"></div>
                </div>
                <div className="">
                  <h1 className="">3</h1>
                </div>
                <div className="">
                  <div className="dashed"></div>
                </div>
              </div>
              <h3 className="">Share your campaign</h3>
              <p className="">Get support from your community and beyond.</p>
            </div>
          </div>
          <div className="slogan-btn"><button className="btn-outline">Learn More</button></div>
        </section>

        <section className="benefits">
          <div className="benefits-header">
            <p className="">OUR DIFFERENCE</p>
            <h2 className="">Why Crowdr?</h2>
          </div>

          <div className="benefits-details">
            <div className="benefits-artwork">
              <Image
                src="/svg/volunteering.svg"
                width={200}
                height={200}
                alt="volunteering"
                className=""
              />
            </div>
            <div className="benefits-content">
              <h2 className="">For Individuals</h2>
              <p className="">Volunteers and donors.</p>

              <div className="perks ">
                <div className="card-tile card-tile-active">
                  <Image
                    src="/svg/hand-love.svg"
                    width={200}
                    height={200}
                    alt="support community"
                    className=""
                  />
                  <div className="">
                    <h4 className="">Support your community</h4>
                    <p className="">
                      Impact your community by volunteering and donating to our
                      catalog of non-profit initiatives.
                    </p>
                  </div>
                </div>
                <div className="card-tile">
                  <Image
                    src="/svg/heart-paper.svg"
                    width={200}
                    height={200}
                    alt="volunteering resume"
                    className=""
                  />
                  <div className="">
                    <h4 className="">Build a volunteering resume</h4>
                    <p className="">
                      Boost your résumé with volunteering experience and
                      increase your chances of career success.
                    </p>
                  </div>
                </div>
                <div className="card-tile">
                  <Image
                    src="/svg/people.svg"
                    width={200}
                    height={200}
                    alt="people"
                    className=""
                  />
                  <div className="">
                    <h4 className="">Network and make new friends</h4>
                    <p className="">
                      Expand your circle by connecting with other like-minded
                      individuals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="benefits-details">
            <div className="benefits-artwork artwork-left">
              <Image
                src="/svg/non-profit.svg"
                alt="non-profits"
                width={200}
                height={200}
                className=""
              />
            </div>
            <div className="benefits-content content-right">
              <h2 className="">For Non-profits</h2>
              <p className="">NGOs, charities and social good companies.</p>

              <div className="perks">
                <div className="card-tile">
                  <Image
                    src="/svg/money.svg"
                    alt="receive donations"
                    width={200}
                    height={200}
                    className=""
                  />
                  <div className="">
                    <h4 className="">Receive donations</h4>
                    <p className="">
                      Use our fundraising tools to meet and exceed your
                      organization’s funding goals!
                    </p>
                  </div>
                </div>
                <div className="card-tile card-tile-active">
                  <Image
                    src="/svg/user-search.svg"
                    alt="search volunteers"
                    width={200}
                    height={200}
                    className=""
                  />
                  <div className="">
                    <h4 className="">Source volunteers</h4>
                    <p className="">
                      Find consistent and vetted volunteers to help execute your
                      outreach initiatives.
                    </p>
                  </div>
                </div>
                <div className="card-tile">
                  <Image
                    src="/svg/chart.svg"
                    alt="access to valuable insights"
                    width={200}
                    height={200}
                    className=""
                  />
                  <div className="">
                    <h4 className="">Get access to valuable insights</h4>
                    <p className="">
                      Use our CRM and analytics tools to better understand your
                      community and make more effective decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Faq />

        <section className="watchlist">
          <div className="watchlist-content">
            <div className="watchlist-text-hold">
              <div>
              <h1 className="">Be a part of our community.</h1>
              <button className="btn-standard btn-white">Join Private Beta</button>
              </div>
            </div>
          </div>
          <div className="watchlist-partb"/>
        </section>

        <footer className="">
          <div className="links-hold">
            <div className="links">
              <h3 className="">Company</h3>
              <ul className="">
                <li className="">
                  <a href="" className="">
                    About us
                  </a>
                </li>
                <li className="">
                  <a
                    href="mailto:contact.crowdr@gmail.com"
                    target="_blank"
                    className=""
                  >
                    How it works
                  </a>
                </li>
                <li className="">
                  <a
                    href="mailto:contact.crowdr@gmail.com"
                    target="_blank"
                    className=""
                  >
                    Contact
                  </a>
                </li>
                <li className="">
                  <a href="" className="">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="links">
              <h3 className="">Connect</h3>
              <div className="socials-links">
                <a
                  href="https://instagram.com/crowdr.app?igshid=ZWQyN2ExYTkwZQ=="
                  target="_blank"
                  className=""
                >
                  <Image
                    src="/svg/instagram.svg"
                    alt="instagram"
                    width={32}
                    height={32}
                    className=""
                  />
                </a>
                <a
                  href="https://twitter.com/crowdr_app?s=11&t=fK9DaoyW8Rt4TYyvhuMThg"
                  target="_blank"
                  className=""
                >
                  <Image
                    src="/svg/twitter.svg"
                    alt="twitter"
                    width={32}
                    height={32}
                    className=""
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/crowdr-app/"
                  target="_blank"
                  className=""
                >
                  <Image
                    src="/svg/linkedin.svg"
                    alt="linkedin"
                    width={32}
                    height={32}
                    className=""
                  />
                </a>
              </div>
            </div>
            {/* <div className="links">
              <h3 className="">Legal</h3>
              <ul className="">
                <li className="">
                  <a href="" className="">
                    Privacy policy
                  </a>
                </li>
                <li className="">
                  <a href="" className="">
                    Terms of service
                  </a>
                </li>
                <li className="">
                  <a href="" className="">
                    Cookie policy
                  </a>
                </li>
              </ul>
            </div> */}
            <div className="links">
            <p className="copyright">Copyright 2023, All Rights Reserved.</p>
            <p className="copyright">Crowdr App Technologies Limited.</p>
            </div>
          </div>
          <div className="description">
            <Image
              src="/svg/crowdr-logo.svg"
              alt="crowdr logo"
              width={130}
              height={60}
              className=""
            />
          </div>
        </footer>
      </main>
    </main>
  );
}
