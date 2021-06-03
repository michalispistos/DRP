import React from 'react';
import ProjectTile from './projectTile';

class ProjectTileGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projects: props.projects
        }
        if(this.state.projects.length === 0){
             this.getProjects();
        }
    }

    renderTile(id, title, lookingFor, tags) {
        if (id === undefined){
            id = 1
        }
        return <ProjectTile key={id} title={title} lookingFor={lookingFor} tags={tags} />;
    }
    
    getProjects = async () => {    
        try {
            const response = await fetch("https://drp12-backend.herokuapp.com/projects");
            const jsonData = await response.json();
    
            this.setState({projects: jsonData})
     
        } catch (err) {
         console.error(err.message);
        }
    
      };
      
    render() {
        return (
            <div data-testid='projectTileGrid'>
                <h1>All Projects</h1>
                <div className="projectTileGrid">
                    {this.state.projects.map(project => this.renderTile(project.id,project.title,project.looking_for,project.tags))}
                </div>
            </div>
        );
    }
}

export default ProjectTileGrid;