import Skeleton from "react-loading-skeleton"

const CampaignCardSkeleton = () => {
  return (
    <div className="bg-white border border-[rgba(57, 62, 70, 0.08)] rounded-xl px-[10px] pt-6 pb-[10px] md:py-[26px] md:px-[24px]">
      <div className="px-[7px] md:px-0">
        <div className="mb-2 md:mb-[10px]">
          <Skeleton width={90} height={25} borderRadius={100} />
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-8 md:mb-[19px]">
          <Skeleton width={220} height={20} borderRadius={100} containerClassName="mb-2 md:mb-0" />
          <Skeleton width={105} height={35} borderRadius={100} />
        </div>
      </div>

      <div className="mb-[10px] md:mb-3">
        <Skeleton height={80} borderRadius={8} />
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-end">
        <div className="px-[7px] md:px-0 mb-2.5">
          <Skeleton width={70} height={15} borderRadius={100} containerClassName="block" />
          <Skeleton width={70} height={15} borderRadius={100} containerClassName="block" />
          <Skeleton width={95} height={15} borderRadius={100} />
        </div>
        <Skeleton width={165} height={40} containerClassName="self-end" />
      </div>
    </div>
  )
}

export default CampaignCardSkeleton