import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const schema = yup
  .object({
    menu: yup.string().required(),
    location: yup.string().required(),
    userID: yup.string(),
    orderID: yup.string(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;
type MyOrderType = {
  id: string;
  restaurant: string;
  category: string;
  limit: number;
  count: number;
  status: boolean;
  userId: string;
};
const OrderCard = (props: MyOrderType) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    data.userID = user?.id;
    data.orderID = props.id;
    await axios.post("/api/fark/create", data);
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="relative md:w-1/4 w-full h-48 shadow-lg rounded-3xl bg-gradient-to-r from-green-300 to-teal-400 flex flex-col"
      >
        <div className="w-14 h-14 rounded-full absolute left-3 top-4 z-10 bg-indigo-400 flex justify-center items-center border-2 border-white">
          <FaHamburger className="w-6 h-6" />
        </div>
        <div className="absolute w-full h-4/5 p-4 pt-8 bottom-0 bg-white rounded-2xl space-y-2">
          <div className="font-bold text-xl">{props.restaurant}</div>
          <div className="font-bold border-2 rounded-2xl w-fit py-1 px-2 text-xs">
            {props.category}
          </div>
          <hr className="border-[1.5px]"></hr>
          <div className="flex justify-between items-center">
            <div className="font-medium">
              Amount : {props.count}/{props.limit}
            </div>
            {props.count == props.limit ? (
              <div className="font-bold bg-red-400 rounded-md w-14 h-8 flex justify-center items-center text-white">
                Full
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div
        className={`modal ${
          isOpen && props.count < props.limit ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">
          <div className="modal-action flex flex-col">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full"
            >
              <div className="shadow-lg p-3 bg-slate-200 rounded-xl">
                <div className="flex h-10 items-center p-2 space-x-2">
                  <label htmlFor="menu" className="font-bold">
                    Menu
                  </label>
                  <input
                    type="text"
                    id="menu"
                    {...register("menu")}
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
                    {...register("location")}
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
    </>
  );
};

export default OrderCard;
