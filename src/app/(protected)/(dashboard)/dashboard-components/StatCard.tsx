import {FaArrowUp, FaArrowDown} from 'react-icons/fa6'
import BgPattern from "../../../../../public/assets/stat-card-pattern.png"

import { RFC } from "@/app/common/types/Component";
import Image from 'next/image';

const StatCard: RFC<StatCardProps> = ({title, text, percentage, changeType, time, pattern, colorScheme, iconUrl, detail}) => {
  const backgroundColor = colorScheme == 'dark' ? '#00B964' : '#F8F8F8'
  const backgroundImage = pattern ? "url('assets/stat-card-pattern.png')" : '#00B964'
  const changeColor = colorScheme == 'dark' ? 'white' : (changeType == 'rise' ? '#00B964' : '#F36960')
  const titleColor = colorScheme == 'dark' ? 'white' : '#292A2E'
  const textColor = colorScheme == 'dark' ? 'white' : '#0C0C0C'

  return (
    <div style={{backgroundColor, backgroundBlendMode: 'overlay'}} className="relative flex flex-col justify-center rounded-[5px] py-[22.5px] px-[21px]">
      <p style={{color: titleColor}} className="text-sm mb-2">{title}</p>
      <p style={{color: textColor}} className="flex text-2xl mb-2">{iconUrl && <Image src={iconUrl} width={30} height={30} alt='icon' />} {text}</p>
      {percentage && <div className="flex items-center">
        <p className="flex items-center mr-[10px]">
          {changeType == 'rise' && <FaArrowUp style={{fill: changeColor}} className="text-[1.05rem] mr-1" />}
          {changeType == 'fall' && <FaArrowDown style={{fill: changeColor}} className="text-[1.05rem] mr-1" />}
          <span style={{color: changeColor}}>{percentage}%</span>
        </p>
        <p className={colorScheme == 'dark' ? "text-white" : 'text-[#5C636E]'}>vs {time}</p>
      </div>}
      {detail && <p className="text-xs text-[#667085]">{detail}</p>}
    </div>
  );
};

export default StatCard;

StatCard.defaultProps = {
  colorScheme: 'dark',
  changeType: 'rise'
}

type StatCardProps = {
  title: string;
  text: string;
  percentage?: number;
  changeType?: "rise" | "fall";
  time?: string;
  pattern?: boolean
  colorScheme?: 'light' | 'dark'
  iconUrl?: string
  detail?: string | React.ReactNode
};
