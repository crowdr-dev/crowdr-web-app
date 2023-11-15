import { RFC } from "@/app/common/types/Component";

const Drawer: RFC<DrawerProps> = ({ id, children, ariaLabel }) => {
  // TODO: POSSIBLY USE FLOWBITE REACT FOR DRAWER
  return (
    <div
      id={id}
      className="fixed top-0 left-0 z-40 h-screen w-min overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800"
      tabIndex={-1}
      aria-label={ariaLabel}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

export default Drawer;

type DrawerProps = {
  id: string;
  children: React.ReactNode;
  ariaLabel?: string
};
