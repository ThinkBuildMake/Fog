import Project from './Project'
import React from 'react'
import ColumnTitles from './ColumnTitles'

const ProjectTable = ({ projects, filter }) => {
    return (
        <div>
            <input
                type="search"
                placeholder="Search project by ID"
                onKeyDown={filter}
            />
            <table>
                <ColumnTitles />
                <tbody>
                    {projects.map((project, index) => (
                        <Project project={project} key={`project-${index}`} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectTable
