import React, { Component } from 'react';
import { getSightings } from './Services.js';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import NewSighting from './NewSightings.js';
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {appstate: 'front', duckinfo: ''};
        
        this.listDucks = this.listDucks.bind(this);
        this.addSighting = this.addSighting.bind(this);
        this.backToFront = this.backToFront.bind(this);

        this.getducks();
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getducks(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getducks() {
        getSightings().then((ducks) => {
            this.setState({duckinfo: ducks});
        });
    }

    listDucks() {
        let ducklist = this.state.duckinfo;

        if(ducklist !== '') {
            const list = ducklist.map((duck) =>
                <ListGroupItem className="listitem" key={duck.id}>
                    {duck.id} {duck.species} {duck.description} {duck.datetime} {duck.count}
                </ListGroupItem>
            );

            return (<ListGroup id="ducklist">{list}</ListGroup>);
        }
        else {
            return (<div>Getting duck data...</div>);
        }
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
                {frontstate && <Button type="button" color="info" id="readybutton" onClick={this.addSighting}>Add sighting</Button>}
                {frontstate && this.listDucks()}
                {!frontstate && <Button type="button" color="info" id="readybutton" onClick={this.backToFront}>Back to bird listing</Button>}
                {!frontstate && <NewSighting></NewSighting>}
            </div>
        );
    }
}

export default App;
