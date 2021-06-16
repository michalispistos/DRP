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
                {/* {this.state.project.leader_id === this.state.user_id && <div>Leader</div>} */}
                <div className="projectButtons">
                    <button className="edit-button" onClick={() => {this.setState({popup:true})}}>EDIT</button>
                    <button className="delete-button" style={{display: "none"}}>DELETE</button>
                </div>
                <EditPopup trigger={this.state.popup} setTrigger={() => {this.setState({popup: false})}} updateProjectComponent={this.getProject} project={this.state.project}></EditPopup>
            </div>
        )
    }
}

export default Project
