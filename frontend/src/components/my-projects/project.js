import React from 'react'
import './project.css'
import { Link } from 'react-router-dom';
import EditPopup from './editPopup';
import AuthService from '../../services/auth-service';
import ConfirmationPopup from './confirmationPopup';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project : props.project,
            editPopup: false,
            confirmationPopup: false,
            user_id: AuthService.getUser().id,
            image: undefined,
        }
    }

    componentDidMount() {
        this.getImage();
    }

    getImage = async () => {
        await fetch(`${process.env.REACT_APP_SERVER}/upload/${this.state.project.image_filepath}`)
        .then(response => response.blob())
        .then(images => {
            // Then create a local URL for that image and print it
           this.setState({image: URL.createObjectURL(images)});
        });

    }


    handleDelete = async () => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                project: this.state.project.id,
            }),
        };
        

        await fetch(`${process.env.REACT_APP_SERVER}/users/${this.state.user_id}/rm-project`, requestOptions)

        this.state.project.members.map(async (member) => {
            await fetch(`${process.env.REACT_APP_SERVER}/users/username/${member.name}/rm-project`, requestOptions)
                .then(response => console.log("Deleted project"))
                .catch(err => console.log("Error updating project"));
        });


        const requestOptions1 = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
        };

        await fetch(`${process.env.REACT_APP_SERVER}/projects/${this.state.project.id}`, requestOptions1)
            .then(async response => {
                console.log('Deleted');
            })
            .then(this.props.updateProjects())
            .catch(error => console.log('Error submitting project', error));
    }

    handleDone = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                done: !this.state.project.done,
            }),
        };

        await fetch(`${process.env.REACT_APP_SERVER}/projects/${this.state.project.id}`, requestOptions)
            .then(async response => {
                console.log('changed done');     
            })
            .then(this.props.updateProjects())
            .catch(error => console.log('Error marking done', error));
 
           
    }




    render() {
        return (
            <Link to={`/projectInfo/${this.state.project.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="project" onClick={() => console.log("CLICK")} style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${this.state.image})` }}>
                   
                    <h1 className="project-title">{this.state.project.name}</h1>
                   
                    {this.state.project.leader_id === this.state.user_id ? (<div style={{display:"flex", alignContent:"center"}}>
                    <div className="position-box">Leader</div> 
                <div className="projectButtons">
                    <button className="done-button" onClick={(e) => {e.stopPropagation(); e.preventDefault();this.handleDone(); }}>MARK AS {this.state.project.done? "NOT" : ""} DONE</button>
                    <button className="edit-button" onClick={(e) => {e.stopPropagation(); e.preventDefault(); this.setState({editPopup:true}); }}>EDIT</button>
                    <button className="delete-button" onClick={(e) => {e.stopPropagation(); e.preventDefault(); this.setState({confirmationPopup:true});}}>DELETE</button>
                    <ConfirmationPopup trigger={this.state.confirmationPopup} setTrigger={() => {this.setState({confirmationPopup: false})}} delete={() => {this.handleDelete()}}>
                        <h3 >Are you sure you want to delete?</h3>
                    </ConfirmationPopup>

                </div>
                <EditPopup trigger={this.state.editPopup} setTrigger={() => {this.setState({editPopup: false})}} updateProjectComponent={this.props.updateProjects} project={this.state.project}></EditPopup>
                </div>) : (<div className="position-box">Member</div>)}       
            </div>
        </Link>
        )
    }
}

export default Project
