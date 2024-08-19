"use client"

import { doc, getDoc } from "firebase/firestore"
import { useContext, createContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../_config/firebase";


export const Data = createContext([])
export const Data2 = createContext([])
export const Data3 = createContext([])


export default function DATRA({ children }: any) {

    let [data, setData] = useState(false)
    let [user3333, setUser]: any = useState([])
    let [user33335, setUser2]: any = useState([])
    let [user33336, setUser3]: any = useState([])

    let arr = [];
    let arr2 = [];
    let arr3 = [];
    let tes = async (id?: string) => {
        let t: any = await (await getDoc((doc(db, "users", `${id}`)))).data();
        arr.push(t)
        setUser(arr)
        arr2.push(t.friends)
        arr3.push(t.requests)
        setUser2(...user33335, ...arr2);
        setUser3(...user33336, ...arr3);
    }
    useEffect(() => {
        const isloged = () => onAuthStateChanged(auth, (user) => {
            if (user) {
                setData(true)
                tes(user.uid);
            } else {
                setData(false)
            }
        }, (error) => {
            console.log("error", error)
        })
        return () => {
            isloged()
        }
    }, [])
    return (
        <Data.Provider value={user3333}>
            <Data2.Provider value={user33335}>
                <Data3.Provider value={user33336}>
                    {children}
                </Data3.Provider>
            </Data2.Provider>
        </Data.Provider>
    )
}