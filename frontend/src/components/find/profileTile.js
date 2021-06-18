import React from 'react';
import { Link } from 'react-router-dom';
import './projectTile.css'

class ProfileTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            username: props.username,
            name: props.name,
            imageSrc: props.imageSrc,
            degree: props.degree,
            degree_level : props.degree_level,
            skills: props.skills,
        };
        fetch(`${process.env.REACT_APP_SERVER}/upload/profiles/${this.state.imageSrc}`)
            .then(response => response.blob())
            .then(images => {
               this.setState({imageSrc: URL.createObjectURL(images)});
            })
    }

    render() {
        const styles = {
            projectTile: {
              backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${this.state.imageSrc})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              borderRadius: "9px",
              border: "2px solid gray",
              height: "100%",
              minWidth: "300px",
              maxWidth: "400px",
              display: "flex",
              alignItems: "center",
            },
        }

        return (
            <Link to={`/profileInfo/${this.state.username}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div data-testid='projectTile' className="projectTile" style={styles.projectTile}>
                <div className="projectSummary">
                    <h3 className="projectTileTitle">{this.state.name}</h3>
                    <br></br>
                    <h4>Degree :</h4><p className="projectTileLookingFor"> {this.state.degree}<br></br>{this.state.degree_level}</p>
                    <h4>Skills: </h4>
                    <p>
                        {this.state.skills?.join(', ')}
                    </p>
                </div>
            </div>
            </Link>
         );
    }
}



export default ProfileTile;
