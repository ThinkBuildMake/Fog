import React, { useState, MouseEvent } from 'react'
import Modal from 'react-modal'
import { Sizes, determineModalSize } from '@functions/customfuncs'
import GenericButton from '@components/Button/Generic/GenericButton'

// How to pass in props https://linguinecode.com/post/pass-react-component-as-prop-with-typescript
interface Props {
    buttonOpenText: string
    buttonCloseText: string
    modalTitle: string
    modalContent: React.FC<{
        closeFunc: (event: React.MouseEvent<HTMLButtonElement>) => void
        closeTxt: string
        color: string
        size: Sizes
    }> // Change: https://stackoverflow.com/questions/63162409/how-to-pass-node-as-prop-to-component-in-react, https://www.pluralsight.com/guides/typescript-pass-function-react
    size?: Sizes
    color?: string
}

const _Modal: React.FC<Props> = ({
    buttonOpenText,
    buttonCloseText,
    modalContent,
    modalTitle,
    size,
    color
}) => {
    // State variable determining modal open state
    const [toggle, setToggle] = useState<boolean | null>(false)

    const InputContent = modalContent

    function showModal(event: MouseEvent) {
        event.preventDefault()
        setToggle(true)
    }
    function closeModal(event: MouseEvent) {
        event.preventDefault()
        setToggle(false)
    }

    return (
        <div>
            <GenericButton
                text={buttonOpenText}
                onClick={showModal}
                disabled={toggle}
                size={Sizes.EXTRA_SMALL}
                color={color}
            />
            <Modal
                ariaHideApp={false}
                isOpen={toggle}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.75)'
                    },
                    content: {
                        position: 'absolute',
                        top: determineModalSize(size),
                        left: determineModalSize(size),
                        right: determineModalSize(size),
                        bottom: determineModalSize(size),
                        // width: '500px',
                        // height: '400px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '6px',
                        outline: 'none',
                        padding: '30px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }
                }}
            >
                {/* Put JSX HERE */}
                <div
                    style={{
                        width: '80%',
                        height: '100%'
                        // border: '1px solid blue'
                    }}
                >
                    <h1
                        style={{
                            paddingBottom: '10px',
                            borderBottom: '1px solid gray'
                        }}
                    >
                        {modalTitle}
                    </h1>
                    <InputContent
                        closeFunc={closeModal}
                        closeTxt={buttonCloseText}
                        color={color}
                        size={Sizes.MEDIUM}
                    />
                </div>
            </Modal>
        </div>
    )
}
export default _Modal
