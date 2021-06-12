import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import Select from "react-select";

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
        { key: "Side Project", cat: "Project Type" },
        { key: "Academic Project", cat: "Project Type" },
      ],
      sortOptions: [
        { value: "0", label: "Sort By Oldest" },
        { value: "1", label: "Sort By Latest" },
      ],
    };
  }

  //
  handleSelect = () => {
    if (true || this.multiselectRef.current.getSelectedItems().length !== 0) {
      this.props
        .getProjectTileGridRef()
        .current.handleTags(this.multiselectRef.current.getSelectedItems());
    }
  };

  render() {
    return (
      <>
        <div data-testid="filters">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="filters"
            >
              <div  className="filter-label"> 
              <input
                type="checkbox"
                onClick={() =>
                  this.props.getProjectTileGridRef().current.handlePaid()
                }
                name="Paid"
              />
              <label htmlFor="paid" className="filter-name">
                Paid
              </label>
              </div>
              
              <div className="filter-label">
              <input
                name="location"
                type="checkbox"
                onClick={() => {
                  this.props.getProjectTileGridRef().current.handleRemote();
                }}
              />
              <label htmlFor="location" className="filter-name">
                Remote
              </label>
              </div>

              <div className="multi-select">
              <Multiselect
                options={this.state.tag_options}
                showCheckbox={true}
                groupBy="cat"
                displayValue="key"
                ref={this.multiselectRef}
                onSelect={this.handleSelect}
                onRemove={this.handleSelect}
                placeholder="Filter By Tags"
                id="css_custom"
                />
                </div>
              <div className="sort-by-date">
                  <Select
                    defaultValue={this.state.sortOptions[0]}
                    options={this.state.sortOptions}
                    onChange={(e) => {
                      this.projectTileGridElem.current.handleSort(e.value);
                    }}
                  ></Select>
              </div>
            </form>
          </div>
      </>
    );
  }
}
