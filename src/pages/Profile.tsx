import React, { useEffect, useState } from "react";
import {
  FaRegUserCircle,
  FaUserCircle,
  FaPhoneAlt,
  FaBitcoin,
} from "react-icons/fa";
import Container from "../layouts/Container";
import { IconContext } from "react-icons";
import axios from "axios";
import Swal from 'sweetalert2';

type MyProfileType = {
  id: string;
  username: string;
  fname: string;
  lname: string;
  phone: string;
  coin: number;
};

const MyProfile = () => {
  const [profileData, setProfileData] = useState<MyProfileType>();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const res = await axios.get(`/api/users/current`);
        if (res.status === 200) {
          setProfileData(res.data);
          console.log(res.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    };
    getMyProfile();
  }, []);
  return (
    <Container>
      <div className="flex flex-col items-center place-content-center justify-center pt-10">
        <div className="">
          <IconContext.Provider value={{ size: "150" }}>
            <FaUserCircle />
          </IconContext.Provider>
        </div>
        <div className="flex flex-col items-center justify-center font-bold w-full">
          <div className="mt-5 mb-5">
            <h2 className="text-4xl font-bold ">{profileData?.username}</h2>
          </div>
          <div className="flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <h3>
                <FaRegUserCircle />{" "}
              </h3>
              <h3 className="text-gray-600 text-lg">
                {profileData?.fname} {profileData?.lname}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <h3>
                <FaPhoneAlt />{" "}
              </h3>
              <h3 className="text-gray-600 text-lg">{profileData?.phone}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <h3>
                <FaBitcoin />
              </h3>
              <h3 className="text-gray-600 text-lg"> {profileData?.coin}</h3>
            </div>
          </div>

          <button
            type="button"
            className="bg-[#D6CDA4] md:w-[300px] w-40 h-10 rounded-md mt-5 mb-2 font-bold text-white hover:bg-[#8d8d8d] transition duration-300"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Edit Profile
          </button>
          <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
              <div className="modal-action flex flex-col">
                <form className="flex flex-col w-full">
                  <div className="shadow-lg p-3 bg-slate-200 rounded-xl">
                    <div className="flex h-10 items-center p-2 space-x-2">
                      <label htmlFor="menu" className="font-bold">
                        Menu
                      </label>
                      <input
                        type="text"
                        id="menu"
                        className="w-full placeholder-shown:border-[#EEF2E6] placeholder: ps-2 rounded-md"
                        placeholder="Enter your menu"
                      />
                    </div>
                    <div className="flex h-10 items-center p-2 space-x-2">
                      <label htmlFor="location" className="font-bold">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        className="w-full placeholder-shown:border-[#EEF2E6] placeholder: ps-2 rounded-md"
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-5">
                    <button
                      className="btn btn-success md:w-40 w-20 h-10"
                      type="submit"
                    >
                      fark
                    </button>
                    <button
                      type="button"
                      className="absolute btn btn-error right-8 md:w-40 w-20 h-10"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyProfile;
