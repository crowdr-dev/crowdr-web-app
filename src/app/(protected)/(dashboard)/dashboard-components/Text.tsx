"use client"
import { useMemo, useState } from "react"
import { RFC } from "@/app/common/types"

const Text: RFC<TextProps> = ({ children, className, characterLimit }) => {
  const [isOpened, setIsOpened] = useState(false)

  const text = useMemo(() => {
    if (characterLimit && children.length > characterLimit && !isOpened) {
      const shortenedText = shortenText(children, characterLimit)
      return (
        <>
          {shortenedText} <span className="text-primary">Read more</span>
        </>
      )
    } else {
      return children
    }
  }, [isOpened])

  const props: any = {}

  if (characterLimit) {
    props.onClick = () => setIsOpened(true)
  }

  return (
    <p {...props} className={className}>
      {text}
    </p>
  )
}

export default Text

type TextProps = {
  children: string
  className?: string
  characterLimit?: number
  enableToggle?: boolean
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

  return text + "... "
}
