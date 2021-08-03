import React from 'react'

const Project = ({ project }) => {
    return (
        <tr>
            <td>
                <a href={'projects/' + project.id}>{project.name}</a>
            </td>
            <td>{project.id}</td>
            <td>{project.description}</td>
            <td>{project.resourcesUsed}</td>
            <td>{project.date}</td>
        </tr>
    )
}

export default Project
