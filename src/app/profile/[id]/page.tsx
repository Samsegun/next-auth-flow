import React from "react";

interface Props {
    params: { id: string };
}

const ProfileId = ({ params }: Props) => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className='w-[400px] h-[400px] bg-slate-400 text-black p-4 rounded-lg'>
                <h1>Profile Id: {params.id}</h1>
            </div>
        </div>
    );
};

export default ProfileId;
