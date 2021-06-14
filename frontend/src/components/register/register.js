import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import './register.css';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            bio: "",
            degree: "",
            degree_level: "Undergraduate",
            skills: [],
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        AuthService.register(this.state.username, this.state.email, this.state.password, this.state.firstname, this.state.lastname, this.state.bio, this.state.degree, this.state.degree_level, this.state.skills).then(() => {
            alert("Registration successful. Please log in.");
            this.props.history.push('/login');
        });
    }

    render() {
        return (
            <div className="register-container">
                <h1 className="register-title">Register</h1>

                <form data-testid='register' onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username: </label><br/>
                    <input className="text-box" name="username" type="text" onChange={(e) => this.setState({username: e.target.value})}></input>
                    <br></br>
                    <label htmlFor="email">Email: </label><br/>
                    <input className="text-box" name="email" type="email" onChange={(e) => this.setState({email: e.target.value})}></input>
                    <br></br>
                    <label htmlFor="firstname">First Name: </label><br/>
                    <input className="text-box" name="firstname" type="text" onChange={(e) => this.setState({firstname: e.target.value})}></input>
                    <br></br>
                    <label htmlFor="lastname">Last Name: </label><br/>
                    <input className="text-box" name="lastname" type="text" onChange={(e) => this.setState({lastname: e.target.value})}></input>
                    <br></br>
                    <label htmlFor="bio">Bio (optional): </label><br/>
                    <textarea className="text-area-login" name="bio" onChange={(e) => this.setState({bio: e.target.value})}></textarea>
                    <br></br>
                    <label htmlFor="degree">Degree: </label><br/>
                    <input className="text-box" name="degree" type="text" onChange={(e) => this.setState({degree: e.target.value})}></input>
                    <br></br>
                    <label htmlFor="degree_level">Degree Level: </label><br/>
                    <select className="select" name="degree_level" onChange={(e) => this.setState({degree_level: e.target.value})}>
                        <option value="Undergraduate" name="undergrad" >Undergraduate</option>
                        <option value="Postgraduate" name="postgrad">Postgraduate</option>
                    </select>
                    <br></br>
                    <label htmlFor="password">Password: </label><br/>
                    <input className="text-box" name="password" type="password" onChange={(e) => this.setState({password: e.target.value})}></input>
                    <br></br>
                    <button className = "button-register">Register</button>
                    <label className="have-an-account">Already have an account?</label><br/>
                    <br></br>
                    <div className="post-button-cont">
                        <Link className="post-button" to="/login">Login</Link>
                    </div>
                </form>
                
            </div>
        )
    }
}

export default Register;
