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


    return (
        <>
            <div className="parent">
                <div className="profile h-[200px] flex flex-col items-center relative">
                    <div className="banner w-[90%] h-[300px] bg-blue-700 rounded-2xl overflow-hidden">
                        <img className='object-cover h-full w-full' src="https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/1696691175374-MJY4VWB1KS8NU3DE3JK1/Sounds-of-Nature.jpg" alt="" />
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
                        <CreatePost />
                        <div className="posts max-lg:flex max-lg:items-center max-lg:flex-col ">
                            {user.map((e: any) => (
                                <>
                                    {posts.map((a: any) => (
                                        <div className="post my-6 w-[500px] max-lg:w-full">
                                            <div className="text">
                                                <div className="profile flex">
                                                    <div className="image_profile w-[40px] h-[40px] bg-red-600 rounded-full overflow-hidden">
                                                        <img src={e.image} alt="" />
                                                    </div>
                                                    <div className="user ml-4">
                                                        <h1>{e.username}</h1>
                                                        <span>User</span>
                                                    </div>
                                                </div>

                                                <div className="content p-[10px] leading-[2]">
                                                    <p>{a.postname}</p>
                                                </div>

                                            </div>
                                            <div className="image h-[150px] rounded-2xl py-[10px] bg-slate-700"></div>
                                            <div className="reacts_comments flex justify-between px-[20px] mt-3 border-b-[#ddd] border-b-[1px] pb-[10px]">
                                                <div className="reacts flex items-center cursor-pointer text-[#959595]">
                                                    <span>
                                                        {a.likes}
                                                    </span>
                                                    <MdFavoriteBorder className='ml-1' />
                                                </div>
                                                <div className="comments cursor-pointer text-[#959595]">
                                                    {a.commentsCount} comment
                                                </div>
                                            </div>
                                            <div className="actions flex justify-between px-[15px] py-[20px]">
                                                {liked ?
                                                    (
                                                        <div className="like flex items-center text-[20px] text-[#959595] cursor-pointer" onClick={() => setLiked(false)}>
                                                            <FcLike className='mr-[10px]' />
                                                            <span>Liked</span>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div className="like flex items-center text-[20px] text-[#959595] cursor-pointer" onClick={() => setLiked(true)}>
                                                            <MdFavoriteBorder className='mr-[10px]' />
                                                            <span>Like</span>
                                                        </div>
                                                    )
                                                }
                                                <div className="comment flex items-center text-[20px] text-[#959595] cursor-pointer" onClick={() => {
                                                    openComment ? setOpenComment(false) : setOpenComment(true)
                                                }}>
                                                    <FaRegCommentDots className='mr-[10px]' />
                                                    <span>Comment</span>
                                                </div>

                                            </div>
                                            {openComment ? (
                                                <div className="comments">
                                                    <div className="user_comment">
                                                        <div className="post_create flex items-center rounded-[15px] p-[20px] justify-center bg-slate-50 ">
                                                            <form action="" onSubmit={(e: any) => {
                                                                e.preventDefault();
                                                                comment(a.id, a, e.target[0].value)
                                                                e.target[0].value = ""
                                                                setTimeout(() => {
                                                                    location.reload()
                                                                }, 3000)
                                                            }}>
                                                                <div className="top flex items-center">
                                                                    <div className="image w-[40px] mr-3 h-[40px] bg-red-600 rounded-full overflow-hidden">
                                                                        <img src={e.image} alt="" />
                                                                    </div>
                                                                    <input type="text" className="p-[8px] rounded-xl border-none outline-none w-[350px] max-lg:w-fit " placeholder='type any words' />
                                                                </div>
                                                                <div className="under flex justify-end items-center mt-3 overflow-hidden">
                                                                    <input type="submit" className='py-[7px] px-[15px] bg-buttons text-white mr-3 rounded-xl transition cursor-pointer  hover:bg-[#2697a0]' value="Comment" />

                                                                </div>

                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="main">
                                                        <h1 className='text-[25px] font-bold uppercase'>Comments</h1>
                                                    </div>
                                                    {a.comments.map((z: any) => (
                                                        <div className="comment p-[15px] text-justify bg-slate-400 rounded-[26px] my-[15px]" style={{ borderTopLeftRadius: "0" }}>
                                                            <div className="profile flex items-center mb-4">
                                                                <div className="image_profile w-[30px] h-[30px] bg-red-600 rounded-full overflow-hidden">
                                                                    <img src={z.image} alt="" />
                                                                </div>
                                                                <div className="user ml-4">
                                                                    <h1>{z.name}</h1>
                                                                    <span>User</span>
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                <p>{z.comment}</p>
                                                            </div>
                                                        </div>
                                                    ))}


                                                </div>
                                            ) :
                                                null}
                                        </div>
                                    ))}

                                </>
                            ))}
                        </div>
                    </div>
                    <div className="sec-2">
                        <div className="information flex justify-center my-7 flex-col">
                            <div className="about_me w-[500px] p-[15px] rounded-2xl bg-slate-50 text-center  max-lg:w-fit ">
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
                                            <textarea className='leading-[2] w-full resize-none'>{user[0].aboutOfMe}</textarea>
                                            <input type="submit" value="Edit" className='p-3 bg-buttons transition hover:#2697a0 rounded-md text-white px-4 cursor-pointer' />
                                        </form>
                                    )
                                }
                            </div>
                            <div className="friends flex flex-col items-center gap-5 w-[500px] my-8 bg-slate-50 rounded-2xl p-4 max-lg:w-fit ">
                                <h1 className='font-bold text-[20px] uppercase p-[10px]'>Friends</h1>
                                <div className="list flex flex-wrap justify-center  gap-5">
                                    {friends.map((e: any) => (
                                        <Link href={`/${e.id}`}>
                                            <div className="friend w-[200px] bg-white flex flex-col items-center p-5 rounded-xl">
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
