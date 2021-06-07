import React, { Component } from 'react';

class Post extends Component {
    state = {  
       projectTitle: "",
       projectDescription: "",
       leaderName: "",
       newMember: "",
       members: [],
       lookingFor: "",
       tags: [],
       newTag: "",
       duration: "",
       paid: false
    }

    validForm = () => {
        //maybe security check
        return this.state.projectTitle !== "" && 
               this.state.projectDescription !== "" && 
               this.state.leaderName !== "" && 
               this.state.lookingFor !== ""; 
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        if(!this.validForm()) {
            return;
        }
        
        //const url = 'https://drp12-backend.herokuapp.com/projects';
        const url = 'https://localhost:5000/projects';

        const projectData = { 
            name: this.state.projectState,
            description: this.state.projectDescription,
            leader: this.state.leaderName,
            members: this.state.members,
            looking_for: this.state.lookingFor,
            tags: this.state.tags,
            duration: this.state.duration,
            paid: this.state.paid
        };

      
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(projectData)
        };

        const response = await fetch(url, requestOptions)
            .then(response => console.log('Submitted'))
            .catch(error => console.log('Error submitting project', error));

        alert("Post succesfull!");
    };

    handleAddMember = (e) =>{
        e.preventDefault();
        if(this.state.newMember !== ""){
            const members = [...this.state.members,this.state.newMember];
            this.setState({members: members, newMember: ""});
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
        /* Info needed: 
                Project title - string
                Project description - string
                Leader name - string
                Members - string array
                Looking for text - string
                Paid (checkbox boolean)
                Duration - string
                Tags - string array
        */
        return (  
            <div data-testid='post'>
                <h1 style={{textAlign: "center", marginTop: "20px", width: "100%"}}>Post a project</h1>
                <form className = 'postForm'>

                    <label htmlFor="title" >Project title:</label><br/>
                    <input type="text" id="title" name="title" margin="normal" maxLength="20" style={{width: "20em"}}
                         onChange={(e) => {this.setState({projectTitle: e.target.value})}}/><br/>

                    <label htmlFor="description">Project description:</label><br/>
                    <textarea id="description" name="description" maxLength="255" style={{width: "80%", height: "7em"}}
                     onChange={(e) => {this.setState({projectDescription: e.target.value})}}/><br/>

                    <label htmlFor="leader">Leader name:</label><br/>
                    <input type="text" id="leader" name="leader" maxLength="255" style={{width: "15em"}}
                        onChange={(e) => {this.setState({leaderName: e.target.value})}}/><br/>

                    <label htmlFor="members">Members:</label><br/>
                    <ul style={{marginLeft: "25px"}}>
                        {this.state.members.map(member => {
                               return (<div style={{display: "flex", maxWidth: "350px", justifyContent: "space-between"}}><li>{member}</li>
                                          <button style={{backgroundColor: "crimson", color: "white", marginLeft: "1em"}} type="button" onClick={() => {
                                              this.setState({members: this.state.members.filter(m => m !== member)})
                                            }}>Remove</button></div>)
                            })}
                    </ul>
                    <input value={this.state.newMember} maxLength="20" onChange={(event) => {this.setState({newMember: event.target.value});}} type="text" id="members" name="members" style={{width: "10em"}}/>
                    <button type="button"  onClick={(e)=>this.handleAddMember(e)} style={{marginLeft: "2em"}}>Add member</button><br/>

                    <label htmlFor="looking_for">People we are looking for:</label><br/>
                    <textarea type="text" id="looking_for" name="looking_for" maxLength="255" style={{width: "80%", height: "7em"}}
                    onChange={(e) => {this.setState({lookingFor: e.target.value})}} /><br/>

                    <label htmlFor="tags">Tags:</label><br/>
                    <ul style={{marginLeft: "25px"}}>
                        {this.state.tags.map(tag => {
                                return (<div style={{display: "flex", maxWidth: "350px", justifyContent: "space-between"}}><li>{tag}</li>
                                          <button style={{backgroundColor: "crimson", color: "white", marginLeft: "1em"}} type="button" onClick={() => {
                                              this.setState({tags: this.state.tags.filter(t => t !== tag)})
                                            }}>Remove</button></div>)
                            })}
                    </ul>
                    
                    <input type="text" id="tags" name="tags" maxLength="20" value={this.state.newTag} onChange={(event) => {this.setState({newTag: event.target.value})}} style={{width: "10em"}}/>
                    <button type="button" onClick={(e)=>this.handleAddTag(e)} style={{marginLeft: "2em"}}>Add tag</button><br/>

                    <label htmlFor="duration">Duration:</label><br/>
                    <input type="text" id="duration" name="duration" maxLength="20"
                    onChange={(e) => {this.setState({duration: e.target.value})}}/><br/>

                    <label htmlFor="paid"/>Paid<input type="checkbox" id="paid" name="paid" style={{marginLeft: "2em"}}/><br/>
                    
                    <input type="submit" value="Post" style={{marginLeft: "100em", width:"6%"}} onClick={(e) => this.handleSubmit(e)}/>
                </form>
            </div>
        );
    }
}
 
export default Post;