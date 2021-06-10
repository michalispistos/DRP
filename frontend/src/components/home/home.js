import React from 'react';
import ProjectTileGrid from './projectTileGrid';
import Filters from './filters'
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.projectTileGridElem = React.createRef();
        this.state = {
            showFilters: true,
            sortOptions: [{value: "0", label: "Sort By Oldest"}, {value: "1", label: "Sort By Latest"}]
        }
        window.addEventListener('resize', this.handleResize);
    };

    componentDidMount() {
        this.handleResize();
    }

    getProjectTileGridRef = () => {
        return this.projectTileGridElem;
    }


    handleResize = () => {
        if (window.innerWidth > 768) {
            this.setState({showFilters: true});
        } else {
            this.setState({showFilters: false});
        }
    }
    

    render () {
        
        return (
            <div data-testid='home' style={{margin: "0 2em 2em 2em"}}>
                <h1 style={{textAlign: "center", marginTop: "20px", width: "100%"}}>All Projects</h1>
                <form onSubmit={(e) => {e.preventDefault();}}  className="search">
                    <div style={{display:"flex", alignItems: "center", justifyContent: "center", marginTop:"3%", marginBottom:"3%", width:"100%"}}>
                    <input type="text" placeholder="Search here..." style={{margin:"0 0em 0 1em", height:"100%", width: "80%"}} onChange={(e) => {this.projectTileGridElem.current.searchForQuery(e.target.value);}}></input></div>
                    <div style={{display: "block", marginBottom:"5%"}}>
                        <div id="sortContainer">
                    <Select defaultValue={this.state.sortOptions[0]} options={this.state.sortOptions} onChange={(e) => {this.projectTileGridElem.current.handleSort(e.value)}}>   
                    </Select>
                    </div>
                    </div>
                    <Button id="filterBtn" onClick={() => this.setState({showFilters: !this.state.showFilters})}>{this.state.showFilters ? "Hide Filters" : "Show Filters"}</Button>
                </form>
                <br></br>
                <div className="homePageFilterProjectGrid" style={{}}>
                    {this.state.showFilters && <Filters getProjectTileGridRef={this.getProjectTileGridRef}/>}
                    <ProjectTileGrid ref={this.projectTileGridElem} projects={[]}/>  
                </div>
            </div>
        );
    };
}

export default Home;