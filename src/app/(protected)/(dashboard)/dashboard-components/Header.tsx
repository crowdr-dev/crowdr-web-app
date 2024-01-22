"use client"
import Image from "next/image"
import { Button, GrayButton } from "./Button"
import Label from "./Label"
import DrawerTrigger from "./DrawerTrigger"
import Drawer from "./Drawer"
import Sidebar from "./Sidebar"
import ProfileSkeleton from "./skeletons/ProfileSkeleton"
import { useUser } from "../common/hooks/useUser"

import CrowdrLogo from "../../../../../public/images/brand/crowdr-logo.svg"
import PuzzleIcon from "../../../../../public/svg/environment-puzzle.svg"
import BurgerIcon from "../../../../../public/svg/burger-icon.svg"
import Avatar from "../../../../../public/assets/avatar.png"
import { useRouter } from "next/navigation"

const Header = () => {
  const router = useRouter()
  const user = useUser()
  const accountType =
    user?.userType === "individual" ? "Individual" : "Non-Profit"

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + location.host
    // location.replace("/")
    console.log(location.host)
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
          <div
            tabIndex={-1}
            className="group relative hidden md:flex items-center cursor-pointer open:pointer-events-none"
            onClick={logout}
          >
            <div className="mr-[15px]">
              <Image src={Avatar} alt="avatar" width={43} />
            </div>
            <div>
              <p>{user.fullName || user.organizationName}</p>
              <Label text={accountType} />
            </div>

            <div className="absolute right-0 hidden group-focus:flex bg-white p-4 rounded-xl h-4 translate-y-full top-5">
              <Button text="Logout" onClick={logout} />
            </div>
          </div>
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
