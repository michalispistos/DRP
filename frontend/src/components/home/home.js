import React from 'react';
import ProjectTileGrid from './projectTileGrid';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.projectTileGridElem = React.createRef();
    }
    

    render () {
        return (
            <div data-testid='home'>
                <h1 style={{textAlign: "center", marginTop: "20px", width: "100%"}}>All Projects</h1>
                <br></br>
                Filters: 
                <form>
                <input type="checkbox" onClick={() => this.projectTileGridElem.current.handlePaid()} name="Paid"></input>Paid
                </form>
                <ProjectTileGrid ref={this.projectTileGridElem} projects={[]}/>
            </div>
        );
    };
}

export default Home;