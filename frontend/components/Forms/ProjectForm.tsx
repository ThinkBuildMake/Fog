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
// We make the assumption that the creator of the project will be handled server side and therefore will be using jwt token on backend to assign creator
interface Form {
    project_id: string | null
    description: string | null
    title: string | null
    resources: number | null
}
import styled from 'styled-components'

const ProjectForm: React.FC = () => {
    const router = useRouter()
    const { register } = useAuth()

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
            console.log(form)
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
            <TwoColumnsRow>
                <TwoColumnRowElement>
                    <th>Project Id</th>
                    <td>
                        <input
                            type="text"
                            name="project_id"
                            placeholder="Put a Unique Project Id Here"
                            onChange={handleInputEvent}
                        />
                    </td>
                </TwoColumnRowElement>
                <TwoColumnRowElement>
                    <th>Max Resources</th>
                    <td>
                        <input
                            type="number"
                            name="resources"
                            onChange={handleInputEvent}
                            placeholder="0"
                            min="0"
                            max="100"
                        />
                    </td>
                </TwoColumnRowElement>
            </TwoColumnsRow>
            <button
                type="button"
                className="login-btn"
                onClick={submitProjectForm}
            >
                Submit
            </button>
        </Table>
    )
}
export default ProjectForm
