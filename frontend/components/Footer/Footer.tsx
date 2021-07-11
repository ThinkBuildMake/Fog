import React, { CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactDOM from 'react-dom'
import { FooterList, FooterLinks } from './Styles'

const Footer: React.FC = () => {
    return (
        <footer>
            <FooterList>
                <FooterLinks href="">About Us</FooterLinks>
                <FooterLinks href="">About Fog</FooterLinks>
                <FooterLinks href="">Contact</FooterLinks>
                <a href="https://github.com/ThinkBuildMake/Fog">
                    <Image
                        src="/GitHub_Logo_White.png"
                        alt="Github"
                        width={100}
                        height={41}
                    />
                </a>
            </FooterList>
        </footer>
    )
}

export default Footer
