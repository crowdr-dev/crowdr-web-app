import Image from 'next/image'
import { RFC } from '@/app/common/types'

import { useFormContext } from 'react-hook-form'

type InputProps = {
  label: string
  placeholder?: string
  name: string
  id?: string
  value?: string | number
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: RFC<InputProps> = props => {
  const { label, placeholder, name, id , value, onChange, type} = props

  return (
    <div className='flex flex-col mb-[14px]'>
      <label htmlFor={id} className='text-[14px] text-[#344054] mb-[6px]'>
        {label}
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
