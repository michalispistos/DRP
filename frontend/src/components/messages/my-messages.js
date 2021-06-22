import React, { Component } from 'react';
import AuthService from '../../services/auth-service';
import "./my-messages.css"; 
import socket from '../../services/socket-service';

class MyMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernames: [],
            to: undefined,
            from: AuthService.getUser()?.username,
            msg: "",
            id : 0,
        }
    }

    async componentDidMount() {
        document.body.style.overflow = "hidden"
        await this.getChats();
        const token = AuthService.getUser().accessToken;
        socket.auth = { token };
        socket.connect();
    }

    getMessages = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/users/chats/${this.state.from}/${this.state.to}`);
        const jsonData = await res.json();
        this.setState({id: jsonData.id});
        const message_container = document.getElementsByClassName('private-message-container')[0];
        jsonData.messages.forEach(message =>{ 
            const div = document.createElement('div');
            div.innerHTML = "FROM: " + message.from + " TO: " + message.to + "<br></br>" + message.message;
            div.style.border = "2px solid black";
            div.style.width = "80%";
            div.style.alignItems = "center";
            div.style.padding = "10px";
            div.style.margin = "2px";

            message_container.appendChild(div);
        });
        message_container.scrollTo({ top: message_container.scrollHeight, behavior: 'smooth' });
    }



    getChats = async () => {
        const jsonData = await AuthService.authorizedFetch(`${process.env.REACT_APP_SERVER}/users/username/${this.state.from}`);
        this.setState({usernames: Object.keys(jsonData.chat_ids)});
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
    }

    handleSelect = async (username) => {
        await this.setState({to: username});
        document.getElementsByClassName('private-message-container')[0].innerHTML = '';
        socket.emit('leave', this.state.id);
        await this.getMessages();
        socket.emit('join', this.state.id);
        socket.on("private message", data => {
            const div = document.createElement('div');
            div.innerHTML = "FROM: " + data.from + " TO: " + data.to + "<br></br>" + data.content;
            div.style.border = "2px solid black";
            div.style.width = "80%";
            div.style.alignItems = "center";
            div.style.padding = "10px";
            div.style.margin = "2px";
            const message_container = document.getElementsByClassName('private-message-container')[0];
            message_container.appendChild(div);
            message_container.scrollTo({ top: message_container.scrollHeight, behavior: 'smooth' });

        });
        
    }

    handleNewChat = async (e) => {
        e.preventDefault();
        this.setState({to: undefined});
        socket.emit('leave', this.state.id);
        document.getElementsByClassName('private-message-container')[0].innerHTML = '';
        const user = prompt("Who do you want to talk to?");
        const jsonData = await AuthService.authorizedFetch(`${process.env.REACT_APP_SERVER}/users/username/${user}`);
        if (jsonData.status === 404) {
            alert("Not a valid user!");
        } else {
            const span = document.createElement('span');
            const button = document.createElement('button');
            button.onclick = this.handleSelect(user);
            button.innerHTML=user;
            span.appendChild(button);
            span.appendChild(document.createElement('br'));
            document.getElementsByClassName("usernames-container")[0].appendChild(span);
        }
    }
    

    render() {
        return (
            <div className="my-messages-container">
            <div className="usernames-container">
                <button onClick={(e) => this.handleNewChat(e)}>New Chat</button>
                {this.state.usernames.map(username => <span><button onClick={(e) => this.handleSelect(username)}>{username}</button><br></br></span>)}
                
            </div>
            
            <div className="msg-wrapper">
                <h1>{this.state.to || "Click on a username to start talking!!!"}</h1>
            <div className="private-message-container">

            </div>
            {this.state.to && 

            <form onSubmit={(e) => this.handleSend(e)}>
                <input type="text" value={this.state.msg} placeholder="Type your message here..." onChange={(e) => this.setState({msg: e.target.value})}></input>
                <button type="submit">SEND</button>
            </form>
            }
            </div>
            

            </div>
        )
    }
}

export default MyMessages;
