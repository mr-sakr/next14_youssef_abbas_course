'use client'
import Link from "next/link"
import { GrTechnology } from "react-icons/gr";
import styles from "./header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    return (
        <nav className={styles.navbar}>
            <div>
                <Link href="/" className={styles.logo}>
                    CLOUD
                    <GrTechnology/>
                    HOSTING
                </Link>

                <div className={styles.menu}>
                    {toggle ? <IoMdClose onClick={() => setToggle(prev => !prev) } /> : <AiOutlineMenu onClick={() => setToggle(prev => !prev) } />}
                </div>
            </div>
            
            <div className={styles.navLinlsWrapper} style={{clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" || ""}}>
                <ul className={styles.navLinks}>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/">Home</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/articles?pageNumber=1">Articles</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/about">About</Link>
                    <Link onClick={() => setToggle(false)} className={styles.navLink} href="/admin">Admin Dashboard</Link>
                </ul>
            </div>
            
        </nav>
    )
}

export default Navbar