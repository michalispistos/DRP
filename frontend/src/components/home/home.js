import React from 'react';
import ProjectTileGrid from './projectTileGrid';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.projectTileGridElem = React.createRef();
    }
    

    render () {
        return (
            <div data-testid='home' style={{margin: "0 2em 2em 2em"}}>
                <h1 style={{textAlign: "center", marginTop: "20px", width: "100%"}}>All Projects</h1>
                <br></br>
                <strong>Filters:</strong> 
                <form style={{marginLeft: "1em"}}>
                    <label htmlFor="paid">Paid</label> 
                    <input style={{marginLeft: "0.3em"}} type="checkbox" onClick={() => this.projectTileGridElem.current.handlePaid()} name="Paid"></input>
                </form>
                <ProjectTileGrid ref={this.projectTileGridElem} projects={[]}/>
            </div>
        );
    };
}

export default Home;