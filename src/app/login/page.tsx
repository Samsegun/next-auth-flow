"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);

            // send request
            const response = await axios.post("/api/users/login", user);
            console.log("log in success", response.data);

            // redirect to login page
            router.push("/profile");
        } catch (error: any) {
            toast.error(`you've a log in error (${error.message})`, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Toaster />
            <div className='w-[400px] h-[400px] bg-slate-400 text-black p-4 rounded-lg'>
                <h1 className='text-center text-2xl'>
                    {" "}
                    {loading ? "Loading..." : "Log In"}
                </h1>

                <label htmlFor='email' className='block'>
                    email:
                </label>
                <input
                    type='email'
                    id='email'
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    placeholder='Enter email'
                    className='p-2 focus:outline-none focus:border-blue-600 mb-4 rounded-lg'
                />
                <label htmlFor='password' className='block'>
                    password:
                </label>
                <input
                    type='password'
                    id='password'
                    value={user.password}
                    onChange={e =>
                        setUser({ ...user, password: e.target.value })
                    }
                    placeholder='Enter password'
                    className='p-2 focus:outline-none focus:border-blue-600 mb-4 rounded-lg'
                />

                <button
                    className='p-2 block bg-white rounded-lg disabled:cursor-not-allowed'
                    onClick={onLogin}
                    disabled={buttonDisabled && true}>
                    Login
                </button>

                <Link href='/signup' className='my-4 block text-amber-800'>
                    Go to Sign Up page
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
