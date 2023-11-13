import { RFC } from "@/types/Component";

const InputTitle: RFC<InputTitleProps> = ({ title, detail, id }) => {
  return (
    <div className="mb-[5px] md:mb-0">
      <h2 id={id || title} className="block">{title}</h2>
      {detail && <p className="text-sm text-[#667085]">{detail}</p>}
    </div>
  );
};

export default InputTitle;

type InputTitleProps = {
  title: string;
  detail?: string;
  id?: string
};
