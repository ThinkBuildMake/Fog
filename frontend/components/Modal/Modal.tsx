import React, { useState, MouseEvent } from 'react'
import Modal from 'react-modal'
import { Sizes, determineModalSize } from '@functions/customfuncs'
import GenericButton from '@components/Button/Generic/GenericButton'

// How to pass in props https://linguinecode.com/post/pass-react-component-as-prop-with-typescript
interface Props {
    buttonOpenText: string
    buttonCloseText: string
    modalTitle: string
    modalContent: React.ReactNode
    size?: Sizes
}

const _Modal: React.FC<Props> = ({
    buttonOpenText,
    buttonCloseText,
    modalContent,
    modalTitle,
    size
}) => {
    // State variable determining modal open state
    const [toggle, setToggle] = useState<boolean | null>(false)

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
                size={Sizes.SMALL}
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
                    {modalContent}
                </div>
                <GenericButton
                    size={Sizes.MEDIUM}
                    text={buttonCloseText}
                    onClick={closeModal}
                />
            </Modal>
        </div>
    )
}
export default _Modal
