
"use client"

import React, { useContext, useEffect, useState } from 'react'
import FriendsFF2 from './friends/friendforhome'
import { Data, Data2 } from '../_context/Context'
import FriendShare from './friendshare'
import { IoClose } from "react-icons/io5";


function Share(props: { id: string }) {
    let [l222l, setl222l] = useState(false)
    const user: any = useContext(Data2)

    let l222l2: any = ""
    useEffect(() => {
        l222l2 = localStorage.getItem("darkmode")
        setl222l(JSON.parse(l222l2));
    }, [])


    return (
        <div className="rounded-lg bg-white p-8 shadow-2xl fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-50 w-fit h-fit" style={l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>
            <h2 className="text-[15px] font-bold ">Link Post</h2>

            <p className="mt-2 p-[10px] text-sm text-gray-500 rounded-xl " style={l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
                {location.host}/post/{props.id}
            </p>

            <div className="send_c mt-[20px]">
                <h1 className='text-[21px] font-semibold'>Send to chat</h1>
                {user?.map((e: { id: string }) => (
                    <div className="mt-4 flex gap-2">
                        <FriendShare l222l={l222l} id={e.id} postid={props.id} />
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Share
