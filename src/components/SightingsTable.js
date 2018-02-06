import React, { Component } from 'react';
import { getSightings } from '../services/Services.js';
import { Table, Button } from 'reactstrap';
import '../css/SightingsTable.css';
import FadeIn from 'react-fade-in';

let Angledown = require('react-icons/lib/fa/angle-down');
let Angleup = require('react-icons/lib/fa/angle-up');
let Plus = require('react-icons/lib/fa/plus');


class SightingsTable extends Component {

    constructor(props) {
        super(props);

        this.state = {duckinfo: '', datesascending: true };

        this.getducks = this.getducks.bind(this);
        this.listDucks = this.listDucks.bind(this);
        this.setDatesAscending = this.setDatesAscending.bind(this);
        this.ducksorting = this.ducksorting.bind(this);

        this.getducks();
    }


    componentDidMount() {
        this.interval = setInterval(() => this.getducks(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async getducks() {
        let response = await getSightings();
        if(response !== 'error') {
            this.setState({duckinfo: response.data});
        }
        else {
            console.log(response);
        }
    }

    listDucks() {
        let ducklist = this.state.duckinfo;

        if(ducklist !== '') {
            ducklist.sort(this.ducksorting);

            let list = ducklist.map(this.ducklistcomponent);

            return (
                <Table id="ducklist">
                    <thead>
                        <tr>
                            <th className="grabbable" onClick={this.setDatesAscending}>Date
                                {this.state.datesascending && <Angledown className="anglebutton" onClick={this.setDatesAscending}></Angledown>}
                                {(!this.state.datesascending) && <Angleup className="anglebutton" onClick={this.setDatesAscending}></Angleup>}
                            </th>
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

    ducklistcomponent(duck) {
        let time = new Date(duck.dateTime);
            return (
                <tr className="listitem" key={duck.id}>
                    <td>{time.toUTCString()}</td><td>{duck.species}</td><td>{duck.description}</td><td>{duck.count}</td>
                </tr>
            );
    }

    ducksorting(a, b) {
        let c = new Date(a.dateTime);
        let d = new Date(b.dateTime);
        if(this.state.datesascending) {
            return c-d;
        }
        else {
            return d-c;
        }
    }

    setDatesAscending() {
        if(this.state.datesascending) {
            this.setState({ datesascending: false });
        }
        else {
            this.setState({ datesascending: true });
        }
    }

    render() {
        return (
            <div>
                <FadeIn>
                    <Button id="addsighting" onClick={this.props.addSighting}>
                        <Plus id="addsightingimage" onClick={this.props.addSighting}></Plus>
                        New Sighting
                    </Button>
                    {this.listDucks()}
                </FadeIn>
            </div>
        );
    }
}


export default SightingsTable;