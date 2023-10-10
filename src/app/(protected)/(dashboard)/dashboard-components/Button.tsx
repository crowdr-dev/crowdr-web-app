"use client";
import Image from "next/image";
import Link from "next/link";

import { RFC } from "@/types/Component";

export const Button: RFC<ButtonProps> = ({
  text,
  href,
  callback,
  iconUrl,
  bgColor,
  textColor,
  outlineColor,
  shadow,
  buttonType,
  className,
}) => {
  const props = { text, bgColor, textColor, outlineColor, iconUrl, shadow };

  return href ? (
    <Link href={href} className={className}>
      <ButtonContent {...props} />
    </Link>
  ) : (
    <button
      type={buttonType}
      aria-label={text}
      onClick={callback}
      className={className}
    >
      <ButtonContent {...props} />
    </button>
  );
};

const ButtonContent: RFC<ButtonContentProps> = ({
  text,
  bgColor,
  textColor,
  outlineColor,
  iconUrl,
  shadow,
}) => {
  const buttonStyle: React.CSSProperties = {
    background: bgColor,
  };
  const textStyle: React.CSSProperties = {
    color: textColor,
  };

  if (outlineColor) buttonStyle.border = `1px solid ${outlineColor}`;
  if (shadow) {
    buttonStyle.boxShadow = `0px 1px 2px 0px rgba(16, 24, 40, 0.05)`;
    buttonStyle.border = `0.4px solid #D0D5DD`;
  }

  return (
    <div
      style={buttonStyle}
      className={
        "inline-flex justify-between items-center rounded-lg cursor-pointer px-[16px] py-[10px]"
      }
    >
      {iconUrl && (
        <Image
          src={iconUrl}
          height={24}
          width={24}
          alt="button icon"
          className="mr-2"
        />
      )}
      <span style={textStyle}>{text}</span>
    </div>
  );
};

export const GrayButton: RFC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      bgColor="#F8F8F8"
      textColor="#292A2E"
      outlineColor="rgba(230, 230, 230, 0.30)"
      {...props}
    />
  );
};

export const WhiteButton: RFC<ButtonProps> = ({ ...props }) => {
  return (
    <Button
      bgColor="#FFF"
      textColor="#292A2E"
      outlineColor="rgba(230, 230, 230, 0.30)"
      {...props}
    />
  );
};

// FIXME: DEFAULT PROPS SOON TO BE DEPRECATED
Button.defaultProps = {
  bgColor: "#00B964",
  textColor: "#FFF",
  buttonType: "button",
};

type ButtonProps = ButtonContentProps & {
  href?: string;
  callback?: () => void;
  buttonType?: "button" | "submit" | "reset";
  className?: string;
};

type ButtonContentProps = {
  text: string;
  textColor?: string;
  bgColor?: string;
  outlineColor?: string;
  iconUrl?: string;
  shadow?: boolean;
};
