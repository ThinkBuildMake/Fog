import { checkFormValuesEmpty } from '@functions/customfuncs'
import React, { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'contexts/Auth'
import {
    Table,
    OneColumnRow,
    TwoColumnRowElement,
    TwoColumnsRow
} from './Styles'
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
        event.preventDefault()
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <Table>
            <OneColumnRow>
                <th>Email</th>
                <input
                    type="text"
                    name="email"
                    className="login-input"
                    placeholder="Email"
                    onChange={handleInputEvent}
                />
            </OneColumnRow>

            <TwoColumnsRow>
                <TwoColumnRowElement>
                    <th>First Name</th>
                    <input
                        type="text"
                        name="first_name"
                        className="login-input"
                        placeholder="John"
                        onChange={handleInputEvent}
                    />
                </TwoColumnRowElement>
                <TwoColumnRowElement>
                    <th>Last Name</th>
                    <input
                        type="text"
                        name="last_name"
                        className="login-input"
                        placeholder="Smith"
                        onChange={handleInputEvent}
                    />
                </TwoColumnRowElement>
            </TwoColumnsRow>

            <TwoColumnsRow>
                <TwoColumnRowElement>
                    <th>Password</th>
                    <input
                        type="password"
                        name="password"
                        className="login-input"
                        placeholder="Password"
                        onChange={handleInputEvent}
                    />
                </TwoColumnRowElement>
                <TwoColumnRowElement>
                    <th>Check Password</th>
                    <input
                        type="password"
                        name="password_check"
                        className="login-input"
                        placeholder="Retype Your Password"
                        onChange={handleInputEvent}
                    />
                </TwoColumnRowElement>
            </TwoColumnsRow>

            <button
                type="button"
                className="login-btn"
                onClick={submitRegister}
            >
                Register
            </button>
        </Table>
    )
}
export default RegisterForm
