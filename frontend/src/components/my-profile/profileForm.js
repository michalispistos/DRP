import React from 'react';
import AuthService from '../../services/auth-service';
import '../register/register.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validator from 'validator';
import authHeader from '../../services/auth-header';
import './profileForm.css'
import CreatableSelect from 'react-select/creatable';


class ProfileForm extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.errorRef = React.createRef();
        this.multiselectRef = React.createRef();
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
            imageSrc: "default.jpeg",
            image: props.profile.image_filepath,

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

    handleSave = async (e) => {
        e.preventDefault();
        this.formRef.current.validateAll();


        if(this.multiselectRef.current.state.value){
            await this.setState({skills: (this.multiselectRef.current.state.value.map(s => s.value))});
        }


        
        if(this.state.image !== this.props.profile.image_filepath){
            let imageSrc = `${new Date().getTime()}_${this.state.image.name}`
            await this.setState({imageSrc: imageSrc});
        }


        if (!this.errorRef.current.context._errors.length) {
                    const profileInfo = {
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        bio: this.state.bio,
                        skills: this.state.skills,
                        is_public: this.state.is_public,
                        email: this.state.email,
                        degree: this.state.degree,
                        degree_level: this.state.degree_level,
                        image_filepath: this.state.imageSrc,
                    };
                    const requestOptions = {
                        method: 'PUT',
                        headers: authHeader(),
                        body: JSON.stringify(profileInfo),
                    }
                    await fetch(`${process.env.REACT_APP_SERVER}/users/${AuthService.getUser().id}`, requestOptions).then(async () => {
                            const user = AuthService.getUser();
                            user.firstname = this.state.firstname;
                            user.lastname = this.state.lastname;
                            user.bio = this.state.bio;
                            user.skills = this.state.skills;
                            user.email =  this.state.email;
                            user.degree =  this.state.degree;
                            user.degree_level = this.state.degree_level;
                            localStorage.setItem('user', JSON.stringify(user));
                            
                            this.props.pressClose();
                    }).catch(err => console.log(err));
            }


        //Upload image
        if(this.state.image !== this.props.profile.image_filepath){   
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
            <div className="profile-container">
                <h1 className="profile-title">Edit</h1>

                <Form data-testid='profile' ref={this.formRef} onSubmit={(e) => {e.preventDefault(); this.handleSave(e)}}>
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
                        <input type="radio" name="privacy" value="public" defaultChecked={this.state.is_public}></input>
                        <label htmlFor="privacy">Private: </label>
                        <input type="radio" name="privacy" value="private" defaultChecked={!this.state.is_public}></input>
                    </div>
                    <br></br>

                    <label htmlFor="skills">Skills: </label><br/>
                    <CreatableSelect
                        isMulti
                        ref={this.multiselectRef}
                        options={this.state.multi_options}
                        defaultValue={this.props.profile.skills.map(skill => {return {value: skill, label: skill}})}
                        className="profile-tagDropdown"
                    /> 


                    <div style={{marginTop: "1em"}}>
                    Upload Different Profile Image:<br/>
                    </div>
                    <input  className="image" type="file" id="profile_picture" encType="multipart/form-data" name="profile_picture"
                    onChange={(e) => {this.setState({image: e.target.files[0]}); }} /><br/>

                    <CheckButton style={{display: "none"}} ref={this.errorRef}></CheckButton>
                    <div style={{display: "flex", justifyContent:'center', alignItems: 'center', marginLeft:"90%", marginTop:"-5%"}}>
                        <button  className="normal-button" variant="success" type="submit" onClick={(e) => {this.handleSave(e)}}>Save</button>
                        <button className="delete-button" style={{marginLeft: "1em", marginRight: "1em"}} onClick={(e) => { this.props.pressClose()}}>Cancel</button>
                    </div>

                   
                </Form>
                
            </div>
        )
    }
}

export default ProfileForm;
