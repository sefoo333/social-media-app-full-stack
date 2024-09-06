"use client"

import { db } from '@/app/_config/firebase';
import { Data } from '@/app/_context/Context';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import Massege from './massege';


function Chat(props: { name: string, image: string, id: string, mass: string[] }) {

    let [mass, setmass]: any = useState([]);
    let user: any = useContext(Data);

    let arr = []

    useEffect(() => {

        setmass([]);
        const getData = async () => {
            let t: any = await (await getDoc((doc(db, "chats", `${props.id}`)))).data();
            if (t?.chatmassege?.length > 0 && t.chatmassege !== undefined) {
                arr.push(...t.chatmassege)
                setmass([...mass, ...arr])
                console.log(mass)
            } else {
                setmass([...mass])
            }
        }

        getData();

    }, [props.id])

    useEffect(() => {
        const upload = async () => {
            if (mass.length > 0) {
                await updateDoc(doc(db, "chats", props.id), {
                    chatmassege: mass
                })
            }
        }


        upload()
    }, mass)

    console.log(props)

    return (
        <>

            {props.id !== undefined ? (
                <div className="chat_window w-full flex flex-col justify-between">
                    <div className="header h-[50px] bg-white">
                        <div className="user_talking flex items-center">
                            <div className="image w-[30px] h-[30px] bg-blue-600 rounded-full mr-[15px]  overflow-hidden">
                                <img src={props.image} alt="" />
                            </div>
                            <div className="text">
                                <h1>{props.name}</h1>
                                <span className='text-[13px]'>Friend</span>
                            </div>
                        </div>
                    </div>
                    <div className="masseges overflow-y-scroll block h-[500px]">
                        <div className="window  flex flex-col gap-5 justify-end p-[20px] ">
                            {mass.map((e: any) => (
                                <div className="massege w-fit relative">
                                    <Massege
                                        key={e.name}
                                        name={e.name}
                                        value={e.value}
                                        id={props.id}
                                        mass={mass}

                                    />
                                    {e.name === user[0]?.username ? (
                                        <div className="test w-[67px] h-1/2 right-0 top-1/2 cursor-pointer translate-y-[-50%] absolute" onClick={() => {
                                            setmass(mass.filter((ea: { value: string }) => ea.value !== e.value))
                                            console.log(mass)
                                        }}></div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="under p-[20px] bg-white" onSubmit={(e?: any) => {
                        e.preventDefault()
                        mass.push({
                            value: e.target[0].value,
                            name: user[0]?.username,
                        })
                        setmass([...mass])
                        e.target[0].value = ""
                        console.log(mass)
                    }}>
                        <form action="" className='flex'>
                            <input className='outline-none border-none w-full' type="text" placeholder='type a massege' />
                            <div className="send_masseges flex items-center">
                                {/* <FaImages className='cursor-pointer text-[18px] mr-4' /> */}
                                <input type="submit" className='cursor-pointer' value="Send" />
                            </div>
                        </form>
                    </div>
                </div>
            ) :
                <div className="grid w-full  place-content-center bg-white px-4">
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

export default Chat
