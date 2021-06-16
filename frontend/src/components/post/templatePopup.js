import React, { Component } from 'react';

class  TemplatePopup extends Component {

    constructor(props){
        super(props);
        this.state = {
            description: "",
            teamNumber: 0,
            type: "",
            field: "",
            about: ""
        }
        
    }

    handleTeamNumber = (e) =>{
        this.setState({teamNumber: e.target.value});
    }

    handleType = (e) =>{
        this.setState({type: e.target.value});
    }

    handleField = (e) =>{
        this.setState({field: e.target.value});
    }

    handleAbout = (e) =>{
        this.setState({about: e.target.value});
    }

    validInput() {
        return this.state.teamNumber !== 0 && this.state.field !== "" 
        && this.state.typr !== "" && this.state.about !== "";
    }

    createDescription = () => {
        if (!this.validInput()) {
            this.setState({description: ""});
            return;
        }

        let description = "";

        if (this.state.teamNumber === 1) {
            description = "I am an individal";
        } else {
            description = "We are a group of " + this.state.teamNumber + " students"
        }
        description += " working on a " + this.state.type + " project. " +
        "The project is related to " + this.state.field + " and it is about " + this.state.about + "."
        console.log(description);

        this.setState({description: description});
        this.props.setTrigger();
    }

    handleClick = async () =>{
        
        await this.createDescription();
        this.props.handler(this.state.description);
    }


    render() { 
        return (this.props.trigger) ? (
            <div data-testid='popup' className="template-popup">
                <form className="template-popup-inner">
                    
                    Number of people currently in the team:<br/>
                    <input type="text" required maxLength="50" style={{width:"60%"}}
                    onChange={(e) => {this.handleTeamNumber(e)}} /><br/>

                    Is the project a startup, academic, or side project?<br/>
                    <input type="text" required maxLength="50" style={{width:"60%"}}
                    onChange={(e) => {this.handleType(e)}}/><br/>

                    What field is your project related to:<br/>
                    <input type="text" required maxLength="50" style={{width:"60%"}}
                    onChange={(e) => {this.handleField(e)}} /><br/>

                    Our project is about: <br/>
                    <textarea required className="text-area" type="text"  maxLength="255" style={{width:"60%"}}
                    onChange={(e) => {this.handleAbout(e)}} /><br/>

                    <button className="normal-button" type="submit" style={{display: "block", float:"right", marginTop:"-2.5%"}} onClick={() => this.handleClick()}>Submit</button><br/>
                    <button className="remove-button" variant="danger" style={{display: "block", float:"right", marginTop:"1%%",marginLeft:"100%"}} type="button" onClick={() => this.props.setTrigger()}>Cancel</button>
                    {this.props.children}
                </form>
        </div>) : "";
    }
}
 
export default TemplatePopup;