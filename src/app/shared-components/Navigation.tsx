"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const currentPath = usePathname();

  const isActive = (pathname: string) => {
    return currentPath === pathname ? "active" : "";
  };

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
          <a href="#">Contact us</a>
        </li>
      </ul>
      <button className="btn-outline">Join Private Beta</button>
    </nav>
  );
}
