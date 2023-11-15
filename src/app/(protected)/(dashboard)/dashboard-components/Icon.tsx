import { RFC } from "@/app/common/types/Component";

const Icon: RFC<IconProps> = ({ name, className }) => {
  return <i className={`ci-${name} ` +  className}></i>;
};

export default Icon;

Icon.defaultProps = {
  className: ''
}

type IconProps = {
  name: string;
  className?: string
};
