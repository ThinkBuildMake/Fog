import {
    checkFormValuesEmpty,
    envs,
    postRequestWithoutHeaders
} from '@functions/customfuncs'
import React, { MouseEvent, useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'contexts/Auth'

interface Form {
    userName: string | null
    password: string | null
}

const SignInForm: React.FC = () => {
    const router = useRouter()
    const { login } = useAuth()
    // Form State
    const [form, setForm] = useState<Form | null>({
        userName: '',
        password: ''
    })

    //Question: should form redirect user automatically?
    function submitSignIn(event: MouseEvent): void {
        // Logic Check For Form Items
        event.preventDefault()
        const { valid, message } = checkFormValuesEmpty(form)
        if (!valid) {
            alert(message)
        } else {
            // Send Request
            login(form)
        }
    }

    function handleInputEvent(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className="inner-container">
            <div className="box">
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="userName"
                        className="login-input"
                        placeholder="Username"
                        onChange={handleInputEvent}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="login-input"
                        placeholder="Password"
                        onChange={handleInputEvent}
                    />
                </div>

                <button
                    type="button"
                    className="login-btn"
                    onClick={submitSignIn}
                >
                    Login
                </button>
            </div>
        </div>
    )
}
export default SignInForm
