import React from 'react'
import Project from './project'
import AuthService from '../../services/auth-service';
import './my-projects.css'

class MyProjects extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projects: [{}],
            projectIds: [],
            id: AuthService.getUser()?.id,
        }
        this.getProjects();
    }

    getProjects = async () =>{
        try {
            const response = await fetch(process.env.REACT_APP_SERVER + "/user/" + this.state.id);
            const jsonData = await response.json();
    
            this.setState({projectIds: jsonData})
        } catch (err) {
            console.error(err.message);
        }

        let projects = [];
        this.state.projectIds.map(async (id) => {
            try {
                const response = await fetch(process.env.REACT_APP_SERVER + "/projects/" + id);
                const jsonData = await response.json();
    
                projects = [...projects,jsonData];
            } catch (err) {
                console.error(err.message);
            }});

        this.setState({projects: projects});
    }

    render() {
        if(AuthService.getUser() === undefined){
            return("");
        }
        return (
            <div>
                <h1 className="my-projects-title">My Projects</h1>
                <div className="projectList">
                    {/* {this.state.projects.map(project => <div><Project project={project}/><br/></div>)} */}
                    <Project></Project>
                    <Project></Project>
                </div>
            </div>
        )
    }
}

export default MyProjects
