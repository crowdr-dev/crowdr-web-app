'use client'
import ProfileFormContext from "../utils/useProfileForm";
import ProfileForm from "./ProfileForm";

const ProfilePage = () => {
  return (
    <ProfileFormContext>
      <ProfileForm />
    </ProfileFormContext>
  );
}

export default ProfilePage;