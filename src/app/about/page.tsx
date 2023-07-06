import React from 'react';
import Navigation from '../shared-components/Navigation';
import Footer from '../shared-components/Footer';
import Header from './about-components/Header';
import Image from 'next/image';
import People from "../../../public/images/many-people.png";
import Details from './about-components/Details';
import Accomplishments from './about-components/Accomplishments';
import Contact from './about-components/Contact';
import Team from './about-components/Team';

const AboutUs = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <Image
        src={People}
        alt="crowd"
        style={{ width: "100%"}}
        priority
      />
      <Details />
      <Accomplishments />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default AboutUs;
