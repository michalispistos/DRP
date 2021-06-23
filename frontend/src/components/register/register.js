import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import './register.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validator from 'validator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import CreatableSelect from 'react-select/creatable';

const eye = <FontAwesomeIcon icon={faEye} />;


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.errorRef = React.createRef();
        this.multiselectRef = React.createRef();
        this.state = {
            username: "",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            bio: "",
            degree: "",
            is_public: true,
            degree_level: "Undergraduate",
            skills: [],
            passwordShown: false,
            confirmPasswordShown: false,
            imageSrc: "default.jpeg",
            image: undefined,

            multi_options: [
                { value: "Programming", label: "Programming" },
                { value: "Java", label: "Java" },
                { value: "Sports", label: "Sports" },
                { value: "Organisation", label: "Organisation" },
                { value: "Determination", label: "Determination" },
                { value: "Flexible", label: "Flexible" },
                { value: "Fast-learner", label: "Fast-learner" },
                { value: "Teamwork", label: "Teamwork" },
                { value: "Cooking", label: "Cooking" },
                { value: "Graphic Design", label: "Graphic Design" },
                { value: "Marketing", label: "Marketing" },
                { value: "Networking", label: "Networking" },
                { value: "Python", label: "Python" },
                { value: "Carpentry", label: "Carpentry" },
                { value: "UX Design", label: "UX Design" },
                { value: "Music Technology", label: "Music Technology" },
                { value: "Drawing", label: "Drawing" },
                { value: "Team Management", label: "Team Management" },
            ],
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
                                       
    validateConfirm = (password) => {
        if (password !== this.state.password) {
            return <div style={{color: "red", fontWeight: "bold"}}>Passwords do not match</div>
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.formRef.current.validateAll();

        if (this.multiselectRef.current.state.value) {
            await this.setState({skills: (this.multiselectRef.current.state.value.map(s => s.value))});
        }

        if(this.state.image !== undefined){
            let imageSrc = `${new Date().getTime()}_${this.state.image.name}`
            await this.setState({imageSrc: imageSrc});
        }

        if (!this.errorRef.current.context._errors.length) {
            AuthService.register(this.state.username, this.state.email, this.state.password, this.state.firstname, this.state.lastname, this.state.bio, this.state.degree, this.state.degree_level, this.state.skills, this.state.is_public, this.state.imageSrc).then((authRes) => {
                if (authRes.ok) {
                    this.props.history.push('/login');
                } else {
                    alert(authRes.data.message);
                }
            });
        }

        //Upload image
        if(this.state.image !== undefined){   
            const formData = new FormData();
            formData.append(
                "profile_picture",
                this.state.image,
                this.state.imageSrc,
            );

            const requestOptions2 = {
                method: 'POST',
                body: formData
            }
        
            await fetch(`${process.env.REACT_APP_SERVER}/upload/profiles`, requestOptions2)
                .then(response => console.log('Submitted'))
                .catch(error => console.log("error"));
        }
    }

    handlePrivacy = (e) => {
        this.setState({is_public: e.target.value === "public"});
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
                    </select><br/>

                    <label htmlFor="skills">Skills: </label><br/>
                    <CreatableSelect
                        isMulti
                        ref={this.multiselectRef}
                        options={this.state.multi_options}
                        className="register-tagDropdown"
                    /> 

                    <div style={{marginTop: "1em"}}>
                    Upload Profile Image:<br/>
                    </div>
                    <input  className="image" type="file" accept=".gif,.jpg,.jpeg,.png,.jfif" id="profile_picture" encType="multipart/form-data" name="profile_picture"
                    onChange={(e) => {this.setState({image: e.target.files[0]}); }} /><br/>

                    
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
                        <Input className="text-box" name="password" type={this.state.passwordShown ? "text" : "password"}  onChange={(e) => this.setState({password: e.target.value})} validations={[this.required, this.validatePassword]}></Input>
                        <i onClick={()=>{this.setState({passwordShown: !this.state.passwordShown})}}>{eye}</i>
                    </div>
                    <br></br>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <br></br>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <Input className="text-box" type={this.state.confirmPasswordShown ? "text" : "password"} validations={[this.validateConfirm]}></Input>
                        <i onClick={()=>{this.setState({confirmPasswordShown: !this.state.confirmPasswordShown})}}>{eye}</i>
                    </div>
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
