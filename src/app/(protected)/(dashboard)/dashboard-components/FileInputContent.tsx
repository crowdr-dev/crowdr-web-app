import Image from "next/image"
import AttentionIcon from "../../../../../public/assets/warning-circle.png"
import { RFC } from "@/app/common/types"

const FileInputContent: RFC<FileInputContentProps> = ({ subtext, displayImage }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image src={AttentionIcon} width={41.27} height={40} alt="" className="object-cover rounded-full" />
      <div className="text-sm text-[#667085] text-center">
        <p>
          <span className="text-[#FF5200]">Click to upload</span> {subtext}
        </p>
        <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
      </div>
    </div>
  )
}

export default FileInputContent

type FileInputContentProps = {
  subtext?: string
  displayImage?: string
}
