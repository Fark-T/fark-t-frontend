import { Fragment, useEffect, useState } from "react";
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
const Order = () => {
  const [orderData, setorderData] = useState<MyOrderType[]>();
  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const res = await axios.get("/api/order");
        if (res.status === 200) {
          setorderData(res.data);
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
      <div className="flex justify-center md:flex-row flex-col space-y-10 md:space-y-0 flex-wrap md:gap-10 ">
        {orderData?.map((order: MyOrderType) => {
          return (
            <Fragment key={order.id}>
              <OrderCard
                id={order.id}
                restaurant={order.restaurant}
                category={order.category}
                limit={order.limit}
                count={order.count}
                status={order.status}
                userId={order.user.id}
              />
            </Fragment>
          );
        })}
      </div>
    </Container>
  );
};

export default Order;
