"use client";

import React, { useState } from "react";
import Link from "next/link";
import Profile from "./profile/page";
import Password from "./password/page";
import Verification from "./verification/page";
import Payouts from "./payouts/page";

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
