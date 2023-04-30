import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  userID: yup.string(),
  restaurant: yup.string().required(),
  category: yup.string().required(),
  limit: yup.number().min(1).positive().required(),
});
type FormData = yup.InferType<typeof schema>;
const NewOrder = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    data.userID = user?.id;
    try {
      await axios.post("/api/order/create", data);
      navigate("/myorder", {replace:true})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-40 flex justify-center">
      <div className="w-[40rem] h-[30rem] md:m-0 m-5 shadow-xl flex flex-col items-center  rounded-lg">
        <div className="w-full md:text-4xl text-3xl font-bold p-10 flex justify-center bg-[#3D8361] text-white rounded-t-lg">
          <h1>Creater Your Order</h1>
        </div>
        <div className="flex flex-col justify-center h-full">
          <form className="space-y-2 pb-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className="font-medium">Restaurant</label>
              <input
                type="text"
                id="restaurant"
                {...register("restaurant")}
                placeholder="Restaurant"
                className="rounded-md border-2 md:w-[420px] w-72 h-10 placeholder-shown:border-[#EEF2E6] placeholder: ps-2"
              />
            </div>
            <div className="flex space-x-3 pb-5">
              <div className="flex flex-col w-full">
                <label htmlFor="category" className="font-medium">
                  Categories
                </label>
                <select
                  {...register("category")}
                  id="category"
                  className="border-2 rounded-md h-10 text-center"
                >
                  <option value="" disabled selected>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Drink">Drink</option>
                
                </select>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="limit" className="font-medium">
                  Limit
                </label>
                <select
                  {...register("limit")}
                  id="limit"
                  className="border-2 rounded-md h-10 text-center"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md border-2 border-[#D6CDA4] md:w-[420px] w-64 h-10 text-[#D6CDA4] font-bold hover: hover:bg-[#D6CDA4] hover:text-white transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
