
"use client"

import { db } from '@/app/_config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface props {
    l222l: boolean,
}
function FriendsFF(props: props) {

    let [NameFriend, setNameFriend] = useState("");
    let [ImageFriend, setImageFriend] = useState("");
    useEffect(() => {
        const comments = async () => {
            let t: any = await (await getDoc((doc(db, "users", `${props.id}`)))).data();
            setNameFriend(t?.username)
            setImageFriend(t?.image)
        }
        comments()

    }, [])
    return (
        <div className="friend w-[200px] bg-white flex flex-col items-center shadow-elementbefore p-5 rounded-xl transition-all hover:bg-[#77E4C8] hover:shadow-element" style={props.l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
            <div className="image w-[70px] h-[70px] bg-red-600 rounded-full   overflow-hidden">
                <img src={ImageFriend} alt="" />
            </div>

            <div className="text  mt-5 text-[15px] text-center  font-bold">
                <h1 className='uppercase'>{NameFriend}</h1>
                <span className='text-gray-500 text-[12px] font-[500] capitalize'>Friend</span>
            </div>
        </div>
    )
}

export default FriendsFF
