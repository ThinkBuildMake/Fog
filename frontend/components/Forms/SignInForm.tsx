import { checkFormValuesEmpty } from '@functions/customfuncs'
import React, { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'contexts/Auth'

interface Form {
    email: string | null
    password: string | null
}

const SignInForm: React.FC = () => {
    const router = useRouter()
    const { login } = useAuth()
    // Form State
    const [form, setForm] = useState<Form | null>({
        email: '',
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
                    <label htmlFor="username">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="login-input"
                        placeholder="Email"
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
