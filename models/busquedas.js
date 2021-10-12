const axios = require('axios');

class Busquedas {

    historial = [];

    constructor() {
        //TODO: iniciar busquedas segun BD
    }
    async buscarCiudades(search_text = '') {
        let ciudadesEncontradas = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json?access_token=pk.eyJ1Ijoiam9zc2Rhcmt5IiwiYSI6ImNrdWQ1cTY1MTAxYjEyb3Ayb2Z2aHB2dncifQ.qMp_bN3micsNcg6r12pC-g`)
            .then(function (response) {
                return response.data.features;
            })
            .catch(function (error) {
                throw error;
            });
        return ciudadesEncontradas;
    }

    async buscarClima(longitud, latitud){
        let climaCiudad = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=a8a52415973e46199e85543cedf5d72e&units=metric`)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                throw error;
            });
        return climaCiudad;
    }


}

module.exports = Busquedas;