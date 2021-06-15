import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import './register.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validator from 'validator';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.errorRef = React.createRef();
        this.state = {
            username: "",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            bio: "no bio",
            degree: "",
            degree_level: "Undergraduate",
            skills: [],
        }
    }

    required = (value) => {
        if (!value.toString().trim().length) {
            return <div style={{color: "red", fontWeight: "bold"}}>Required</div>
        }
    }

    validateEmail = (value) => {
        if (!validator.isEmail(value)) {
          return <div style={{color: "red", fontWeight: "bold"}}>{value} is not a valid email.</div>
        }
    };

    validateUsername = (username) => {
        if (!validator.isAlphanumeric(username)) {
            return <div style={{color: "red", fontWeight: "bold"}}>Username must only contain letters and numbers</div>
        }
    }

    validatePassword = (password) => {
        if (password.length < 8 || password.length > 25) {
            return <div style={{color: "red", fontWeight: "bold"}}>Password must be between 8 and 25 characters long</div>
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.formRef.current.validate();
        if (!this.errorRef.current.context._errors.length) {
            AuthService.register(this.state.username, this.state.email, this.state.password, this.state.firstname, this.state.lastname, this.state.bio ? this.state.bio : "no bio", this.state.degree, this.state.degree_level, this.state.skills).then(() => {
                alert("Registration successful. Please log in.");
                this.props.history.push('/login');
            });
        }
    }


    render() {
        return (
            <div className="register-container">
                <h1 className="register-title">Register</h1>

                <Form data-testid='register' onSubmit={this.handleSubmit} ref={this.formRef}>
                    <label htmlFor="username">Username: </label><br/>
                    <Input className="text-box" name="username" type="text" onChange={(e) => this.setState({username: e.target.value})} validations={[this.required, this.validateUsername]}></Input>
                    <br></br>
                    <label htmlFor="email">Email: </label><br/>
                    <Input className="text-box" name="email" type="email" onChange={(e) => this.setState({email: e.target.value})} validations={[this.required, this.validateEmail]}></Input>
                    <br></br>
                    <label htmlFor="firstname">First Name: </label><br/>
                    <Input className="text-box" name="firstname" type="text" onChange={(e) => this.setState({firstname: e.target.value})} validations={[this.required]}></Input>
                    <br></br>
                    <label htmlFor="lastname">Last Name: </label><br/>
                    <Input className="text-box" name="lastname" type="text" onChange={(e) => this.setState({lastname: e.target.value})} validations={[this.required]}></Input>
                    <br></br>
                    <label htmlFor="bio">Bio (optional): </label><br/>
                    <textarea className="text-area-login" name="bio" onChange={(e) => this.setState({bio: e.target.value})}></textarea>
                    <br></br>
                    <label htmlFor="degree">Degree: </label><br/>
                    <Input className="text-box" name="degree" type="text" onChange={(e) => this.setState({degree: e.target.value})} validations={[this.required]}></Input>
                    <br></br>
                    <label htmlFor="degree_level">Degree Level: </label><br/>
                    <select className="select" name="degree_level" onChange={(e) => this.setState({degree_level: e.target.value})}>
                        <option value="Undergraduate" name="undergrad" >Undergraduate</option>
                        <option value="Postgraduate" name="postgrad">Postgraduate</option>
                    </select>
                    <br></br>
                    <label htmlFor="password">Password: </label><br/>
                    <Input className="text-box" name="password" type="password" onChange={(e) => this.setState({password: e.target.value})} validations={[this.required, this.validatePassword]}></Input>
                    <br></br>
                    <CheckButton style={{display: "none"}} ref={this.errorRef}></CheckButton>
                    <button className = "button-register">Register</button>
                    <label className="have-an-account">Already have an account?</label><br/>
                    <br></br>
                    <div className="post-button-cont">
                        <Link className="post-button" to="/login">Login</Link>
                    </div>
                </Form>
                
            </div>
        )
    }
}

export default Register;
