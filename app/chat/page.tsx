"use client"
import React, { useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";

function page() {



    let [l222l, setl222l] = useState(false)


    let l222l2: any = ""
    useEffect(() => {
        l222l2 = localStorage.getItem("darkmode")
        setl222l(JSON.parse(l222l2));
    }, [])


    return (
        <div className="parent flex">
            <div className="cont flex w-full h-[calc(100vh-150px)]">
                <div className="grid w-full  place-content-center bg-white px-4" style={l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>
                    <div className="text-center flex flex-col items-center" >
                        <h1 className="text-9xl font-black text-gray-200 mb-4"><BsFillSendFill /></h1>

                        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl" style={l222l ? { color: "white" } : {}}>select the chat</p>

                        <p className="mt-4 text-gray-500">Start Chat With any your friends </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
