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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";

const schema = yup
  .object({
    fname: yup.string().required(),
    lname: yup.string().required(),
    phone: yup.string(),
    password: yup.string(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

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
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.put(`/api/Users/${user?.id}`, data);
      console.log(res);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
                  <div className="pb-10 shadow-lg p-3 bg-slate-200 rounded-xl space-y-5">
                    <div className="flex flex-col h-10 p-2">
                      <label htmlFor="fname" className="font-bold">
                        First name
                      </label>
                      <input
                        type="text"
                        id="fname"
                        {...register("fname")}
                        className="w-full placeholder-shown:border-[#EEF2E6] placeholder: ps-2 rounded-md"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="flex flex-col h-10 p-2">
                      <label htmlFor="lname" className="font-bold">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lname"
                        {...register("lname")}
                        className="w-full placeholder-shown:border-[#EEF2E6] placeholder: ps-2 rounded-md"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className="flex flex-col h-10 p-2">
                      <label htmlFor="phone" className="font-bold">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        pattern="[0-9]{10}"
                        {...register("phone")}
                        className="w-full placeholder-shown:border-[#EEF2E6] placeholder: ps-2 rounded-md"
                        placeholder="1234567890"
                      />
                    </div>
                    <div className="flex flex-col h-10 p-2">
                      <label htmlFor="password" className="font-bold">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        {...register("password")}
                        className="w-full placeholder-shown:border-[#EEF2E6] placeholder: ps-2 rounded-md"
                        placeholder="**********"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col  justify-between pt-5">
                    <button
                      className="btn btn-success md:w-40 w-20 h-10"
                      type="submit"
                    >
                      apply
                    </button>
                    <button
                      type="button"
                      className="absolute btn btn-error right-8 md:w-40 w-20 h-10"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      cancel
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
