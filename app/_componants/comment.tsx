"use client"
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../_config/firebase';
import { TbH2 } from 'react-icons/tb';

interface props {
    id: string,
    name: string,
    comment: string,
    image: string,
    postid: string,
    l222l: boolean
}
function Comment(props: props) {
    let [Namecomment, setNamecomment] = useState("");
    let [Imagecomment, setImagecomment] = useState("");
    useEffect(() => {
        const comments = async () => {
            let t: any = await (await getDoc((doc(db, "posts", `${props.postid}`)))).data();
            let t2 = t?.comments.filter((e: { id: string }) => e.id === props.id);
            let t3: any = await (await getDoc((doc(db, "users", `${t2[0]?.id}`)))).data();
            setNamecomment(t3?.username)
            setImagecomment(t3?.image)
        }
        comments()
    }, [props.postid])
    return (
        <div className="comment p-[15px] text-justify bg-slate-400 rounded-[26px] my-[15px]" style={props.l222l ? { backgroundColor: "#18191a", color: "white" } : { borderTopLeftRadius: "0" }} >
            <div className="profile flex items-center mb-4">
                <div className="image_profile w-[30px] h-[30px] bg-red-600 rounded-full overflow-hidden">
                    <img src={Imagecomment} alt="" />
                </div>
                <div className="user ml-4">
                    <h1>{Namecomment}</h1>
                    <span>User</span>
                </div>
            </div>
            <div className="content">
                <p>{props.comment}</p>
            </div>
        </div>
    )
}

export default Comment
