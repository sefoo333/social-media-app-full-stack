import React, { useEffect, useState } from 'react'

import { FaImages } from 'react-icons/fa6';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../_config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';


function CreatePost() {

    let [imageview, setView] = useState("/");
    let [imageuploaded, setIt] = useState(false);
    let [usert, setUser]: any = useState({})


    useEffect(() => {
        const test2 = onAuthStateChanged(auth, (user2) => {
            if (user2) {
                console.log('loged')
                setUser({
                    name: user2.displayName,
                    image: user2.photoURL,
                    id: user2.uid
                })
            }
        })
        return () => {
            test2();
        }
    }, [])

    async function updatapost(name: string, image: string) {
        await setDoc(doc(db, "posts", `${Date.now()}`), {
            postname: name,
            imagepost: image,
            id: Date.now(),
            likes: 0,
            comments: [],
            commentsCount: 0,
            createdAt: new Date(),
            nameofpublish: usert.name,
            imageofpublisher: usert.image,
            idofpublisher: usert.id
        });
        location.reload()
    }


    let [por, setProgress] = useState(null);
    const uploadimage = (e: any) => {
        const file = e.files[0]

        console.log(file)
        const upload = ref(storage, `images/${file.name}`);

        const uploaddata = uploadBytesResumable(upload, file, { contentType: file.type });

        // uploaddata.then(() => {
        //     console.log("upload is done")
        //     getDownloadURL(uploaddata.snapshot.ref).then((downloadURL) => {
        //         console.log('File available at', downloadURL);
        //     });
        // })

        uploaddata.on(
            'state_changed',
            (snapshot) => {
                const progress: any = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.error("Error uploading file:", error);
            },
            () => {
                getDownloadURL(uploaddata.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setView(downloadURL);
                });
            }
        );
    }


    return (
        <div className="post_create flex items-center rounded-[15px] p-[20px] justify-center bg-slate-50 max-sm:w-full ">
            <form action="" onSubmit={(e: any) => {
                e.preventDefault();
                if (e.target[0].value !== "") {
                    updatapost(e.target[0].value, imageview)
                    e.target[0].value = ""
                    setView("")
                    setTimeout(() => {
                        location.reload()
                    }, 2000)
                }
            }}>
                <div className="top flex items-center">
                    <div className="image w-[40px] mr-3 h-[40px] bg-red-600 rounded-full overflow-hidden">
                        <img src={usert.image} alt="" />
                    </div>
                    <input type="text" className="p-[8px] rounded-xl border-none outline-none w-[350px] max-lg:w-fit " placeholder='type any words' />
                </div>
                <div className="under flex justify-end items-center mt-3 overflow-hidden">
                    <input type="submit" className='py-[7px] px-[15px] bg-buttons text-white mr-3 rounded-xl transition cursor-pointer  hover:bg-[#2697a0]' value="Post" />
                    <div className="uploadd relative">
                        <input type="file" className='w-fit absolute bottom-0 opacity-0 cursor-pointer ' onChange={(i: any) => {

                            setIt(true)
                            setView(i.target.value)
                            console.log(imageview)
                            uploadimage(i.target)
                            console.log(i)
                        }} />
                        <FaImages className='cursor-pointer text-[18px]' />
                    </div>

                </div>
                <div className="image h-[150px] rounded-2xl py-[10px] bg-slate-700 mt-[20px] overflow-hidden w-fit" style={imageuploaded && imageview !== "" ? { display: "flex" } : { display: "none" }}>
                    <img className='h-full object-cover' src={imageview} alt="" />
                </div>

            </form>
        </div>
    )
}

export default CreatePost
