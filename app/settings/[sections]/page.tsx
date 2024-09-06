
"use client"
import { auth, db, storage } from '@/app/_config/firebase';
import { Data } from '@/app/_context/Context';
import { updateCurrentUser, updateEmail, updatePassword, verifyBeforeUpdateEmail } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { RiImageEditFill } from "react-icons/ri";
import { Toaster } from 'react-hot-toast';

interface props {
    mainSection: string
}
function page({ params }: any) {
    let [email, setEmail] = useState(false);
    let [seepassword, setPassword] = useState(true);
    let [email2, setEmail2] = useState("");
    let [password2, setPassword2] = useState("");
    let [Name2, setName2] = useState("");
    let [darkmode, setDarkmode]: any = useState(false);
    let user2: any = useContext(Data)
    const user: any = auth.currentUser;
    const notify2 = () => toast(`The Settings is Changed ✅`);
    const updateData = async () => {
        if (email2 !== "") {
            updateEmail(user, email2).catch((e) => {
                console.log("error for email", e)
            })
        }
        if (password2 !== "") {
            updatePassword(user, password2).catch((e) => {
                console.log("error for password", e)
            })
        }
        if (Name2 !== "") {
            await updateDoc(doc(db, "users", user2[0]?.id), {
                username: Name2
            })
        }


    }


    let [prograss, setProgress] = useState(null);
    let [view, setView] = useState("");
    let [view2, setView2] = useState("");
    const uploadimage = (e: any) => {
        const file = e.files[0]

        console.log(file)
        const upload = ref(storage, `images/${file.name}`);

        const uploaddata = uploadBytesResumable(upload, file, { contentType: file.type });


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
    const uploadBanner = (e: any) => {
        const file = e.files[0]

        console.log(file)
        const upload = ref(storage, `images/${file.name}`);

        const uploaddata = uploadBytesResumable(upload, file, { contentType: file.type });


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
                    setView2(downloadURL);
                });
            }
        );
    }

    const uploadtodatabase = async () => {
        await updateDoc(doc(db, "users", user2[0]?.id), {
            image: view
        })

    }
    const uploadBannertodatabase = async () => {
        await updateDoc(doc(db, "users", user2[0]?.id), {
            banner: view2
        })

    }

    useEffect(() => {
        let t: any = localStorage.getItem("darkmode")
        setDarkmode(JSON.parse(t));
    }, [])

    let [open, setOpen] = useState(false)
    const uploadopen = async () => {
        if (!open) {
            await updateDoc(doc(db, "users", user?.uid), {
                Requestopen: true
            })
        } else {
            await updateDoc(doc(db, "users", user?.uid), {
                Requestopen: false
            })
        }
    }

   useEffect(() => {
        const aaa = async () => {
            let t2: any = await (await getDoc((doc(db, "users", `${user?.uid}`)))).data();
            setOpen(t2.Requestopen);
        }
        aaa();
    }, [user2])


    let [l222l, setl222l] = useState(false)


    let l222l2: any = ""
    useEffect(() => {
        l222l2 = localStorage.getItem("darkmode")
        setl222l(JSON.parse(l222l2));
    }, [params.sections])

    const verifynotify = () => toast("Check your Gmail ✅")
    const notify = () => toast(`${!open ? "On ✅" : "Off ❌"}`);
    const notify3 = () => toast(`${!darkmode ? "Darkmode On 🌑" : "Darkmode Off 🌕"}`);
    return (
        <div className="parent" style={l222l ? { backgroundColor: "#18191a", color: "white" } : {}}>
            <div className="main text-[36px] uppercase px-[20px] font-bold border-b-black border-b-[2px] w-[250px] my-[25px]">
                <h1>{params.sections}</h1>
            </div>
            <div className="settings w-full" >

                {params.sections === "public" ? (
                    <>
                        <div className="darkmode flex w-full justify-between items-center text-[20px] px-[25px]">
                            <span>Dark Mode</span>
                            <div className="icon">
                                <label
                                    htmlFor="AcceptConditions"
                                    className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-buttons"

                                >
                                    <input
                                        type="checkbox"
                                        id="AcceptConditions"
                                        className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"

                                        onChange={(a) => {
                                            darkmode ? setDarkmode(false) : setDarkmode(true)
                                            console.log(darkmode)
                                            darkmode ? localStorage.setItem("darkmode", JSON.stringify(false)) : localStorage.setItem("darkmode", JSON.stringify(true))
                                            notify3();
                                            setTimeout(() => {
                                                location.reload()
                                            }, 1500)
                                        }}
                                        checked={darkmode}
                                    />

                                    <span
                                        className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
                                    >
                                        <svg
                                            data-unchecked-icon
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <svg
                                            data-checked-icon
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="hidden size-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="settings_two flex w-full justify-between items-center text-[20px] px-[25px] mt-[10px]">
                            <span>Open Requests</span>
                            <div className="icon">
                                <label
                                    htmlFor="AcceptConditions2"
                                    className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-buttons"

                                >
                                    <input
                                        type="checkbox"
                                        id="AcceptConditions2"
                                        className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"

                                        onChange={() => {
                                            open ? setOpen(false) : setOpen(true)
                                            notify();
                                            uploadopen()
                                            setTimeout(() => {
                                                location.reload()
                                            }, 1500)
                                        }}
                                        checked={open}
                                    />

                                    <span
                                        className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
                                    >
                                        <svg
                                            data-unchecked-icon
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <svg
                                            data-checked-icon
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="hidden size-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </label>
                            </div>
                            <Toaster />
                        </div>
                    </>
                ) : params.sections === "account" ? (
                    <div className="account w-[500px] ml-[15px]">
                        <form action="" onSubmit={(e) => {
                            notify2();
                            e.preventDefault()
                        }}>
                            <div className="email mb-[10px] text-[20px] ">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={(a) => {
                                        setEmail(true)
                                        a.target.value.match(/\w+@\w+\.\w{3}/g) ? setEmail(true) : setEmail(false)
                                        setEmail2(a.target.value)
                                    }}


                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm mt-[10px]"
                                    placeholder="Type your email"
                                    id='email'
                                    style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}

                                />
                                <div className="verify my-[20px]">

                                    {email ? (
                                        <>
                                            {!user.emailVerified || user.email !== email2 ? (
                                                <>
                                                    <a
                                                        className="group relative inline-block text-sm font-medium text-buttons focus:outline-none focus:ring active:text-buttons"
                                                        href="#"
                                                        onClick={() => {
                                                            verifyBeforeUpdateEmail(user, email2)
                                                        }}
                                                        style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}
                                                    >
                                                        <span
                                                            className="absolute inset-0 translate-x-0 translate-y-0 bg-buttons transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                                                        ></span>

                                                        <span className="relative block border border-current bg-white px-8 py-3" style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}> Verify Email </span>

                                                    </a>
                                                    <Toaster />
                                                </>
                                            ) : (
                                                <a
                                                    className="group relative inline-block text-sm font-medium text-buttons focus:outline-none focus:ring active:text-buttons"
                                                    href="#"
                                                    style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}
                                                >
                                                    <span
                                                        className="absolute inset-0 translate-x-0 translate-y-0 bg-buttons transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                                                    ></span>

                                                    <span className="relative block border border-current bg-white px-8 py-3" style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}> Verifyed ✅ </span>

                                                </a>
                                            )}
                                        </>
                                    ) : (
                                        <a
                                            className="group relative inline-block text-sm font-medium text-buttons focus:outline-none focus:ring active:text-buttons"
                                            href="#"
                                            style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}
                                        >
                                            <span
                                                className="absolute inset-0 translate-x-0 translate-y-0 bg-buttons transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                                            ></span>

                                            <span className="relative block border border-current bg-white px-8 py-3" style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}> Verifyed ✅ </span>

                                        </a>
                                    )}

                                </div>
                            </div>
                            <div className="name  mb-[10px] text-[20px]">
                                <label htmlFor="name">UserName</label>
                                <input
                                    onChange={(a) => setName2(a.target.value)}
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm mt-[10px]"
                                    placeholder="Type your name"
                                    id='name'
                                    style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}
                                />


                            </div>
                            <div className="password  mb-[10px] text-[20px]">
                                <label htmlFor="password">Password</label>
                                <div className="relative mt-[10px]">
                                    <input
                                        type={seepassword ? "password" : "text"}
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Type your password"
                                        onChange={(e) => {
                                            setPassword2(e.target.value)
                                        }}
                                        style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}
                                    />

                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer">
                                        {seepassword ? (<FaEye onClick={() => setPassword(false)} />) : (<FaEyeSlash onClick={() => setPassword(true)} />)}
                                    </span>
                                </div>
                            </div>
                            <div className="submit">
                                <input type="submit" value="Update" className='cursor-pointer inline-block rounded border border-buttons bg-buttons px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-buttons focus:outline-none focus:ring active:text-buttons' onClick={() => {
                                    updateData()
                                }} />

                            </div>
                            <Toaster />
                        </form>
                        <div className="image_edits">
                            <div className="main text-[36px] uppercase px-[20px] font-bold border-b-black border-b-[2px] w-[250px] my-[25px]">
                                <h1>Profile</h1>
                            </div>
                            <div className="image_edits">
                                <form className="image" onSubmit={(e: any) => {
                                    e.target[0].value !== "" ? uploadtodatabase() : null
                                    e.preventDefault()
                                }}>
                                    <div className="image_edit relative">
                                        <input id='upload_image' type="file" className='absolute w-[25%] h-full hidden' onChange={(a) => {
                                            uploadimage(a.target)
                                        }} />
                                        <div className="mix relative w-[25%] cursor-pointer">
                                            <label htmlFor="upload_image" className='absolute w-full h-full z-40 cursor-pointer'></label>
                                            <img src={view === "" ? user2[0]?.image : view} alt="" className='rounded-full w-full' />
                                            <div className="upload_icon w-full h-full rounded-full  absolute top-0 bg-[#0000006e] text-white text-[30px] flex justify-center items-center transition opacity-0">
                                                <RiImageEditFill />
                                            </div>
                                        </div>
                                    </div>
                                    <input type="submit" value="Upload Image" className='mt-[10px] cursor-pointer inline-block rounded border border-buttons bg-buttons px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-buttons focus:outline-none focus:ring active:text-buttons' />
                                </form>
                                <form className="image mt-[20px]" onSubmit={(e: any) => {
                                    e.target[0].value !== "" ? uploadBannertodatabase() : null
                                    e.preventDefault()
                                }}>
                                    <div className="image_edit relative">
                                        <input id='upload_banner' type="file" className='absolute w-[25%] h-full hidden' onChange={(a) => {
                                            uploadBanner(a.target)
                                        }} />
                                        <div className="mix relative w-[500px] cursor-pointer">
                                            <label htmlFor="upload_banner" className='absolute w-full h-full z-40 cursor-pointer'></label>
                                            {user2[0]?.banner !== "/" ? (
                                                <img src={view2 === "" ? user2[0]?.banner : view2} alt="" className='rounded-md w-full' />
                                            ) : view2 !== "" ? (
                                                <img src={view2 === "" ? user2[0]?.banner : view2} alt="" className='rounded-md w-full' />
                                            ) : (
                                                <div className='rounded-md w-full bg-slate-500 h-[150px]' />
                                            )

                                            }
                                            <div className="upload_icon w-full h-full rounded-md  absolute top-0 bg-[#0000006e] text-white text-[30px] flex justify-center items-center transition opacity-0">
                                                <RiImageEditFill />
                                            </div>
                                        </div>
                                    </div>
                                    <input type="submit" value="Upload Banner" className='mt-[10px] cursor-pointer inline-block rounded border border-buttons bg-buttons px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-buttons focus:outline-none focus:ring active:text-buttons' />
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>404 Not Found</h1>
                )}
            </div>
        </div>
    )
}

export default page
