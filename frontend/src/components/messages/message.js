import React from 'react';
import socket from '../../services/socket-service';
import AuthService from '../../services/auth-service';

class Messages extends React.Component {

    componentDidMount() {
        const token = AuthService.getUser().accessToken;
        socket.auth = { token };
        socket.connect();
    }


    render () {
        return (
            Messages
        );
    }
}

export default Messages;