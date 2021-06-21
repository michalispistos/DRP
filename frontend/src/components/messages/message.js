import React from 'react';
import socket from '../../services/socket-service';
import AuthService from '../../services/auth-service';

class Messages extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            to: this.props.match.params.to,
            from: AuthService.getUser()?.username,
        }
    }

    componentDidMount() {
        const token = AuthService.getUser().accessToken;
        socket.auth = { token };
        socket.connect();
        this.getMessages();

    }

    getMessages = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/chats/${this.state.from}/${this.state.to}`);
        const jsonData = await res.json();
        console.log(jsonData);
        jsonData.messages.map(message =>{ 
            const div = document.createElement('div');
            div.innerHTML = "FROM: " + message.from + " TO: " + message.to + "<br></br>" + message.message;
            const message_container = document.getElementsByClassName('message-container')[0];
            message_container.append(div);
        });

    }


    render () {
        return (
            <div className="message-container">

            </div>
        );
    }
}

export default Messages;