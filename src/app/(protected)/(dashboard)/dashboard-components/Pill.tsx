import { RFC } from "@/types/Component";

const Pill: RFC<PillProps> = ({label, textColor, bgColor, iconUrl, size}) => {
  const pillStyle: React.CSSProperties = {
    color: textColor,
    background: bgColor,
    padding: size == 'small' ? '2px 12px' : '8px 21px'
    
  }
  // TODO: FINISH UP PILL COMPONENT
  return (
    <div style={pillStyle} className="inline-block rounded-full px-[6px] py-[2px]">
      {label}
    </div>
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


type Item = {
  id: string;
};

const items = [
  { id: 'business' },
  { id: 'tech' },
  { id: 'health' },
] as const;

type ItemIds = typeof items[number]['id'];

// ItemIds is now a union type of the 'id' properties
// 'business' | 'tech' | 'health'
