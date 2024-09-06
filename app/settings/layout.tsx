"use client"



import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../_context/Context'
import Link from 'next/link'
import { Barlow_Condensed } from "next/font/google";
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import { auth } from '../_config/firebase';

const inter = Barlow_Condensed({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"]
});

const data = [{
    name: "public",
    href: "public/"
}, {
    name: "account",
    href: "account/",
}]



function page({ children }: any) {

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

    let [l222l, setl222l] = useState(false)


    let l222l2: any = ""
    useEffect(() => {
        l222l2 = localStorage.getItem("darkmode")
        setl222l(JSON.parse(l222l2));
    }, [])
    const user: any = useContext(Data)
    return (
        <div className="parent flex h-screen" style={l222l ? { backgroundColor: "#18191a", border: "1px solid #242526", color: "white" } : {}}>
            <div className="sidemenu basis-[20%] ">
                <div className="flex h-screen flex-col justify-between border-e bg-white" style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}>
                    <div className="px-4 py-6">
                        <div className={`md:flex md:items-center md:gap-12 ${inter.className} grid h-10 w-32 place-content-center rounded-l text-xs text-gray-600`}>
                            <h1 className='font-bold text-[30px] uppercase text-[#6451f7] italic' >
                                Sefoo
                            </h1>
                        </div>

                        <ul className="mt-6 space-y-1">
                            {data.map((e) => (
                                <>
                                    <li key={e.name} >
                                        <Link
                                            href={e.href}
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 "
                                            style={l222l ? { color: "white" } : {}}
                                            onMouseOver={(a: any) => {
                                                l222l ? a.target.style.backgroundColor = "#18191a" : a.target.style.backgroundColor = "#ddd"
                                            }}
                                            onMouseLeave={(a: any) => {
                                                a.target.style.backgroundColor = "transparent"
                                            }}
                                        >
                                            {e.name}
                                        </Link>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>

                    <div className="sticky inset-x-0 bottom-0 border-t border-gray-100" style={l222l ? { backgroundColor: "#242526", border: "1px solid #242526", color: "white" } : {}}>
                        <Link href="/profile" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50" style={l222l ? { backgroundColor: "#242526", borderTop: "1px solid #242526", color: "white" } : {}}>
                            <img
                                alt=""
                                src={user[0]?.image}
                                className="size-10 rounded-full object-cover"
                            />

                            <div>
                                <p className="text-xs">
                                    <strong className="block font-medium">{user[0]?.username}</strong>

                                    <span> User </span>
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

            <div className="settings_panel w-full overflow-y-scroll">
                {children}
            </div>
        </div>
    )
}

export default page
