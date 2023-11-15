"use client"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Color from "color"

import { RFC } from "@/types/Component"
import { IconType } from "react-icons/lib"

import { CgSpinner } from "react-icons/cg"

export const Button: RFC<ButtonProps> = ({
  text,
  href,
  onClick,
  iconUrl,
  icon,
  bgColor,
  textColor,
  outlineColor,
  shadow,
  buttonType,
  loading,
  disabled,
  className,
}) => {
  const props = {
    text,
    bgColor,
    textColor,
    outlineColor,
    iconUrl,
    icon,
    shadow,
    loading,
  }

  const buttonRef = useRef<any>(null)
  const buttonClasses =
    "inline-flex justify-between items-center rounded-lg cursor-pointer text-sm transition px-[16px] py-[10px] " +
    className
  const darkerBgColor = darken(bgColor!)

  const buttonStyle: React.CSSProperties = {
    background: bgColor,
  }
  if (outlineColor) buttonStyle.border = `1px solid ${outlineColor}`
  if (shadow) {
    buttonStyle.boxShadow = `0px 1px 2px 0px rgba(16, 24, 40, 0.05)`
    buttonStyle.border = `0.4px solid #D0D5DD`
  }

  return href ? (
    <Link
      ref={buttonRef}
      onMouseEnter={() => (buttonRef.current.style.background = darkerBgColor)}
      onMouseLeave={() => (buttonRef.current.style.background = bgColor!)}
      href={href}
      style={buttonStyle}
      className={buttonClasses}
    >
      <ButtonContent {...props} />
    </Link>
  ) : (
    <button
      ref={buttonRef}
      onMouseEnter={() => (buttonRef.current.style.background = darkerBgColor)}
      onMouseLeave={() => (buttonRef.current.style.background = bgColor!)}
      type={buttonType}
      aria-label={text}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      className={buttonClasses}
    >
      <ButtonContent {...props} />
    </button>
  )
}

const ButtonContent: RFC<ButtonContentProps> = ({
  text,
  textColor,
  iconUrl,
  loading,
  ...props
}) => {
  const textStyle: React.CSSProperties = {
    color: textColor || "inherit",
  }

  return (
    <>
      {iconUrl && (
        <Image
          src={iconUrl}
          height={20}
          width={20}
          alt="button icon"
          className="mr-2"
        />
      )}
      {props.icon && <props.icon className="mr-2" />}
      <span style={textStyle}>{text}</span>
      {loading && (
        <CgSpinner
          size="20px"
          className="animate-spin icon opacity-100 ml-2.5"
        />
      )}
    </>
  )
}

export const GrayButton: RFC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      bgColor="#F8F8F8"
      textColor="#292A2E"
      outlineColor="rgba(230, 230, 230, 0.30)"
      {...props}
    />
  )
}

export const WhiteButton: RFC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      bgColor="#FFF"
      textColor="#292A2E"
      outlineColor="rgba(230, 230, 230, 0.30)"
      {...props}
    />
  )
}

// FIXME: DEFAULT PROPS SOON TO BE DEPRECATED
Button.defaultProps = {
  bgColor: "#00B964",
  textColor: "#FFF",
  buttonType: "button",
}

type ButtonProps = ButtonContentProps & {
  href?: string
  onClick?: () => void
  buttonType?: "button" | "submit" | "reset"
}

type ButtonContentProps = {
  text: string
  textColor?: string
  bgColor?: string
  outlineColor?: string
  iconUrl?: string
  icon?: IconType
  shadow?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
}

function darken(color: string) {
  const colorObj = Color(color)
  const brightness = colorObj.luminosity()
  const darkenedColor =
    brightness > 0.5 ? colorObj.darken(0.04) : colorObj.darken(0.075)

  return darkenedColor.hex()
}