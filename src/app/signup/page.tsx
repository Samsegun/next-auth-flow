"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.username.length > 0 &&
            user.password.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async () => {
        try {
            setLoading(true);

            // send request
            const response = await axios.post("/api/users/signup", user);
            console.log("sign up success", response.data);

            // redirect to login page
            router.push("/login");
        } catch (error: any) {
            toast.error(`you've a sign up error (${error.message})`, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-[400px] h-[400px] bg-slate-400 text-black p-4 rounded-lg'>
                <Toaster />
                <h1 className='text-center text-2xl'>
                    {loading ? "Loading..." : "Sign Up"}
                </h1>

                <label htmlFor='username' className='block'>
                    Username:
                </label>
                <input
                    type='text'
                    id='username'
                    value={user.username}
                    onChange={e =>
                        setUser({ ...user, username: e.target.value })
                    }
                    placeholder='Enter username'
                    className='p-2 focus:outline-none focus:border-blue-600 mb-4 rounded-lg'
                />

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
                    onClick={onSignup}
                    disabled={buttonDisabled && true}>
                    Sign Up
                </button>

                <Link href='/login' className='my-4 block text-amber-800'>
                    Go to Login page
                </Link>
            </div>
        </div>
    );
};

export default SignupPage;
