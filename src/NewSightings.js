import React, { Component } from 'react';
import { getSpecies, postSightings,  } from './Services.js';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './NewSightings.css';

class NewSighting extends Component {

    constructor(props) {
        super(props);

        this.state = { species: '', error: '' };

        this.numberchanged = this.numberchanged.bind(this);
        this.sendInformation = this.sendInformation.bind(this);
        this.specieschanged = this.specieschanged.bind(this);
        this.descriptionchanged = this.descriptionchanged.bind(this);

        this.getSpeciesForListing();
    }

    getSpeciesForListing() {
        getSpecies().then((data) => {
            this.setState({ selectedspecies: data[0].name, species: data })
        });
    }

    sendInformation() {
        let date = new Date();
        let timestamp = date.toISOString();

        this.setState({numbererror: undefined, descriptionerror: undefined});

        if(this.state.number === undefined) {
            this.setState({numbererror: 'enter a number!'});
        }
        if(this.state.description === undefined) {
            this.setState({descriptionerror: 'enter a description!'});
        }

        if(this.state.number !== undefined && this.state.description !== undefined) {
            postSightings(this.state.selectedspecies, this.state.description, timestamp, parseInt(this.state.number, 10)).then((data) => {
                this.props.goBack();
            });
        }
    }

    listSpeciesToOptions() {
        let specieslist = this.state.species;

        if(specieslist !== '') {
            const list = specieslist.map((species) =>
                <option key={species.name}>{species.name}</option>
            );

            return (<Input type="select" name="select" id="selectspecies" onChange={this.specieschanged}>{list}</Input>);
        }
        else {
            return (<div>Getting species data...</div>);
        }
    }

    numberchanged(e) {
        this.setState({ number: e.target.value });
    }

    specieschanged(e) {
        this.setState({ selectedspecies: e.target.value });
    }

    descriptionchanged(e) {
        this.setState({ description: e.target.value });
    }

    render() {
        return (
            <div>
                <div className="errors">
                    <p className="error">{this.state.numbererror}</p>
                    <p className="error">{this.state.descriptionerror}</p>
                </div>
                <Form className="form">
                    <FormGroup>
                        <Label>Select Species</Label>
                        {this.listSpeciesToOptions()}
                    </FormGroup>
                    <FormGroup>
                        <Label>Number</Label>
                        <Input type="number" name="number" id="number" onChange={this.numberchanged}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="text" id="description" onChange={this.descriptionchanged}/>
                    </FormGroup>
                    <Button onClick={this.sendInformation}>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default NewSighting;