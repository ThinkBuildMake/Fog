import { checkFormValuesEmpty } from '@functions/customfuncs'
import React, { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'contexts/Auth'

interface Form {
    email: string | null
    password: string | null
    password_check: string | null
    first_name: string | null
    last_name: string | null
}

const RegisterForm: React.FC = () => {
    const router = useRouter()
    const { register } = useAuth()

    // Form State
    const [form, setForm] = useState<Form | null>({
        email: '',
        password: '',
        password_check: '',
        first_name: '',
        last_name: ''
    })

    //Question: should form redirect user automatically?
    function submitRegister(event: MouseEvent): void {
        // Logic Check For Form Items
        event.preventDefault()
        let { valid, message } = checkFormValuesEmpty(form)

        // Check if passwords match
        if (form.password != form.password_check) {
            valid = false
            message = 'Passwords Do Not Match'
        }

        if (!valid) {
            alert(message)
        } else {
            // Send Request
            register(form)
        }
    }

    function handleInputEvent(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(form)
        event.preventDefault()
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className="inner-container">
            <div className="box">
                <div className="input-group">
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        className="login-input"
                        placeholder="John"
                        onChange={handleInputEvent}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        className="login-input"
                        placeholder="Smith"
                        onChange={handleInputEvent}
                    />
                </div>

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
                <div className="input-group">
                    <label htmlFor="password-check">Check Password</label>
                    <input
                        type="password"
                        name="password_check"
                        className="login-input"
                        placeholder="Retype Your Password"
                        onChange={handleInputEvent}
                    />
                </div>

                <button
                    type="button"
                    className="login-btn"
                    onClick={submitRegister}
                >
                    Register for Account
                </button>
            </div>
        </div>
    )
}
export default RegisterForm
