import React from 'react';
import { withRouter } from 'react-router';
import AuthService from '../../services/auth-service';
import EditProfilePopup from '../my-profile/editProfilePopup';
import './projectInfo.css';

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            username: this.props.match.params.username,
            profile: undefined,
            image: undefined,
            editProfilePopup: false,
        }
        this.getProfile();
    }


    getProfile = async () => {    
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/users/username/${this.state.username}`);
            const ok = response.ok;
            const jsonData = await response.json();

            this.setState({profile: jsonData});
            
            if (ok) {
                await fetch(`${process.env.REACT_APP_SERVER}/upload/profiles/${this.state.profile.image_filepath}`)
                .then(response => response.blob())
                .then(images => {
                    // Then create a local URL for that image and print it
                   this.setState({image: URL.createObjectURL(images)});
                })
            }
        } catch (err) {
         console.error(err.message);
        }
        
      };


    render () {
        if (!this.state.profile || this.state.profile.message === "User not found!") {
            return <></>;
        } else if (this.state.profile.message === "Profile not public!") {
            return <h1>Profile not public!</h1>;
        }
        return (
            <div  data-testid='projectInfo' className="project-info">
                <h1 className="title" > {this.state.profile.username} </h1>
                <div className="details-container">
                    <div className="details-text">
                        <div className="box-left"/>
                        <div className="box-right"/>
                        <h3 className="topic">Name :</h3>
                        <p>{this.state.profile.firstname + " " + this.state.profile.lastname}</p>
                        <h3 className="topic">Bio :</h3>
                        <p>{this.state.profile.bio}</p>
                        <h3 className="topic">Degree:</h3>
                        <p>{this.state.profile.degree}</p>
                        <h3 className="topic">Degree Level:</h3>
                        <p>{this.state.profile.degree_level}</p>
                        <h3 className="topic">Email:</h3>
                        <p>{this.state.profile.email}</p>
                        <h3 className="topic">Skills:</h3>
                        <ul className="bullet-point">{this.state.profile.skills.map(skill => <li>{skill}</li>)}</ul>

                        <button className="edit-button" type="button" onClick={() => {this.setState({editProfilePopup: true})}}
                            style={(AuthService.getUser()?.username !== this.state.username)? {display: "none"} : {}}>Edit</button>


                        <EditProfilePopup trigger={this.state.editProfilePopup} setTrigger={() => {this.setState({editProfilePopup: false})}} updateProfile={this.getProfile} profile={this.state.profile}></EditProfilePopup>
                        
                    </div>
                    <img className="detials-image" src={this.state.image} alt="profile preview"></img>
                </div>  
            </div>       
        );
    };
}

export default withRouter(ProfileInfo);
