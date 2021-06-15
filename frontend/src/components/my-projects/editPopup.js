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
    }

    render() { 
        return (this.props.trigger) ? (
            <div data-testid='popup' className="edit-popup" onClick={() => 0}>
                <div className = "edit-popup-inner">
                    <ProjectForm pressClose={this.pressClose}/>
                </div>
        </div>) : "";
    }
}
 
export default EditPopup;