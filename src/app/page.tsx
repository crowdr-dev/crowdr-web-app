import Faq from "./home/home-components/Faq";
import OurFeaturesAnimation from "./home/home-components/OurFeaturesAnimation";
import Navigation from "./shared-components/Navigation";
import Header from "./home/home-components/Header";
import Footer from "./shared-components/Footer";
import Steps from "./home/home-components/Steps";
import Benefits from "./home/home-components/Benefits";
import Community from "./home/home-components/Community";

export default function Home() {
  return (
    <main>
      <Navigation />
      <main>
        <Header />
        <OurFeaturesAnimation />
        <Steps />
        <Benefits />
        <Faq />
        <Community />
        <Footer />
      </main>
    </main>
  );
}
