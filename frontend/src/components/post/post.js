import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Popup from './popup';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {  
            projectTitle: "",
            projectDescription: "",
            leaderName: "",
            leaderEmail: "",
            newMember: "",
            members: [],
            lookingFor: "",
            tags: [],
            newTag: "",
            duration: "Indefinite",
            paid: false,
            popup: false,
            location: "Remote",
            amountToBePaid: "",
            imageSrc: "default.jpg",
            image: undefined
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

        this.setState({projectTitle: "", projectDescription: "", leaderName: "", members:[], lookingFor: "", tags:[], duration:"Indefinite", paid:false, popup:true,
                        newMember:"", newTag:"", location:"Remote", leaderEmail:"", amountToBePaid:"", imageSrc:"default.jpg"});
    };

    handleAddMember = (e) =>{
        e.preventDefault();
        if(this.state.newMember !== ""){
            const members = [...this.state.members,this.state.newMember];
            this.setState({members: members, newMember: ""});
        }
    }

    handleCheckPaidCheckBox = () =>{
        this.setState({paid: !this.state.paid});
        var amountToBePaid = document.getElementById("amountToBePaid");
        var paidCheckBox = document.getElementById("paid")
        amountToBePaid.disabled = paidCheckBox.checked ? false: true;
        if(!amountToBePaid.disabled){
            amountToBePaid.focus();
        }else{
            this.setState({amountToBePaid:""});
        }
    }

    handleAddTag = (e) =>{
        e.preventDefault();
        if(this.state.newTag !== ""){
            const tags = [...this.state.tags, this.state.newTag];
            this.setState({tags: tags, newTag: ""});
        }
    }
    

    render() { 
        return (  
            <div data-testid='post'>
                <h1 style={{textAlign: "center", marginTop: "20px", width: "100%"}}>Post a Project</h1>
                <form className = 'postForm'>

                    <label htmlFor="title" >Project title:</label><br/>
                    <input type="text" id="title" name="title" margin="normal" maxLength="20" style={{width: "20em"}}
                         onChange={(e) => {this.setState({projectTitle: e.target.value})}} value={this.state.projectTitle}/><br/>

                    Choose Image:<br/>
                    <input type="file" id="project_picture" encType="multipart/form-data" name="project_picture" 
                    onChange={(e) => {this.setState({image: e.target.files[0]})}}/><br/>

                    <label htmlFor="description">Project description:</label><br/>
                    <textarea id="description" name="description" maxLength="255" style={{width: "80%", height: "7em"}}
                         onChange={(e) => {this.setState({projectDescription: e.target.value})}} value={this.state.projectDescription}/><br/>

                    <label htmlFor="leader">Leader name:</label><br/>
                    <input type="text" id="leader" name="leader" maxLength="255" style={{width: "15em"}}
                        onChange={(e) => {this.setState({leaderName: e.target.value})}} value={this.state.leaderName}/><br/>

                    <label htmlFor="leaderEmail">Leader email:</label><br/>
                    <input type="text" id="leaderEmail" name="leaderEmail" maxLength="255" style={{width: "15em"}}
                        onChange={(e) => {this.setState({leaderEmail: e.target.value})}} value={this.state.leaderEmail}/><br/>

                    <label htmlFor="members">Members (optional):</label><br/>
                    <ul style={{marginLeft: "25px"}}>
                        {this.state.members.map(member => {
                               return (<div style={{display: "flex", maxWidth: "235px", justifyContent: "space-between"}}><li>{member}</li>
                                          <Button variant="danger" style={{marginLeft: "1em"}} type="button" onClick={() => {
                                              this.setState({members: this.state.members.filter(m => m !== member)})
                                            }}>Remove</Button></div>)
                            })}
                    </ul>
                    <input value={this.state.newMember} maxLength="20" onChange={(event) => {this.setState({newMember: event.target.value});}} type="text" id="members" name="members" style={{width: "10em"}}/>
                    <Button variant="primary" onClick={(e)=>this.handleAddMember(e)} style={{marginLeft: "1em"}}>Add member</Button>{' '}<br/>

                    <label htmlFor="looking_for">People we are looking for:</label><br/>
                    <textarea type="text" id="looking_for" name="looking_for" maxLength="255" style={{width: "80%", height: "7em"}}
                    onChange={(e) => {this.setState({lookingFor: e.target.value})}} value={this.state.lookingFor}/><br/>

                    <label htmlFor="tags">Tags (optional):</label><br/>
                    <ul style={{marginLeft: "25px"}}>
                        {this.state.tags.map(tag => {
                                return (<div style={{display: "flex", maxWidth: "235px", justifyContent: "space-between"}}><li>{tag}</li>
                                          <Button variant="danger" style={{marginLeft: "1em"}} type="button" onClick={() => {
                                              this.setState({tags: this.state.tags.filter(t => t !== tag)})
                                            }}>Remove</Button></div>)
                            })}
                    </ul>
                    
                    <input type="text" id="tags" name="tags" maxLength="20" value={this.state.newTag} onChange={(event) => {this.setState({newTag: event.target.value})}} style={{width: "10em"}}/>
                    <Button variant="primary" onClick={(e)=>this.handleAddTag(e)} style={{marginLeft: "1em"}}>Add tag</Button><br/>

                    <label htmlFor="duration">Duration:</label><br/>
                    <input type="text" id="duration" name="duration" maxLength="20"
                    onChange={(e) => {this.setState({duration: e.target.value})}} value={this.state.duration}/><br/>

                    <label htmlFor="location">Location:</label><br/>
                    <input type="text" id="location" name="location" maxLength="20"
                    onChange={(e) => {this.setState({location: e.target.value})}} value={this.state.location}/><br/>
                    
                    <label htmlFor="paid"/>Paid<input type="checkbox" id="paid" name="paid" style={{marginLeft: "2em"}}
                     onClick={this.handleCheckPaidCheckBox} defaultChecked={false}/><br/>Amount to be paid:
                    <input type="text" disabled={true} id="amountToBePaid" name="amountToBePaid" maxLength="20" value={this.state.amountToBePaid} onChange={(event) => {this.setState({amountToBePaid: event.target.value})}} style={{width: "10em"}}/>


                    <input type="submit" value="Post" style={{marginLeft: "90%", width:"6%"}} onClick={(e) => this.handleSubmit(e)}/>

                    <Popup trigger={this.state.popup} setTrigger={() => {this.setState({popup: false});window.location.reload();}}><h3 style={{color: "white"}}>Post submitted</h3></Popup>

                </form>
            </div>
        );
    }
}
 
export default Post;
