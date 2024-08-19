import React, { useContext, useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { FaImages, FaRegCommentDots } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { IoHomeOutline, IoPersonAddOutline } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../_config/firebase';
import { Data } from '../_context/Context';
import Confirm from './confirm';
import Link from 'next/link';

function Post(props: any) {


    let datauser: any = useContext(Data)
    let [liked, setLiked] = useState(false)
    let [openComment, setOpenComment] = useState(false)
    let [element, setElement] = useState(null);

    let [likes, setLikes] = useState(0);

    useEffect(() => {
        setElement(props.element);
    })

    const unsub = onSnapshot(doc(db, "posts", `${props.id}`), (doc: any) => {
        if (doc.data() === undefined) {
            setLikes(0)
        } else {
            setLikes(doc.data().likes)
        }
    }, (error) => {
        console.log("Errror")
    });

    useEffect(() => {

        unsub();
    }, [])
    let arrr3: any = []
    const comment = async (id: string, post: any, value: string) => {
        if (value !== "") {

            arrr3.push(...post.comments, {
                name: props.username,
                image: props.imageofuser,
                comment: value
            })
            await updateDoc(doc(db, "posts", `${id}`), {
                comments: arrr3,
                commentsCount: ++post.commentsCount,
            })
        }
    }
    let object444 = {}
    const like = async (id: string, post: any) => {

        Object.assign(object444, {
            postid: id,
            isliked: true
        })

        localStorage.setItem("likes", JSON.stringify([...JSON.parse(localStorage.getItem("likes")), object444]))

        await updateDoc(doc(db, "posts", `${id}`), {
            likes: likes + 1,
        })

    }
    const unlike = async (id: string, post: any) => {

        Object.assign(object444, {
            postid: id,
            isliked: false
        })
        localStorage.setItem("likes", JSON.stringify([...JSON.parse(localStorage.getItem("likes")), object444]));

        await updateDoc(doc(db, "posts", `${id}`), {
            likes: likes - 1,
        })
    }

    let [open, setOpen] = useState(false)
    let [isdelete, setDelete] = useState(false)

    useEffect(() => {

        const checkdelete = () => {
            if (props.source === props.idofpublisher) {
                setDelete(true)
            } else {
                setDelete(false)
            }
        }

        return checkdelete();

    }, [])

    useEffect(() => {
        let filter = JSON.parse(localStorage.getItem("likes")).filter((e: { postid: number, id: number }) => {
            return e.postid === props.id
        })

        if (filter.length > 0) {
            setLiked(filter[filter.length - 1].isliked)
        }
    }, [])

    let [conf, setConfirm] = useState(false);



    return (
        <>

            {conf ? (
                <Confirm id={props.id} />

            )
                :
                null
            }

            <div className="post mt-[30px] bg-slate-50 p-[20px] rounded-lg w-[500px] max-sm:w-full">
                <div className="text">
                    <div className="profile flex items-center justify-between">
                        <div className="left flex">
                            <div className="image_profile w-[40px] h-[40px] bg-red-600 rounded-full overflow-hidden">
                                <img src={props.imageofpublisher} alt="" />
                            </div>
                            <div className="user ml-4">
                                <h1>{props.nameofpublish}</h1>
                                <span>User</span>
                            </div>
                        </div>
                        <div className="right cursor-pointer">
                            <div className="sm:flex sm:gap-4 relative">
                                <SlOptionsVertical onClick={() => {
                                    open ? setOpen(false) : setOpen(true)

                                }} />
                                <div className="window absolute left-[-180px] top-[42px] w-[200px] bg-slate-100 text-black duration-500 transition z-40" style={open ? { display: "block" } : { display: "none" }}>
                                    {isdelete ? <div className="sec-1 px-[8px] py-[12px] border-b-[1px] border-b-[#ddd] cursor-pointer duration-300 hover:bg-buttons  hover:text-white " onClick={() => setConfirm(true)}>Delete</div> : null}
                                    <Link href={`/${props.idofpublisher}`}> <div className="sec-2 px-[8px] py-[12px] border-b-[1px] border-b-[#ddd] cursor-pointer duration-300 hover:bg-buttons  hover:text-white">Profile {props.nameofpublish}</div>                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content p-[10px] leading-[2]">
                        <p>{props.postname}</p>
                    </div>

                </div>
                {props.imagepost !== "/" ? (
                    <div className="image h-full  rounded-2xl py-[10px] bg-slate-700 overflow-hidden w-fit">
                        <img src={props.imagepost} alt="" className='w-full h-full object-contain' />
                    </div>
                ) :
                    null
                }
                <div className="reacts_comments flex justify-between px-[20px] mt-3 border-b-[#ddd] border-b-[1px] pb-[10px]">
                    <div className="reacts flex items-center cursor-pointer text-[#959595]">
                        <span>
                            {likes}
                        </span>
                        <MdFavoriteBorder className='ml-1' />
                    </div>
                    <div className="comments cursor-pointer text-[#959595]">
                        {props.commentCount} comment
                    </div>
                </div>
                <div className="actions flex justify-between px-[15px] py-[20px]">
                    {liked ?
                        (
                            <div className="like flex items-center text-[20px] text-[#959595] cursor-pointer" onClick={() => {
                                setLiked(false)
                                unlike(props.id, props.element)
                            }}>
                                <FcLike className='mr-[10px]' />
                                <span>Liked</span>
                            </div>
                        )
                        :
                        (
                            <div className="like flex items-center text-[20px] text-[#959595] cursor-pointer" onClick={() => {
                                setLiked(true)
                                like(props.id, props.element)
                            }}>
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
                                    comment(props.id, props.element, e.target[0].value)
                                    e.target[0].value = ""
                                    // setTimeout(() => {
                                    //     location.reload()
                                    // }, 3000)
                                }}>
                                    <div className="top flex items-center">
                                        <div className="image w-[40px] mr-3 h-[40px] bg-red-600 rounded-full overflow-hidden">
                                            <img src={props.imageofuser} alt="" />
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
                        {props.comments.map((z: any) => (
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
        </>
    )
}

export default Post
