"use client"
import Link from 'next/link'
import React, { useState } from 'react'

import { BsChatDots } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { Barlow_Condensed } from "next/font/google";

import { useEffect } from 'react';
import { auth } from '../_config/firebase';

import { onAuthStateChanged, signOut } from 'firebase/auth';

const inter = Barlow_Condensed({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"]
});

function Navbar() {

    let [imagedata, setimage] = useState("")
    let [open, setOpen] = useState(false);

    useEffect(() => {
        const test2 = onAuthStateChanged(auth, (user3) => {
            if (user3) {
                setimage(`${user3.photoURL}`)
            }
        })


        return () => {
            test2()

        }
    }, [])
    return (
        <header className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className={`md:flex md:items-center md:gap-12 ${inter.className}`}>
                        <h1 className='font-bold text-[30px] uppercase text-[#4535C1] italic' >
                            Sefoo
                        </h1>
                    </div>

                    <div className="hidden md:block ccc">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                <li className='p-[10px] ml-[15px] text-[25px] '>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="/home">  <IoHomeOutline />
                                    </Link>


                                </li>

                                <li className='p-[10px] ml-[15px] text-[25px]'>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75" href="/profile">
                                        <CgProfile />

                                    </Link>

                                </li>

                                <li className='p-[10px] ml-[15px] text-[25px]'>
                                    <Link href="/friends" className="text-gray-500 transition hover:text-gray-500/75" >
                                        <LiaUserFriendsSolid />
                                    </Link>

                                </li>


                                <li className='p-[10px] ml-[15px] text-[25px]'>
                                    <Link href="/chat" className="text-gray-500 transition hover:text-gray-500/75" ><BsChatDots />
                                    </Link>

                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4 relative">
                            <div className="image_user w-[40px] h-[40px] bg-red-600 rounded-full overflow-hidden cursor-pointer" onClick={() => open ? setOpen(false) : setOpen(true)}>
                                <img className='h-full' src={`${imagedata}`} alt="" />

                            </div>
                            <div className="window absolute left-[-180px] top-[42px] w-[200px] bg-slate-100 text-black duration-500 transition z-50" style={open ? { display: "block" } : { display: "none" }}>
                                <div className="sec-1 px-[8px] py-[12px] border-b-[1px] border-b-[#ddd] cursor-pointer duration-300 hover:bg-buttons  hover:text-white "><Link href="/profile" >Profile</Link></div>
                                <div onClick={() => {
                                    signOut(auth)
                                    localStorage.setItem("likes", JSON.stringify([]))

                                }} className="sec-3 px-[8px] py-[12px] border-b-[1px] border-b-[#ddd] cursor-pointer duration-300 hover:bg-buttons  hover:text-white">Logout</div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
