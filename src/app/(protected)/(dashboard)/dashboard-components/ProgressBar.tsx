import { RFC } from "@/app/common/types";

const ProgressBar: RFC<ProgressBarProps> = ({ percent, bgColor, showValue }) => {
  return (
    <div className="flex items-center">
      <div className="grow bg-[#EBECEC] rounded-full h-2">
        <div
          style={{ width: `${percent <= 100 ? percent : 100}%`, background: bgColor }}
          className="bg-primary h-full rounded-full transition"
        ></div>
      </div>
      {showValue && <p className="text-[#344054] ml-3">{percent}%</p>}
    </div>
  );
};

export default ProgressBar;

ProgressBar.defaultProps = {
  bgColor: '#00B964'
}

type ProgressBarProps = {
  percent: number;
  bgColor?: string;
  showValue?: boolean
};