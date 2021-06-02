import React from 'react';
import ReactDOM from 'react-dom';

class ProjectTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            title: props.title,
            imageSrc: "image1.jpeg",
            lookingFor: props.lookingFor
        };
    }

    
    render() { 
        return ( 
            <div className="projectTile">
                <img className="projectTileImage" src={"images/"+this.state.imageSrc}/>
                <h4 className="projectTileTitle">{this.state.title}</h4>
                <h4 className="projectTileLookingFor">{this.state.lookingFor}</h4>
            </div>
         );
    }
}


 
export default ProjectTile;