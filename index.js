const { leerInput, tipoInquirer } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
const Busqueda = require('./models/Busqueda');

/**
     * 
     * APIS 
     * ---- mapbox, geocoding
     * ---- openweathermap, data
     *  Que desea hacer?
     *  1. Buscar ciudad
     *  input text
     *      busca segun api y muestra 6 coincidencias + 0 canceelar
     *          se selecciona uno y muestra
     *              ciudad, lat, long, temperatura, minima, maxima, estado clima
     *          
     *  2. Historial
     *      lista ultimos 6 resultados dee la busqueda
     *  0. Salir
     */
const main = async () => {
    let busquedas = new Busquedas();
    let inputOption;
    do {
        let opciones = [{
            name: `Buscar ciudad`,
            value: '1'
        }, {
            name: `Historial`,
            value: '2'
        }, {
            name: `Salir`,
            value: '0'
        }
        ];
        inputOption = await leerInput(`Que desea hacer?`, tipoInquirer.MENU, true, opciones);
        switch (inputOption) {
            case '1':
                let resultadoBusqueda = await consultarClima(busquedas);
                await guardarHistorico(resultadoBusqueda);
                await leerInput(`Presione ENTER para continuar`, tipoInquirer.WAIT);
                break;
            case '2':
                await consultarHistorico(busquedas);
                break;
            case '0':
                await leerInput(`Presione ENTER para continuar`, tipoInquirer.WAIT);
                break;
        }
    } while (inputOption != '0');
};


const consultarClima = async (busquedas = new Busquedas()) => {
    let resultadoBusqueda = new Busqueda();
    let inputOption = await leerInput('Ingrese la ciudad.', tipoInquirer.TEXT);
    resultadoBusqueda.textoBuscado = inputOption;
    //TODO: cancelar busqueda
    let ciudadesEncontradas = await busquedas.buscarCiudades(inputOption);

    let opciones = ciudadesEncontradas.map(function (obj) {
        let rObj = {
            name: obj.place_name,
            value: obj.id,
        };
        return rObj;
    });
    inputOption = await leerInput(`Seleccione ciudad a consultar`, tipoInquirer.MENU, false, opciones);
    let ciudadSeleccionada = {};
    ciudadesEncontradas.forEach(element => {
        if (element.id == inputOption) {
            ciudadSeleccionada = element;
        }
    });

    //ciudadSeleccionada.geometry.coordinates[longitude,latitude]
    let climaCiudad = await busquedas.buscarClima(ciudadSeleccionada.geometry.coordinates[0], ciudadSeleccionada.geometry.coordinates[1]);
    ciudadSeleccionada['clima'] = climaCiudad;
    resultadoBusqueda.ciudadSeleccionada = {
        sufijo: ciudadSeleccionada.properties.short_code,
        ciudad: ciudadSeleccionada.place_name,
        lat: ciudadSeleccionada.clima.coord.lon,
        long: ciudadSeleccionada.clima.coord.lat,
        temperatura: ciudadSeleccionada.clima.main.temp,
        minima: ciudadSeleccionada.clima.main.temp_min,
        maxima: ciudadSeleccionada.clima.main.temp_max,
        estado: ''
    };
    resultadoBusqueda.fechaBusqueda = new Date();
    return resultadoBusqueda;
    
};

const consultarHistorico = async(busquedas = new Busquedas()) =>{

}

const guardarHistorico = async(guardarHistorico) =>{
    console.log(guardarHistorico);
}

main();