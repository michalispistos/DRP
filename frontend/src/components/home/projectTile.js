import React from 'react';

class ProjectTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            key: props.id,
            name: props.name,
            imageSrc: "images/default.jpeg",
            lookingFor: props.lookingFor,
            tags: props.tags
        };
        
    }

    render() { 
        const styles = {
            projectTile: {
              backgroundImage: `linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url(${this.state.imageSrc})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              border: "2px solid gray",
              height: "200px",
              width: "300px",
              margin: "auto",
            },
        }

        return ( 
            <div data-testid='projectTile' className="projectTile" style={styles.projectTile}>
                <div className="projectInfo" style={styles.projectInfo}>
                    <h3 className="projectTileTitle">{this.state.name}</h3>
                    <br></br>
                    <h4>Looking for:</h4><p className="projectTileLookingFor"> {this.state.lookingFor}</p>
                    <br></br>
                    <h4>Tags: </h4>
                    <p>
                        {this.state.tags?.join(', ')}
                    </p>
                </div>
            </div>
         );
    }
}


 
export default ProjectTile;