const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const dbconnection = require("./database/connection");
const swaggerUi = require("swagger-ui-express"); 
const yaml = require("yamljs"); 
const swaggerDocument = yaml.load('./swagger.yaml'); 
const app = express();
dotEnv.config();

//do connection
dbconnection();

//cors
app.use(cors());

// paylod middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//----------- User Route
app.use("/api/v1/user", require("./routes/userRoute"));

//----------- allestimation Route
app.use("/api/v1/allestimation", require("./routes/allEstimationRoute"));

//----------- Client Route
app.use("/api/v1/client", require("./routes/client.route"));

//----------- Project Route
app.use("/api/v1/project", require("./routes/project.route"));

//----------- API Documentation
if(process.env.NODE_ENV != "production"){
    app.get("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get("/", (req, res) => {
  res.send(
    `<style> body { padding: 0; margin: 0; font-family: Arial, sans-serif; } .wrp { background: #f3f3f3; height: 100%; } .brand{ color: #fff; font-size: 13px; } .main-content { height:calc(100% - 50px); width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; } .title { font-size: 14px; font-style: normal; color: #77bf77; } .top-nav { background-color: #5459ff; height: 50px; box-shadow: 1px 1px 1px #d0cccc; padding: 0 20px; display: flex; align-items: center; } .server-port{ color: #3ac720; font-size: 21px; transition: all 1s; animation: 700ms blink infinite; } .server-msz{ } @keyframes blink { 10% { color: transparent; } 50% { color: transparent; } } </style> <div class='wrp'> <div class='top-nav'><h6 class='brand'>Estimation Tool Server</h6></div> <div class='main-content'> <p class='server-msz'>Estimation Tool Node Server Running on port : <span class='server-port'>${PORT}</span></p> <img src='https://images.squarespace-cdn.com/content/v1/58d20c79725e25b221549193/1524135572127-95TS4RSNLNS7D5DWORN9/nodejs.png'> </div> </div>`
  );
});

const PORT = process.env.PORT || 5252;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

//--------- Error handel  middleware



app.use((err, req, res, next) => {
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
