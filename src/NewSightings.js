import React, { Component } from 'react';
import { getSpecies, postSightings } from './Services.js';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './NewSightings.css';
import FadeIn from 'react-fade-in';

const Arrowleft = require('react-icons/lib/fa/arrow-left');


class NewSighting extends Component {

    constructor(props) {
        super(props);

        this.state = { species: '' };

        this.numberchanged = this.numberchanged.bind(this);
        this.sendInformation = this.sendInformation.bind(this);
        this.specieschanged = this.specieschanged.bind(this);
        this.descriptionchanged = this.descriptionchanged.bind(this);

        this.getSpeciesForListing();
    }

    getSpeciesForListing() {
        getSpecies().then((data) => {
            this.setState({ selectedspecies: data[0].name, species: data });
        });
    }

    sendInformation() {
        let date = new Date();
        let timestamp = date.toISOString();

        this.setState({numbererror: false, descriptionerror: false});

        if(this.state.number === undefined) {
            this.setState({numbererror: true});
        }
        if(this.state.description === undefined) {
            this.setState({descriptionerror: true});
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
                <FadeIn>
                    <Button id="goback" onClick={this.props.goBack}>
                        <Arrowleft id="gobackarrow" onClick={this.props.goBack}></Arrowleft>
                        Go back
                    </Button>

                    <div className="errors">
                        {this.state.numbererror &&
                            <Alert color="danger">
                                Number of Ducks Missing!
                            </Alert>
                        }
                        {this.state.descriptionerror &&
                            <Alert color="danger" className="error">
                                Description missing!
                            </Alert>
                        }
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
                        <Button id="submitbutton" onClick={this.sendInformation}>Submit</Button>
                    </Form>
                </FadeIn>
            </div>
        );
    }
}

export default NewSighting;