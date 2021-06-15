import React from 'react'
import './project.css'
import { Link } from 'react-router-dom';
import EditPopup from './editPopup';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project:{name: "lol", },
            popup: false
        }
    }
    render() {
        return (
            <div className="project" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(images/default.jpg)` }}>
                <Link to={`/projectInfo/${this.state.project.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <h1 className="project-title">{this.state.project.name}</h1>
                </Link>
                <div className="projectButtons">
                    <button className="edit-button" onClick={() => {this.setState({popup:true})}}>EDIT</button>
                    <button className="delete-button">DELETE</button>
                </div>
                <EditPopup trigger={this.state.popup} setTrigger={() => {this.setState({popup: false})}} project={this.state.project}></EditPopup>
            </div>
        )
    }
}

export default Project
