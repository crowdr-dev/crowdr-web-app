import Link from "next/link";
import Profile from "./profile/page";
import Password from "./password/page";

const SettingsLayout = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="flex py-2 mr-2 text-[17px] mt-3 ">
        <div className="mr-5 ">
          {" "}
          <Link href="/settings/profile">
            {/* <Profile /> */}
            Profile
          </Link>
        </div>
        <div className="mr-5">
          <Link href="/settings/password">
            {/* <Password /> */}
            Passwod
          </Link>
        </div>
        <div className="mr-5">
          <Link href="/settings/notifications">Notifications</Link>
        </div>
        <div className="mr-5">
          <Link href="/settings/payouts">Payment and Payouts</Link>
        </div>
        <div className="mr-5">
          <Link href="/settings/verification">Verification</Link>
        </div>
      </div>
      <hr className="border-[green] border-[1px]" />
    </div>
  );
};

export default SettingsLayout;
