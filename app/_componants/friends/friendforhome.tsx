import { db } from '@/app/_config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

interface props {
    id: string,
    l222l: boolean,
}

function FriendsFF2(props: props) {

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
        <div className="element flex p-[10px] items-center w-[250px]" style={props.l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
            <div className="image w-[40px] h-[40px] rounded-full mr-[10px] bg-slate-600 overflow-hidden" >
                <img src={ImageFriend} alt="" />
            </div>
            <div className="main_text text-nowrap">
                <h1>{NameFriend}</h1>
                <span className="text-[#ccc] text-[13px]">Friend</span>
            </div>
        </div>
    )
}

export default FriendsFF2
