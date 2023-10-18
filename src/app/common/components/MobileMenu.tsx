"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { email } from "@/utils/openEmail";
import "./component-styles/mobile-menu.css";

type Props = {
  openModal : () => void
}

export default function MobileMenu({openModal} : Props) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const isActive = (pathname: string) => {
    return currentPath === pathname ? "active" : "";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <div className="mobile-menu">
      <div className="container">
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <IoMdClose size={25} /> : <IoMdMenu size={25} />}
        </div>
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`} onClick={closeMenu}>
        <ul>
          <li>
            <Link href="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={isActive("/about")}>
              About
            </Link>
          </li>
          <li>
            <a href={`mailto:${email}`} target="_blank">
              Contact Us
            </a>
          </li>
          <li><button className="btn-outline w-100" onClick={openModal}>Join Private Beta</button></li>
        </ul>
      </div>
    </div>
  );
}
