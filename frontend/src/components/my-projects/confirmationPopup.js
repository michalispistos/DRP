import React, { Component } from 'react';
import './confirmationPopup.css'


class  ConfirmationPopup extends Component {

    constructor(props){
        super(props);
        this.state = {  }
    }

    render() { 
        return (this.props.trigger) ? (
            <div data-testid='popup' className="popup" onClick={(e) => {e.stopPropagation(); e.preventDefault(); }}>
                <div style={{color: "black", backgroundColor: "white", height: "auto"}} className="popup-inner">
                    {this.props.children}
                    <div className="confirm-popup-buttons"> 
                    <button className="confirm-normal-button" type="submit" onClick={(e) => {e.stopPropagation(); e.preventDefault(); this.props.delete();this.props.setTrigger()}}>Confirm</button><br/>
                    <button className = "confirm-remove-button" variant="danger" type="button" onClick={(e) => {e.stopPropagation(); e.preventDefault(); this.props.setTrigger()}}>Cancel</button>
                    </div>                
                </div>
        </div>) : "";
    }
}
 
export default ConfirmationPopup;