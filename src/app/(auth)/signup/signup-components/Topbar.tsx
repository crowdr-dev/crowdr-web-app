import Link from "next/link";
import Image from "next/image";
import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg";

interface Props {
  showSignIn?: boolean;
}

const Topbar = ({showSignIn = true}: Props) => {
  return (
    <>
      <section className="bg-[#F8F8F8]">
        <div className="max-w-[1750px] mx-auto py-1 md:py-2">
          <div className="flex justify-between items-center px-5 md:px-10">
            <div>
              <Link href="/">
                <Image src={CrowdrLogo} alt="Crowdr Logo" />
              </Link>
            </div>
            {showSignIn && <button className="bg-[#068645] opacity-70 hover:opacity-100 text-[12px] md:text-base text-white rounded-lg md:rounded-full transition-all py-3 px-5">
              <Link href="/login">Already have an account? Login</Link>
            </button>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Topbar;
