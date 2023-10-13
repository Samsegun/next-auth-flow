"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user.newPassword.length > 0 && user.confirmPassword.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const onReset = async () => {
        try {
            setLoading(true);

            const token = window.location.search.split("=")[1];
            // send request
            const response = await axios.post("/api/users/resetpassword", {
                ...user,
                token,
            });

            console.log(response.data.message);

            toast.success(
                "Password reset successful! You can now log in with new password"
            );
        } catch (error: any) {
            toast.error(
                `Could not reset password. Please try again! (${JSON.stringify(
                    error.response.data.error
                )})`,
                {
                    position: "top-right",
                }
            );

            console.log(error.response.data);
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
                    {loading ? "Loading..." : "Reset Password"}
                </h1>

                <label htmlFor='newpassword' className='block'>
                    Enter New Password:
                </label>
                <input
                    type='password'
                    id='newpassword'
                    value={user.newPassword}
                    onChange={e =>
                        setUser({ ...user, newPassword: e.target.value })
                    }
                    placeholder='Enter new password'
                    className='p-2 focus:outline-none focus:border-blue-600 mb-4 rounded-lg'
                />
                <label htmlFor='confirmpassword' className='block'>
                    Confirm Password:
                </label>
                <input
                    type='password'
                    id='confirmpassword'
                    value={user.confirmPassword}
                    onChange={e =>
                        setUser({ ...user, confirmPassword: e.target.value })
                    }
                    placeholder='Confirm password'
                    className='p-2 focus:outline-none focus:border-blue-600 mb-4 rounded-lg'
                />

                <button
                    className='p-2 block bg-white rounded-lg disabled:cursor-not-allowed'
                    onClick={onReset}
                    disabled={buttonDisabled}>
                    Reset Password
                </button>

                <div className='flex items-center gap-4'>
                    <Link href='/login' className='my-4 block text-amber-800'>
                        Go to Log in page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
