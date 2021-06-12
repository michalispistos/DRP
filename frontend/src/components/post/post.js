import React, { Component } from 'react';
import Popup from './popup';
import TextPopup from './textPopup'

import CreatableSelect from 'react-select/creatable';

class Post extends Component {
    constructor(props){
        super(props);
        this.multiselectRef = React.createRef();
        this.state = {  
            projectTitle: "",
            projectDescription: "",
            leaderName: "",
            leaderEmail: "",
            newMember: "",
            tags: [],
            members: [],
            lookingFor: "",
            duration: "Indefinite",
            paid: false,
            popupSubmit: false,
            popupLink: false,
            location: "Remote",
            amountToBePaid: "0",
            imageSrc: "default.jpg",
            image: undefined,
            

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

    validForm = () => {
        //maybe security check
        return this.state.projectTitle !== "" && 
               this.state.projectDescription !== "" && 
               this.state.leaderName !== "" && 
               this.state.lookingFor !== "" &&
               this.state.leaderEmail !== ""; 
    }

    handleSubmit = async (e) => {

        e.preventDefault();
        
        if(this.refsmultiSelect !== undefined){
            await this.setState({tags: (this.refs.multiSelect.state.value.map(t => t.value))});
        }

        if(!this.validForm()) {
            alert("Complete missing information")
            return;
        }
        
        if(this.state.image !== undefined){
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
            amount_to_be_paid: this.state.amountToBePaid
        };

      
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(projectData)
        };

        await fetch(`${process.env.REACT_APP_SERVER}/projects`, requestOptions)
            .then(response => console.log('Submitted'))
            .catch(error => console.log('Error submitting project', error));

        if(this.state.image !== undefined){   
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
        
            await fetch(`${process.env.REACT_APP_SERVER}/upload`, requestOptions2).then(response => console.log('Submitted')).catch(error => console.log("error"));
        }

        this.setState({projectTitle: "", projectDescription: "", leaderName: "", members:[], lookingFor: "", tags:[], duration:"Indefinite", paid:false,
                        newMember:"", newTag:"", location:"Remote", leaderEmail:"", amountToBePaid:"0", imageSrc:"default.jpg",
                    popupSubmit:true, popupLink:false});
    };

    handleAddMember = (e) =>{
        e.preventDefault();
        const names = this.state.members.map(m => m.name);
        if(this.state.newMember !== "" && !names.includes(this.state.newMember)){
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
    }



    render() { 
        return (  
            <div data-testid='post'>
                <h1 style={{textAlign: "center", marginTop: "20px", width: "100%", color:"black"}}>Post a Project</h1>
                <form className = 'postForm'>

                    <label htmlFor="title" >Project title:</label><br/>
                    <input type="text" id="title" name="title" margin="normal" maxLength="20" style={{width: "20em", borderRadius: "5px"}}
                         onChange={(e) => {this.setState({projectTitle: e.target.value})}} value={this.state.projectTitle} required/><br/>

                    Choose Image:<br/>
                    <input type="file" id="project_picture" encType="multipart/form-data" name="project_picture" 
                    onChange={(e) => {this.setState({image: e.target.files[0]})}} style={{borderRadius: "5px"}} /><br/>

                    <label htmlFor="description">Project description:</label><br/>
                    <textarea id="description" name="description" maxLength="255" style={{width: "50%", height: "5em",  borderRadius: "5px"}}
                         onChange={(e) => {this.setState({projectDescription: e.target.value})}} value={this.state.projectDescription} required /><br/>

                    <label htmlFor="leader">Leader name:</label><br/>
                    <input type="text" id="leader" name="leader" maxLength="255" style={{width: "15em", borderRadius: "5px"}}
                        onChange={(e) => {this.setState({leaderName: e.target.value})}} value={this.state.leaderName} required /><br/>

                    <label htmlFor="leaderEmail">Leader email:</label><br/>
                    <input type="text" id="leaderEmail" name="leaderEmail" maxLength="255" style={{width: "15em", borderRadius: "5px"}}
                        onChange={(e) => {this.setState({leaderEmail: e.target.value})}} value={this.state.leaderEmail} required/><br/>

                    <label htmlFor="members">Members (optional):</label><br/>
                    <ul style={{marginLeft: "25px"}}>
                        {this.state.members.map(member => {
                               return (<div style={{display: "flex", width: "100%", justifyContent: "start"}}><li style={{width: "10em"}}>{member.name}{(member.link !== undefined) ? (" - " + member.link) : ""}</li>
                                          <button className="remove-button" variant="danger" style={{marginLeft: "1em"}} type="button" onClick={() => {
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

                    <label htmlFor="looking_for">People we are looking for:</label><br/>
                    <textarea type="text" id="looking_for" name="looking_for" maxLength="255" style={{width: "50%", height: "5em", borderRadius: "5px"}}
                    onChange={(e) => {this.setState({lookingFor: e.target.value})}} value={this.state.lookingFor} required/><br/>

                    <label htmlFor="tags">Tags (optional):</label><br/>

                    <CreatableSelect
                        isMulti
                        ref="multiSelect"
                        options={this.state.multi_options}
                        className="tagDropdown"
                    /> 

                    <label htmlFor="duration">Duration:</label><br/>
                    <input type="text" id="duration" name="duration" maxLength="20"
                    onChange={(e) => {this.setState({duration: e.target.value})}} value={this.state.duration} style={{ borderRadius: "5px"}}/><br/>

                    <label htmlFor="location">Location:</label><br/>
                    <input type="text" id="location" name="location" maxLength="20" style={{ borderRadius: "5px"}}
                    onChange={(e) => {this.setState({location: e.target.value})}} value={this.state.location}/><br/>
                    
                    <label htmlFor="paid"/>Paid<input type="checkbox" id="paid" name="paid" style={{marginLeft: "2em"}}
                     onClick={this.handleCheckPaidCheckBox} defaultChecked={false}/><br/>Amount to be paid : <input type="text" disabled={true}  id="amountToBePaid" name="amountToBePaid" maxLength="20" value={this.state.amountToBePaid} onChange={(event) => {this.setState({amountToBePaid: event.target.value})}} style={{width: "10em", borderRadius: "5px"}}/>


                    <button className="normal-button" variant="success" type="submit" style={{marginLeft: "90%", marginTop:"-2.5%"}} onClick={(e) => this.handleSubmit(e)}>POST</button>

                    <Popup trigger={this.state.popupSubmit} setTrigger={() => {this.setState({popupSubmit: false});window.location.reload();}}><h3 style={{color: "white"}}>Post submitted</h3></Popup>

                </form>
            </div>
        );
    }
}
 
export default Post;
