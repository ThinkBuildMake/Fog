import Project from './Project'
import React from 'react'
import ColumnTitles from './ColumnTitles'

const ProjectTable = ({ projects, filter }) => {
    return (
        <table>
            <input
                type="search"
                placeholder="Search project by ID"
                onKeyDown={filter}
            />
            <ColumnTitles />
            {projects.map((project) => (
                <Project project={project} />
            ))}
        </table>
    )
}

export default ProjectTable
