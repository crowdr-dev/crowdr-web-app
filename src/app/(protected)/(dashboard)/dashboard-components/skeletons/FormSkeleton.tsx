import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

const FormSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#F1F1F1" borderRadius={100}>
      <div>
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
          <div>
            <Skeleton width={45} height={20} />
            <Skeleton width={260} height={16} />
          </div>
          <div className="max-w-lg">
            <Skeleton width={490} height={45} borderRadius={8} />
          </div>
        </div>
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
          <div>
            <Skeleton width={115} height={20} />
            <Skeleton width={240} height={16} />
          </div>
          <div className="max-w-lg">
            <Skeleton width={490} height={45} borderRadius={8} />
          </div>
        </div>
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
          <div>
            <Skeleton width={70} height={20} />
            <Skeleton width={260} height={16} />
            <Skeleton width={200} height={16} />
          </div>
          <div className="max-w-lg">
            <Skeleton width={490} height={45} borderRadius={8} />
          </div>
        </div>
        <div className="grid md:grid-cols-[minmax(200px,_350px)_minmax(210px,_1fr)] gap-y-4 gap-x-[25px] mb-[25px]">
          <div>
            <Skeleton width={110} height={20} />
            <Skeleton width={260} height={16} />
          </div>
          <div className="max-w-lg">
            <Skeleton width={490} height={140} borderRadius={8} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default FormSkeleton