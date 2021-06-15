import React from 'react'
import AuthService from '../../services/auth-service';

class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Hi",
            project:{leader_username:"lol"}
        }
    }
    render() {
        return (
            <div className = "project">
                <h1>{this.state.name}</h1>
                {this.state.project.leader_username === AuthService.getUser()?.username && <button className="edit-button">EDIT</button>}
                {this.state.project.leader_username === AuthService.getUser()?.username && <button className="delete-button">DELETE</button>}
            </div>
        )
    }
}

export default Project
