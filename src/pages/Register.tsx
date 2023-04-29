import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
const Register = () => {
  return (
    <div className="w-screen min-h-screen bg-[#1C6758] flex flex-col justify-center items-center">
      <div className="flex overflow-hidden flex-row md:w-full w-5/6 max-w-[110rem] md:min-h-[48rem] min-h-[40rem] rounded-2xl shadow">
        <div className="flex flex-col flex-auto bg-white p-8">
          <div className="flex text-3xl md:justify-start justify-center items-center font-bold space-x-1">
            <div>
              <IoFastFoodOutline />
            </div>
            <div>FARK-T</div>
          </div>
          <div className="flex flex-col items-center md:pt-20 pt-10">
            <div className="flex flex-col md:pb-5 pb-2 space-y-1 md:items-center items-start">
              <div className="md:text-4xl text-3xl font-bold">Create an account</div>
              <div className="">Already A Member? <Link to={"/login"} className="text-blue-600 font-medium cursor-pointer">Log In</Link></div>
            </div>
            <form className="flex flex-col">
              <div className="flex flex-col py-2">
                <label className="pb-1">Name</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter your name"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>
              <div className="flex flex-col py-2">
                <label className="pb-1">Email</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter your email"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>
              <div className="flex flex-col py-2">
                <label className="pb-1">Password</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="*********"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>
            </form>
            <button
              type="submit"
              className="bg-[#D6CDA4] md:w-[420px] w-64 h-10 rounded-md mt-5 mb-2 font-bold text-white hover:bg-[#FA9884] transition duration-300"
            >
              Create an account
            </button>
          </div>
        </div>
        <div className="bgLogin w-2/3 rounded-r-lg md:block hidden"></div>
      </div>
    </div>
  );
};

export default Register;
