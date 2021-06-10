import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
export default class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.multiselectRef = React.createRef();
        this.state = {
            tag_options: [
            { key: "Healthcare", cat: "Topic" },
            { key: "Covid-19", cat: "Topic" },
            { key: "Finance", cat: "Topic" },
            { key: "Marketing", cat: "Topic" },
            { key: "Climate Change", cat: "Topic" },
            { key: "Graphic Design", cat: "Topic" },
            { key: "Film", cat: "Topic" },
            { key: "Sports", cat: "Topic" },
            { key: "Programming", cat: "Topic" },
            { key: "Music", cat: "Topic" },
            { key: "Artificial Intelligence", cat: "Topic" },

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
    }

    //
    handleSelect = () => {
        if (true || this.multiselectRef.current.getSelectedItems().length !== 0) {
            this.props.getProjectTileGridRef().current.handleTags(this.multiselectRef.current.getSelectedItems())
        }
    }

    render() {
        return (
            <>
                <div data-testid='filters' className="filters">
                    <strong>Filters:</strong> 
                    <form onSubmit={(e) => {e.preventDefault();}} style={{marginLeft: "1em", paddingRight: "1em"}}>
                        <input style={{marginLeft: "0.3em"}} type="checkbox" onClick={() => this.props.getProjectTileGridRef().current.handlePaid()} name="Paid"/>
                        <label style={{marginLeft:"0.3em"}} htmlFor="paid">Paid</label> 
                        <br/>
                        <input style={{marginLeft: "0.3em"}} name="location" type="checkbox" onClick={() => {this.props.getProjectTileGridRef().current.handleRemote()}}/>
                        <label style={{marginLeft:"0.3em"}} htmlFor="location">Remote</label>
                        <br></br>
                        <label>Tags:</label>
                        <Multiselect 
                            options={this.state.tag_options}
                            showCheckbox = {true}
                            groupBy = "cat"
                            displayValue = "key"
                            ref={this.multiselectRef}
                            onSelect={this.handleSelect}
                            onRemove={this.handleSelect}
                        />
                    </form>
                </div>
            </>
        )
    }
}
