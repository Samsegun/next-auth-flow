"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { axios } from "axios";

const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {
        console.log("login!");
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-[400px] h-[400px] bg-slate-400 text-black p-4 rounded-lg'>
                <h1 className='text-center text-2xl'>Log In</h1>

                <form>
                    <label htmlFor='email' className='block'>
                        email:
                    </label>
                    <input
                        type='email'
                        id='email'
                        value={user.email}
                        onChange={e =>
                            setUser({ ...user, email: e.target.value })
                        }
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
                        className='p-2 block bg-white rounded-lg'
                        onClick={onLogin}>
                        Login
                    </button>

                    <Link href='/signup' className='my-4 block text-amber-800'>
                        Go to Sign page
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
