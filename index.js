const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const errorController = require('./Controllers/errorController');

const app = express();
const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

// Enable CORS for all routes
// app.use(cors());

// app.options('*', cors());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on ${ports}`));
