"use client";

import React from "react";
import Tabs from "../dashboard-components/Tabs";
import { RFC } from "@/app/common/types";

const SettingsLayout: RFC = ({ children }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
      <Tabs styles={{ header: "-mx-5 md:mx-0" }}>
        {pages.map((page, index) => (
          <Tabs.Item key={index} heading={page.title} href={page.route}>
            {children}
          </Tabs.Item>
        ))}
      </Tabs>
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
    route: "/settings/payment",
    title: "Payment and Payouts",
  },
  // {
  //   route: "/settings/verification",
  //   title: "Verification",
  // },
];
