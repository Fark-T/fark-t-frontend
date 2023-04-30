import axios from "axios";
import { MdOutlineDeliveryDining } from "react-icons/md";

type MyFarkType = {
  id: string;
  menu: string;
  status: boolean;
  fname: string;
  lname: string;
  phone: string;
};
const FarkCard = (props: MyFarkType) => {
  const handleCancel = async () => {
    await axios.delete(`/api/fark/${props.id}`);
      window.location.reload();
  };

  return (
    <>
      <div className="relative md:w-1/4 w-full h-48 shadow-lg rounded-3xl bg-gradient-to-r from-red-300 to-pink-400 flex flex-col">
        <div className="w-14 h-14 rounded-full absolute left-3 top-4 z-10 bg-gray-950 flex justify-center items-center border-2 border-white">
          <MdOutlineDeliveryDining className="w-8 h-8 text-white" />
        </div>
        {props.status ? (
          <></>
        ) : (
          <div>
            <button
              type="submit"
              className="absolute z-10 right-4 top-14 btn btn-error h-10 font-bold text-black"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
        <div className="absolute w-full h-4/5 p-4 pt-8 bottom-0 bg-white rounded-2xl space-y-2">
          <div className="font-bold text-xl">{props.menu}</div>
          <div className="font-bold border-2 rounded-2xl w-fit py-1 px-2 text-xs">
            {props.status ? "Processing" : "Waiting"}
          </div>
          <hr className="border-[1.5px]"></hr>
          <div className="flex justify-between">
            <div className="font-medium">
              {props.fname} {props.lname}
            </div>
            <div className="font-medium">{props.phone}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarkCard;
