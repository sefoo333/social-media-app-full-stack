"use client"

import React, { useContext, useEffect } from 'react'
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { useState } from "react"
import { FaImages, FaRegCommentDots } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { auth, db } from '../_config/firebase';
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemoveSharp } from "react-icons/io5";

import { onAuthStateChanged } from 'firebase/auth';
import NotFind from '../_componants/notFind';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Post from '../_componants/post';
import { Data } from '../_context/Context';
function profile({ params }: any) {
    const data: any = useContext(Data)
    const [dat, SetData]: any = useState(null);
    let [datapost, setPosts]: any = useState([]);
    let [request, setRequest]: any = useState(false);

    useEffect(() => {
        const test2 = onAuthStateChanged(auth, (user2) => {
            if (user2) {
                console.log('loged')

            } else {
                window.open("/", "_parent")
            }

            console.log(user2)

        })

        return () => {
            test2()
        }
    }, [])
    const getData = async () => {
        const docRef = doc(db, "users", params.pro_friends);
        const docy = await getDoc(docRef);

        SetData(docy.data());
    }

    useEffect(() => {
        getData()
    }, [])

    let user = []
    let object = Object.assign({}, dat);
    user.push(object)


    let arr: any = []

    useEffect(() => {
        const getData2 = async () => {
            const q = query(collection(db, "posts"), where("idofpublisher", "==", params.pro_friends));
            const getty = await getDocs(q)
            getty.forEach((e) => {
                arr.push(e.data());
                setPosts([...datapost, ...arr]);
            })
        }


        return () =>getData2()
    }, [data])



    console.log(datapost)


    let arrFriends = [];
    const addFriend = async (id: string) => {
        if (user[0]?.requests !== undefined) {
            arrFriends.push(...user[0]?.requests, {
                name: data[0].username,
                id: data[0].id,
                image: data[0].image,
                isSent: false,
                idfriendsend: id
            })
            await updateDoc(doc(db, "users", id), {
                requests: arrFriends,
            })
        }

    }

    const checkRequest = async () => {
        let te = []
        if (user[0]?.id !== undefined) {
            const getRequest: any = await (await getDoc(doc(db, "users", user[0]?.id))).data();
            te = getRequest.requests.filter((e: any) => e.id === data[0]?.id);
        }
        console.log(te)

        if (te.length > 0) {
            setRequest(true)
        } else {
            addFriend(user[0].id)
            setRequest(false)
        }
    }


    let [friend, setFriend] = useState(false)

    const checkISFriendorno = async () => {
        let te = []
        if (user[0]?.id !== undefined) {
            const getRequest: any = await (await getDoc(doc(db, "users", user[0]?.id))).data();
            te = getRequest.friends.filter((e: any) => e.id === data[0]?.id);
        }

        if (te.length > 0) {
            setFriend(true)
        } else {
            setFriend(false)
            checkRequest()
        }
    }

    const check = async () => {
        let te = []
        let te2 = []
        if (user[0]?.id !== undefined) {
            const getRequest: any = await (await getDoc(doc(db, "users", user[0]?.id))).data();
            te = getRequest.friends.filter((e: any) => e.id === data[0]?.id);
            te2 = getRequest.requests.filter((e: any) => e.id === data[0]?.id);
        }

        if (te.length > 0) {
            setFriend(true)
        } else {
            setFriend(false)
            if (te2.length > 0) {
                setRequest(true)
            } else {
                setRequest(false)
            }
        }
    }

    useEffect(() => {
        if (data[0]?.id !== null || data[0]?.id !== undefined) {
            if (user[0]?.id !== null || user[0]?.id !== undefined) {
                check()
            }
        }
    }, [user])


    let [friends, setFriends]: any = useState([])

    useEffect(() => {
        const getfrienddata = async () => {
            const getFriend: any = (await getDoc(doc(db, "users", params.pro_friends))).data();
            setFriends([...friends, ...getFriend.friends]);


        }
        getfrienddata();
    }, [])


    const RemoveFriend = async (id: string, id2: string) => {
        let t: any = await (await getDoc((doc(db, "users", `${id2}`)))).data();
        let t2: any = await (await getDoc((doc(db, "users", `${id}`)))).data();
        let filter_t = t.friends.filter((e: { id: string }) => e.id !== id);
        let filter2_t = t2.friends.filter((e: { id: string }) => e.id !== id2);

        console.log(filter_t)
        await updateDoc(doc(db, "users", id2), {
            friends: filter_t
        })
        await updateDoc(doc(db, "users", id), {
            friends: filter2_t
        })
    }
    const RemoveFriend2 = async (id: string, id2: string) => {
        let t2: any = await (await getDoc((doc(db, "users", `${id}`)))).data();
        let filter2_t = t2.friends.filter((e: { id: string }) => e.id !== id2);


        await updateDoc(doc(db, "users", id), {
            friends: filter2_t
        })
    }

    let [open, setOpen] = useState(false);
    useEffect(() => {
        const aaa = async () => {
            let t2: any = await (await getDoc((doc(db, "users", params.pro_friends)))).data();
            setOpen(t2.Requestopen);
        }
        aaa();
    }, [])
    let [l222l, setl222l] = useState(false)


    let l222l2: any = ""
    useEffect(() => {
        l222l2 = localStorage.getItem("darkmode")
        setl222l(JSON.parse(l222l2));
    }, [])

    return (
        <>
            <div className="parent" style={l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>
                <div className="profile h-[200px] flex flex-col items-center relative">
                    <div className="banner w-[90%] h-[300px] bg-blue-700 rounded-2xl overflow-hidden">
                        <img className='object-cover h-full w-full' src={user[0]?.banner} alt="" />
                    </div>
                    <div className="image_user w-[70px] h-[70px] bg-red-600 rounded-full absolute bottom-[-30px] overflow-hidden">
                        <img src={`${user[0].image}`} alt="" />
                    </div>
                </div>

                <div className="header mt-9 text-[30px] text-center uppercase font-bold">
                    <h1>{user[0].username}</h1>
                    {friend ? (
                        <>
                            <div className="follow">
                                <a
                                    className="inline-flex items-center gap-2 rounded border border-red-500 bg-red-500 px-8 py-3 trnasition text-white hover:bg-transparent hover:text-red-500 focus:outline-none focus:ring active:text-red-500"
                                    href="#"
                                    style={{ direction: "rtl" }}
                                    onClick={() => {
                                        RemoveFriend(user[0].id, data[0].id)
                                        RemoveFriend2(user[0].id, data[0].id)
                                        setTimeout(() => {
                                            location.reload()
                                        }, 1300)
                                    }}
                                >
                                    <span className="text-sm font-medium"> Remove Friend</span>

                                    <IoPersonRemoveSharp className='size-5 rtl:rotate-180' />
                                </a>
                            </div>
                        </>
                    ) :
                        (
                            <>
                                {!open ? (
                                    <>
                                        {!request ? (
                                            <div className="follow">
                                                <a
                                                    className="inline-flex items-center gap-2 rounded border border-buttons bg-buttons px-8 py-3 trnasition text-white hover:bg-transparent hover:text-buttons focus:outline-none focus:ring active:text-buttons"
                                                    href="#"
                                                    style={{ direction: "rtl" }}
                                                    onClick={() => {
                                                        checkISFriendorno()
                                                        setTimeout(() => {
                                                            location.reload()
                                                        }, 1300)
                                                    }}
                                                >
                                                    <span className="text-sm font-medium"> Add Friend</span>

                                                    <IoPersonAdd className='size-5 rtl:rotate-180' />
                                                </a>
                                            </div>
                                        ) :
                                            (
                                                <div className="follow">
                                                    <a
                                                        className="inline-flex items-center gap-2 rounded border border-buttons bg-buttons px-8 py-3 trnasition text-white hover:bg-transparent hover:text-buttons focus:outline-none focus:ring active:text-buttons"
                                                        href="#"
                                                        style={{ direction: "rtl" }}
                                                        onClick={() => {
                                                            checkISFriendorno()
                                                        }}
                                                    >
                                                        <span className="text-sm font-medium">The Request is Sent</span>

                                                        <IoPersonAdd className='size-5 rtl:rotate-180' />
                                                    </a>
                                                </div>
                                            )}
                                    </>
                                ) : null}
                            </>
                        )
                    }


                </div>
                <div className="center flex flex-row justify-evenly items-start p-11 gap-11 max-lg:flex max-lg:flex-col-reverse max-lg:px-[20px] max-lg:items-center " style={l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>
                    <div className="sec-1 ">
                        <div className="posts max-lg:flex max-lg:items-center max-lg:flex-col ">
                            <div className="main w-[200px] ">
                                <h1 className='text-[25px] font-bold uppercase text-center border-b-black border-b-[2px]  ' style={l222l ? { borderBottom: "1px solid white", color: "white" } : {}}>Posts</h1>
                            </div>
                            {datapost.map((a: any) => (
                                <Post
                                    key={a.id}
                                    source={data[0].id}
                                    username={data[0].username}
                                                                                        you={data[0].id}
                                    imageofuser={data[0].image}
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
                                    createdAt={a.createdAt}
                                    l222l={l222l}

                                />
                            ))}
                        </div>
                    </div>
                    <div className="sec-2">
                        <div className="information flex justify-center my-7 flex-col">
                            <div className="about_me w-[500px] p-[15px] rounded-2xl bg-slate-50 text-center  max-lg:w-fit " style={l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
                                <div className="main flex justify-center  px-7 items-center">
                                    <h1 className='font-bold text-[20px] uppercase p-[10px]'>About Of {user[0].username}</h1>
                                </div>

                                <p className='leading-[2]'>{user[0].aboutOfMe}
                                </p>


                            </div>
                            <div className="friends flex flex-col items-center gap-5 w-[500px] my-8 bg-slate-50 rounded-2xl p-4 max-lg:w-fit " style={l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
                                <h1 className='font-bold text-[20px] uppercase p-[10px]'>Friends</h1>
                                {friends.length > 0 ? (
                                    <div className="list flex flex-wrap justify-center  gap-5">
                                        {friends.map((e: any) => (
                                            <div key={e.id} className="friend w-[200px] bg-white flex flex-col items-center p-5 rounded-xl" style={l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>
                                                <div className="image w-[70px] h-[70px] bg-red-600 rounded-full   overflow-hidden">
                                                    <img src={e.image} alt="" />
                                                </div>

                                                <div className="text  mt-5 text-[15px] text-center  font-bold">
                                                    <h1 className='uppercase'>{e.namefriend}</h1>
                                                    <span className='text-gray-500 text-[12px] font-[500] capitalize'>User</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                                    :
                                    <NotFind name={user[0].username} />
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default profile
