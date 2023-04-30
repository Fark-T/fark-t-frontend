import axios from "axios";

type Props = {
  id: string;
  menu: string;
  status: boolean;
  location: string;
  phone: string;
  refreshKey: number;
  setRefreshKey: (e: number) => void;
};

const FarkList = (props: Props) => {
  const handleAccept = async () => {
    try {
      await axios.put(`/api/fark/status/${props.id}`);
      props.setRefreshKey(props.refreshKey + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = async () => {
    try {
      await axios.delete(`/api/fark/${props.id}`);
      props.setRefreshKey(props.refreshKey + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-slate-100 w-full bottom-0 p-5 rounded-xl shadow-lg space-y-2">
      <div className="flex items-center space-x-2">
        <div className="font-bold">Menu</div>
        <div>{props.menu}</div>
      </div>
      <hr className="border-[1.5px] border-slate-300"></hr>
      <div>
        <div className="flex items-center space-x-2">
          <div className="font-bold">Location</div>
          <div>{props.location}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="font-bold">Phone</div>
          <div>{props.phone}</div>
        </div>
        {props.status ? (
          <></>
        ) : (
          <div className="w-full flex relative justify-between pt-2">
            <button
              className="btn left-0 md:w-24 h-6 w-[95px] bg-emerald-300 text-black"
              type="submit"
              onClick={() => {
                handleAccept();
              }}
            >
              accept
            </button>
            <button
              className="btn left-0 md:w-24 h-6 w-[95px] right-4 bg-red-400 text-black"
              onClick={() => {
                handleCancel();
              }}
              type="submit"
            >
              cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarkList;
