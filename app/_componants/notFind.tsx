import React from 'react'
import { TbMoodEmpty } from "react-icons/tb";

function NotFind(props: any) {
    return (
        <>
            <div className="grid h-full place-content-center  px-4">
                <div className="text-center flex flex-col items-center">
                    <h1 className="text-7xl font-black text-gray-200"><TbMoodEmpty /></h1>

                    <p className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl"> {props.name} is not have any friends</p>

                </div>
            </div>
        </>
    )
}

export default NotFind
