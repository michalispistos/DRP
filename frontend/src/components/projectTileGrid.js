import React from 'react';
import ProjectTile from './projectTile';

class ProjectTileGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projects: props.projects,
            paid: false
        }
        
        if(this.state.projects.length === 0){
            this.getProjects();
        }
    }

    renderTile(id, title, lookingFor, tags) {
        if (id === undefined){
            id = 1;
        }
        return <ProjectTile key={id} title={title} lookingFor={lookingFor} tags={tags} />;
    }
    
    getProjects = async () => {    
        try {
            const response = await fetch("https://drp12-backend.herokuapp.com/projects");
            const jsonData = await response.json();
    
            this.setState({projects: jsonData})
            console.log(this.state.projects);
        } catch (err) {
         console.error(err.message);
        }
    
      };
      
    render() {
        return (
            <div data-testid='projectTileGrid'>
                <h1>All Projects</h1>
                <br></br>
                Filters: 
                <form>
                <input type="checkbox" onClick={() => this.setState({paid: !this.state.paid})} name="Paid"></input>Paid
                </form>
                <div className="projectTileGrid">
                    {this.state.projects
                    .filter(project => this.state.paid ? project.paid : true)
                    .map(project => this.renderTile(project.project_id, project.title,project.looking_for, project.tags))}
                </div>
            </div>
        );
    }
}

export default ProjectTileGrid;