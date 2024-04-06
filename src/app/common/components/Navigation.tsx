
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { email } from "@/utils/openEmail";
import "./component-styles/nav.css";

type Props = {
  openModal?: () => void
}

export default function Navigation({openModal} : Props ) {
  const currentPath = usePathname();
  const router = useRouter();

  const isActive = (pathname: string) => {
    return currentPath === pathname ? "active" : "";
  };

  return (
    <nav>
      <Link href="/">
        <Image
          src="/svg/new-crowdr-logo.svg"
          alt="crowdr logo"
          width={120}
          height={30}
          className="cursor"
        />
      </Link>
      <ul>
        <li className="font-satoshi">
          <Link href="/pricing" className={isActive("/pricing")} >
            Pricing
          </Link>
        </li>
        <li className="font-satoshi">
          <Link href="/about" className={isActive("/about")}>
            About us
          </Link>
        </li>
        <li className="font-satoshi">
          <a href={`mailto:${email}`} target="_blank">Contact us</a>
        </li>
      </ul>
      <button className="btn-primary hide-sm" onClick={()=>{router.push("signup")}}>Start a Campaign</button>
      <MobileMenu openModal={openModal}/>
      {/* <Modal isOpen={modalIsOpen} onClose={closeModal}>
       <div>heyyy</div> 
      </Modal> */}
    </nav>
  );
}
