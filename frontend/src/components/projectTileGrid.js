import React, { Component } from 'react';
import ProjectTile from './projectTile';

class ProjectTileGrid extends React.Component {
    
    constructor(props) {
        super(props);
    }

    renderTile(title, lookingFor) {
        return <ProjectTile title={title} lookingFor={lookingFor} />;
    }

      
    render() {
        return (
        <div class="projectTileGrid">
            {this.renderTile("title1", "a computing student")}
            {this.renderTile("title2", "a computing student")}
            {this.renderTile("title3", "a computing student")}
        </div>
        );
    }
}

export default ProjectTileGrid;