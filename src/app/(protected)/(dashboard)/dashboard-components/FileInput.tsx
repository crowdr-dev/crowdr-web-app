import { useMemo, useRef, useState } from "react";
import { Merge, useFormContext } from "react-hook-form";
import Image from "next/image";
import imageCompression from "browser-image-compression";

import { RFC } from "@/types/Component";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import {HiMiniXCircle} from "react-icons/hi2"
import UploadIcon from "../../../../../public/svg/upload-cloud.svg";
import LoadingCircle from "../../../../../public/svg/loading-circle.svg"

const FileInput: RFC<FileInputProps> = ({ config, label, error, placeholder, optional, multiple, showFileList, maxFileSize }) => {
  const {
    register,
    control,
    setValue,
    setError,
    watch,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null)
  const files: File[] | undefined = watch(config.name);
  const imageUploaded =  files?.length && !error;

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    setValue(config.name, files);
  };

  const validateImage = async (fileList: FileList) => {
    const image = fileList[0];
    if (!image) return "Please select an image";

    const maxSize = maxFileSize! * 1024 * 1024; // maxFileSize in bytes
    if (image.size > maxSize) {
      const imageStatus = await new Promise<string | boolean>(
        async (resolve) => {
          const compressedBlob = await imageCompression(image, {
            maxSizeMB: 2,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          });

          if (compressedBlob.size > maxSize) {
            resolve(`Image size exceeds ${maxFileSize}MB`);
          } else {
            setValue(config.name, blobToFile(compressedBlob));
            resolve(true);
          }
        }
      );
      return imageStatus;
    } else {
      return true;
    }
  };

  const processFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    config.onChange(e)
    const selectedFiles = Array.from(e.target.files!)

      if (showFileList && multiple) {
        if (!files && selectedFiles?.length === 0) {
          setError(config.name, {type: 'required'})
        } else {
          if (!files) {
            setValue(config.name, selectedFiles)
          } else {
            let fileListArray = Array.from(files)
  
          for (let selectedFile of selectedFiles) {
            const fileIndex = fileListArray.findIndex(f => selectedFile.name == f.name)
            const isAlreadyPicked = fileIndex > -1
            if (isAlreadyPicked) {
              files![fileIndex] = selectedFile
            } else {
              files!.push(selectedFile)
            }
          }
          setValue(config.name, files)
          }
          
        }
      } else {
        if (selectedFiles.length != 0) {
          setValue(config.name, selectedFiles)
        } else {
          fileInputRef.current!.value = ""
          setValue(config.name, null)
          setError(config.name, {type: 'required'})
        }
        
      }
      trigger(config.name)
  }

  const removeFile = (name: string) => {
    debugger
    const remainingFiles = files!.filter(file => file.name != name)
    if (remainingFiles.length > 0) {
      setValue(config.name, remainingFiles)
    } else {
      fileInputRef.current!.value = ""
      setValue(config.name, null)
      setError(config.name, {type: 'required'})
    }
  }

  return (
    <span>
      <label
        htmlFor={config.name}
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
          <p className="text-sm mb-1">
            <span className="text-[#FF5200]">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-[#667085]">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
        <input
          {...register(config.name, {
            validate: { validateImage },
            required: "fsdfdsf"
          })}
          type="file"
          ref={fileInputRef}
          id={config.name}
          accept=".svg, .png, .jpg, .jpeg, .gif"
          multiple={multiple}
          onChange={processFileSelection}
          className="hidden"
        />
      </label>
      {error && (
        <span className="text-[13px] text-[#667085] opacity-[0.67] mt-[6px]">
          {error?.message}
        </span>
      )}

      {showFileList && files?.map((file) => <FileDetail key={file.name} name={file.name} size={file.size} removeFile={() => removeFile(file.name)} />)}
    </span>
  );
};

export default FileInput;

type FileInputProps = {
  config: UseFormRegisterReturn;
  label?: string;
  error?: Merge<FieldError, (FieldError | undefined)[]>
  placeholder?: string
  optional?: boolean
  maxFileSize?: number
  compressImage?: boolean
  multiple?: boolean
  showFileList?: boolean
}

function blobToFile(blob: Blob): FileList {
  const file = new File([blob], blob.name, { type: blob.type });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer.files;
}

function toMB(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(2)
}

const FileDetail: RFC<FileDetailProps> = ({name, size, removeFile}) => {
  return (
    <div className="flex rounded-lg border border-[#D0D5DD] w-full mt-4">
        <div className="text-sm bg-[#F9FAFB] w-8/12 rounded-l-lg p-4 pl-[18px]">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
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