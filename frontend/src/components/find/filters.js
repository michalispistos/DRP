import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import Select from "react-select";
import "./filters.css";

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.multiselectRef = React.createRef();
    this.multiselectRefSkills = React.createRef();
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

      profileOptions: [
        { key: "Biology", cat: "Degree" },
        { key: "Chemistry", cat: "Degree" },
        { key: "Physics", cat: "Degree" },
        { key: "Maths", cat: "Degree" },
        { key: "Economics", cat: "Degree" },
        { key: "Geography", cat: "Degree" },
        { key: "History", cat: "Degree" },
        { key: "Law", cat: "Degree" },
        { key: "Computer Science", cat: "Degree" },
        { key: "English", cat: "Degree" },
        { key: "Mechanical Engineering", cat: "Degree" },
        { key: "Electrical Engineering", cat: "Degree" },
        { key: "Aeronautic Engineering", cat: "Degree" },
        { key: "Art", cat: "Degree" },
        { key: "Graphics Design", cat: "Degree" },
      ],

      skills_options: [
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
      sortOptions: [
        { value: "0", label: "Sort By Oldest" },
        { value: "1", label: "Sort By Latest" },
      ],
    };
  }

  handleSelect = () => {
    if (true || this.multiselectRef.current.getSelectedItems().length !== 0) {
      this.props
        .getProjectTileGridRef()
        .current.handleTags(this.multiselectRef.current.getSelectedItems());
    }
  };

  handleSelectSkills = () => {
    if (true || this.multiselectRefSkills.current.getSelectedItems().length !== 0) {
      this.props
        .getProfileTileGridRef()
        .current.handleSkills(this.multiselectRefSkills.current.getSelectedItems());
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
            {this.props.projectMode ? (
              <>
                <div className="filter-label">
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
              </>
            ) : (
              <div className="filter-label">
                <input
                  name="undergraduate"
                  type="checkbox"
                  onClick={() => {
                    this.props
                      .getProfileTileGridRef()
                      .current.handleUndergraduate();
                  }}
                />
                <label htmlFor="undergraduate" className="filter-name">
                  Undergraduate
                </label>
              </div>
            )}

              {!this.props.projectMode ? (
              <div className="multi-select">
                <Multiselect
                  options={this.state.skills_options}
                  showCheckbox={true}
                  groupBy="cat"
                  displayValue="key"
                  ref={this.multiselectRefSkills}
                  onSelect={this.handleSelectSkills}
                  onRemove={this.handleSelectSkills}
                  placeholder="Filter By Skills"
                  id="css_custom"
                />
              </div>
            ) : (
              <></>
            )}

            {this.props.projectMode ? (
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
            ) : (
              <></>
            )}

            <div className="sort-by-date">
              <Select
                defaultValue={this.state.sortOptions[0]}
                options={this.state.sortOptions}
                onChange={(e) => {
                  this.props.projectMode
                    ? this.props
                        .getProjectTileGridRef()
                        .current.handleSort(e.value)
                    : this.props
                        .getProfileTileGridRef()
                        .current.handleSort(e.value);
                }}
              ></Select>
            </div>
          </form>
        </div>
      </>
    );
  }
}
