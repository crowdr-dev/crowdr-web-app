"use client"
import { useMemo, useState } from "react"
import { RFC } from "@/app/common/types"

const Text: RFC<TextProps> = ({
  children,
  className,
  characterLimit,
  expandText = "See more",
  collaspseText = "See less",
  expandTextClassName = "text-primary",
  collaspseTextClassName = "text-primary",
  toggle,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const text = useMemo(() => {
    if (characterLimit && children.length > characterLimit && isCollapsed) {
      const shortenedText = shortenText(children, characterLimit)
      return (
        <>
          {shortenedText}{" "}
          <span className={expandTextClassName}>{expandText}</span>
        </>
      )
    } else {
      return children
    }
  }, [isCollapsed])

  const props: any = { className }

  if (characterLimit) {
    props.onClick = () =>
      toggle ? setIsCollapsed((prev) => !prev) : setIsCollapsed(false)
  }

  return (
    <p {...props}>
      {text}{" "}
      {(toggle && !isCollapsed) && (
        <span className={collaspseTextClassName}>{collaspseText}</span>
      )}
    </p>
  )
}

export default Text

type TextProps = {
  children: string
  className?: string
  characterLimit?: number
  expandText?: string
  collaspseText?: string
  expandTextClassName?: string
  collaspseTextClassName?: string
  toggle?: boolean
}

const shortenText = (string: string, characterLimit: number) => {
  const stringArray = string.split(" ")

  let buffer = ""
  let wordCount = 0

  for (let stringItem of stringArray) {
    buffer = [buffer, stringItem].filter((string) => string).join(" ")
    if (buffer.length > characterLimit) break
    wordCount++
  }

  let text = stringArray.slice(0, wordCount).join(" ")
  if (text.length > characterLimit) {
    text = text.slice(0, characterLimit)
  }
  text = text.replace(/[^\w]$/, "")

  return text + "... "
}
