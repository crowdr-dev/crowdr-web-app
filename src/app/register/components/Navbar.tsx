import Link from "next/link";
import Image from "next/image";
import "../styles/navbar.css"
import CrowdrLogo from "../../../../public/brand/crowdr-logo.png"

const Navbar = () => {
  return (
    <section className="bg-[#F8F8F8]">
      <div className="max-w-[1750px] mx-auto py-2">
        <div className="flex justify-between items-center px-4 md:px-10">
          <div>
              <Link href='/'>
                  <Image src={CrowdrLogo} alt="Crowdr Logo" />
              </Link>
          </div>
          <button className="login-btn">
              <Link href="/login">Already have an account? Login</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
