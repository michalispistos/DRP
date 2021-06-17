import React, { Component } from 'react';
import ProjectForm from './projectForm';
import './editPopup.css'

class  EditPopup extends Component {

    constructor(props){
        super(props);
        this.state = {  }
    }

    pressClose = () =>{

        this.props.setTrigger();
        this.props.updateProjectComponent();
    }
 
    render() { 
        return (this.props.trigger) ? (
             <div data-testid='popup' className="edit-popup">
                 <div className = "edit-popup-inner" >
                      <ProjectForm pressClose={this.pressClose} project={this.props.project}/> 
                 </div> 
        </div>) : "";
    }
}
 
export default EditPopup;