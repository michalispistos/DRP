import React from 'react';
import ProjectTile from './projectTile';

class ProjectTileGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projects: props.projects,
            paid: false,
            remote: false,
            filterByTags: false,
            tags: [],
        }
        
        if(this.state.projects.length === 0){
            this.getProjects();
        }
    }

    renderTile(id, name, imageSrc, lookingFor, tags) {
        if (id === undefined){
            id = 1;
        }
        return <ProjectTile key={id} id={id} name={name} imageSrc={imageSrc} lookingFor={lookingFor} tags={tags}/>;
    }

    handlePaid = () =>{
        this.setState({paid : !this.state.paid});
    }

    handleRemote = () => {
        this.setState({remote: !this.state.remote});
    }

    handleTags = (selectedTags) => {
        this.setState({filterByTags: true, tags: selectedTags});
    }

    resetTagFilters = () => {
        this.setState({filterByTags: false});
    }
    
    getProjects = async () => {    
        try {
            const response = await fetch(process.env.REACT_APP_SERVER + "/projects");
            const jsonData = await response.json();
    
            this.setState({projects: jsonData})
        } catch (err) {
         console.error(err.message);
        }
    
      };
      
    render() {
        if (this.state.projects.length === 0) {
            return <></>
        }
        return (    
            <div data-testid='projectTileGrid' className="projectTileGrid">
                {this.state.projects
                .filter(project => this.state.paid ? project.paid : true)
                .filter(project => this.state.remote ? project.location === "Remote" : true)
                .filter(project => this.state.filterByTags ? this.state.tags.some(tag => project.tags.map(t=>t.toLowerCase()).includes(tag.key.toLowerCase())) : true)
                .map(project => this.renderTile(project.id, project.name, project.image_filepath ,project.looking_for, project.tags))}
            </div>
        );
    }
}

export default ProjectTileGrid;