import React, { Component } from 'react';
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
                <img id="cornerimage" src={require("./koodarijahti.jpg")} alt="koodarijahti"/>
                    <h1 id="title">Duck Sightings</h1>
                    {frontstate && <SightingsTable addSighting={this.addSighting}></SightingsTable>}
                    {!frontstate && <NewSighting goBack={this.backToFront}></NewSighting>}
            </div>
        );
    }
}

export default App;
