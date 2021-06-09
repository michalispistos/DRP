import React from 'react';
import { Link } from 'react-router-dom';

class ProjectTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            imageSrc: props.imageSrc,
            lookingFor: props.lookingFor,
            tags: props.tags
        };
        fetch(`${process.env.REACT_APP_SERVER}/upload/${this.state.imageSrc}`)
            .then(response => response.blob())
            .then(images => {
               this.setState({imageSrc: URL.createObjectURL(images)});
            })
    }

    render() {
        const styles = {
            projectTile: {
              backgroundImage: `linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url(${this.state.imageSrc})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              border: "2px solid gray",
              height: "260px",
              minWidth: "350px",
              margin: "auto",
            },
        }

        return (
            <Link to={`/projectInfo/${this.state.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div data-testid='projectTile' className="projectTile" style={styles.projectTile}>
                <div className="projectInfo" style={styles.projectInfo}>
                    <h3 className="projectTileTitle">{this.state.name}</h3>
                    <br></br>
                    <h4>Looking for:</h4><p className="projectTileLookingFor"> {this.state.lookingFor}</p>
                    <h4>Tags: </h4>
                    <p>
                        {this.state.tags?.join(', ')}
                    </p>
                </div>
            </div>
            </Link>
         );
    }
}



export default ProjectTile;
