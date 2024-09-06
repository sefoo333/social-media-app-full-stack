"use client"

import React, { useContext, useEffect, useState } from 'react'
import Post from '@/app/_componants/post';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/_config/firebase';
import { Data } from '@/app/_context/Context';
import Share from '@/app/_componants/share';

import { IoClose } from "react-icons/io5";
import { onAuthStateChanged } from 'firebase/auth';


function page({ params }: any) {
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
    const [object, setObject]: any = useState({})
    const user3: any = useContext(Data)
    const getData = async () => {
        let post = await (await getDoc((doc(db, "posts", params.postid)))).data();
        setObject(post)
    }
    useEffect(() => {
        return () => {
            getData();
        }
    }, [params.postid])

    let [l222l, setl222l] = useState(false)


    let [oopen, setopen2] = useState(false);

    let l222l2: any = ""
    useEffect(() => {
        l222l2 = localStorage.getItem("darkmode")
        setl222l(JSON.parse(l222l2));
    }, [])
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Post
                key={object.id}

                username={user3[0]?.username}
                imageofuser={user3[0]?.image}
                imageofpublisher={object.imageofpublisher}
                nameofpublish={object.nameofpublish}
                idofpublisher={object.idofpublisher}
                postname={object.postname}
                imagepost={object.imagepost}
                commentCount={object.commentsCount}
                comments={object.comments}
                likes={object.likes}
                element={object}
                id={object.id}
                l222l={l222l}
                createdAt={object.createdAt}
                source={user3[0]?.id}
            />

        </div>
    )
}

export default page
