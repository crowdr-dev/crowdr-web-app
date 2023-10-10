import { RFC } from "@/types/Component";

const ProgressBar: RFC<ProgressBarProps> = ({ percent }) => {
  return (
    <div className="flex items-center">
      <div className="grow h-2 mr-3">
        <div
          style={{ width: `${percent}%` }}
          className="bg-primary h-full rounded-full"
        ></div>
      </div>
      <p className="text-[#344054]">{percent}%</p>
    </div>
  );
};

export default ProgressBar;

type ProgressBarProps = {
  percent: number;
};
