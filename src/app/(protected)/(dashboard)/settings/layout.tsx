import Link from "next/link";
import Profile from "./profile/page";
import Password from "./password/page";

const SettingsLayout = () => {
  return (
    <div className="flex mr-2">
      <div>
        {" "}
        <Link href="/settings/profile">
          <Profile />
        </Link>
      </div>
      <div>
        <Link href="/settings/password">
          <Password />
        </Link>
      </div>
      <div>
        <Link href="/settings/notifications">Notifications</Link>
      </div>
      <div>
        <Link href="/settings/payouts">Payout</Link>
      </div>
      <div>
        <Link href="/settings/verification">Verification</Link>
      </div>
    </div>
  );
};

export default SettingsLayout;
