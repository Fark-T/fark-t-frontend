import { IoFastFoodOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { login } from "../service/user";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    await login({ ...data });
  
  };
  return (
    <div className="w-screen min-h-screen bg-[#1C6758] flex flex-col justify-center items-center">
      <div className="flex overflow-hidden flex-row md:w-full w-5/6 max-w-[110rem] md:min-h-[48rem] min-h-[40rem] rounded-2xl shadow-2xl">
        <div className="flex flex-col flex-auto bg-white p-8">
          <div className="flex text-3xl items-center font-bold space-x-1">
            <div>
              <IoFastFoodOutline />
            </div>
            <div>FARK-T</div>
          </div>
          <div className="flex flex-col items-center md:pt-20 pt-16">
            <div className="flex flex-col pb-5 space-y-1 items-center">
              <div className="text-4xl font-bold">Login</div>
              <div className="">Welcome back! Please enter your details.</div>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col py-2">
                <label className="pb-1">Username</label>
                <input
                  type="text"
                  {...register("username")}
                  id=""
                  placeholder="Enter your username"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>
              <div className="flex flex-col py-2">
                <label className="pb-1">Password</label>
                <input
                  type="password"
                  {...register("password")}
                  id=""
                  placeholder="Enter your password"
                  className="rounded-md border-2 md:w-[420px] w-64 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
                />
              </div>
              <button
                type="submit"
                className="bg-[#D6CDA4] md:w-[420px] w-64 h-10 rounded-md mt-5 mb-2 font-bold text-white hover:bg-[#FA9884] transition duration-300"
              >
                Login
              </button>
              <button
                type="submit"
                onClick={() => {
                  navigate("/register", { replace: true });
                }}
                className="border-2 border-[#D6CDA4]  md:w-[420px] w-64 h-10 rounded-md my-2 font-bold text-[#D6CDA4] hover:text-[#FA9884] hover:border-[#FA9884] transition duration-300 "
              >
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="bgLogin w-2/3 rounded-r-lg md:block hidden"></div>
      </div>
    </div>
  );
};

export default Login;
