"use client"

import { db } from '@/app/_config/firebase';
import { Data } from '@/app/_context/Context';
import { and, arrayRemove, arrayUnion, doc, getDoc, limit, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import Massege from '@/app/_componants/massege';
import { AiOutlineDeleteRow } from 'react-icons/ai';
import { deleteObject } from 'firebase/storage';
import Image from 'next/image';


function chat({ params }: any) {

    let [mass, setmass]: any = useState([]);
    let [current, setcurrent]: any = useState([]);
    let user: any = useContext(Data);

    let arr: any = []

    let [image, setImage] = useState("");
    let [name, setName] = useState("");

       useEffect(() => {
        const getData = async () => {
            let t: any = await (await getDoc((doc(db, "userschat", `${user[0]?.id}`)))).data();
            let filterr = t?.chat?.filter((e: { chatid: string }) => e.chatid === params.chatid)[0];
            let t2: any = await (await getDoc((doc(db, "users", `${filterr?.id}`)))).data();

            setImage(t2?.image)
            setName(t2?.username)
        }

            getData()
    }, [])

        return () => {
            getData()

        }
    }, [user])


    let [data, setData]: any = useState([])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", `${params.chatid}`), (doc: any) => {
            setcurrent([...current, ...doc?.data()?.chatmassege]);
        })
        console.log(data)
        return () => {
            unsub()
        }
    }, [params.chatid])

    const upload = async (e: any) => {
        let t: any = await (await getDoc((doc(db, "chats", `${params.chatid}`)))).data();

        await updateDoc(doc(db, "chats", params.chatid), {
            chatmassege: arrayUnion({
                value: e,
                name: user[0]?.username,
                id: `i-${Date.now()}`,
                sendTime: Date.now()
            })
        })

    }


    const removeData = async (id: string, name: string, sendTime: number, value: string) => {
        await updateDoc(doc(db, "chats", params.chatid), {
            chatmassege: arrayRemove({
                id: id,
                name: name,
                sendTime: sendTime,
                value: value,
            })
        })
    }
    let [l222l, setl222l] = useState(false)


    let l222l2: any = ""
    useEffect(() => {
        l222l2 = localStorage.getItem("darkmode")
        setl222l(JSON.parse(l222l2));
    }, [params.chatid])


    return (
        <>

            {params.chatid !== undefined ? (
                <div className="chat_window w-full flex flex-col justify-between h-full" >
                    <div className="header h-[50px] bg-white" style={l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
                        <div className="user_talking flex items-center">
                            <div className="image w-[30px] h-[30px] bg-blue-600 rounded-full mr-[15px]  overflow-hidden">
                                <img src={image} alt="" />
                            </div>
                            <div className="text">
                                <h1>{name}</h1>
                                <span className='text-[13px]'>Friend</span>
                            </div>
                        </div>
                    </div>

                    <div className="masseges overflow-y-scroll block h-full" style={l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>
                        <div className="system_massege my-[15px] mt-[75px]">
                            <div className="image flex justify-center">
                                <img src={image} alt="" className='w-[15%] rounded-full' />
                            </div>
                            <div className="text text-[15px] text-center">
                                <h1 className='text-[30px] uppercase font-bold'>{name}</h1>
                                <p>You are friend for {name} !</p>
                            </div>
                        </div>
                        <div className="window  flex flex-col gap-5 justify-end p-[20px] ">
                            {current.map((e: any) => (
                                <div className="massege w-fit relative">
                                    <Massege
                                        key={e.name}
                                        name={e.name}
                                        value={e.value}
                                        id={params.chatid}
                                        mass={mass}
                                        l222l={l222l}
                                    />
                                    {e.name === user[0]?.username ? (
                                        <div className="test w-[67px] h-1/2 right-0 top-1/2 cursor-pointer translate-y-[-50%] absolute" onClick={() => {
                                            removeData(e.id, e.name, e.sendTime, e.value)
                                        }}></div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="under p-[20px] bg-white " style={l222l ? { backgroundColor: "#242526", color: "white" } : {}} onSubmit={(e?: any) => {
                        e.preventDefault()
                        if (e.target[0].value !== "") {
                            upload(e.target[0].value);
                            e.target[0].value = ""
                            console.log(mass)
                        }
                    }}>
                        <form action="" className='flex'>
                            <input className='outline-none border-none w-full' type="text" placeholder='type a massege' style={l222l ? { backgroundColor: "#242526", color: "white" } : {}} />
                            <div className="send_masseges flex items-center">
                                {/* <FaImages className='cursor-pointer text-[18px] mr-4' /> */}
                                <input type="submit" className='cursor-pointer' value="Send" />
                            </div>
                        </form>
                    </div>
                </div>
            ) :
                <div className="grid w-full  place-content-center bg-black dark:bg-[#242526] dark:text-white  px-4" style={true ? { backgroundColor: "#18191a", color: "white" } : { color: "black" }}>
                    <div className="text-center flex flex-col items-center">
                        <h1 className="text-9xl font-black text-gray-200 mb-4"><BsFillSendFill /></h1>

                        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">select the chat</p>

                        <p className="mt-4 text-gray-500">Start Chat With any your friends </p>
                    </div>
                </div>
            }

        </>
    )
}

export default chat
