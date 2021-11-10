import { checkFormValuesEmpty, envs, postRequest } from '@functions/customfuncs'
import React, { MouseEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'contexts/Auth'
import GenericButton from '@components/Button/Generic/GenericButton'
import { Sizes } from '@functions/customfuncs'
import {
    Table,
    OneColumnRow,
    TwoColumnRowElement,
    TwoColumnsRow
} from './Styles'
// We make the assumption that the creator of the project will be handled server side and therefore will be using jwt token on backend to assign creator
interface Form {
    project_id: string | null
    description: string | null
    title: string | null
    resources: number | null
}

interface CloseButton {
    closeFunc: (event: React.MouseEvent<HTMLButtonElement>) => void
    closeTxt: string
    color: string
    size?: Sizes
}
import styled from 'styled-components'

const ProjectForm: React.FC<CloseButton> = ({
    closeFunc,
    closeTxt,
    color,
    size
}) => {
    const router = useRouter()
    const { register, user } = useAuth()

    // Form State
    const [form, setForm] = useState<Form | null>({
        project_id: '',
        description: '',
        title: '',
        resources: 0
    })

    function submitProjectForm(event: MouseEvent): void {
        // Logic Check For Form Items
        event.preventDefault()
        let { valid, message } = checkFormValuesEmpty(form)
        if (!valid) {
            alert(message)
        } else {
            postRequest(`${envs[process.env.appEnv]}/project/create`, {
                title: form.title,
                description: form.description,
                user_id: user.email
            }).then((project) => {
                const { data, status } = project
                if (status == 201) {
                    console.log(data)
                    router.reload()
                }
            })
        }
    }

    function handleInputEvent(
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) {
        event.preventDefault()
        if (typeof form[event.target.name] == 'number') {
            //TODO : enforce min max constraints
            setForm({ ...form, resources: parseInt(event.target.value) })
        } else {
            setForm({ ...form, [event.target.name]: event.target.value })
        }
    }

    return (
        <Table>
            <OneColumnRow>
                <th>Title</th>
                <td>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleInputEvent}
                    />
                </td>
            </OneColumnRow>
            <OneColumnRow>
                <th>Description</th>
                <td>
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleInputEvent}
                    />
                </td>
            </OneColumnRow>
            <button
                type="button"
                className="login-btn"
                onClick={submitProjectForm}
            >
                Submit
            </button>
            <GenericButton
                size={size}
                text={closeTxt}
                onClick={closeFunc}
                color={color}
            />
        </Table>
    )
}
export default ProjectForm
