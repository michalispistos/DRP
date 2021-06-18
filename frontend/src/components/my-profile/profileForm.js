import React from 'react';
import AuthService from '../../services/auth-service';
import '../register/register.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validator from 'validator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import authHeader from '../../services/auth-header';
const eye = <FontAwesomeIcon icon={faEye} />;


class ProfileForm extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.errorRef = React.createRef();
        this.state = {
            username: props.profile.username,
            email: props.profile.email,
            firstname: props.profile.firstname,
            lastname: props.profile.lastname,
            bio: props.profile.bio,
            degree: props.profile.degree,
            is_public: props.profile.is_public,
            degree_level: props.profile.degree_level,
            skills: props.profile.skills,
            passwordShown: false,
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

    handleSave = (e) => {
        e.preventDefault();
        this.formRef.current.validateAll();
        if (!this.errorRef.current.context._errors.length) {
            AuthService.login(this.state.username, this.state.password).then(async authRes => {
                if (authRes.ok) {
                    const profileInfo = {
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        bio: this.state.bio,
                        skills: this.state.skills,
                        is_public: this.state.is_public,
                        email: this.state.email,
                        degree: this.state.degree,
                        degree_level: this.state.degree_level,
                    };
                    const requestOptions = {
                        method: 'PUT',
                        headers: authHeader(),
                        body: JSON.stringify(profileInfo),
                    }
                    await fetch(`${process.env.REACT_APP_SERVER}/users/${AuthService.getUser().id}`, requestOptions).then(async () => {
                        try {
                            await AuthService.login(this.state.username, this.state.password);
                            alert("SUCCESS");
                            this.props.pressClose();
                        } catch (err) {
                            console.log(err);
                        }
                    }).catch(err => console.log(err));
                } else {
                    alert("Incorrect info!");
                }
            })
        }
    }

    handlePrivacy = (e) => {
        this.setState({is_public: e.target.value === "public"});
    }


    render() {
        return (
            <div className="register-container">
                <h1 className="register-title">Edit</h1>

                <Form data-testid='register' ref={this.formRef}>
                    <label htmlFor="username">Username: </label><br/>
                    <Input className="text-box" name="username" type="text" value={this.state.username} disabled></Input>
                    <br></br>
                    <label htmlFor="email">Email: </label><br/>
                    <Input className="text-box" name="email" type="email" onChange={(e) => this.setState({email: e.target.value})} validations={[this.required, this.validateEmail]} value={this.state.email}></Input>
                    <br></br>
                    <label htmlFor="firstname">First Name: </label><br/>
                    <Input className="text-box" name="firstname" type="text" onChange={(e) => this.setState({firstname: e.target.value})} value={this.state.firstname} validations={[this.required]}></Input>
                    <br></br>
                    <label htmlFor="lastname">Last Name: </label><br/>
                    <Input className="text-box" name="lastname" type="text" onChange={(e) => this.setState({lastname: e.target.value})} validations={[this.required]} value={this.state.lastname}></Input>
                    <br></br>
                    <label htmlFor="bio">Bio (optional): </label><br/>
                    <textarea className="text-area-login" name="bio" onChange={(e) => this.setState({bio: e.target.value})} value={this.state.bio}></textarea>
                    <br></br>
                    <label htmlFor="degree">Degree: </label><br/>
                    <Input className="text-box" name="degree" type="text" onChange={(e) => this.setState({degree: e.target.value})} validations={[this.required]} value={this.state.degree}></Input>
                    <br></br>
                    <label htmlFor="degree_level">Degree Level: </label><br/>
                    <select className="select" name="degree_level" onChange={(e) => this.setState({degree_level: e.target.value})} value={this.state.degree_level}>
                        <option value="Undergraduate" name="undergrad" >Undergraduate</option>
                        <option value="Postgraduate" name="postgrad">Postgraduate</option>
                    </select>
                    <br></br>
                    <div onChange={(e) => this.handlePrivacy(e)}>
                        <label htmlFor="privacy">Public: </label>
                        <input type="radio" name="privacy" value="public" defaultChecked></input>
                        <label htmlFor="privacy">Private: </label>
                        <input type="radio" name="privacy" value="private"></input>
                    </div>
                    <br></br>
                    <label htmlFor="password">Password: </label><br/>
                    <div style={{display:"flex", alignItems: "center"}}>
                        <Input className="text-box" name="password" type={this.state.passwordShown ? "text" : "password"}  onChange={(e) => this.setState({password: e.target.value})}></Input>
                        <i onClick={()=>{this.setState({passwordShown: !this.state.passwordShown})}}>{eye}</i>
                    </div>
                    <br></br>
                    <CheckButton style={{display: "none"}} ref={this.errorRef}></CheckButton>
                    <div style={{display: "flex", justifyContent:'center', alignItems: 'center', marginLeft:"90%", marginTop:"-5%"}}>
                        <button  className="normal-button" variant="success" type="submit" onClick={(e) => {this.handleSave(e)}}>Save</button>
                        <button className="delete-button" onClick={(e) => { this.props.pressClose()}}>Cancel</button>
                    </div>
                </Form>
                
            </div>
        )
    }
}

export default ProfileForm;
