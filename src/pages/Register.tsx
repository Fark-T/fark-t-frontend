import axios from "axios";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    fname: yup.string().required(),
    lname: yup.string().required(),
    phone: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const Register = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("/api/Auth/register", data);
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

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
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col py-2">
                <label className="pb-1">First name</label>
                <input
                  type="text"
                  id=""
                  {...register("fname")}
                  placeholder="Enter your first name"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>
              <div className="flex flex-col py-2">
                <label className="pb-1">Last name</label>
                <input
                  type="text"
                  id=""
                  {...register("lname")}
                  placeholder="Enter your last name"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>
              <div className="flex flex-col py-2">
                <label className="pb-1">Username</label>
                <input
                  type="text"
                  id=""
                  {...register("username")}
                  placeholder="Enter your username"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>
              <div className="flex flex-col py-2">
                <label className="pb-1">Password</label>
                <input
                  type="password"
                  id=""
                  {...register("password")}
                  placeholder="*********"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>
              <div className="flex flex-col py-2">
                <label className="pb-1">Phone number</label>
                <input
                  type="tel"
                  id=""
                  pattern="[0-9]{10}"
                  {...register("phone")}
                  placeholder="1234567890"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>      
            <button
              type="submit"
              className="bg-[#D6CDA4] md:w-[420px] w-64 h-10 rounded-md mt-5 mb-2 font-bold text-white hover:bg-[#FA9884] transition duration-300"
            >
              Create an account
            </button>
            </form>
          </div>
        </div>
        <div className="bgLogin w-2/3 rounded-r-lg md:block hidden"></div>
      </div>
    </div>
  );
};

export default Register;
