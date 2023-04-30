import React, { useEffect, useState } from 'react';
import { FaRegUserCircle, FaUserCircle, FaPhoneAlt, FaBitcoin } from 'react-icons/fa';
import Container from '../layouts/Container';
import { IconContext } from 'react-icons';
import axios from "axios";

type MyProfileType = {
    id: string;
    username: string;
    fname: string;
    lname: string;
    phone: string;
    coin: number;
};

const MyProfile = () => {
    const [profileData, setProfileData] = useState<MyProfileType>();
    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const res = await axios.get(`/api/users/current`);
                if (res.status === 200) {
                    setProfileData(res.data);
                    console.log(res.data);
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
        getMyProfile();
    }, []);
    return (
        <Container>
            <div className="flex flex-col items-center place-content-center justify-center pt-10">
                <div className=''>
                    <IconContext.Provider value={{ size: "150" }}>
                        <FaUserCircle />
                    </IconContext.Provider>

                </div>
                <div className="flex flex-col items-center justify-center font-bold w-full">
                    <div className='mt-5 mb-5'>
                        <h2 className="text-4xl font-bold ">{profileData?.username}</h2>
                    </div>
                    <div className='flex-col space-y-3'>
                        <div className='flex items-center space-x-2'>
                            <h3><FaRegUserCircle />  </h3>
                            <h3 className="text-gray-600 text-lg">{profileData?.fname} {profileData?.lname}</h3>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <h3><FaPhoneAlt /> </h3>
                            <h3 className="text-gray-600 text-lg">{profileData?.phone}</h3>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <h3><FaBitcoin /></h3>
                            <h3 className="text-gray-600 text-lg"> {profileData?.coin}</h3>
                        </div>
                    </div>





                </div>
            </div>
        </Container>
    );
};

export default MyProfile;