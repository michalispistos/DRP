import React from 'react'
import Project from './project'
import AuthService from '../../services/auth-service';
import authHeader from '../../services/auth-header';
import './my-projects.css'

class MyProjects extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: AuthService.getUser().id,
            project_ids: undefined,
        }   
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = async () =>{
        try {
            const response = await fetch(process.env.REACT_APP_SERVER + "/users/" + this.state.id, {headers: authHeader()});
            const project_ids = await response.json();
            await this.setState({project_ids});
            
        } catch (err) {
            console.error(err.message);
        }
    }


    render() {
        if((this.state.id === undefined ) || (this.state.project_ids === undefined) || (this.state.project_ids === null)){
            return(<h1 className="my-projects-title">My Projects</h1>);
        }
        return (   
            <div>
                <h1 className="my-projects-title">My Projects</h1>
                <div className="projectList">
                    {this.state.project_ids.map(project_id => <div><Project project_id={project_id} updateProjects={this.getProjects} /><br/></div>)}
                </div>
            </div>
        )
    }
}

export default MyProjects
