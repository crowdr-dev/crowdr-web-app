import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const ProfileSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#F1F1F1">
      <div className="hidden md:flex items-center">
        <Skeleton
          circle
          height={43}
          width={43}
          containerClassName="mr-[15px]"
        />
        <div>
          <Skeleton width={120} height={18} />
          <Skeleton width={80} height={20} />
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default ProfileSkeleton
