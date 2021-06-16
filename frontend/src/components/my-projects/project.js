import React from 'react'
import './project.css'
import { Link } from 'react-router-dom';
import EditPopup from './editPopup';
import AuthService from '../../services/auth-service';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project : undefined,
            popup: false,
            user_id: AuthService.getUser().id,
            image: undefined,
        }
    }

    componentDidMount() {
        this.getProject();
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
                .then(this.props.updateProjects())
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
            .catch(error => console.log('Error submitting project', error));

        

    }


    getProject = async () => {
        try{
            const response = await fetch(process.env.REACT_APP_SERVER + "/projects/" + this.props.project_id);
            await response.json().then(jsonData => this.setState({project: jsonData}));

            await fetch(`${process.env.REACT_APP_SERVER}/upload/${this.state.project.image_filepath}`)
            .then(response => response.blob())
            .then(images => {
                // Then create a local URL for that image and print it
               this.setState({image: URL.createObjectURL(images)});
            })
        }catch (err) {
            console.error(err.message);
        }
    }

    render() {
        if (this.state.project === undefined) {
            return <></>;
        }
        return (
            <div className="project" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${this.state.image})` }}>
                <Link to={`/projectInfo/${this.state.project.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <h1 className="project-title">{this.state.project.name}</h1>
                </Link>
                {this.state.project.leader_id === this.state.user_id ? (<div style={{display:"flex", alignContent:"center"}}>
                <div className="position-box">Leader</div> 
                <div className="projectButtons">
                    <button className="edit-button" onClick={() => {this.setState({popup:true})}}>EDIT</button>
                    <button className="delete-button" onClick={this.handleDelete}>DELETE</button>
                </div>
                <EditPopup trigger={this.state.popup} setTrigger={() => {this.setState({popup: false})}} updateProjectComponent={this.getProject} project={this.state.project}></EditPopup>
                </div>) : (<div className="position-box">Member</div>)}
            </div>
        )
    }
}

export default Project
