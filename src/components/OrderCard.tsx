import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
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
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
