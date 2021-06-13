import React from 'react';
import { withRouter } from 'react-router';
import './projectInfo.css'


class ProjectInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            id: this.props.match.params.id,
            project: undefined,
            image: undefined,
        }
        this.getProject();
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
                    </div>
                    <img className="detials-image" src={this.state.image} alt="project preview"></img>
                </div>  
            </div>       
        );
    };
}

export default withRouter(ProjectInfo);
