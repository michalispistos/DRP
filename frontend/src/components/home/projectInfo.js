import React from 'react';
import { withRouter } from 'react-router';


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
            <div  data-testid='projectInfo' className="projectInfo">
                <h1 style={{textAlign: "center", marginTop: "20px", width: "100%"}}> {this.state.project.name} </h1>
                <img src={this.state.image} style={{display:"block", float: "right", width: "40%", height: "20%", marginTop:"5%"}}></img>
                <h3>Description: </h3>
                <p className="boarder">{this.state.project.description}</p>
                <h3>Looking for: </h3>
                <p className="boarder">{this.state.project.looking_for}</p>
                <h3>Leader:</h3>
                <p className="boarder">{this.state.project.leader}</p>
                <h3>Leader Email:</h3>
                <p className="boarder">{this.state.project.email}</p>
                <h3>Members:</h3>
                <ul className="boarder" style={{marginLeft: "1%"}}>{this.state.project.members.map(member => <li style={{marginLeft: "1%"}}>{member}</li>)}</ul>
                <h3>Tags:</h3>
                <ul className="boarder" style={{marginLeft: "1%"}}>{this.state.project.tags.map(tag => <li style={{marginLeft: "1%"}}>{tag}</li>)}</ul>
                <h3>Duration:</h3>
                <p className="boarder">{this.state.project.duration}</p>
                <h3>Location:</h3>
                <p className="boarder">{this.state.project.location}</p>
                <h3>Amount To Be Paid: <p className="boarder">{this.state.project.amount_to_be_paid}</p></h3>
            </div>
        );
    };
}

export default withRouter(ProjectInfo);