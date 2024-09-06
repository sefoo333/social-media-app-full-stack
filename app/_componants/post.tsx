import React, { useContext, useEffect, useState } from 'react'
import { IoClose, IoSend } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { FaImages, FaRegCommentDots } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { IoHomeOutline, IoPersonAddOutline } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../_config/firebase';
import { Data } from '../_context/Context';
import Confirm from './confirm';
import Link from 'next/link';
import Comment from './comment';
import Share from './share';

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
                comment: value,
                id: datauser[0]?.id
            })
            await updateDoc(doc(db, "posts", `${id}`), {
                comments: arrr3,
                commentsCount: ++post.commentsCount,
            })
        }
    }
    let object444 = {}
    let [ttr, setIttr] = useState<string | null>(null)
    const like = async (id: string, post: any) => {

        Object.assign(object444, {
            postid: id,
            isliked: true
        })

        let l: any = localStorage.getItem("likes")
        localStorage.setItem("likes", JSON.stringify([...JSON.parse(l), object444]))
        await updateDoc(doc(db, "likeslog", datauser[0]?.id), {
            likes: [...JSON.parse(l), object444],
        })


        await updateDoc(doc(db, "posts", `${id}`), {
            likes: likes + 1,
        })

    }
    const unlike = async (id: string, post: any) => {

        Object.assign(object444, {
            postid: id,
            isliked: false
        })
        let l: any = localStorage.getItem("likes")
        localStorage.setItem("likes", JSON.stringify([...JSON.parse(l), object444]));
        await updateDoc(doc(db, "likeslog", datauser[0]?.id), {
            likes: [...JSON.parse(l), object444],
        })

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

    let ttr2: any = [];

    useEffect(() => {
        const getlog = async () => {
                let t1 = await (await getDoc((doc(db, "likeslog", `${datauser[0]?.id}`)))).data();
                if (t1?.likes?.length > 0) {
                    let filter = t1?.likes?.filter((e: { postid: number, id: number }) => {
                        return e.postid === props.id
                    })

                    if (t1?.likes !== null || t1?.likes !== undefined) {
                        if (filter.length > 0) {
                            setLiked(filter[filter.length - 1].isliked)
                        }
                    } else {
console.log("failed")
                    }

                    localStorage.setItem("likes", JSON.stringify(t1?.likes));
                } else {
                    console.log(ttr)
                }
            }
        }

        return () => {
            getlog();
        }
    }, [])

    let [conf, setConfirm] = useState(false);


    let [Name, setName] = useState("");
    let [Image, setImage] = useState("");

    useEffect(() => {
        const test = async () => {
            let t: any = await (await getDoc((doc(db, "posts", `${props.id}`)))).data();
            let t2: any = await (await getDoc((doc(db, "users", `${t?.idofpublisher}`)))).data();
            if (t2 !== undefined) {
                setName(t2.username)
                setImage(t2.image)
            } else {
                setName(props.name)
                setImage(props.image)
            }
        }

        test();
    }, [datauser])


    let [oopen, setopen2] = useState(false);

    return (
        <>

            {conf ? (
                <Confirm id={props.id} l222l={props.l222l} />

            )
                :
                null
            }

            <div className="post mt-[30px] bg-slate-50 p-[20px] rounded-lg w-[500px] max-sm:w-full" onClick={() => console.log(props.id)} style={props.l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
                <div className="text">
                    <div className="profile flex items-center justify-between">
                        <div className="left flex">
                            <div className="image_profile w-[40px] h-[40px] bg-red-600 rounded-full overflow-hidden">
                                <img src={Image} alt="" />
                            </div>
                            <div className="user ml-4">
                                <h1>{Name}</h1>
                                <span>{props.createdAt}</span>
                            </div>
                        </div>
                        <div className="right cursor-pointer">
                            <div className="sm:flex sm:gap-4 relative">
                                <SlOptionsVertical onClick={() => {
                                    open ? setOpen(false) : setOpen(true)

                                }} />
                                <div className="window absolute left-[-180px] top-[42px] w-[200px] bg-slate-100 text-black duration-500 transition z-40" style={open ? { display: "block" } : { display: "none" }}>
                                    {isdelete ? <div className="sec-1 px-[8px] py-[12px] border-b-[1px] border-b-[#ddd] cursor-pointer duration-300 hover:bg-buttons  hover:text-white " onClick={() => setConfirm(true)}>Delete</div> : null}
                                    {datauser[0]?.id !== props.idofpublisher ? (
                                        <Link href={`/${props.idofpublisher}`}> <div className="sec-2 px-[8px] py-[12px] border-b-[1px] border-b-[#ddd] cursor-pointer duration-300 hover:bg-buttons  hover:text-white">Profile {props.nameofpublish}</div></Link>

                                    ) : null}
                                    <div className="sec-2 px-[8px] py-[12px] border-b-[1px] border-b-[#ddd] cursor-pointer duration-300 hover:bg-buttons  hover:text-white" onClick={() => setopen2(true)}>Share</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content p-[10px] leading-[2]">
   <Link href={`/post/${props.id}`}>
                        <p>{props.postname}</p>
       </Link>
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
                                console.log(liked)
                            }}>
                                <FcLike className='mr-[10px]' />
                                <span>Liked</span>
                            </div>
                        )
                        :
                        (
                            <div className="like flex items-center text-[20px] text-[#959595] cursor-pointer" onClick={() => {
                                setLiked(true)
                                console.log(liked)
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
                            <div className="post_create flex items-center rounded-[15px] p-[20px] justify-center bg-slate-50 " style={props.l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>
                                <form action="" onSubmit={(e: any) => {
                                    e.preventDefault();
                                    comment(props.element.id, props.element, e.target[0].value)
                                    e.target[0].value = ""
                                    setTimeout(() => {
                                        location.reload()
                                    }, 1500)
                                }}>
                                    <div className="top flex items-center">
                                        <div className="image w-[40px] mr-3 h-[40px] bg-red-600 rounded-full overflow-hidden">
                                            <img src={props.imageofuser} alt="" />
                                        </div>
                                        <input type="text" style={props.l222l ? { backgroundColor: "#242526", color: "white" } : {}} className="p-[8px] rounded-xl border-none outline-none w-[350px] max-lg:w-fit " placeholder='type any words' />
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
                            <Comment
                                image={z.image}
                                name={z.name}
                                comment={z.comment}
                                id={z.id}
                                postid={props.id}
                                l222l={props.l222l}
                            />
                        ))}


                    </div>
                ) :
                    null}
            </div>
            {oopen ? (
                <div className="par w-full h-full fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-50 bg-[#0000007d] rounded-md">
                    <div className="t relative w-[300px] h-[300px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <IoClose onClick={() => oopen ? setopen2(false) : setopen2(true)} className='cursor-pointer text-white text-[30px] right-[-5px] top-[40px] translate-x-[-50%] translate-y-[-50%] absolute z-[9999]' />
                        <Share id={props.id} />
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Post
