import { ReactNode } from "react";
type Props = {
  children: ReactNode;
};
const Container = ({ children }: Props) => {
  return <div className="h-screen md:px-20 px-5 pt-[120px] pb-10">{children}</div>;
};

export default Container;
