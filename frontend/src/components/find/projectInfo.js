import React from 'react';
import { withRouter } from 'react-router';
import './projectInfo.css';
import ApplyPopup from './applyPopup';
import AuthService from '../../services/auth-service';
import authHeader from '../../services/auth-header';

class ProjectInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            id: this.props.match.params.id,
            project: undefined,
            image: undefined,
            applications: [],
            popupApply: false,
        }
        this.getProject();
        this.getApplications();
    }


    getApplications = async () =>{
        const response = await fetch(process.env.REACT_APP_SERVER + "/users/" + AuthService.getUser()?.id, {headers: authHeader()});
        await response.json().then(async data => {
            this.setState({applications: data.applications});
        });
    }



    handleApply = async (msg) => { 

        const requestOptionsForApplicationsList = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
               application: this.state.project.id,
            }),
       }

       await fetch(`${process.env.REACT_APP_SERVER}/users/${AuthService.getUser().id}`, requestOptionsForApplicationsList)
            .then(response => console.log('Updated Applications'))
            .catch(error => console.log('Error updating applications', error));
        
        const message = `Hi ${this.state.project.leader},
        <br>${AuthService.getUser().firstname} wants to join your project: ${this.state.project.name}.
        <br>Their email is: ${AuthService.getUser().email}.<br>Their username is: ${AuthService.getUser().username}.
        ${(msg.trim() !== "") ? "<br>Their message for you is:<br>" + msg + "." : ""}<br>
        To add the applicant in your team go here:
        <a href="https://drp12.herokuapp.com/myProjects"><button>GO TO MY PROJECTS</button></a>`;
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                to: this.state.project.email,
                subject: `New Application For ${this.state.project.name}`,
                message,
            }),
        }
        
        await fetch(`${process.env.REACT_APP_SERVER}/mail/send`, requestOptions).then(alert("Application successful!")).catch(err => {
            console.log(err);
            alert("Application Failed!");
        })
        
        this.getApplications();
    }

    getProject = async () => {    
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}/projects/${this.state.id}`);
            const jsonData = await response.json();

            this.setState({project: jsonData});
            
            await fetch(`${process.env.REACT_APP_SERVER}/upload/${this.state.project.image_filepath}`)
            .then(response => response.blob())
            .then(images => {
                // Then create a local URL for that image and print it
               this.setState({image: URL.createObjectURL(images)});
            })
        } catch (err) {
         console.error(err.message);
        }
        
      };


    checkMemberOfProject = () => {
        
        if (AuthService.getUser()?.id === this.state.project.leader_id) {
            return true;
        }

        
        let names = this.state.project.members.map(m => m.name);
        names = names.filter((name) => AuthService.getUser()?.username === name);

        if (names.length !== 0) {
            return true;
        }

        return false;
    }

    render () {
        if (!this.state.project) {
            return <></>;
        }
        return (
            <div  data-testid='projectInfo' className="project-info" style={{overflow: "hidden"}}>
                <h1 className="title" > {this.state.project.name} </h1>
                <div className="details-container">
                    <div className="details-text">
                        <div className="box-left"/>
                        <div className="box-right"/>
                        <h3 className="topic">Description :</h3>
                        <p>{this.state.project.description}</p>
                        <h3 className="topic">We are looking for... :</h3>
                        <p>{this.state.project.looking_for}</p>
                        <h3 className="topic">Leader:</h3>
                        <p>{this.state.project.leader}</p>
                        <h3 className="topic">Leader Email:</h3>
                        <p>{this.state.project.email}</p>
                        <h3 className="topic" >Members:</h3>
                        <ul className="bullet-point">{this.state.project.members.map(member => <a href={member.link} target="_blank" rel="noopener noreferrer"><li>{member.name}</li></a>)}</ul>
                        <h3 className="topic">Tags:</h3>
                        <ul className="bullet-point">{this.state.project.tags.map(tag => <li>{tag}</li>)}</ul>
                        <h3 className="topic">Duration:</h3>
                        <p>{this.state.project.duration}</p>
                        <h3 className="topic">Location:</h3>
                        <p className>{this.state.project.location}</p>
                        <h3 className="topic">Amount To Be Paid: </h3>
                        <p>{this.state.project.amount_to_be_paid}</p>
                        
                        {(this.state.applications.includes(this.state.project.id)) ? 
                        (<button className="applied-button" disabled>Applied</button>) :
                        (<button className="apply-button" type="button" onClick={() => {this.setState({popupApply: true})}}
                            style={(this.checkMemberOfProject() || !AuthService.getUser())? {display: "none"} : {}}>Apply</button>)}
                        
                        <ApplyPopup trigger={this.state.popupApply} 
                                    handler={(msg) => { if (msg !== "") {
                                                            this.handleApply(msg);
                                                        }}} 
                                    setTrigger={() => {this.setState({popupApply: false})}} />
                    </div>
                    <img className="detials-image" src={this.state.image} alt="project preview"></img>
                </div>  
            </div>       
        );
    };
}

export default withRouter(ProjectInfo);
