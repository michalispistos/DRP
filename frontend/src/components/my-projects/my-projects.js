import React from 'react'
import Project from './project'
import AuthService from '../../services/auth-service';

class MyProjects extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        if(AuthService.getUser() === undefined){
            return("");
        }

        return (
            <div>
                <h1>My Projects</h1>
                <Project />
            </div>
        )
    }
}

export default MyProjects
