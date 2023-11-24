import { RFC } from "@/app/common/types";

const DrawerTrigger: RFC<DrawerTriggerProps> = ({ id, children, type, placement }) => {
  const drawerProps: IDrawer = {"data-drawer-target": id}

  if (type == 'show') drawerProps["data-drawer-show"] = id
  else if (type == 'hide') drawerProps["data-drawer-hide"] = id
  else if (type == 'toggle') drawerProps["data-drawer-toggle"] = id

  if (placement) drawerProps["data-drawer-placement"] = placement

  return (
    <span
      {...drawerProps}
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

interface IDrawer {
  "data-drawer-target": string
  "data-drawer-show"?: string
  "data-drawer-hide"?: string
  "data-drawer-toggle"?: string
  "data-drawer-placement"?: string
}