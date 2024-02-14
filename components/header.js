'use client';
import { useState, useEffect } from "react";
import Login from "@/components/login";
import UserMenu from "@/components/usermenu";


export default function Header () {
    const [user, setUser] = useState();

    function checkUser () {
        let storedUser = JSON.parse(window.localStorage.getItem('user'));
        setUser(storedUser)
        if (storedUser !== null) {
            // console.log("here");
            return true
        } 
        return false
    }

    useEffect(() => {
        checkUser();
        window.addEventListener('storage', () => {
            checkUser();
        })
      }, []);

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                <a className="btn btn-ghost text-xl">MyBlog</a>
                </div>

                <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Proposals</a></li>
                    <li><a>Swap</a></li>
                </ul>
                </div>

                <div className="navbar-end">
                    {user ? (
                        <UserMenu user={user} setUser={setUser}/>
                    ) : (
                        <Login setUser={setUser}/>
                    )}
                </div>
            </div>
        </>
    );
}