"use client"
import Image from "next/image"
import { useUser } from "../common/hooks/useUser"
import { Button, GrayButton } from "./Button"
import Label from "./Label"
import DrawerTrigger from "./DrawerTrigger"
import DropdownTrigger from "./DropdownTrigger"
import Drawer from "./Drawer"
import Dropdown from "./Dropdown"
import Sidebar from "./Sidebar"
import ProfileSkeleton from "./skeletons/ProfileSkeleton"
import deleteCookie from "@/app/api/deleteCookie"

import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg"
import PuzzleIcon from "../../../../../public/svg/environment-puzzle.svg"
import BurgerIcon from "../../../../../public/svg/burger-icon.svg"
import Avatar from "../../../../../public/assets/avatar.png"

const Header = () => {
  const user = useUser()
  const accountType =
    user?.userType === "individual" ? "Individual" : "Non-Profit"

  const logout = async () => {
    await deleteCookie('token')
    location.replace('/login')
  }

  return (
    <header className="flex justify-between items-center w-full min-h-[62px] md:min-h-[74px] border-b-[0.7px] border-[rgba(56, 56, 56, 0.08)] px-[25px]">
      <div>
        <Image
          src={CrowdrLogo}
          alt="crowdr logo"
          className="w-[52px] md:w-[52px]"
        />
      </div>

      <div className="flex items-center">
        <div className="flex mr-6">
          <GrayButton
            text="Setup Guide"
            iconUrl={PuzzleIcon}
            className="hidden md:inline-flex mr-[6px]"
          />
          <Button
            text="Create Campaign"
            href="/campaigns/create-or-edit-campaign"
          />
        </div>

        {/* profile */}
        {user ? (
          <>
            <DropdownTrigger
              triggerId="menu-dropdown-trigger"
              targetId="menu-dropdown"
              type="toggle"
              className="hidden md:flex items-center cursor-pointer"
            >
              <div className="mr-[15px]">
                <Image src={Avatar} alt="avatar" width={43} />
              </div>
              <div>
                <p>{user.fullName || user.organizationName}</p>
                <Label text={accountType} />
              </div>
            </DropdownTrigger>

            <Dropdown id="menu-dropdown">
              <div className="flex flex-col px-2 pt-2 pb-5">
                <Button text="Logout" onClick={logout} />
              </div>
            </Dropdown>
          </>
        ) : (
          <ProfileSkeleton />
        )}

        {/* burger icon */}
        <DrawerTrigger
          id="sidebar_drawer"
          options={{
            backdropClasses: "bg-[#50556F] bg-opacity-30 fixed inset-0 z-30",
          }}
        >
          <Image
            src={BurgerIcon}
            alt="burger icon"
            className="block md:hidden w-6 md:w-7"
          />
        </DrawerTrigger>
      </div>

      <Drawer id="sidebar_drawer" ariaLabel="Sidebar">
        <Sidebar drawer />
      </Drawer>
    </header>
  )
}

export default Header
