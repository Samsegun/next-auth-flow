"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { axios } from "axios";

const SignupPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => {
        console.log("sign up!");
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-[400px] h-[400px] bg-slate-400 text-black p-4 rounded-lg'>
                <h1 className='text-center text-2xl'>Sign Up</h1>

                <form>
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
                        onClick={onSignup}>
                        Signup
                    </button>

                    <Link href='/login' className='my-4 block text-amber-800'>
                        Go to Login page
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
