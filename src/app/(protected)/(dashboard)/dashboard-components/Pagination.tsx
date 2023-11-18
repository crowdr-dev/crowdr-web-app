import { useMediaQuery } from "usehooks-ts"
import { WhiteButton } from "./Button"
import { RFC } from "@/app/common/types/Component"

import ArrowLeftIcon from "../../../../../public/svg/arrow-left.svg"
import ArrowRightIcon from "../../../../../public/svg/arrow-right.svg"

const Pagination: RFC<PaginationProps> = ({
  currentPage,
  pageCount,
  totalPages,
  onPageChange,
  className,
}) => {
  const isBigScreen = useMediaQuery("(min-width: 768px)")
  const noOfPages = Math.ceil(totalPages / pageCount)
  let pages = Array.from({ length: noOfPages }, (_, index) => index + 1)

  return (
    <div className={"flex justify-between items-center " + className}>
      <WhiteButton
        text={isBigScreen ? "Previous" : ""}
        iconUrl={ArrowLeftIcon}
        outlineColor="#D0D5DD"
        className="font-medium !border !p-2 md:!px-[14px]"
        shadow
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage == 1}
      />
      <div className="hidden md:flex gap-[6px]">
        {pages.map((page) => (
          <Page
            page={page}
            currentPage={currentPage}
            onPageSelect={onPageChange}
          />
        ))}
      </div>
      <div className="md:hidden text-sm font-medium">
        Page {currentPage} of {noOfPages}
      </div>
      <WhiteButton
        text={isBigScreen ? "Next" : ""}
        iconUrl={ArrowRightIcon}
        outlineColor="#D0D5DD"
        iconPosition="right"
        className="font-medium !border !p-2 md:!px-[14px]"
        shadow
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage == noOfPages}
      />
    </div>
  )
}

export default Pagination

export const Page: RFC<PageProps> = ({ page, currentPage, onPageSelect }) => {
  const pageStyle =
    page == currentPage
      ? "bg-primary text-white"
      : "hover:bg-[#F8F8F8] text-[#667085]"

  return (
    <div
      onClick={() => onPageSelect(page)}
      className={
        "grid place-items-center cursor-pointer text-sm font-medium rounded-lg w-10 h-10 " +
        pageStyle
      }
    >
      {page}
    </div>
  )
}

type PaginationProps = {
  currentPage: number
  pageCount: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

type PageProps = {
  page: number
  currentPage: number
  onPageSelect: (page: number) => void
}
