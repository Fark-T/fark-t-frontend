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
    const res = await axios.post("/api/fark/create", data);
    console.log(res);
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="relative md:w-1/4 w-full h-48 shadow-lg rounded-3xl bg-gradient-to-r from-green-300 to-teal-400"
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
          <div className="flex justify-between">
            <div className="font-medium">
              Amount : {props.count}/{props.limit}
            </div>
            <div className="font-medium">
              {props.status ? "processing" : "waiting"}
            </div>
          </div>
        </div>
      </div>

      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="menu">Menu:</label>
            <input type="text" id="menu" {...register("menu")} />
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" {...register("location")} />

            <div className="modal-action">
              <button className="btn btn-success" type="submit">
                fark
              </button>
              <button
                className="btn btn-error"
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
    </>
  );
};

export default OrderCard;
