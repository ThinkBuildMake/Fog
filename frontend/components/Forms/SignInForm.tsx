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
        <Table>
            <OneColumnRow>
                <th> Email</th>
                <input
                    type="text"
                    name="email"
                    className="login-input"
                    placeholder="Email"
                    onChange={handleInputEvent}
                />
            </OneColumnRow>

            <OneColumnRow>
                <th>Password</th>
                <input
                    type="password"
                    name="password"
                    className="login-input"
                    placeholder="Password"
                    onChange={handleInputEvent}
                />
            </OneColumnRow>

            <button type="button" className="login-btn" onClick={submitSignIn}>
                Login
            </button>
        </Table>
    )
}
export default SignInForm
