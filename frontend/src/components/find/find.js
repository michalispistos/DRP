import React from "react";
import ProjectTileGrid from "./projectTileGrid";
import Filters from "./filters";
import "./find.css";

class Find extends React.Component {
  constructor(props) {
    super(props);
    this.projectTileGridElem = React.createRef();
    this.state = {
      showFilters: true,

    };
    window.addEventListener("resize", this.handleResize);
  }

  componentDidMount() {
    this.handleResize();
  }

  getProjectTileGridRef = () => {
    return this.projectTileGridElem;
  };

  handleResize = () => {
    if (window.innerWidth > 768) {
      this.setState({ showFilters: true });
    } else {
      this.setState({ showFilters: false });
    }
  };

  render() {
    return (
      <div data-testid="find" className="find-container">
        <div className="header-container">
          <h1 className="page-title">All Projects</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="search"
          >
            <input
              type="text"
              placeholder="Search here..."
              onChange={(e) => {
                this.projectTileGridElem.current.searchForQuery(e.target.value);
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

        {this.state.showFilters && (
          <Filters getProjectTileGridRef={this.getProjectTileGridRef} />
        )}
        <ProjectTileGrid ref={this.projectTileGridElem} projects={[]} />
      </div>
    );
  }
}

export default Find;
