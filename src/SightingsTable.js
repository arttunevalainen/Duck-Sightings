import React, { Component } from 'react';
import { getSightings } from './Services.js';
import { Button, Table } from 'reactstrap';


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

            let sortingOrder = 'Set to Ascending';
            if(this.state.ascending) {
                sortingOrder = 'Set to descending';
            }

            return (
                <Table id="ducklist">
                    <thead>
                        <tr>
                            <th>Date
                                <Button type="button" color="info" id="readybutton" onClick={this.setAscending}>{sortingOrder}</Button>
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
                <Button type="button" color="info" id="readybutton" onClick={this.props.addSighting}>Add sighting</Button>
                {this.listDucks()}
            </div>
        );
    }
}


export default SightingsTable;