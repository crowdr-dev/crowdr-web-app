
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import "./shared-component-styles/Navigation.css";
import { email } from "@/utils/openEmail";
// import Modal from "./Modal";

export default function Navigation({openModal} : { openModal : () => void}) {
  const currentPath = usePathname();
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  
  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  const isActive = (pathname: string) => {
    return currentPath === pathname ? "active" : "";
  };
console.log(777)
  return (
    <nav>
      <Link href="/">
        <Image
          src="/svg/crowdr-logo.svg"
          alt="crowdr logo"
          width={76}
          height={20}
          className="cursor"
        />
      </Link>
      <ul>
        <li>
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className={isActive("/about")}>
            About us
          </Link>
        </li>
        <li>
          <Link href={email} target="_blank">Contact us</Link>
        </li>
      </ul>
      <button className="btn-outline hide-sm" onClick={openModal}>Join Private Beta</button>
      <MobileMenu openModal={openModal}/>
      {/* <Modal isOpen={modalIsOpen} onClose={closeModal}>
       <div>heyyy</div> 
      </Modal> */}
    </nav>
  );
}
