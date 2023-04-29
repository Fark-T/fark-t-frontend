import { Outlet } from "react-router-dom";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="">{children}</div>
      <Outlet />
    </>
  );
};

export default Layout;
