import React, { Component } from 'react';
import TextPopup from '../post/textPopup'
import '../post/post.css'

import CreatableSelect from 'react-select/creatable';

class ProjectForm extends Component {
    constructor(props){
        super(props);
        this.multiselectRef = React.createRef();
        this.state = {  
            projectTitle: props.project.name,
            projectDescription: props.project.description,
            leaderName: props.project.leader,
            leaderEmail: props.project.email,
            newMember: "",
            tags: props.project.tags,
            members: props.project.members,
            lookingFor: props.project.looking_for,
            duration: props.project.duration,
            paid: props.project.paid,
            popupSubmit: false,
            popupLink: false,
            location: props.project.location,
            amountToBePaid: props.project.amount_to_be_paid,
            imageSrc: "default.jpg",
            image: props.project.image_filepath,
            popupTemplate: false,
            
            multi_options: [
                { value: "Healthcare", label: "Healthcare" },
                { value: "Covid-19", label: "Covid-19" },
                { value: "Finance", label: "Finance" },
                { value: "Marketing", label: "Marketing" },
                { value: "Climate Change", label: "Climate Change" },
                { value: "Graphic Design", label: "Graphic Design" },
                { value: "Film", label: "Film" },
                { value: "Sports", label: "Sports" },
                { value: "Programming", label: "Programming" },
                { value: "Music", label: "Music" },
                { value: "Artificial Intelligence", label: "Artificial Intelligence" },
                { value: "Biology", label: "Biology" },
                { value: "Chemistry", label: "Chemistry" },
                { value: "Physics", label: "Physics" },
                { value: "Maths", label: "Maths" },
                { value: "Economics", label: "Economics" },
                { value: "Geography", label: "Geography" },
                { value: "History", label: "History" },
                { value: "Law", label: "Law" },
                { value: "Computer Science", label: "Computer Science" },
                { value: "Startup", label: "Startup" },
                { value: "Side Project", label: "Side Project"},
                { value: "Academic Project", label: "Academic Project"},
            ],
        }
    }

    requiredStar() {
        return (<em style={{color: "red", fontStyle: "normal"}} className="tooltip"> *<span className="tooltiptext">(Required field)</span></em>);
    }

    validForm = () => {
        //maybe security check
        return this.state.projectTitle !== "" && 
               this.state.projectDescription !== "" && 
               this.state.leaderName !== "" && 
               this.state.lookingFor !== "" &&
               this.state.leaderEmail !== ""; 
    }

    handleSave = async (e) => {

        e.preventDefault();

           
        if(this.multiselectRef.current.state.value){
            await this.setState({tags: (this.multiselectRef.current.state.value.map(t => t.value))});
        }

        if(this.state.image !== this.props.project.image_filepath){
            let imageSrc = `${new Date().getTime()}_${this.state.image.name}`
            await this.setState({imageSrc: imageSrc});
        }

        const projectData = { 
            name: this.state.projectTitle,
            description: this.state.projectDescription,
            leader: this.state.leaderName,
            email: this.state.leaderEmail,
            image_filepath: this.state.imageSrc,
            members: this.state.members,
            looking_for: this.state.lookingFor,
            tags: this.state.tags,
            duration: this.state.duration,
            paid: this.state.paid,
            location: this.state.location,
            amount_to_be_paid: this.state.amountToBePaid,
        };
        

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(projectData)
        };

        
        await fetch(`${process.env.REACT_APP_SERVER}/projects/${this.props.project.id}`, requestOptions)
            .then(async response => {
                await response.json();
        })
            .catch(error => console.log('Error submitting project', error));

        
        //Adds project to my_projects of members

        const requestOptionsForProjectList = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
               project: this.props.project.id,
            }),
       }

       let new_members = this.state.members.filter(member => !this.props.project.members.includes(member));
       new_members.map(async (member) => {
           await fetch(`${process.env.REACT_APP_SERVER}/users/username/${member.name}`, requestOptionsForProjectList)
               .then(response => console.log("Updated members"))
               .catch(err => console.log("Error updating project"));
       });

       //upload image

        if(this.state.image !== this.props.project.image_filepath){   
            const formData = new FormData();
            formData.append(
                "project_picture",
                this.state.image,
                this.state.imageSrc,
            );

            const requestOptions2 = {
                method: 'POST',
                body: formData
            }
        
            await fetch(`${process.env.REACT_APP_SERVER}/upload`, requestOptions2)
                .then(response => console.log('Submitted'))
                .catch(error => console.log("error"));
        }


       this.props.pressClose();
    };


    handleAddMember = (e) =>{
        e.preventDefault();
        const names = this.state.members.map(m => m.name);
        if (this.state.newMember !== "" && !names.includes(this.state.newMember)){
            const members = [...this.state.members,{name:this.state.newMember}];
            this.setState({members: members});
        }
        this.setState({newMember:""});
    }

    handleCheckPaidCheckBox = () =>{
        this.setState({paid: !this.state.paid});
        var amountToBePaid = document.getElementById("amountToBePaid");
        var paidCheckBox = document.getElementById("paid")
        amountToBePaid.disabled = paidCheckBox.checked ? false: true;
        if(!amountToBePaid.disabled){
            amountToBePaid.focus();
        }else{
            this.setState({amountToBePaid:"0"});
        }
        console.log(this.state.paid);
    }


    render() { 
        return (  
            <div data-testid='post' className='post' >
                <h1 className="post-a-project">Edit Project</h1>
                <form className = 'postForm'>

                    <label htmlFor="title" >Project title:{this.requiredStar()}</label><br/>
                    <input className="text-box-title" type="text" id="title" name="title" margin="normal" maxLength="20" value={this.state.projectTitle}
                         onChange={(e) => {this.setState({projectTitle: e.target.value})}} required/><br/>

                    <label htmlFor="description">Project description:{this.requiredStar()}</label><br/>
                    <textarea className="text-area" id="description" name="description" maxLength="255" value={this.state.projectDescription}
                         onChange={(e) => {this.setState({projectDescription: e.target.value})}}  required /><br/>

                    <label htmlFor="leader">Leader name:{this.requiredStar()}</label><br/>
                    <input className="text-box-leader" type="text" id="leader" name="leader" maxLength="255" value={this.state.leaderName}
                        onChange={(e) => {this.setState({leaderName: e.target.value})}} required /><br/>

                    <label htmlFor="leaderEmail">Leader email:{this.requiredStar()}</label><br/>
                    <input className="text-box-leader" type="text" id="leaderEmail" name="leaderEmail" maxLength="255" value={this.state.leaderEmail}
                        onChange={(e) => {this.setState({leaderEmail: e.target.value})}} required/><br/>

                    <label htmlFor="looking_for">People we are looking for:{this.requiredStar()}</label><br/>
                    <textarea className="text-area" type="text" id="looking_for" name="looking_for" maxLength="255" value={this.state.lookingFor}
                    onChange={(e) => {this.setState({lookingFor: e.target.value})}} required/><br/>

                    <label htmlFor="duration">Duration:</label><br/>
                    <input className="duration-location-text-box" type="text" id="duration" name="duration" maxLength="20" value={this.state.duration}
                    onChange={(e) => {this.setState({duration: e.target.value})}} /><br/>

                    <label htmlFor="location">Location:</label><br/>
                    <input className="duration-location-text-box" type="text" id="location" name="location" maxLength="20" value={this.state.location}
                    onChange={(e) => {this.setState({location: e.target.value})}}/><br/>

                    <label htmlFor="paid"/>Paid<input className="amount-to-be-paid-checkbox" type="checkbox" id="paid" name="paid" value={this.state.paid}
                     onClick={(e) => { this.handleCheckPaidCheckBox(); }}/><br/>
                     Amount to be paid: 
                     <input type="text" disabled={true}  id="amountToBePaid" name="amountToBePaid" maxLength="20" value={this.state.amountToBePaid} 
                     onChange={(event) => {this.setState({amountToBePaid: event.target.value}); }} style={{width: "10em", borderRadius: "5px"}}/>
                    <br/><br/>

                    {/*OPTIONAL*/}
                    <h2>Optional Details:</h2>

                    <div style={{marginTop: "1em"}}>
                    Upload Different Project Image:<br/>
                    </div>
                    <input className="image" type="file" id="project_picture" encType="multipart/form-data" name="project_picture"
                    onChange={(e) => {this.setState({image: e.target.files[0]}); }} /><br/>


                    <label htmlFor="members">Edit Group Members:</label><br/>   
                    <ul className="member">
                        {this.state.members.map(member => {
                               return (<div className="member-info"><li className="member-bullet-point">{member.name}{(member.link !== undefined) ? (" - " + member.link) : ""}</li>
                                          <button className="remove-button" type="button" onClick={() => {
                                              this.setState({members: this.state.members.filter(m => m.name !== member.name)})
                                            }}>Remove</button>
                                            <button className="normal-button" type="button" onClick={() => {this.setState({popupLink: true})}} style={{marginLeft:"5px"}}>Add link</button> 
                                            <TextPopup trigger={this.state.popupLink} handler={(link)=>{
                                                                                                        if(link !== ""){
                                                                                                        const members = this.state.members.map(m=>{if(m===member){return {name:m.name,link:link};}else{return m;}});
                                                                                                        this.setState({members: members});
                                                                                                        }}} setTrigger={() => {this.setState({popupLink: false})}}></TextPopup>
                                                                                                
                                            </div>)
                            })}
                    </ul>
                    <div style={{display:"flex"}}>
                    <input value={this.state.newMember} maxLength="20" onChange={(event) => {this.setState({newMember: event.target.value});}} type="text" id="members" name="members" style={{width: "10em", borderRadius: "5px"}}/>
                    <button className="normal-button" variant="primary" onClick={(e)=>this.handleAddMember(e)} style={{marginLeft: "1em"}}>ADD</button><br/>
                    </div> 

                    <div style={{marginTop: "1em"}}>
                    <label htmlFor="tags">Tags:</label><br/>
                    </div>

                    <CreatableSelect
                        isMulti
                        ref={this.multiselectRef}
                        options={this.state.multi_options}
                        defaultValue={this.props.project.tags.map(t => {return {value: t, label: t}})}
                        className="tagDropdown"
                    /> 

                    <div style={{display: "flex", justifyContent:'center', alignItems: 'center', marginLeft:"90%", marginTop:"-5%"}}>
                        <button  className="normal-button" variant="success" type="submit" onClick={(e) => {this.handleSave(e)}}>Save</button>
                        <button className="delete-button" onClick={(e) => { this.props.pressClose()}}>Cancel</button>
                    </div>

                </form>
            </div>
        );
    }
}
 
export default ProjectForm;