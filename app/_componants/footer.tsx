import React from 'react'
import { Barlow_Condensed } from "next/font/google";
const inter = Barlow_Condensed({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"]
});
function Footer() {
    return (
        <div className=''>
            <footer className="bg-gray-50">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex justify-center text-teal-600 sm:justify-start">
                            <div className={`md:flex md:items-center md:gap-12 ${inter.className}`}>
                                <h1 className='font-bold text-[30px] uppercase text-[#4535C1] italic' >
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
