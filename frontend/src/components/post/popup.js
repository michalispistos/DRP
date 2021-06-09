import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

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
                    <Button variant="danger" type="button" style={{display: "block", float:"right"}} onClick={() => this.props.setTrigger()}>Close</Button>
                </div>
        </div>) : "";
    }
}
 
export default Popup;