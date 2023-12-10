import Skeleton from "react-loading-skeleton"

// TODO: SWITCH ALL SKELETONS TO TAILWIND PULSING ANIMATION SKELETONS
const CampaignPageSkeleton = () => {
  return (
    <div className="md:max-w-[570px] grow mb-[33px] md:mb-0">
      <div className="flex flex-col md:flex-row justify-between mb-1">
          {/* title */}
          <div className="md:hidden">
            <Skeleton height={22} width={300} borderRadius={100} />
          </div>
          <div className="hidden md:block">
            <Skeleton height={30} width={300} borderRadius={100} />
          </div>
          {/* title */}

        <div className="hidden md:block">
          <Skeleton width={105} height={35} borderRadius={100} />
        </div>
      </div>

      {/* story */}
      <div className="mb-6">
        <Skeleton height={10} borderRadius={100} containerClassName="-mb-2" />
        <Skeleton height={10} borderRadius={100} containerClassName="-mb-2" />
        <Skeleton height={10} borderRadius={100} containerClassName="-mb-2" />
      </div>
      {/* story */}

      <div className="md:hidden mb-1">
        <Skeleton width={105} height={35} borderRadius={100} />
      </div>

      <div className="px-[10px] py-3 md:px-0 md:py-0">
        <div className="mb-[12px] md:mb-3">
          <Skeleton height={80} borderRadius={8} />
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-end">
          <div className="flex flex-col gap-2.5 px-[7px] mb-[13px] md:px-0 md:mb-0">
            <Skeleton width={70} height={15} borderRadius={100} containerClassName="block" />
            <Skeleton width={70} height={15} borderRadius={100} containerClassName="block" />
            <Skeleton width={95} height={15} borderRadius={100} />
          </div>

          <Skeleton width={165} height={40} containerClassName="self-end" />
        </div>
      </div>
    </div>
  )
}

export default CampaignPageSkeleton
