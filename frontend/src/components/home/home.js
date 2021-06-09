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
                { key: "Startup", cat: "Type" },
                { key: "Side Project", cat: "Type"},
              ],
        };
    };
    

    render () {
        return (
            <div data-testid='home' style={{margin: "0 2em 2em 2em"}}>
                <h1 style={{textAlign: "center", marginTop: "20px", width: "100%"}}>All Projects</h1>
                
                <br></br>
            
                <div style={{width: "-moz-fit-content", border: "2px solid black", borderRadius: "5px", padding: "1%"}}>
                    <strong>Filters:</strong> 
                    <form style={{marginLeft: "1em"}}>
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
                        <Button onClick={() => {this.projectTileGridElem.current.handleTags(this.multiselectRef.current.getSelectedItems())}}>Apply</Button>
                        <Button onClick={() => {this.multiselectRef.current.resetSelectedValues(); this.projectTileGridElem.current.resetTagFilters();}}>Reset</Button>
                    </form>
                </div>

                <ProjectTileGrid ref={this.projectTileGridElem} projects={[]}/> 
            </div>
        );
    };
}

export default Home;