import React, { Component } from 'react';
import { Button } from 'reactstrap';
import NewSighting from './NewSightings.js';
import SightingsTable from './SightingsTable.js';
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {appstate: 'front'};
        
        this.addSighting = this.addSighting.bind(this);
        this.backToFront = this.backToFront.bind(this);
    }

    addSighting() {
        this.setState({ appstate: 'adding' });
    }

    backToFront() {
        this.setState({ appstate: 'front' });
    }

    render() {
        let frontstate = (this.state.appstate === 'front');

        return (
            <div className="App">
                <h1>Duck sightings</h1>
                {frontstate && <SightingsTable addSighting={this.addSighting}></SightingsTable>}
                {!frontstate && <Button type="button" color="info" id="readybutton" onClick={this.backToFront}>Back to bird listing</Button>}
                {!frontstate && <NewSighting goBack={this.backToFront}></NewSighting>}
            </div>
        );
    }
}

export default App;
