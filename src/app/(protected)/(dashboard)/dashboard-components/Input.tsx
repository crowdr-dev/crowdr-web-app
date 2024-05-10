import Image from 'next/image'
import { RFC } from '@/app/common/types'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

import { useFormContext } from 'react-hook-form'

type InputProps = {
  label: string
  placeholder?: string
  name: string
  id?: string
  value?: string | number
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  info?: string
}

const Input: RFC<InputProps> = props => {
  const { label, placeholder, name, id , value, onChange, type,info} = props

  return (
    <div className='flex flex-col mb-[14px]'>
      <label htmlFor={id} className='text-[14px] text-[#344054] mb-[6px] flex flex-row items-center gap-1'>
        {label}
       {
        info && <>
        <a data-tooltip-id="my-tooltip" data-tooltip-content={info}>
  <Image 
  src={'/svg/info.svg'}
  height={15}
  width={15}
  alt="info"/>
</a>
<Tooltip id="my-tooltip" /></>
       } 
      </label>

      <input
        type={type? type : "text"}
        value={value}
        id={id}
        placeholder={placeholder}
        name={name}
        className='text-[15px] rounded-lg border border-[#D0D5DD] py-[10px] px-[14px]'
        onChange={onChange}
      />
    </div>
  )
}

export default Input
