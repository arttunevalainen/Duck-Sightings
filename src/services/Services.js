import axios from 'axios';

let address = "http://localhost:8081/";


export function getSightings() {
    return axios.get(address + 'sightings')
        .catch(function (error) {
            return 'error';
        });
}

export function getSpecies() {
    return axios.get(address + 'species')
        .catch(function (error) {
            return 'error';
        });
}


export function postSightings(species, description, date, number) {
    return axios.post(address + 'sightings', {
            id: 0,
            species: species,
            description: description,
            dateTime: date,
            count: number
        })
        .catch(function (error) {
            return 'error';
        });
}