import { useEffect, useState } from "react";
import FarkCard from "../components/FarkCard";
import Container from "../layouts/Container";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

type MyFarkType = {
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
const MyFark = () => {
  const [farkData, setFarkData] = useState<MyFarkType[]>();
  const { user } = useAuth();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/api/fark/myfark/${user?.id}`);
      if (res.status === 200) {
        setFarkData(res.data);
      }
    };
    fetch();
  }, []);

  return (
    <Container>
      <div className="flex flex-wrap gap-8 justify-center w-full h-full overflow-auto pb-20">
        {farkData?.map((fark) => {
          return (
            <FarkCard
              menu={fark.menu}
              status={fark.status}
              fname={fark.order.user.fname}
              lname={fark.order.user.fname}
              phone={fark.order.user.phone}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default MyFark;
