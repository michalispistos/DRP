import React from 'react';
import ProjectTileGrid from './projectTileGrid';
import { Multiselect } from 'multiselect-react-dropdown';
import Button from 'react-bootstrap/Button';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.projectTileGridElem = React.createRef();
        this.multiselectRef = React.createRef();
        this.state = {
            tag_options: [
            { key: "Healthcare", cat: "Topic" },
            { key: "Finance", cat: "Topic" },
            { key: "Marketing", cat: "Topic" },
            { key: "Climate Change", cat: "Topic" },
            { key: "Graphic Design", cat: "Topic" },
            { key: "Film", cat: "Topic" },
            { key: "Sports", cat: "Topic" },
            { key: "Programming", cat: "Topic" },
            { key: "Music", cat: "Topic" },

            { key: "Biology", cat: "Subject" },
            { key: "Chemistry", cat: "Subject" },
            { key: "Physics", cat: "Subject" },
            { key: "Maths", cat: "Subject" },
            { key: "Economics", cat: "Subject" },
            { key: "Geography", cat: "Subject" },
            { key: "History", cat: "Subject" },
            { key: "Law", cat: "Subject" },
            { key: "Computer Science", cat: "Subject" },
            
            { key: "Startup", cat: "Project Type" },
            { key: "Side Project", cat: "Project Type"},
            { key: "Academic Project", cat: "Project Type"},],
        };
    };
    

    render () {
        return (
            <div data-testid='home' style={{margin: "0 2em 2em 2em"}}>
                <h1 style={{textAlign: "center", marginTop: "20px", width: "100%"}}>All Projects</h1>
                
                <br></br>
            
                <div style={{width: "-moz-fit-content", border: "2px solid black", borderRadius: "5px", padding: "1%", display:"inline-block"}}>
                    <strong>Filters:</strong> 
                    <form onSubmit={(e) => {e.preventDefault();}} style={{marginLeft: "1em"}}>
                        <label htmlFor="paid">Paid</label> 
                        <input style={{marginLeft: "0.3em"}} type="checkbox" onClick={() => this.projectTileGridElem.current.handlePaid()} name="Paid"></input>
                        <br></br>
                        <label htmlFor="location">Remote</label>
                        <input style={{marginLeft: "0.3em"}} name="location" type="checkbox" onClick={() => {this.projectTileGridElem.current.handleRemote()}}></input>
                        <br></br>
                        <label>Tags:</label>
                        <Multiselect 
                            options={this.state.tag_options}
                            showCheckbox = {true}
                            groupBy = "cat"
                            displayValue = "key"
                            ref={this.multiselectRef}
                        />
                        <br></br>
                        <Button onClick={() => {
                                if (this.multiselectRef.current.getSelectedItems().length !== 0) {
                                    this.projectTileGridElem.current.handleTags(this.multiselectRef.current.getSelectedItems())
                                }
                            }}>Apply</Button>
                        <Button onClick={() => {this.multiselectRef.current.resetSelectedValues(); this.projectTileGridElem.current.resetTagFilters();}} style={{float:"right", marginRight:"5%"}}>Reset</Button>
                    </form>
                </div>
                <form onSubmit={(e) => {e.preventDefault();}}  className="search" style={{float:"right", display:"inline-block", marginTop:"5%", width:"40%"}}>
                    <label>Search: </label>
                    <input type="text" placeholder="Search here..." style={{width:"80%", marginLeft:"10px", height:"100%"}} onChange={(e) => {e.preventDefault(); this.projectTileGridElem.current.searchForQuery(e.target.value);}}></input>
                </form>

                <ProjectTileGrid ref={this.projectTileGridElem} projects={[]}/> 
            </div>
        );
    };
}

export default Home;