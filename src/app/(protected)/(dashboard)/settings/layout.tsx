import Link from 'next/link';

const SettingsLayout = () => {

       return (
              <div className="flex mr-2">
                     <div> <Link href="/settings/profile">Profile</Link></div>
                     <div><Link href="/settings/password">Password</Link></div>
                     <div><Link href="/settings/notifications">Notifications</Link></div>
                     <div>Payout</div>
                     <div>Verification</div>
              </div>
       )
}

export default SettingsLayout;