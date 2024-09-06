import { db } from '@/app/_config/firebase';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../_context/Context';

interface props {
    id: string,
    postid: string,
    l222l: boolean,
}

function FriendShare(props: props) {
    let user: any = useContext(Data)

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


    const Send = async () => {
        let filter = []
        let t: any = await (await getDoc((doc(db, "userschat", `${user[0]?.id}`)))).data();
        filter = t?.chat?.filter((e: { id: string }) => e.id === props.id);
        let t2 = await (await getDoc((doc(db, "chats", `${filter[0]?.chatid}`)))).data();
        await updateDoc(doc(db, "chats", filter[0]?.chatid), {
            chatmassege: arrayUnion({
                id: user[0]?.id,
                name: user[0]?.username,
                sendTime: Date.now(),
                value: `
                Show this post !
                ${location.host}/post/${props.postid}
                `,
            })
        })
    }


    return (
        <div className="element flex p-[10px] items-center w-[250px] justify-between" style={props.l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
            <div className="t1 flex items-center">
                <div className="image w-[40px] h-[40px] rounded-full mr-[10px] bg-slate-600 overflow-hidden" >
                    <img src={ImageFriend} alt="" />
                </div>
                <div className="main_text text-nowrap">
                    <h1>{NameFriend}</h1>
                    <span className="text-[#ccc] text-[13px]">Friend</span>
                </div>
            </div>
            <div className="t2">
                <a
                    className="inline-block rounded bg-buttons p-[10px] text-[12px] font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-buttons"
                    href="#"
                    onClick={() => {
                        Send();
                    }}
                >
                    Send
                </a>
            </div>
        </div>
    )
}

export default FriendShare
