const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const errorController = require('./Controllers/errorController');

const app = express();
const ports = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.options('*', (req, res) => {
    res.sendStatus(200);
});

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on ${ports}`));
