import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import Container from "../layouts/Container";
import axios from "axios";

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
};

const MyOrder = () => {
  const [orderData, setOrderData] = useState<MyOrderType[]>();

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const res = await axios.get(
          "/api/myorder/2eeba757-e5ac-11ed-bae7-0242ac120003"
        );
        if (res.status === 200) {
          setOrderData(res.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    };
    getMyOrders();
  }, []);

  return (
    <Container>
      <div className="flex flex-wrap gap-8 justify-center w-full h-full overflow-auto pb-20">
        {orderData?.map((order: MyOrderType) => {
          return (
            <OrderCard
              key={order.id}
              id={order.id}
              restaurant={order.restaurant}
              category={order.category}
              limit={order.limit}
              count={order.count}
              status={order.status}
              userId={order.user.id}
            />
          );
        })}
      </div>
      
    </Container>
  );
};

export default MyOrder;
