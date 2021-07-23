import React from 'react'
import DefaultLayout from '@templates/DefaultLayout'
import styled from 'styled-components'
import Image from 'next/image'

const OuterDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    h1 {
        font-size: 7vh;
    }
    h3 {
        font-size: 3vh;
    }
    * {
        color: white;
    }
`
const TextDiv = styled.div`
    max-width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1060px) {
        display: none;
    }
`
const IndexPage: React.FC = () => {
    return (
        <DefaultLayout>
            <OuterDiv>
                <TextDiv>
                    <div>
                        <h1>Professional Resource Management</h1>
                        <h3>All your resources in one place</h3>
                    </div>
                </TextDiv>
                <ImageDiv>
                    <Image
                        src="/cloud_gear.png"
                        alt="Github"
                        width={500}
                        height={429}
                    />
                </ImageDiv>
            </OuterDiv>
        </DefaultLayout>
    )
}

export default IndexPage
