"use client";
import Image from "next/image";
import Link from "next/link";

import { RFC } from "@/types/Component";
import { CgSpinner } from "react-icons/cg";

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
  loading,
  disabled,
  styles,
}) => {
  const props = { text, bgColor, textColor, outlineColor, iconUrl, shadow, loading, styles };

  return href ? (
    <Link href={href} className={styles?.outer}>
      <ButtonContent {...props} />
    </Link>
  ) : (
    <button
      type={buttonType}
      aria-label={text}
      onClick={callback}
      disabled={disabled}
      className={styles?.outer}
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
  loading,
  styles,
}) => {
  const buttonStyle: React.CSSProperties = {
    background: bgColor,
  };
  const textStyle: React.CSSProperties = {
    color: textColor,
    textAlign: "center"
  };

  if (outlineColor) buttonStyle.border = `1px solid ${outlineColor}`;
  if (shadow) {
    buttonStyle.boxShadow = `0px 1px 2px 0px rgba(16, 24, 40, 0.05)`;
    buttonStyle.border = `0.4px solid #D0D5DD`;
  }

  return (
    <div
      style={buttonStyle}
      className={"inline-flex justify-between items-center rounded-lg cursor-pointer px-[16px] py-[10px] w-full " + styles?.inner}
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
      {loading && (
        <span>
          <CgSpinner
            size="1.5rem"
            className="animate-spin icon opacity-100 ml-2.5"
          />
        </span>
      )}
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
};

type ButtonContentProps = {
  text: string;
  textColor?: string;
  bgColor?: string;
  outlineColor?: string;
  iconUrl?: string;
  shadow?: boolean;
  loading?: boolean
  disabled?: boolean
  styles?: {outer?: string, inner?: string}
};
