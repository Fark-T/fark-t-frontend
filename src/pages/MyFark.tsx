import { useEffect, useState } from "react";
import FarkCard from "../components/FarkCard";
import Container from "../layouts/Container";
import axios from "axios";

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
  const [farkData, setFarkData] = useState<MyFarkType>();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "/api/fark/myfark/b05fb3b6-e601-11ed-bae7-0242ac120003"
      );
      if (res.status === 200) {
        console.log(res.data);
      }
    };
    fetch();
  }, []);


  return (
    <Container>
      <div className="flex flex-wrap gap-8 justify-center w-full h-full overflow-auto pb-20">
        <FarkCard menu={""} status={false} fname={""} lname={""} phone={""} />
      </div>
    </Container>
  );
};

export default MyFark;
