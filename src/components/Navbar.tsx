import { IoFastFoodOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { MdClose } from "react-icons/md";
import { MdOutlineAddBusiness } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaBitcoin } from "react-icons/fa";

const Navbar = () => {
  const { logout, user } = useAuth();

  const navMenu =
    "text-lg font-bold px-2 py-1 transition duration-150 cursor-pointer hover:text-[#1C6758] hover:underline underline-offset-4 decoration-2";
  const [open, setOpen] = useState<Boolean>(false);
  const showMenu = () => {
    setOpen((prev: Boolean) => !prev);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 640) {
        setOpen(false);
      }
    });
  });
  return (
    <nav className="w-full fixed top-0 left-0 shadow-lg z-50 bg-white">
      <div className="flex justify-between items-center md:px-20 px-5 md:py-0 py-2">
        <div className="flex justify-center items-center space-x-1">
          <span className="text-4xl">
            <IoFastFoodOutline />
          </span>
          <div className="font-bold text-3xl">FARK-T</div>
        </div>
        <ul className="md:flex justify-between items-center space-x-3 hidden">
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
          <li className="text-lg font-bold py-2 px-3">
            <div className="flex items-center gap-1">
            <FaBitcoin />
            {user?.coin}
            </div>
          </li>
          <li className="pr-4">
            
            <NavLink to={"/profile"} className={`${navMenu}`}>
              <FaUser/>
            </NavLink>
            
            
          </li>
          <li
            onClick={() => {
              logout();
            }}
            className="text-lg font-bold py-2 px-3 bg-red-500 rounded-md text-white hover:bg-orange-500"
          >
            Logout
          </li>
        </ul>
        <div className="md:hidden block" onClick={showMenu}>
          {open ? (
            <div className="text-[32px]">
              <MdClose />
            </div>
          ) : (
            <div className="text-3xl">
              <GiHamburgerMenu />
            </div>
          )}
        </div>
        <MobileMenu open={open}/>
      </div>
    </nav>
  );
};

export default Navbar;
