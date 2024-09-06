
"use client"
import React, { useEffect, useState } from 'react'
import { Barlow_Condensed } from "next/font/google";
const inter = Barlow_Condensed({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"]
});
function Footer() {
    let [l222l, setl222l] = useState(false)


    let l222l2: any = ""
    useEffect(() => {
        l222l2 = localStorage.getItem("darkmode")
        setl222l(JSON.parse(l222l2));
    }, [])
    return (
        <div className=''>
            <footer className="bg-gray-50" style={l222l ? { backgroundColor: "#242526", color: "white" } : {}}>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8" >
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex justify-center text-teal-600 sm:justify-start">
                            <div className={`md:flex md:items-center md:gap-12 ${inter.className}`}>
                                <h1 className='font-bold text-[30px] uppercase text-[#6451f7] italic' >
                                    Sefoo
                                </h1>
                            </div>
                        </div>

                        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
