const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const dbconnection = require("./database/connection");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocument = yaml.load("./swagger.yaml");
const productionURL = "https://pyramidestimationtool.azurewebsites.net";
const app = express();
const PORT = process.env.PORT || 5252;
let envName = "";
dotEnv.config({ path: `.env.${process.env.NODE_ENV}` });
global.ResourceWeekHours = 40;
//do connection
dbconnection();

const fileUpload = require("express-fileupload");
app.use(fileUpload());

//cors
app.use(cors());

// payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//----------- User Route
app.use("/api/v1/user", require("./routes/userRoute"));

//----------- allestimation Route
app.use("/api/v1/estimation", require("./routes/estimation.route"));

//----------- estimationDetail Route
app.use("/api/v1/estimationDetail", require("./routes/estimationDetail.route"));
//----------- Client Route
app.use("/api/v1/client", require("./routes/client.route"));
//-------------RequirementTag
app.use("/api/v1/requirementTag", require("./routes/requirementTag.route"));
//----------- Tech Skill Route
app.use("/api/v1/techSkill", require("./routes/techSkill.route"));

//----------- Project Route
app.use("/api/v1/project", require("./routes/project.route"));

//----------- Role Route
app.use("/api/v1/role", require("./routes/roleMaster.route"));

app.use("/api/v1/uploadExcel", require("./routes/excelUpload.route"));

//----------- Role Route
app.use(
  "/api/v1/resourceRoleMaster",
  require("./routes/resourceRoleMaster.route")
);

//-----------  Estimation Type Template ie: ROM/SWAG/FIXBID
app.use(
  "/api/v1/estimationTemplate",
  require("./routes/estimationTemplateRoute")
);

//----------- Module Master Route
app.use("/api/v1/modulemaster", require("./routes/moduleMaster.route"));

//----------- Estimation Attribute Route
app.use(
  "/api/v1/estimationattribute",
  require("./routes/estimationattribute.route")
);

//----------- Estimation calculate attribute
app.use(
  "/api/v1/estimationCalcAttr",
  require("./routes/estimationCalcAttr.route")
);

//----------- Estimation template calculate attribute
app.use(
  "/api/v1/estimationTemplateCalcAttr",
  require("./routes/estimationTemplateCalcAttr.route")
);

//----------- Module Token Route
app.use("/api/v1/moduletoken", require("./routes/moduleToken.route"));

//----------- Permission
app.use("/api/v1/permission", require("./routes/permission.route"));

//----------- Resource Planning
app.use("/api/v1/resource", require("./routes/resourcePlanning.route"));

//----------- Resource timeline Planning
app.use("/api/v1/resource", require("./routes/timelinePlanning.route"));

//----------- Estimation Export
app.use("/api/v1/export", require("./routes/estimationExport.route"));
app.use("/api/v1/report", require("./routes/estimationExport.route"));

//----------- Location
app.use("/api/v1/location", require("./routes/location.route"));

//----------- Sharing
app.use("/api/v1/share", require("./routes/shareData.route"));

//------------Email Send
app.use("/api/v1/sendmail", require("./routes/email.route"));

//------------Clone Estimation
app.use("/api/v1/clone", require("./routes/cloneestimation.route"));

//------------Consolidated Assumption
app.use(
  "/api/v1/consolidatedAssumption",
  require("./routes/consolidatedAssumption.route")
);

//----------- API Documentation
if (process.env.NODE_ENV != "production") {
  envName = "Locally";
  app.get("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
if (process.env.NODE_ENV === "production") {
  envName = "Production";
}

app.get("/", (req, res) => {
  res.send(
    `<style> body { padding: 0; margin: 0; font-family: Arial, sans-serif; } .wrp { background: #f3f3f3; height: 100%; } .brand{ color: #fff; font-size: 13px; } .main-content { height:calc(100% - 50px); width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; } .title { font-size: 14px; font-style: normal; color: #77bf77; } .top-nav { background-color: #5459ff; height: 50px; box-shadow: 1px 1px 1px #d0cccc; padding: 0 20px; display: flex; align-items: center; } .server-port{ color: #3ac720; font-size: 21px; transition: all 1s; animation: 700ms blink infinite; } .server-msz{ } @keyframes blink { 10% { color: transparent; } 50% { color: transparent; } } </style> <div class='wrp'> <div class='top-nav'><h6 class='brand'>Estimation Tool Server</h6></div> <div class='main-content'> <p class='server-msz'>Node API Server Running <b> ${envName}</b> port : <span class='server-port'>${PORT}</span></p> <img src='https://images.squarespace-cdn.com/content/v1/58d20c79725e25b221549193/1524135572127-95TS4RSNLNS7D5DWORN9/nodejs.png'> </div> </div>`
  );
});

app.listen(PORT, () => {
  let prodctionMsz = () => {
    console.log(
      "Node API Application Your Running On Production env...!",
      `${productionURL}`
    );
  };
  let localMsz = () => {
    console.log(
      "Node API Application Running locally",
      `http://localhost:${PORT}`
    );
  };
  if (process.env.NODE_ENV === "production") {
    return prodctionMsz();
  }
  return localMsz();
});

//--------- Error handel  middleware
app.use((err, req, res, next) => {
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
