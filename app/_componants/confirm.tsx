"use client"
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../_config/firebase';

function Confirm(props: any) {
    const deletePost = async () => {
        await deleteDoc(doc(db, "posts", `${props.id}`));
        location.reload();
    }

    return (
        <div className="par w-full h-full fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-50 bg-[#0000007d]">
            <div className="rounded-lg bg-white p-8 shadow-2xl fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] z-50">
                <h2 className="text-lg font-bold">Are you sure to delete Post ?</h2>

                <p className="mt-2 text-sm text-gray-500">
                    Once you confirm, the post will be permanently deleted
                </p>

                <div className="mt-4 flex gap-2">
                    <button type="button" className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-buttons" onClick={() => deletePost()}>
                        Yes, I'm sure
                    </button>

                    <button type="button" className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600" onClick={() => location.reload()}>
                        No, go back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirm
