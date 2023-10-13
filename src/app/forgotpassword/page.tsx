"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const onRecover = async () => {
        try {
            setLoading(true);

            // send request
            const response = await axios.post("/api/users/forgotpassword", {
                email,
            });
            console.log(response.data);

            toast.success("Check your mail box for reset link");
        } catch (error: any) {
            toast.error(
                `An error occurred! Please try again. (${error.message})`,
                {
                    position: "top-right",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email]);

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Toaster />
            <div className='w-[400px] h-[400px] bg-slate-400 text-black p-4 rounded-lg'>
                <h1>{loading ? "Loading..." : "Reset Password"}</h1>

                <label htmlFor='email' className='block mb-2'>
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value.trim())}
                    placeholder='Enter email'
                    className='p-2 focus:outline-none focus:border-blue-600 mb-4 rounded-lg'
                />

                <button
                    className='p-2 block bg-white rounded-lg disabled:cursor-not-allowed'
                    onClick={onRecover}
                    disabled={buttonDisabled}>
                    Recover
                </button>

                <div className='flex items-center gap-4'>
                    <Link href='/login' className='my-4 block text-amber-800'>
                        Log in
                    </Link>
                    |
                    <Link href='/signup' className='my-4 block text-amber-800'>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
