"use client"

import React, { useContext, useEffect } from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { useState } from "react"
import { FaRegCommentDots } from "react-icons/fa";
import CreatePost from '../_componants/createPost';
import { FaPen } from "react-icons/fa";
import { auth, db } from '../_config/firebase';

import { onAuthStateChanged } from 'firebase/auth';

import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { Data, Data2 } from '../_context/Context';
import Link from 'next/link';
import Post from '../_componants/post';

function profile() {
    const user3: any = useContext(Data);
    let friends: any = useContext(Data2);
    let [liked, setLiked] = useState(true)
    let [posts, setPosts]: any = useState([])
    let [edit, openedit] = useState(true)
    let [openComment, setOpenComment] = useState(true)

    let arr: any = [];
    const getData = async (id: string) => {
        const q = query(collection(db, "posts"), where("idofpublisher", "==", id));
        const getty = await getDocs(q)
        getty.forEach((e) => {
            arr.push(e.data());
            setPosts([...posts, ...arr]);
        })
    }


    useEffect(() => {
        const test2 = onAuthStateChanged(auth, (user2) => {
            if (user2) {
                getData(user2.uid)
            } else {
                window.open("/", "_parent")
            }


        },
            (error) => {
                console.log("error")
            })

        return () => {
            test2()
        }
    }, [])


    const updataAboutOfMe = async (id: string, value: string) => {
        await updateDoc(doc(db, "users", `${id}`), {
            aboutOfMe: value,
        })
    }

    let user = []
    let object = Object.assign({}, user3[0]);
    user.push(object)

    let arrr3: any = []
    const comment = async (id: string, post: any, value: string) => {
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


                </div>
                <div className="center flex flex-row justify-evenly items-start p-11 gap-11 max-lg:flex max-lg:flex-col-reverse max-lg:px-[20px] max-lg:items-center ">
                    <div className="sec-1 ">
                        <CreatePost l222l={l222l} />
                        <div className="posts max-lg:flex max-lg:items-center max-lg:flex-col ">
                            {user.map((e: any) => (
                                <>
                                    {
                                        posts.map((a: any) => (
                                            <Post
                                                key={a.id}
                                                    you={user3[0].id}

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
                                                l222l={l222l}
                                                source={user3[0].id}
                                            />
                                        ))
                                    }

                                </>
                            ))}
                        </div>
                    </div>
                    <div className="sec-2">
                        <div className="information flex justify-center my-7 flex-col">
                            <div className="about_me w-[500px] p-[15px] rounded-2xl bg-slate-50 text-center  max-lg:w-fit " style={l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
                                <div className="main flex justify-center  px-7 items-center">
                                    <h1 className='font-bold text-[20px] uppercase p-[10px]'>About me</h1>
                                    <FaPen className='cursor-pointer' onClick={() => edit ? openedit(false) : openedit(true)} />
                                </div>
                                {edit ? (
                                    <p className='leading-[2]'>{user[0].aboutOfMe}
                                    </p>
                                )
                                    :
                                    (
                                        <form onSubmit={(e: any) => {
                                            e.preventDefault()
                                            openedit(true)
                                            updataAboutOfMe(user[0].id, e.target[0].value);
                                            setTimeout(() => {
                                                location.reload()
                                            }, 2000)
                                        }}>
                                            <textarea className='leading-[2] w-full resize-none' style={l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>{user[0].aboutOfMe}</textarea>
                                            <input type="submit" value="Edit" className='p-3 bg-buttons transition hover:#2697a0 rounded-md text-white px-4 cursor-pointer' />
                                        </form>
                                    )
                                }
                            </div>
                            <div className="friends flex flex-col items-center gap-5 w-[500px] my-8 bg-slate-50 rounded-2xl p-4 max-lg:w-fit " style={l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
                                <h1 className='font-bold text-[20px] uppercase p-[10px]'>Friends</h1>
                                <div className="list flex flex-wrap justify-center  gap-5">
                                    {friends.map((e: any) => (
                                        <Link href={`/${e.id}`}>
                                            <div className="friend w-[200px] bg-white flex flex-col items-center p-5 rounded-xl" style={l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>
                                                <div className="image w-[70px] h-[70px] bg-red-600 rounded-full   overflow-hidden">
                                                    <img src={e.image} alt="" />
                                                </div>

                                                <div className="text  mt-5 text-[15px] text-center  font-bold">
                                                    <h1 className='uppercase'>{e.namefriend}</h1>
                                                    <span className='text-gray-500 text-[12px] font-[500] capitalize'>User</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default profile
