import React from 'react';
import { withRouter } from 'react-router';
import AuthService from '../../services/auth-service';
import EditProfilePopup from '../my-profile/editProfilePopup';
import './projectInfo.css';
import './profileInfo.css';

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
    }

    async componentDidMount() {
        this.getProfile();
    }


    getProfile = async () => {    
        try {
            const jsonData = await AuthService.authorizedFetch(`${process.env.REACT_APP_SERVER}/users/username/${this.state.username}`, this.props);

            this.setState({profile: jsonData});
            
            if (jsonData.status === 200) {
                await fetch(`${process.env.REACT_APP_SERVER}/upload/profiles/${this.state.profile.image_filepath}`)
                .then(res => res.blob())
                .then(images => {
                    // Then create a local URL for that image and print it
                   this.setState({image: URL.createObjectURL(images)});
                })
            }
            this.setState({loaded: true});
        } catch (err) {
         console.error(err.message);
        }
        
      };


    render () {
        if (!this.state.profile) {
            return (<></>);
        } else if (this.state.profile.status !== 200) {
            return (
            <>
                {this.state.profile.message}
            </>
            );
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

                        <button className="edit-profile-button" type="button" onClick={() => {this.setState({editProfilePopup: true})}}
                            style={(AuthService.getUser()?.username !== this.state.username)? {display: "none"} : {}}>Edit</button>


                        
                        
                    </div>
                    <img className="profile-image" src={this.state.image} alt="profile preview"></img>
                    
                </div>  
                <EditProfilePopup trigger={this.state.editProfilePopup} setTrigger={() => {this.setState({editProfilePopup: false})}} updateProfile={this.getProfile} profile={this.state.profile}></EditProfilePopup>
            </div>       
        );
    };
}

export default withRouter(ProfileInfo);
