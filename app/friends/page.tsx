"use client"

import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react'
import { auth, db } from '../_config/firebase';
import { Data, Data2, Data3 } from '../_context/Context';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';




function friends() {
    const userdata = useContext(Data2)
    const userdata2 = useContext(Data3)
    useEffect(() => {
        const test2 = onAuthStateChanged(auth, (user2) => {
            if (user2) {
                console.log('loged')
            } else {
                console.log("error")
                window.open("/", "_parent")
            }
        })

        return () => {
            test2()

        }
    }, [])
    let user: any = useContext(Data);


    let user3 = []
    let object = Object.assign({}, user[0]);
    user3.push(object, user[1])

    let arr = []
    let friendnew: any = []
    let requests2 = []
    const addFriend = async (id: string, request: any, idRequest: string, idsender: any) => {
        let t: any = await (await getDoc((doc(db, "users", `${idsender}`)))).data();
        requests2 = [...user3[0].requests];
        requests2 = requests2.filter((e: any) => e.id !== idRequest);
        friendnew.push(...t.friends, {
            namefriend: request.name,
            id: request.id,
            image: request.image,
        })
        await updateDoc(doc(db, "users", `${id}`), {
            friends: friendnew,
            requests: requests2,
        })


    }

    let chats = []

    const addtochat = async (id: string) => {
        let t: any = await (await getDoc((doc(db, "userchats", `${id}`)))).data();

        console.log(t)
        chats.push({
            chatid: `chat-${Date.now()}`,
            lastmassege: "",
        })
        await setDoc(doc(db, "userchats", id), {
            chat: chats
        })
    }

    let friendnew2 = []
    const addfromother = async (id: string, idother: string) => {
        const getdatanewfriend: any = (await getDoc(doc(db, "users", idother))).data();
        const getdatanewfriend2: any = (await getDoc(doc(db, "users", id))).data();
        console.log(getdatanewfriend);
        friendnew2.push(...getdatanewfriend2.friends, {
            namefriend: getdatanewfriend.username,
            id: getdatanewfriend.id,
            image: getdatanewfriend.image,
        })
        await updateDoc(doc(db, "users", id), {
            friends: friendnew2,
        })
    }



    const addToChat = async (you: string, theuser: { name: string; image: string; id: string; }) => {
        let t: any = await (await getDoc((doc(db, "userschat", `${you}`)))).data();
        arr.push(...t.chat, {
            chatid: `chat-${Date.now()}`,
            lastmassege: "",
            name: theuser.name,
            image: theuser.image,
            id: theuser.id
        })

        await updateDoc(doc(db, "userschat", `${you}`), {
            chat: arr,
        })
    }


    const addchatid = async (id: string, id2: string) => {
        let data1: any = (await getDoc((doc(db, "userschat", id)))).data();
        let filter1: any = data1.chat.filter((e: { id: string }) => e.id === id2);
        await setDoc(doc(db, "chats", filter1[0].chatid), {
            chatmassege: [],
            createdAt: new Date(),
        })
    }

    const cancel = async (id: string, id2: string) => {
        let t: any = await (await getDoc((doc(db, "users", `${id}`)))).data();
        let filter_t = t.requests.filter((e: { id: string }) => e.id !== id2);

        await updateDoc(doc(db, "users", id), {
            requests: filter_t
        })
    }


    return (
        <div className="parent px-[50px] flex flex-col ">
            <div className="one">
                <div className="main px-[15px] py-[10px] uppercase font-[600] border-b-[2px] my-3 w-[250px] text-[25px] border-b-black">
                    <h1>Friends List</h1>
                </div>
                <div className="list my-[80px]">
                    <div className="list grid grid-cols-5 items-center justify-center  gap-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-2xl:justify-items-center">
                        {userdata.map((e: any) => (
                            <Link href={`/${e.id}`}>
                                <div className="friend w-[200px] bg-white flex flex-col items-center shadow-elementbefore p-5 rounded-xl transition-all hover:bg-[#77E4C8] hover:shadow-element">
                                    <div className="image w-[70px] h-[70px] bg-red-600 rounded-full   overflow-hidden">
                                        <img src={e.image} alt="" />
                                    </div>

                                    <div className="text  mt-5 text-[15px] text-center  font-bold">
                                        <h1 className='uppercase'>{e.namefriend}</h1>
                                        <span className='text-gray-500 text-[12px] font-[500] capitalize'>Friend</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="two">
                <div className="main px-[15px] py-[10px] uppercase font-[600] border-b-[2px] my-3 w-[250px] text-[25px] border-b-black">
                    <h1>Requests List</h1>
                </div>
                <div className="list my-[80px]">
                    <div className="list grid grid-cols-5 items-center justify-center  gap-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-2xl:justify-items-center">
                        {userdata2.map((i: any) => (
                            <div className="element flex p-[10px] items-start w-[250px] flex-col">
                                <div className="sec flex">
                                    <div className="image w-[40px] h-[40px] rounded-full mr-[10px] bg-slate-600">
                                        <img src={i.image} alt="" />
                                    </div>
                                    <div className="main_text text-nowrap">
                                        <h1>{i.name}</h1>
                                        <span className="text-[#ccc] text-[13px]">Request</span>
                                    </div>
                                </div>
                                <div className="actions">
                                    <button className='py-[7px] px-[10px] bg-buttons ml-[10px] mt-[10px] rounded-[10px] uppercase text-white text-[12px] transition hover:bg-[#2697a0]' onClick={() => {
                                        console.log(user[0])
                                        addFriend(user3[0].id, i, i.id, i.idfriendsend)
                                        addfromother(i.id, i.idfriendsend)
                                        addToChat(user[0].id, i)
                                        setTimeout(() => {
                                            addchatid(user[0].id, i.id)
                                        }, 850)
                                        setTimeout(() => {
                                            location.reload()
                                        }, 1300)
                                    }}>Accept</button>
                                    <button className='py-[7px] px-[10px] bg-slate-50 border-[1px] border-buttons ml-[10px] mt-[10px] rounded-[10px] uppercase  text-[12px] transition hover:bg-buttons hover:text-white ' onClick={() => {
                                        cancel(user[0].id, i.id)
                                    }}>Decline</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default friends
