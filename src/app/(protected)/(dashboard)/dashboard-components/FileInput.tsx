import { useMemo, useRef, useState } from "react"
import { Merge, useFormContext } from "react-hook-form"
import Image from "next/image"
import imageCompression from "browser-image-compression"

import { RFC } from "@/app/common/types"
import { FieldError, UseFormRegisterReturn, RegisterOptions } from "react-hook-form"
import { HiMiniXCircle } from "react-icons/hi2"
import UploadIcon from "../../../../../public/svg/upload-cloud.svg"
import LoadingCircle from "../../../../../public/svg/loading-circle.svg"

const FileInput: RFC<FileInputProps> = ({
  config,
  label,
  error,
  placeholder,
  optional,
  multiple,
  showFileList,
  maxFileSize,
  name,
  onChange,
  value,
  controlled,
  rules,
}) => {
  if (!controlled && !config && name) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {register} = useFormContext()
    config = register(name, rules)
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  let files: File[] | undefined
  if (config) {
    var {
      register,
      control,
      setValue,
      setError,
      watch,
      trigger,
      formState: { errors, isValid, isSubmitting },
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useFormContext()
    files = watch(config.name)
  }
  if (value) {
    files = value
  }
  const imageUploaded = files?.length && !error

  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    processFileSelection(e)
  }

  const validateImage = async (fileList: FileList) => {
    const image = fileList[0]
    if (!image) return "Please select an image"

    const maxSize = maxFileSize! * 1024 * 1024 // maxFileSize in bytes
    if (image.size > maxSize) {
      const imageStatus = await new Promise<string | boolean>(
        async (resolve) => {
          const compressedBlob = await imageCompression(image, {
            maxSizeMB: 2,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          })

          if (compressedBlob.size > maxSize) {
            resolve(`Image size exceeds ${maxFileSize}MB`)
          } else {
            if (config) setValue(config.name, blobToFile(compressedBlob))
            if (onChange) onChange({ value: blobToFile(compressedBlob) as any })
            resolve(true)
          }
        }
      )
      return imageStatus
    } else {
      return true
    }
  }

  // BUG: DRAG & DROP IS ABLE TO BY-PASS FILE TYPE SPECIFIED
  const processFileSelection = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent
  ) => {
    const selectedFiles = isChangeEvent(e)
      ? Array.from(e?.target?.files!)
      : Array.from(e.dataTransfer.files)

    if (showFileList && multiple) {
      if (!files && selectedFiles?.length === 0) {
        if (config) setError(config.name, { type: "required" })
      } else {
        if (!files) {
          if (config) setValue(config.name, selectedFiles)
          if (onChange) onChange({ value: selectedFiles })
        } else {
          let fileListArray = Array.from(files)

          for (let selectedFile of selectedFiles) {
            const fileIndex = fileListArray.findIndex(
              (f) => selectedFile.name == f.name
            )
            const isAlreadyPicked = fileIndex > -1
            if (isAlreadyPicked) {
              files![fileIndex] = selectedFile
            } else {
              files!.push(selectedFile)
            }
          }
          if (config) setValue(config.name, files)
          if (onChange) onChange({ value: files })
        }
      }
    } else {
      if (selectedFiles.length != 0) {
        if (config) setValue(config.name, selectedFiles)
        if (onChange) onChange({ value: selectedFiles })
      } else {
        fileInputRef.current!.value = ""
        if (config) setValue(config.name, null)
        if (onChange) onChange({ value: null })
      }
    }
    if (config) trigger(config.name)
  }

  const removeFile = (name: string) => {
    const remainingFiles = files!.filter((file) => file.name != name)
    if (remainingFiles.length > 0) {
      if (config) setValue(config.name, remainingFiles)
      if (onChange) onChange({ value: remainingFiles })
    } else {
      fileInputRef.current!.value = ""
      if (config) {
        setValue(config.name, null)
        trigger(config.name)
      }
      if (onChange) onChange({ value: null })
    }
  }

  const isChangeEvent = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent
  ): event is React.ChangeEvent<HTMLInputElement> => {
    return "files" in event.target
  }

  return (
    <span>
      <label
        htmlFor={config?.name || name}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
        className={`${
          dragActive ? "border-green-200" : "border-[#e4e7ec]"
        } flex flex-col items-center cursor-pointer rounded-lg border-[2px] border-dashed py-4 px-6 mb-1`}
      >
        <div
          className={`${
            imageUploaded
              ? "bg-green-100 border-green-50"
              : "bg-[#F2F4F7] border-[#F9FAFB]"
          } rounded-full border-[6px] p-[10px] mb-3`}
        >
          <Image src={UploadIcon} alt="upload icon" width={24} />
        </div>
        <div className="text-center">
          <p className="text-primary text-sm mb-1">
            {/* text-[#FF5200] */}
            <span className="text-inherit">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-[#667085]">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
        <input
          {...config}
          type="file"
          ref={fileInputRef}
          id={config?.name || name}
          accept=".svg, .png, .jpg, .jpeg, .gif"
          multiple={multiple}
          onChange={processFileSelection}
          className="hidden"
        />
      </label>
      {error && (
        <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
          {error.message}
        </span>
      )}

      {showFileList &&
        files?.map((file) => (
          <FileDetail
            key={file.name}
            name={file.name}
            size={file.size}
            removeFile={() => removeFile(file.name)}
          />
        ))}
    </span>
  )
}

export default FileInput

type FileInputProps = {
  config?: UseFormRegisterReturn
  label?: string
  error?: Merge<FieldError, (FieldError | undefined)[]>
  placeholder?: string
  optional?: boolean
  maxFileSize?: number
  compressImage?: boolean
  multiple?: boolean
  showFileList?: boolean
  name?: string
  onChange?: (e: { value: File[] | null }) => void
  value?: File[]
  rules?: RegisterOptions
  controlled?: boolean
}

function blobToFile(blob: Blob): FileList {
  const file = new File([blob], blob.name, { type: blob.type })
  const dataTransfer = new DataTransfer()
  dataTransfer.items.add(file)
  return dataTransfer.files
}

function toMB(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(2)
}

const FileDetail: RFC<FileDetailProps> = ({ name, size, removeFile }) => {
  return (
    <div className="flex rounded-lg border border-[#D0D5DD] w-full mt-4">
      <div className="text-sm bg-[#F9FAFB] w-8/12 rounded-l-lg p-4 pl-[18px]">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </p>
        <p className="text-[#667085]">{toMB(size)} MB</p>
      </div>
      <div className="grow bg-white rounded-r-lg p-4">
        {/* <Image src={LoadingCircle} alt="spinner icon" className="block ml-auto" /> */}
        <HiMiniXCircle size={32} className="ml-auto" onClick={removeFile} />
      </div>
    </div>
  )
}

type FileDetailProps = {
  name: string
  size: number
  removeFile: () => void
}
