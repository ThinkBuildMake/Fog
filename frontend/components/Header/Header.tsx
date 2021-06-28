import React, { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactDOM from 'react-dom'
import { NavContainer, NavMenu, NavButton } from './Styles'

const Header: React.FC = () => {
    return (
        <NavContainer>
            <Link href="/">
                <a>
                    <Image
                        src="/Logo.png"
                        alt="LOGO"
                        width={364}
                        height={110}
                    />
                </a>
            </Link>
            <NavMenu>
                <NavButton color="#2f3138">
                    <a href="/">About Us</a>
                </NavButton>
                <NavButton color="#2f3138">
                    <a href="/">New User?</a>
                </NavButton>
                <NavButton color="#2f3138">
                    <a href="/">Sign In</a>
                </NavButton>
            </NavMenu>
        </NavContainer>
    )
}

export default Header
