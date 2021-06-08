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
                    <button className="close-btn" onClick={() => this.props.setTrigger()}>close</button>
                    {this.props.children}
                </div>
        </div>) : "";
    }
}
 
export default Popup;