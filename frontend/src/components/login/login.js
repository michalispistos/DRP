import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import './login.css';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
        }
    }


    handleSubmit = async (e) => {
        e.preventDefault(); 

        AuthService.login(this.state.username, this.state.password).then((data) => {
            if (data.accessToken) {
                alert("success");
                this.props.updateUser();
                this.props.history.push('/find');
            } else {
                alert("wrong username or password");
            }
        });
    }

    render() {
        return (
      
        <div data-testid='login' className="login-container">
        <div className="login-box">
        <h1 className="login-title">Login</h1>
            <form className="login-form">
                <label>
                <p className="field">Username</p>
                <input type="text" placeholder="Enter your username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                </label>
                <label>
                <p className="field">Password</p>
                <input type="password" placeholder="Enter your password"  value={this.state.password}  onChange={(e) => this.setState({password: e.target.value})}/>
                <br/>
                </label>
                <button className="button" type="submit" onClick={(e) => this.handleSubmit(e)}>Login</button>
                <h4 className="no-account">Don't have an account yet?</h4>
                <Link className="post-button" to="/register">Create An Account</Link>
            </form>
        </div>
        </div>
        )
    }
}

export default Login;
