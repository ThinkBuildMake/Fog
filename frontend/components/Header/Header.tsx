import React, { CSSProperties, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactDOM from 'react-dom'
import { NavContainer, NavMenu, NavButton } from './Styles'
import { useAuth } from 'contexts/Auth'
import GenericButton from '@components/Button/Generic/GenericButton'
import { Sizes } from '@functions/customfuncs'
import Modal from '@components/Modal/Modal'
import SignInForm from '@components/Forms/SignInForm'
import RegisterForm from '@components/Forms/RegisterForm'
const Header: React.FC = () => {
    useEffect(() => {
        console.log(isAuthenticated)
    }, [])
    const { logout, isAuthenticated } = useAuth()
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

            {isAuthenticated ? (
                <NavMenu>
                    <NavButton color="#2f3138">
                        <a href="/home"> Hello</a>
                    </NavButton>
                    <GenericButton
                        onClick={logout}
                        text="Log Out"
                        size={Sizes.EXTRA_SMALL}
                    />
                </NavMenu>
            ) : (
                <NavMenu>
                    <NavButton color="#2f3138">
                        <a href="/about">About Us</a>
                    </NavButton>
                    <NavButton color="#2f3138">
                        <Modal
                            buttonOpenText="New User?"
                            modalContent={<RegisterForm />}
                            modalTitle="Register For An Account"
                            buttonCloseText="Close"
                            size={Sizes.MEDIUM}
                            color="#2f3138"
                        />
                    </NavButton>
                    <NavButton color="#2f3138">
                        <Modal
                            buttonOpenText="Sign In"
                            modalContent={<SignInForm />}
                            modalTitle="Sign In"
                            buttonCloseText="Close"
                            size={Sizes.MEDIUM}
                        />
                        {/* <a href="/">Sign In</a> */}
                    </NavButton>
                </NavMenu>
            )}
        </NavContainer>
    )
}

export default Header
