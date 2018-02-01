import React, { Component } from 'react';
import { getSightings } from './Services.js';
import { Button, Table } from 'reactstrap';
import NewSighting from './NewSightings.js';
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {appstate: 'front', duckinfo: '', ascending: true};
        
        this.listDucks = this.listDucks.bind(this);
        this.addSighting = this.addSighting.bind(this);
        this.backToFront = this.backToFront.bind(this);
        this.setAscending = this.setAscending.bind(this);

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

            if(this.state.ascending) {
                ducklist.sort(function(a,b){
                    let c = new Date(a.dateTime);
                    let d = new Date(b.dateTime);
                    return c-d;
                });
            }
            else {
                ducklist.sort(function(a,b){
                    let c = new Date(a.dateTime);
                    let d = new Date(b.dateTime);
                    return d-c;
                });
            }

            const list = ducklist.map((duck) => {
                let time = new Date(duck.dateTime);
                return (<tr className="listitem" key={duck.id}>
                    <td>{time.toUTCString()}</td><td>{duck.species}</td><td>{duck.description}</td><td>{duck.count}</td>
                </tr>);
            });

            return (
                <Table id="ducklist">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Species</th>
                            <th>Description</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>{list}</tbody>
                </Table>
            );
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

    setAscending() {
        if(this.state.ascending) {
            this.setState({ ascending: false });
        }
        else {
            this.setState({ ascending: true });
        }
    }

    render() {
        let frontstate = (this.state.appstate === 'front');
        let sortingOrder = 'Set to Ascending';
        if(this.state.ascending) {
            sortingOrder = 'Set to descending';
        }

        return (
            <div className="App">
                <h1>Duck sightings</h1>
                {frontstate && <Button type="button" color="info" id="readybutton" onClick={this.setAscending}>{sortingOrder}</Button>}
                {frontstate && <Button type="button" color="info" id="readybutton" onClick={this.addSighting}>Add sighting</Button>}
                {frontstate && this.listDucks()}
                {!frontstate && <Button type="button" color="info" id="readybutton" onClick={this.backToFront}>Back to bird listing</Button>}
                {!frontstate && <NewSighting goBack={this.backToFront}></NewSighting>}
            </div>
        );
    }
}

export default App;
