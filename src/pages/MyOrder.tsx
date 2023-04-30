import { useEffect, useState } from "react";
import MyOrderCard from "../components/MyOrderCard";
import Container from "../layouts/Container";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const res = await axios.get(`/api/myorder/${user?.id}`);
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
  }, [refreshKey, setRefreshKey]);

  return (
    <Container>
      <div className="flex flex-wrap gap-8 justify-center w-full overflow-auto pb-20">
        {orderData?.map((order: MyOrderType) => {
          return (
            <MyOrderCard
              key={order.id}
              id={order.id}
              restaurant={order.restaurant}
              category={order.category}
              limit={order.limit}
              count={order.count}
              status={order.status}
              user={order.user}
              refreshKey={refreshKey}
              setRefreshKey={setRefreshKey}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default MyOrder;
