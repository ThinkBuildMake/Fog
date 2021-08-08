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
    const { logout, isAuthenticated, user } = useAuth()
    return (
        <header>
            <NavContainer>
                <Link href="/">
                    <a>
                        <Image
                            src="/Logo.png"
                            alt="LOGO"
                            width={182}
                            height={55}
                        />
                    </a>
                </Link>

                {isAuthenticated ? (
                    <NavMenu>
                        <NavButton color="#2f3138">
                            <a href="/home">
                                {user.first_name} {user.last_name}
                            </a>
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
                            <Modal
                                buttonOpenText="Sign Up"
                                modalContent={<RegisterForm />}
                                modalTitle="Register For An Account"
                                buttonCloseText="Close"
                                size={Sizes.SMALL}
                                color="#2f3138"
                            />
                        </NavButton>
                        <NavButton color="#2f3138">
                            <Modal
                                buttonOpenText="Sign In"
                                modalContent={<SignInForm />}
                                modalTitle="Sign In"
                                buttonCloseText="Close"
                                size={Sizes.SMALL}
                            />
                        </NavButton>
                    </NavMenu>
                )}
            </NavContainer>
        </header>
    )
}

export default Header
