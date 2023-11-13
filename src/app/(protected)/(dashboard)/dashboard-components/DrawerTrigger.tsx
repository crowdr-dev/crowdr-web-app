import { RFC } from "@/types/Component";

const DrawerTrigger: RFC<DrawerTriggerProps> = ({ id, children, type, placement }) => {
  return (
    <span
      data-drawer-target={id}
      data-drawer-show={type == "show" && id}
      data-drawer-hide={type == "hide" && id}
      data-drawer-toggle={type == "toggle" && id}
      // data-drawer-placement={placement}
      // TODO: IMPLEMENT PLACEMENT POSITIONING IN DRAWER COMPONENT
    >
      {children}
    </span>
  );
};

export default DrawerTrigger;

DrawerTrigger.defaultProps = {
  type: 'show',
  placement: 'left'
}

type DrawerTriggerProps = {
  id: string;
  children: React.ReactNode;
  type?: "show" | "hide" | "toggle";
  placement?: "left" | "right" | "top" | "bottom";
};
