"use client"

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { auth } from "./_config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/_config/firebase";
import toast, { ToastBar, Toaster, ToastIcon } from "react-hot-toast";
export default function Home() {
  let [seepassword, setPassword] = useState(true)
  let [Email, setEmail] = useState(false)
  let [signup, setchange] = useState(true)
  useEffect(() => {
    console.log(Email)
  }, [Email])

  let arr: any = []
  useEffect(() => {
    const test = onAuthStateChanged(auth, (user3) => {
      if (user3) {
        console.log(user3)
        setTimeout(() => {
          window.open("/home", "_parent")

        }, 2500)
      } else {
        console.log('test')
      }
      console.log(user3)

    })

    return () => {
      test()
    }
  }, [])

  const signin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((docy) => {
      console.log("this doc => ", docy)
      const testy = async () => {
        console.log(doc)
        let t: any = await (await getDoc((doc(db, "users", docy?.user?.uid)))).data();
        console.log(t)

        let tt1 = t?.friends !== undefined || t?.friends !== null ? t?.friends : [];
        let tt2 = t?.requests !== undefined || t?.requests !== null ? t?.requests : [];

        if (t === undefined || t === null) {
          await setDoc(doc(db, "users", docy.user.uid), {
            username: docy.user.displayName,
            id: docy.user.uid,
            image: docy.user.photoURL,
            banner: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
            friends: [],
            requests: [],
            aboutOfMe: "",
            thessc: "User",
            Requestopen: true,

          });
        } else {
          await updateDoc(doc(db, "users", `${docy.user.uid}`), {
            friends: t.friends,
            requests: t.requests,
          });

          if (history.length > 0) {
            history.back();
          }
        }
        let t2: any = await (await getDoc((doc(db, "userschat", docy.user.uid)))).data();
        console.log(t2 !== null, t2 !== undefined)
        if (t2 === undefined || t2 === null) {
          await setDoc(doc(db, "userschat", docy.user.uid), {
            chat: [],
          });
        } else {
          await setDoc(doc(db, "userschat", docy.user.uid), {
            chat: t2?.chat,
          });
        }
        let t3: any = await (await getDoc((doc(db, "likeslog", docy.user.uid)))).data();
        if (t3 === undefined || t3 === null) {
          await setDoc(doc(db, "likeslog", docy.user.uid), {
            likes: [],
          });
        } else {
          await setDoc(doc(db, "likeslog", docy.user.uid), {
            likes: t3?.likes,
          });
        }
      }
      testy()
    }).catch((error) => {
      console.log("Error", error)
    })
  }


  let [email2, setEmail2] = useState("");
  let [password2, setPassword2] = useState("");
  let [name, setName] = useState("");


  const signupbyEmail = async () => {
    createUserWithEmailAndPassword(auth, email2, password2).then((docy) => {
      const testy = async () => {
        await setDoc(doc(db, "users", docy.user.uid), {
          username: name,
          id: docy.user.uid,
          image: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
          banner: "/",
          posts: [],
          friends: [],
          requests: [],
          isonline: false,
          aboutOfMe: "",
          thessc: "User",
          Requestopen: true,

        });

        await setDoc(doc(db, "userschat", docy.user.uid), {
          chat: [],
        });

        await setDoc(doc(db, "likeslog", docy.user.uid), {
          likes: [],
        });
      }
      testy();
    }).catch((e) => {
      console.log("error", e);
    })

  }

  const action = () => toast("The Email or Password is unCorrect ❌")

  const signinbyEmail = async () => {

    try {
      signInWithEmailAndPassword(auth, email2, password2).then((docy) => {

        const testy = async () => {
          let t: any = await (await getDoc((doc(db, "users", docy.user.uid)))).data();
          await updateDoc(doc(db, "users", t.id), {
            friends: t.friends,
            requests: t.requests,

          });

          if (history.length > 0) {
            history.back();
          }
          let t2: any = await (await getDoc((doc(db, "userschat", docy.user.uid)))).data();

          await updateDoc(doc(db, "userschat", t.id), {
            chat: t2.chat,

          });
          let t3: any = await (await getDoc((doc(db, "likeslog", docy.user.uid)))).data();

          await setDoc(doc(db, "likeslog", docy.user.uid), {
            likes: t3?.likes,
          });

        }


        setTimeout(() => {
          location.reload()
        }, 2000)
        testy();

      }).catch((e) => {
        action()
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <>


      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-full">
        <div className="mx-auto max-w-lg">
          {signup ? (<h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Sign Up !</h1>) : (<h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Sign in !</h1>)}

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
            inventore quaerat mollitia?
          </p>

          <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={(e: any) => {
            e.preventDefault()
          }}>
            {
              signup ?
                (
                  <>
                    <p className="text-center text-lg font-medium">Sign up to your account</p>
                    <div>
                      <label htmlFor="text" className="sr-only">username</label>

                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Type your name"
                          required
                          onChange={(e: { target: { value: string } }) => {
                            setName(e.target.value)
                          }}
                        />


                      </div>
                    </div>
                  </>
                )
                :
                (
                  <p className="text-center text-lg font-medium">Sign in to your account</p>
                )
            }
            <div>
              <label htmlFor="email" className="sr-only">Email</label>

              <div className="relative">
                <input
                  onChange={(a) => {
                    a.target.value.match(/\w+@\w+\.\w{3}/g) ? setEmail(true) : setEmail(false)
                    setEmail2(a.target.value)
                  }

                  }
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Type your email"

                />


                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
              {!Email ? (<p className="text-red-600 pl-4 pt-[10px] text-[13px]">Write a vaild email</p>) : null}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>

              <div className="relative">
                <input
                  type={seepassword ? "password" : "text"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Type your password"
                  required
                  onChange={(e) => {
                    setPassword2(e.target.value)
                  }}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer">
                  {seepassword ? (<FaEye onClick={() => setPassword(false)} />) : (<FaEyeSlash onClick={() => setPassword(true)} />)}
                </span>
              </div>
            </div>

            {signup ? (<>   <Link href="/">
              <button
                type="submit"

                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                onClick={() => {
                  signupbyEmail()

                }}
              >
                Sign up
              </button>
            </Link>

              <p className="text-center text-sm text-gray-500">
                Have A account?
                <a className="underline" href="#" onClick={() => setchange(false)}>Sign in</a>
              </p></>)
              :
              (
                <>
                  <Link href="/">
                    <button
                      type="submit"
                      className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                      onClick={() => {
                        signinbyEmail()
                      }}
                    >
                      Sign in
                    </button>
                  </Link>

                  <p className="text-center text-sm text-gray-500">
                    Done't Have a account ?
                    <a className="underline" href="#" onClick={() => setchange(true)}>Sign up</a>
                  </p>
                </>
              )
            }
            <span className="flex items-center">
              <span className="h-px flex-1 bg-black"></span>
              <span className="shrink-0 px-6">Or</span>
              <span className="h-px flex-1 bg-black"></span>
            </span>

            <div className="social_links flex justify-center">
              <FcGoogle className="text-[30px] cursor-pointer rounded-full bg-slate-200 w-[40px] p-2 h-[40px] flex justify-center items-center transition hover:bg-white" onClick={() => {
                signin()
              }} />
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}
