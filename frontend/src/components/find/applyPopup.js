import React, { Component } from 'react';
import './applyPopup.css'

class ApplyPopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            msg: ""
        }
    }


    render() { 
        return (this.props.trigger) ? (
            <div data-testid='popup' className="apply-popup">
                <div className="apply-popup-inner" style={{width: "60%"}}>
                    <h2>Apply message:</h2><br/>
                    <textarea type="text" placeholder="Introduce yourself and explain why you are applying to this project..."  maxLength="1000" style={{width:"100%"}}
                    className="apply-textarea" onChange={(e) => {this.setState({msg: e.target.value})}} value={this.state.msg}/>
                    <div className="apply-popup-buttons">
                        <button className="apply-normal-button" type="button"  onClick={() => {this.props.setTrigger();this.props.handler(this.state.msg)}}>Send</button><br/>
                        <button className="apply-remove-button" variant="danger" type="button" onClick={() => this.props.setTrigger()}>Cancel</button>
                    </div>
                </div>
        </div>) : "";
    }
}
 
export default ApplyPopup;