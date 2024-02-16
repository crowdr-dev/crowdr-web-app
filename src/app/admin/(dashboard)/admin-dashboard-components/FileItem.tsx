import Image from "next/image"
import FileIcon from "../../../../../public/svg/file-icon.svg"

const FileItem = () => {
  return (
    <div className="flex gap-3 rounded-xl border border-[#EAECF0] p-4">
      <Image src={FileIcon} alt="file icon" />
      <div className="text-sm">
        <p className="font-medium text-[#344054]">CAC Documents</p>
        <p className="text-[#344054]">200 KB</p>
      </div>
    </div>
  )
}

export default FileItem
