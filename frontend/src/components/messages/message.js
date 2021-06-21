import React from 'react';
import socket from '../../services/socket-service';
import AuthService from '../../services/auth-service';

class Messages extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            to: this.props.match.params.to,
            from: AuthService.getUser()?.username,
            msg: "",
            id : 0,
        }
    }

    async componentDidMount() {
        const token = AuthService.getUser().accessToken;
        socket.auth = { token };
        await this.getMessages();
        socket.connect();
        socket.emit('join', this.state.id);
        socket.on("private message", data => {
            const div = document.createElement('div');
            div.innerHTML = "FROM: " + data.from + " TO: " + data.to + "<br></br>" + data.content;
            const message_container = document.getElementsByClassName('message-container')[0];
            message_container.appendChild(div);
        });

    }

    getMessages = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/chats/${this.state.from}/${this.state.to}`);
        const jsonData = await res.json();
        this.setState({id: jsonData.id});
        jsonData.messages.forEach(message =>{ 
            const div = document.createElement('div');
            div.innerHTML = "FROM: " + message.from + " TO: " + message.to + "<br></br>" + message.message;
            div.style.border = "2px solid black";
            div.style.padding = "10px";
            div.style.margin = "2px";
            const message_container = document.getElementsByClassName('message-container')[0];
            message_container.appendChild(div);
        });
    }

    handleSend = async (e) => {
        e.preventDefault();

        this.setState({msg:""})

        socket.emit("private message", {
            content: this.state.msg,
            room: this.state.id,
            from: this.state.from,
            to: this.state.to
        });

        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                new_message: {
                    from: this.state.from,
                    to: this.state.to,
                    message: this.state.msg,
                }
            }),
        }

        await fetch(`${process.env.REACT_APP_SERVER}/messages/${this.state.id}`, requestOptions);


        this.setState({msg: ""});
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }


    render () {
        return (
            <>
            <div className="message-container">

            </div>

            <form onSubmit={(e) => this.handleSend(e)}>
                <input type="text" value={this.state.msg} placeholder="Type your message here..." onChange={(e) => this.setState({msg: e.target.value})}></input>
                <button type="submit">SEND</button>
            </form>
            </>
        );
    }
}

export default Messages;