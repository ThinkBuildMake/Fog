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
    projectID: string | null
}

interface CloseButton {
    closeFunc: (event: React.MouseEvent<HTMLButtonElement>) => void
    closeTxt: string
    color: string
    size?: Sizes
}
import styled from 'styled-components'
import { stat } from 'fs'

const ProjectJoinForm: React.FC<CloseButton> = ({
    closeFunc,
    closeTxt,
    color,
    size
}) => {
    const router = useRouter()
    const { register, user } = useAuth()

    // Form State
    const [form, setForm] = useState<Form | null>({
        projectID: ''
    })

    function submitProjectForm(event: MouseEvent): void {
        // Logic Check For Form Items
        event.preventDefault()
        let { valid, message } = checkFormValuesEmpty(form)
        if (!valid) {
            alert(message)
        } else {
            postRequest(
                `${envs[process.env.appEnv]}/project/${
                    form.projectID
                }/add_user`,
                {
                    user_id: user.email
                }
            ).then((project) => {
                const { data, status } = project
                if (status == 201) {
                    console.log(data)
                    router.reload()
                }
                if (status == 400) {
                    console.log(data)
                    alert('Project already added for this user')
                    router.reload()
                }
                if (status == 404) {
                    alert('Invalid ProjectID')
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
            //setForm({ ...form, resources: parseInt(event.target.value) })
        } else {
            setForm({ ...form, [event.target.name]: event.target.value })
        }
    }

    return (
        <Table>
            <OneColumnRow>
                <th>ProjectID</th>
                <td>
                    <input
                        type="text"
                        name="projectID"
                        placeholder="ProjectID"
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
export default ProjectJoinForm
