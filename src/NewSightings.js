import React, { Component } from 'react';
import { getSpecies,  } from './Services.js';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './NewSightings.css';

class NewSighting extends Component {

    constructor() {
        super();

        this.state = { species: '' };

        this.numberchanged = this.numberchanged.bind(this);
        this.sendInformation = this.sendInformation.bind(this);
        this.specieschanged = this.specieschanged.bind(this);
        this.descriptionchanged = this.descriptionchanged.bind(this);

        this.getSpeciesForListing();
    }

    getSpeciesForListing() {
        getSpecies().then((data) => {
            this.setState({ species: data });
        })
    }

    sendInformation() {
        var event = new Date();
        console.log(event.toISOString());
        console.log(this.state.number);
        console.log(this.state.selectedspecies);
        console.log(this.state.description);
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