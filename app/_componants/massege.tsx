import React, { useContext, useEffect, useState } from 'react'
import { Data } from '../_context/Context';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../_config/firebase';
import { MdDelete } from "react-icons/md";

function Massege(props: { name: string, id: string, value: string, mass: any, l222l: boolean }) {

    let user: any = useContext(Data);


    let [readytodelete, setisdeleted] = useState(false)
    useEffect(() => {
        // const upload = async () => {
        //     if (props.mass.length > 0) {
        //         await updateDoc(doc(db, "chats", props.id), {
        //             chatmassege: props.mass
        //         })
        //     }
        // }

        const check = () => {
            if (user[0]?.username === props.name) {
                setisdeleted(true)
            } else {
                setisdeleted(false)
            }
        }
        // upload()
        check()
    }, [props.mass])
    return (
        <div className={`massege_me w-full`}>
            <div className="me w-fit bg-white p-15px rounded-[20px]  p-[15px] flex justify-between items-center" style={props.l222l ? { backgroundColor: "#242526", color: "white", borderTopLeftRadius: "0px" } : { borderTopLeftRadius: "0px" }}>
                <div className="text">
                    <span className='text-[13px] text-slate-400'> {props.name}</span>
                    <p className='w-[300px] break-all'>{props.value}</p>
                </div>
                {readytodelete ? (
                    <div className="setting_massege cursor-pointer text-red-500 transition hover:text-red-800 mr-4">
                        <MdDelete onClick={() => {
                            console.log(props.mass)
                        }} />
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Massege
