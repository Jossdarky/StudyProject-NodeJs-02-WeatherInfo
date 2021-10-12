const inquirer = require('inquirer');
require('colors');
const tipoInquirer = {
    TEXT: 'input',
    NUMBER: 'NUMBER',
    RADIO: 'RADIO',
    CHECK: 'CHECK',
    MENU: 'rawlist',
    WAIT: 'input',
}

const leerInput = async (mensaje = 'Seleccione una opcion. ', type = tipoInquirer.TEXT, clearConsole = false, choices = []) => {
    if(clearConsole){
    //    console.clear();
    }
    return inquirer
        .prompt([
            {
                type,
                name: 'respuesta',
                message: mensaje.green,
                default: '',
                choices,
                loop: false
            }
        ])
        .then((answers) => {
            return answers.respuesta;
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}

module.exports = { leerInput, tipoInquirer };