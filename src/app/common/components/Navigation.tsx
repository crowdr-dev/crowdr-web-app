"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { email } from "@/utils/openEmail";
import "./component-styles/nav.css";
import { Mixpanel } from "@/utils/mixpanel";

type Props = {
  openModal?: () => void;
};

export default function Navigation({ openModal }: Props) {
  const currentPath = usePathname();
  const router = useRouter();

  const isActive = (pathname: string) => {
    return currentPath === pathname ? "active" : "";
  };

  return (
    <nav className="font-satoshi">
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
        <li>
          <Link href="/pricing" className={isActive("/pricing")}>
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/about" className={isActive("/about")}>
            About us
          </Link>
        </li>
        <li>
          <a href="https://blog.oncrowdr.com" target="_blank">
            Blog
          </a>
        </li>
        <li>
          <a href={`mailto:${email}`} target="_blank">
            Contact us
          </a>
        </li>
      </ul>
      <button
        className="btn-primary hide-sm"
        onClick={() => {
          router.push("signup");
          Mixpanel.track("Start a Campaign Clicked");
        }}>
        Start a Campaign
      </button>
      <MobileMenu openModal={openModal} />
      {/* <Modal isOpen={modalIsOpen} onClose={closeModal}>
       <div>heyyy</div> 
      </Modal> */}
    </nav>
  );
}
