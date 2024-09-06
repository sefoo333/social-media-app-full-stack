"use client"
// import type { Metadata } from "next";
import { Roboto, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Footer from "./_componants/footer";
import Navbar from "./_componants/navbar";
import { createContext,useContext, Suspense, useEffect, useState } from "react";
import { auth, db } from "./_config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import DATRA, { Data } from "./_context/Context";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"]
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };



export default function RootLayout({ children }: any) {

  let [data, setData] = useState(false)
    let user2 = useContext(Data)


    useEffect(() => {
    const isloged222222 = () => onAuthStateChanged(auth, (user) => {
      let l: any = localStorage.getItem("darkmode")
      if (user) {
        setData(true)

        if (!localStorage.getItem("likes")) {
          localStorage.setItem("likes", JSON.stringify([]))
        }
        if (!localStorage.getItem("darkmode")) {
          localStorage.setItem("darkmode", JSON.stringify(true))
        }
      } else {
        setData(false)
        if (JSON.parse(l)) {
          localStorage.removeItem("darkmode")
        }
      }
    }, (error) => {
      console.log("error", error)
    })
      isloged222222()
  }, [])

  let [l222l, setl222l] = useState(false)


  let l222l2: any = ""
  useEffect(() => {
    l222l2 = localStorage.getItem("darkmode")
    setl222l(JSON.parse(l222l2));
  }, [])

  return (
    <>
      <html lang="en">
        <body className={inter.className} style={l222l ? { backgroundColor: "#18191a" } : {}}>
          <DATRA>
            <>
              {data ? <Navbar /> : null}
              {children}
              {data ? <Footer /> : null}
            </>
          </DATRA>
        </body>
      </html>
    </>
  );
}
