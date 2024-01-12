const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const authRoutes = require('./routes/auth');

const apiRoutes = require('./routes/api')

const errorController = require('./Controllers/errorController')

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use('/auth',authRoutes);

app.use('/api',apiRoutes);

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false, // Enable credentials (e.g., cookies, authorization headers)
    optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
  };

app.use(cors(corsOptions));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.sendStatus(204);
  });

app.use(errorController.get404);
app.use(errorController.get500);


app.listen(ports, ()=>console.log(`listening on ${ports}`));