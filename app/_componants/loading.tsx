import React from 'react'
import { Barlow_Condensed } from "next/font/google";

const inter = Barlow_Condensed({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"]
});
function Loading() {
    return (
        <div className="grid gap-3 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <h2 className={`text-[60px] font-manrope font-extrabold italic uppercase  text-transparent bg-gradient-to-tr from-indigo-600 to-pink-600 bg-clip-text flex items-center ${inter.className}`}>
                S <div
                    className="rounded-full flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-indigo-600 to-pink-600 animate-spin">
                    <div className="h-5 w-4 rounded-full bg-white"></div>
                </div> foo...
            </h2>
        </div>
    )
}

export default Loading
