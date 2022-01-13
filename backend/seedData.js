const dotenv = require("dotenv");
const fs = require("fs");
const dbconnection = require("./database/connection");

// Load ENV variables
dotenv.config();

// Load Models
const roleMasterModel = require("./database/models/roleMasterModel");
const userModel = require("./database/models/userModel");
const moduleMasterModel = require("./database/models/moduleMasterModel");
const moduleTokenModel = require("./database/models/moduleTokenModel");
const permissionModel = require("./database/models/permissionModel");

// Connect to Mongo Database
dbconnection();

// Read The JSON files
const rolemasters = JSON.parse(
  fs.readFileSync(`${__dirname}/data/rolemasters.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, "utf-8")
);

const mudulemasters = JSON.parse(
  fs.readFileSync(`${__dirname}/data/modulemasters.json`, "utf-8")
);

const muduletokens = JSON.parse(
  fs.readFileSync(`${__dirname}/data/moduletokens.json`, "utf-8")
);

const permissions = JSON.parse(
  fs.readFileSync(`${__dirname}/data/permissions.json`, "utf-8")
);

// Import Sample Data In DB
const importData = async () => {
  try {
    await roleMasterModel.create(rolemasters);
    await userModel.create(users);
    await moduleMasterModel.create(mudulemasters);
    await moduleTokenModel.create(muduletokens);
    await permissionModel.create(permissions);
    console.log(`Data successfully imported`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete the data from DB
const deleteData = async () => {
  try {
    await roleMasterModel.deleteMany();
    await userModel.deleteMany();
    await moduleMasterModel.deleteMany();
    await moduleTokenModel.deleteMany();
    await permissionModel.deleteMany();
    console.log(`Data successfully deleted`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData().then();
} else if (process.argv[2] === "-d") {
  deleteData().then();
}
