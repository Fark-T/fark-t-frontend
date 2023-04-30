import axios from "axios";
import { useEffect, useState } from "react";
import { FaHamburger, FaKaaba } from "react-icons/fa";
import FarkList from "./FarkList";

type MyOrderType = {
  id: string;
  restaurant: string;
  category: string;
  limit: number;
  count: number;
  status: boolean;
  user: {
    id: string;
    username: string;
    fname: string;
    lname: string;
    phone: string;
    coin: number;
  };
  refreshKey: number;
  setRefreshKey: (e: number) => void;
};

type FarkType = {
  id: string;
  menu: string;
  location: string;
  status: boolean;
  user: {
    id: string;
    username: string;
    fname: string;
    lname: string;
    phone: string;
    coin: number;
  };
  order: {
    id: string;
    restaurant: string;
    category: string;
    limit: number;
    count: number;
    status: boolean;
    user: {
      id: string;
      username: string;
      fname: string;
      lname: string;
      phone: string;
      coin: number;
    };
  };
};

const MyOrderCard = (props: MyOrderType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [farkData, setFarkData] = useState<FarkType[]>();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/api/fark/eachOrder/${props.id}`);
        setFarkData(res.data);
      } catch (error) {}
    };
    fetch();
  }, [props.refreshKey]);

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

          <div className="font-medium">
            Amount : {props.count}/{props.limit}
          </div>
        </div>
      </div>

      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          {props.count == 0 ? (
            <div className="flex flex-col justify-center items-center space-y-10">
              <div className="text-2xl">Haven't get an Order Yet</div>
              <div>
                <button
                  className="btn md:w-20 h-10 w-[70px] md:right-3 right-4 bg-red-500"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  type="submit"
                >
                  close
                </button>
              </div>
            </div>
          ) : (
            <div className="modal-action flex flex-col space-y-5">
              <div className="flex flex-col space-y-4">
                {farkData?.map((fark) => {
                  return (
                    <FarkList
                      id={fark.id}
                      menu={fark.menu}
                      status={fark.status}
                      location={fark.location}
                      phone={fark.user.phone}
                      refreshKey={props.refreshKey}
                      setRefreshKey={props.setRefreshKey}
                    />
                  );
                })}
              </div>

              <button
                className="btn md:w-20 h-10 w-[70px] md:right-3 right-4 bg-red-500"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                type="submit"
              >
                close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrderCard;
