import React, { Component } from 'react';

class TextPopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            link: ""
        }
    }


    render() { 
        return (this.props.trigger) ? (
            <div data-testid='popup' className="popup">
                <div className="popup-inner">
                    <input type="text" id="duration" name="duration" maxLength="50" style={{width:"50%"}}
                    onChange={(e) => {this.setState({link: e.target.value})}} value={this.link}/>
                    <button className="normal-button" type="button" style={{display: "block", float:"right"}} onClick={() => {this.props.setTrigger();this.props.handler(this.state.link)}}>Add</button><br/>
                    <button className="remove-button" variant="danger" style={{display: "block", float:"right", marginTop:"5%",marginLeft:"100%"}} type="button" onClick={() => this.props.setTrigger()}>Close</button>
                    {this.props.children}
                </div>
        </div>) : "";
    }
}
 
export default TextPopup;