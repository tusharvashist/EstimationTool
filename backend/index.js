const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./database/db');

const clientRoutes = require('./routes/client.routes');
const projectRoutes = require('./routes/project.routes');
const estimationRoutes = require('./routes/estimation.route');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));

app.listen(3000, () => console.log("Estimation tool server started at post ; 3000"));

app.use('/client', clientRoutes);
app.use('/project', projectRoutes);
//app.use('/estimate', estimationRoutes);