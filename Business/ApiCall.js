const axios = require('axios');
const config = require('../config/config.json')

const baseApiUrlTrans = config.baseURLTrans;
const baseApiUrlInt = config.baseUrlInt
// Function to generate the basic authorization token
const generateBasicAuth = async () => {
    const token = await generateToken();
    return `Basic ${token}`;
};

const generateToken = async () => {
    let longitud = Math.random() * config.secretKey.length;
    let cadena = '';
    while (cadena.length < longitud) {
        cadena += config.secretKey.charAt(Math.random() * longitud);
    }
    let tiempo = new Date();
    let number = tiempo.getTime();
    number = number * 30
    // Se cifra en base 64 lo siguiente
    // cadena: Cadena randomica generada en base a la ClaveSecreta
    // ‘PPX_’: Separador de elementos cifrados
    // secretKey: Clave Secreta
    // ‘PPX_’: Separador de elementos cifrados
    // number: Timestamp number de la fecha actual del sistema x 30
    // ‘AWS’ cadena que identifica ambiente de ejecución
    // Se usa función btoa para cifrar todo en base 64 y generar cadena
    // básica para header
    const combinedString = cadena + 'PPX_' + config.secretKey + 'PPX_' + number + 'AWS';

    // Use Buffer to encode the string to base64
    const base64Token = Buffer.from(combinedString).toString('base64');

    return base64Token;
}

const CheckTransactionState = async (date, amount, token) => {



    const headers = {
        'Authorization': await generateBasicAuth(),
        'Content-Type': 'application/json',
    };
    const data = {
        date,
        amount,
        token
    };

    try {
        const response = await axios.post(`${baseApiUrlTrans}/transaction/validationTokenDateResource`, data, { headers });

        return (response.data);
    } catch (error) {
        console.error('Error making API call:', error.message);
        return (error);
    }

}

const GetPaymentHistory = async (clientId) => {
    const usuario = config.username;
    const password = config.passwordApi;


    // const headers = {
    //     'Authorization': `Basic ${Buffer.from(`${usuario}:${password}`).toString()}`,
    //     'Content-Type': 'application/json',
    // };

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate(1);
    const formattedLastMonth = lastMonth.toISOString().split('T')[0];

    // Get the current date
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    data = {
        numeroIdentificacion: "0992664673001",
        initialDate: formattedLastMonth,
        finalDate: formattedCurrentDate,
        tipoPago: "unico",
        estado: "pagado",
        identificacionCliente: clientId
    }

    // console.log(headers)


    try {
        const response = await axios.post(`${baseApiUrlInt}/integrations/getTransactionsEstablishmentResource`, data, {
            auth: {
                username: usuario,
                password: password
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return (response.data);
    } catch (error) {
        return (error);
    }


}

module.exports = { CheckTransactionState, GetPaymentHistory };