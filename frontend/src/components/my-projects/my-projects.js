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
            current: true,
            projects: []
        }   
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = async () =>{
        this.setState({projects: []});
        try {
            const response = await fetch(process.env.REACT_APP_SERVER + "/users/" + this.state.id, {headers: authHeader()});
            await response.json().then(async data => {
                await this.setState({project_ids: data});
                await this.state.project_ids.forEach(async id => {
                    let curProject = await this.getProject(id);
                    if (curProject) {
                        this.setState({projects: [...this.state.projects, curProject]});
                    }}
                );
            });
        } catch (err) {
            console.error(err.message);
        }
    }

    //return the project that has id
    getProject = async (id) => {
        try {
            let resultProject = {};
            const response = await fetch(process.env.REACT_APP_SERVER + "/projects/" + id);
            await response.json().then(jsonData => resultProject = jsonData);

            return resultProject;
        } catch (err) {
            console.error(err.message);
        }
    }

    handleSelect = (value) => {
        this.setState({current: value});
        this.getProjects();
    }


    render() {
        if((this.state.id === undefined ) || (this.state.project_ids === undefined) || (this.state.project_ids === null)){
            return(<h1 className="my-projects-title">My Projects</h1>);
        }

        return (   
            <div>
                <h1 className="my-projects-title">My Projects</h1>
                <select className="dropdown-box" onChange={(e) => this.handleSelect(e.target.value)}>
                    <option value="1">Current Projects</option>
                    <option value="">Past Projects</option>
                </select>
                <div className="projectList">
                    {this.state.projects.filter(project => this.state.current ? !project.done: project.done).map(project => <div><Project project={project} updateProjects={this.getProjects} /><br/></div>)}
                </div>
                
             
            </div>
        )
    }
}

export default MyProjects
