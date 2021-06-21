import React from 'react'
import Project from './project'
import AuthService from '../../services/auth-service';
import './my-projects.css';

class MyProjects extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: AuthService.getUser()?.id,
            project_ids: undefined,
            current: true,
            projects: []
        }   
        if (!AuthService.getUser() && this.props.history) {
            this.props.history.push({
                pathname: '/login',
                state: {
                    message: "Please login to view your projects.",
                },
            });
        }
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = async () =>{
        this.setState({projects: []});
        try {
            const data = await AuthService.authorizedFetch(process.env.REACT_APP_SERVER + "/users/" + this.state.id, this.props);
            await this.setState({project_ids: data.projects});
            await this.state.project_ids.forEach(async id => {
                let curProject = await this.getProject(id);
                if (curProject) {
                    this.setState({projects: [...this.state.projects, curProject]});
                }}
            );
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
                <div className="my-projects-tabs">
                    <h2 onClick={() => { (!this.state.current) ? this.handleSelect(true):   console.log(""); }}
                        style={this.state.current ? {color: "black"} : {color: "grey"}} 
                        className="my-projects-tab">Current Projects</h2>
                    <h2 onClick={() => {(this.state.current) ? this.handleSelect(false):  console.log("");}} 
                        style={this.state.current ? {color: "grey", marginLeft: "1em"} : {color: "black", marginLeft: "1em"}}
                        className="my-projects-tab">Past Projects</h2>
                </div>
                <div className="projectList">
                    {this.state.projects.filter(project => this.state.current ? !project.done: project.done).map(project => <div><Project project={project} updateProjects={this.getProjects} /><br/></div>)}
                </div>
            </div>
        )
    }
}

export default MyProjects
