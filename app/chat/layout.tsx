"use client"

import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { Data, Data2 } from '../_context/Context';
import { auth, db } from '../_config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import PPaa from './[chatid]/page';
import { FaAlignJustify } from "react-icons/fa6";
import { onAuthStateChanged } from 'firebase/auth';
function parent({ children }: any) {




    useEffect(() => {
        const test = onAuthStateChanged(auth, (user3) => {
            if (!user3) {
                setTimeout(() => {
                    window.open("/", "_parent")

                }, 2500)
            }
        })

        return () => {
            test()
        }
    }, [])


    let user: any = useContext(Data);

    let [data, setData]: any = useState([]);


    const chatsfunc = async () => {
        if (user[0] !== undefined) {
            let t: any = (await getDoc((doc(db, "userschat", user[0]?.id)))).data();
            console.log(t);
            setData([...data, ...t.chat]);
        }
    };

    // let arr = []
    // let [chatdata, setDatachat]: any = useState([]);
    // let [information, setInformation]: any = useState({});
    // const createchat = async (id: any) => {
    //     // const getchatid: any = (await getDoc((doc(db, "chats", id.chatid)))).data();
    //     setInformation({
    //         name: id.name,
    //         image: id.image,
    //         id: id.chatid,
    //         mass: [],
    //     })
    // }
    useEffect(() => {
        chatsfunc();
    }, [user[0]])




    let [open, setOpen] = useState(false)

    let [l222l, setl222l] = useState(false)


    let l222l2: any = ""
    useEffect(() => {
        l222l2 = localStorage.getItem("darkmode")
        setl222l(JSON.parse(l222l2));
    }, [])

    return (
        <div className="parent flex">
            <div className="cont flex w-full h-[calc(100vh-150px)]">
                <div className={`list_chat w-[350px] bg-white px-[30px] py-[10px] ${!open ? "max-sm:w-0 max-sm:p-0" : "max-sm:absolute max-sm:w-full max-sm:h-full max-sm:z-50"} `} style={l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
                    <div className="e1 max-sm:absolute max-sm:right-[10px] max-sm:mt-[9px] max-sm:text-[25px] hidden max-sm:block">
                        <div className="icon_moble" onClick={() => {
                            !open ? setOpen(true) : setOpen(false)
                            console.log(open)
                        }}>
                            <FaAlignJustify />
                        </div>

                    </div>
                    <div className={`e2  ${open ? "max-sm:block" : "max-sm:hidden"}`}>
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

                                            <Link href={`/chat/${a.chatid}`} className="element flex p-[10px] my-[20px]  border-b-[1px] border-b-[#ddd]  items-center " onClick={() => {
                                                open ? setOpen(false) : setOpen(true)
                                            }}>
                                                <div className="imgae w-[45px] h-[45px] bg-red-600 rounded-full mr-[20px] overflow-hidden">
                                                    <img src={a.image} alt="" />
                                                </div>
                                                <div className="text">
                                                    <h1 className='uppercase text-[19px] font-[500]'>{a.name}</h1>
                                                    <span className='last_massege text-[14px] text-slate-400'>{a.lastmassege}</span>
                                                </div>
                                            </Link>


                                        </>
                                    ))}
                                </>
                            ) :
                                null}

                        </div>
                    </div>
                </div>

                <div className="window w-full h-full" >
                    {children}
                </div>
            </div>
        </div>



    )
}

export default parent
