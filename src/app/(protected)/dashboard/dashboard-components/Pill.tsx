import { RFC } from "@/types/Component";

const Pill: RFC<PillProps> = ({label, textColor, bgColor, iconUrl, size}) => {
  const pillStyle: React.CSSProperties = {
    color: textColor,
    background: bgColor,
    padding: size == 'small' ? '2px 12px' : '8px 21px'
    
  }
  return (
    <span style={pillStyle} className="inline-block rounded-full px-[6px] py-[2px]">
      {label}
    </span>
  );
}

export default Pill;

Pill.defaultProps = {
  size: 'small',
  textColor: '#027A48',
  bgColor: '#ECFDF3'
}

type PillProps = {
  label: string
  size?: 'small' | 'big'
  iconUrl?: string
  textColor?: string
  bgColor?: string
}