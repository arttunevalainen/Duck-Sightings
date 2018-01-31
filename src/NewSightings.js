import React, { Component } from 'react';
import {Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './NewSightings.css';

class NewSighting extends Component {

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="exampleSelect">Select Species</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleNumber">Number</Label>
                        <Input type="number" name="number" id="exampleNumber" placeholder="number placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Description</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default NewSighting;