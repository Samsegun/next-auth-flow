"use client";

import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/user");
        console.log(res.data);

        setData(res.data.data._id);
    };

    const logOut = async () => {
        try {
            const response = await axios.post("/api/users/logout");
            console.log(response);

            router.push("/login");
        } catch (error: any) {
            toast.error(`you've a log out error (${error.message})`, {
                position: "top-right",
            });
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-[400px] h-[400px] bg-slate-400 text-black p-4 rounded-lg'>
                <h1>Profile</h1>

                <hr />
                <p>Profile page</p>

                <hr />
                <h2 className='bg-teal-400 p-2'>
                    {data === "nothing" ? (
                        "Nothing"
                    ) : (
                        <Link href={`/profile/${data}`}>{data}</Link>
                    )}
                </h2>

                <button
                    className='p-2 mt-2 bg-white block'
                    onClick={getUserDetails}>
                    Get User Details
                </button>

                <button className='p-2 mt-2 bg-white' onClick={logOut}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
