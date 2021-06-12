import React, { Component } from 'react';

class  Popup extends Component {

    constructor(props){
        super(props);
        this.state = {  }
    }


    render() { 
        return (this.props.trigger) ? (
            <div data-testid='popup' className="popup">
                <div className="popup-inner">
                    {this.props.children}
                    <button className = "remove-button" variant="danger" type="button" style={{display: "block", float:"right"}} onClick={() => this.props.setTrigger()}>Close</button>
                </div>
        </div>) : "";
    }
}
 
export default Popup;