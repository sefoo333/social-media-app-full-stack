"use client"


import React, { useState, useEffect, useContext } from 'react'
import { BsChatDots } from "react-icons/bs";
import { IoHomeOutline, IoPersonAddOutline } from "react-icons/io5";
import Link from 'next/link';
import CreatePost from '../_componants/createPost';
import { signOut } from 'firebase/auth';
import { auth, db, } from '../_config/firebase';

import { onAuthStateChanged } from 'firebase/auth';
import Greeter from '../_componants/greeter';


import { collection, doc, deleteDoc, updateDoc, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { Data, Data2, Data3 } from '../_context/Context';
import Post from '../_componants/post';
import { ref } from 'firebase/storage';
import Loading from '../_componants/loading';

function page() {
    let user: any = useContext(Data);
    let friends: any = useContext(Data2);
    let requests: any = useContext(Data3);
    let [datapost, setPosts]: any = useState([]);

    let [data, setdata] = useState(false)

    let user3 = []
    let object = Object.assign({}, user[0]);
    user3.push(object, user[1])

    let arr: any = []

    useEffect(() => {

        const testyyyy = async () => {
            let querySnapshot = await getDocs(collection(db, "posts"))
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
                setPosts(arr)
            })
        };

        const test2 = onAuthStateChanged(auth, (user2) => {
            if (user2) {
                console.log('loged')
                setdata(true)
            } else {
                window.open("/", "_parent")
                setdata(false)
            }

        })

        return () => {
            test2()
            testyyyy()
        }
    }, [])
    let arrr3: any = []
    const comment = async (id: string, post: { comments: any[], commentsCount: number }, value: string) => {
        if (value !== "") {

            arrr3.push(...post.comments, {
                name: user[0].username,
                image: user[0].image,
                comment: value
            })
            await updateDoc(doc(db, "posts", `${id}`), {
                comments: arrr3,
                commentsCount: ++post.commentsCount,
            })
        }
    }

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
        <>
            {data ? (

                <div className="window flex justify-between max-sm:justify-center max-sm:items-center">
                    <div className="side_main max-sm:hidden  ">
                        <div className="flex h-screen w-16 flex-col justify-between border-e bg-white fixed">
                            <div>
                                <div className="inline-flex size-16 items-center justify-center">
                                    <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                                        User
                                    </span>
                                </div>

                                <div className="border-t border-gray-100">
                                    <div className="px-2">
                                        <div className="py-4">
                                            <Link
                                                href="/home"
                                                className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                                            >
                                                <IoHomeOutline />

                                                <span
                                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                                >
                                                    Home
                                                </span>
                                            </Link>
                                        </div>

                                        <ul className="space-y-1 border-t border-gray-100 pt-4">
                                            <li>
                                                <Link
                                                    href="/profile"
                                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="size-5 opacity-75"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>

                                                    <span
                                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                                    >
                                                        Profile
                                                    </span>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    href="/friends"
                                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="size-5 opacity-75"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                        />
                                                    </svg>

                                                    <span
                                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                                    >
                                                        Friends
                                                    </span>
                                                </Link>
                                            </li>



                                            <li>
                                                <Link
                                                    href="/chat"
                                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                >
                                                    <BsChatDots />

                                                    <span
                                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                                    >
                                                        Chat
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/friends"
                                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                                >
                                                    <IoPersonAddOutline />

                                                    <span
                                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                                    >
                                                        Requests
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                                <form action="#">
                                    <button
                                        onClick={() => {
                                            signOut(auth)
                                            localStorage.setItem("likes", JSON.stringify([]))
                                        }}
                                        type="submit"
                                        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5 opacity-75"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>

                                        <span
                                            className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                        >
                                            Logout
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="center  mt-[50px] max-sm:w-[330px] max-sm:flex max-sm:items-center max-sm:flex-col ">
                        <CreatePost />

                        <div className="posts  mt-6  p-7 rounded-3xl max-sm:w-full">



                            {datapost.length > 0 ?
                                datapost.map((a: any) => (
                                    <Post
                                        key={a.id}

                                        username={user3[0].username}
                                        imageofuser={user3[0].image}
                                        imageofpublisher={a.imageofpublisher}
                                        nameofpublish={a.nameofpublish}
                                        idofpublisher={a.idofpublisher}
                                        postname={a.postname}
                                        imagepost={a.imagepost}
                                        commentCount={a.commentsCount}
                                        comments={a.comments}
                                        likes={a.likes}
                                        element={a}
                                        id={a.id}

                                        source={user3[0].id}
                                    />
                                ))

                                :
                                null}


                        </div>
                    </div>

                    <div className="side_friends flex right-0 flex-col h-screen bg-slate-50 p-4 max-sm:hidden ">
                        <div className="friends_list">
                            <div className="main">
                                <h1 className='text-[25px] font-bold uppercase'>Friends</h1>
                            </div>
                            <div className="list">
                                {friends.map((e: any, index: number) => (
                                    <Link href={`/${e.id}`}>
                                        <div key={index} className="element flex p-[10px] items-center w-[250px]">
                                            <div className="image w-[40px] h-[40px] rounded-full mr-[10px] bg-slate-600 overflow-hidden" >
                                                <img src={e.image} alt="" />
                                            </div>
                                            <div className="main_text text-nowrap">
                                                <h1>{e.namefriend}</h1>
                                                <span className="text-[#ccc] text-[13px]">Friend</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="requests_list mt-[20px]">
                            <div className="main">
                                <h1 className='text-[25px] font-bold uppercase'>Requests</h1>
                            </div>
                            <div className="list">

                                {requests.map((i: any) => (
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


                </div >

            ) :
                (
                    <Loading />
                )
            }

            <Greeter name={user3[0].username} />

        </>
    )
}

export default page
