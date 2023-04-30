import { MdOutlineAddBusiness } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  open: Boolean;
};

const MobileMenu = ({ open }: Props) => {
  const { logout } = useAuth();
  const navMenu =
    "text-lg font-medium transition duration-150 cursor-pointer hover:text-[#1C6758]";
  return (
    <div className={open ? "fixed inset-0 top-20 md:hidden" : "hidden"}>
      <div className="w-full h-fit bg-white p-5">
        <ul className="flex flex-col space-y-3 ps-2">
          <li>
            <NavLink
              to={"/neworder"}
              className="text-3xl transition duration-150 cursor-pointer hover:text-[#1C6758]"
            >
              <MdOutlineAddBusiness />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/order"} className={`${navMenu}`}>
              Order
            </NavLink>
          </li>
          <li>
            <NavLink to={"/myorder"} className={`${navMenu}`}>
              MyOrder
            </NavLink>
          </li>
          <li>
            <NavLink to={"/myfark"} className={`${navMenu}`}>
              MyFark
            </NavLink>
          </li>
          <li>
            <NavLink to={"/profile"} className={`${navMenu}`}>
              Profile
            </NavLink>
          </li>
          <li
            onClick={() => {
              logout();
            }}
            className={`${navMenu}`}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
