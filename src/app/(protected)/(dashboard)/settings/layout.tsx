"use client";

import React, { useState } from "react";
import Link from "next/link";
import Profile from "./profile/page";
import Password from "./password/page";
import Verification from "./verification/page";
import Payouts from "./payouts/page";
import Tabs from "../dashboard-components/Tabs";

const SettingsLayout = () => {
  const [selectedSetting, setSelectedSetting] = useState("profile");
  const [selectedpage, setSelectedPage] = useState(<Profile />);

  const handleClick = (setting: any) => {
    setSelectedSetting(setting);
    setSelectedPage(setting);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
      <Tabs styles={{ header: "-mx-5 md:mx-0" }}>
        {pages.map((page, index) => (
          <Tabs.Item heading={page.title} href={page.route}>
            {children}
          </Tabs.Item>
        ))}
      </Tabs>

      <div className="flex py-2 mr-2 text-[17px] mt-3 ">
        <div className="mr-5 ">
          {" "}
          <Link href="/settings/profile">
            <p onClick={() => handleClick("profile")}>Profile</p>
          </Link>
        </div>
        <div className="mr-5">
          <Link href="/settings/password">
            <p onClick={() => handleClick("password")}>Password</p>
          </Link>
        </div>
        <div className="mr-5">
          <Link href="/settings/notifications">
            <p onClick={() => handleClick("notification")}>Notifications</p>
          </Link>
        </div>
        <div className="mr-5">
          <Link href="/settings/payouts">
            <p onClick={() => handleClick("payouts")}>Payment and Payouts</p>
          </Link>
        </div>
        <div className="mr-5">
          <Link href="/settings/verification">
            <p onClick={() => handleClick("verification")}>Verification</p>
          </Link>
        </div>
      </div>

      <hr className=" border-[rgba(56, 56, 56, 0.08)]" />

      <div>
        {selectedSetting === "profile" && <Profile />}
        {selectedSetting === "password" && <Password />}
        {selectedSetting === "notification" && "Notification"}
        {selectedSetting === "payouts" && <Payouts />}
        {selectedSetting === "verification" && <Verification />}
      </div>
    </div>
  );
};

export default SettingsLayout;

const pages = [
  {
    route: "/settings/profile",
    title: "Profile",
  },
  {
    route: "/settings/password",
    title: "Password",
  },
  {
    route: "/settings/verification",
    title: "Verification",
  },
  {
    route: "/settings/payouts",
    title: "Payouts",
  },
  {
    route: "/settings/notification",
    title: "Notification",
  },
];
