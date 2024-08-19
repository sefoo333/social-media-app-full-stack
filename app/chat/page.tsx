"use client"

import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { Data, Data2 } from '../_context/Context';
import { db } from '../_config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Chat from '../_componants/chat';

function parent() {






    let user: any = useContext(Data);

    let [data, setData]: any = useState([]);


    const chatsfunc = async () => {
        if (user[0] !== undefined) {
            let t: any = (await getDoc((doc(db, "userschat", user[0]?.id)))).data();
            console.log(t);
            setData([...data, ...t.chat]);
        }
    };

    let arr = []
    let [chatdata, setDatachat]: any = useState([]);
    let [information, setInformation]: any = useState({});
    const createchat = async (id: any) => {
        const getchatid = (await getDoc((doc(db, "chats", id.chatid)))).data();
        arr.push(getchatid)
        setDatachat([...chatdata, ...arr])
        console.log(chatdata)
        setInformation({
            name: id.name,
            image: id.image,
            id: id.chatid,
        })
    }
    useEffect(() => {
        chatsfunc();
    }, [user[0]])




    return (
        <div className="parent flex">
            <div className="cont flex w-full h-[calc(100vh-150px)]">
                <div className="list_chat w-[350px] bg-white px-[30px] py-[10px]">
                    <div className="main w-[200px] flex items-center  my-[20px]">
                        <div className="image w-[40px] h-[40px] bg-blue-600 rounded-full overflow-hidden">
                            {user[0] !== undefined ? (
                                <img src={user[0]?.image} alt="" />
                            ) :
                                null}
                        </div>
                        <h1 className='text-[30px] font-[600] uppercase px-[15px] py-[10px]'>Chat</h1>
                    </div>
                    <div className="list">
                        {data !== null ? (
                            <>
                                {data.map((a: any) => (
                                    <>

                                        <div className="element max-sm:hidden flex p-[10px] my-[20px]  border-b-[1px] border-b-[#ddd]  items-center " onClick={() => {
                                            createchat(a)
                                        }}>
                                            <div className="imgae w-[45px] h-[45px] bg-red-600 rounded-full mr-[20px] overflow-hidden">
                                                <img src={a.image} alt="" />
                                            </div>
                                            <div className="text">
                                                <h1 className='uppercase text-[19px] font-[500]'>{a.name}</h1>
                                                <span className='last_massege text-[14px] text-slate-400'>{a.lastmassege}</span>
                                            </div>
                                        </div>


                                    </>
                                ))}
                            </>
                        ) :
                            null}



                    </div>
                </div>

                <Chat image={information.image} name={information.name} id={information.id} />
            </div>
        </div>



    )
}

export default parent
