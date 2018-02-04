import React, { Component } from 'react';
import { getSightings } from './Services.js';
import { Table, Button } from 'reactstrap';
import './SightingsTable.css';
import FadeIn from 'react-fade-in';

const Angledown = require('react-icons/lib/fa/angle-down');
const Angleup = require('react-icons/lib/fa/angle-up');
const Plus = require('react-icons/lib/fa/plus');

class SightingsTable extends Component {

    constructor(props) {
        super(props);

        this.state = {duckinfo: '', datesascending: true };

        this.getducks = this.getducks.bind(this);
        this.listDucks = this.listDucks.bind(this);
        this.setDatesAscending = this.setDatesAscending.bind(this);

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
            if(this.state.datesascending) {
                this.sortDucksDateAscending(ducklist);
            }
            else {
                this.sortDucksDateDescending(ducklist);
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

    sortDucksDateAscending(ducklist) {
        ducklist.sort(function(a,b){
            let c = new Date(a.dateTime);
            let d = new Date(b.dateTime);
            return c-d;
        });
    }

    sortDucksDateDescending(ducklist) {
        ducklist.sort(function(a,b){
            let c = new Date(a.dateTime);
            let d = new Date(b.dateTime);
            return d-c;
        });
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