import React, { Component } from 'react';
import { getSightings } from './Services.js';
import { Table } from 'reactstrap';
import './SightingsTable.css';

const Angledown = require('react-icons/lib/fa/angle-down');
const Angleup = require('react-icons/lib/fa/angle-up');
const Plus = require('react-icons/lib/fa/plus-circle');

class SightingsTable extends Component {

    constructor(props) {
        super(props);

        this.state = {duckinfo: '', ascending: true};

        this.getducks = this.getducks.bind(this);
        this.listDucks = this.listDucks.bind(this);
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
                this.sortDucksAscending(ducklist);
            }
            else {
                this.sortDucksDescending(ducklist);
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
                            <th className="grabbable" onClick={this.setAscending}>Date
                                {this.state.ascending && <Angledown className="anglebutton" onClick={this.setAscending}></Angledown>}
                                {(!this.state.ascending) && <Angleup className="anglebutton" onClick={this.setAscending}></Angleup>}
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

    sortDucksAscending(ducklist) {
        ducklist.sort(function(a,b){
            let c = new Date(a.dateTime);
            let d = new Date(b.dateTime);
            return c-d;
        });
    }

    sortDucksDescending(ducklist) {
        ducklist.sort(function(a,b){
            let c = new Date(a.dateTime);
            let d = new Date(b.dateTime);
            return d-c;
        });
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
        return (
            <div>
                <Plus id="addsighting" onClick={this.props.addSighting}></Plus>
                {this.listDucks()}
            </div>
        );
    }
}


export default SightingsTable;