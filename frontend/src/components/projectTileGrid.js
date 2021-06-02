import React from 'react';
import ProjectTile from './projectTile';

class ProjectTileGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
        this.getProjects();
    }

    renderTile(title, lookingFor) {
        return <ProjectTile title={title} lookingFor={lookingFor} />;
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
        <div class="projectTileGrid">
            {this.state.projects.map(project => this.renderTile(project.title,project.looking_for))}
        </div>
        );
    }
}

export default ProjectTileGrid;