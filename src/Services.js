import axios from 'axios';


const address = "http://localhost:8081/";


export function getSightings() {
    return new Promise(function(resolve, reject) {
        axios.get(address + 'sightings')
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error)
            });
        }).catch((err) => {
            console.log(err);
        });
}

export function getSpecies() {
    return new Promise(function(resolve, reject) {
        axios.get(address + 'species')
        .then(function (response) {
            resolve(response.data);
        })
        .catch(function (error) {
            console.log(error)
        });
    }).catch((err) => {
        console.log(err);
    });
}


export function postSightings() {
    return new Promise(function(resolve, reject) {
        axios.post(address + 'sightings', {
                
            })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                console.log(error)
            });
    }).catch((err) => {
        console.log(err);
    });
}