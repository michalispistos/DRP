import React from "react";
import ProjectTileGrid from "./projectTileGrid";
import ProfileTileGrid from './profileTileGrid';
import Filters from "./filters";
import "./find.css";

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.projectTileGridElem = React.createRef();
    this.profileTileGridElem = React.createRef();
    this.state = {
      showFilters: true,
      projectMode: true,

    };
    window.addEventListener("resize", this.handleResize);
  }

  componentDidMount() {
    this.handleResize();
  }

  getProjectTileGridRef = () => {
    return this.projectTileGridElem;
  };

  getProfileTileGridRef = () => {
    return this.profileTileGridElem;
  };

  handleResize = () => {
    if (window.innerWidth > 768) {
      this.setState({ showFilters: true });
    } else {
      this.setState({ showFilters: false });
    }
  };

  handleTabs = (value) => {
    this.setState({projectMode: value});
  }

  render() {
    return (
      <div data-testid="find" className="find-container">
        <h1 className="page-title">Find</h1>
        <div className="find-tabs">
                    <h2 onClick={() => {this.state.projectMode ? console.log("") : this.handleTabs(true)}}
                        style={this.state.projectMode ? {color: "black"} : {color: "grey"}} 
                        className="my-projects-tab">Projects</h2>
                    <h2 onClick={() => {this.state.projectMode ? this.handleTabs(false) : console.log("")}}
                    style={this.state.projectMode ? {color: "grey", marginLeft: "1em"} : {color: "black", marginLeft: "1em"}}
                        className="my-projects-tab">Profiles</h2>
        </div>
        <div className="header-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="search"
          >
            <input
              type="text"
              placeholder="Search here..."
              onChange={(e) => {this.state.projectMode
                ? this.projectTileGridElem.current.searchForQuery(e.target.value)
                : this.profileTileGridElem.current.searchForQuery(e.target.value);
              }}
            ></input>
          </form>
        </div>
        <div>
          <form>
            <button
              id="filterBtn"
              onClick={() =>
                this.setState({ showFilters: !this.state.showFilters })
              }
            >
              {this.state.showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </form>
        </div>
        <br></br>

        {this.state.showFilters && (this.state.projectMode
          ? <Filters getProjectTileGridRef={this.getProjectTileGridRef} projectMode={this.state.projectMode} />
          : <Filters getProfileTileGridRef={this.getProfileTileGridRef} projectMode={this.state.projectMode} />
        )}
        {this.state.projectMode
        ? <ProjectTileGrid ref={this.projectTileGridElem} projects={[]} /> 
        : <ProfileTileGrid ref={this.profileTileGridElem} profiles={[]} />}
        
      </div>
    );
  }
}

export default Find;
