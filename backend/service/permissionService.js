const constant = require("../constant")
const Permission = require("../database/models/permissionModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")
const ObjectID = require('mongodb').ObjectId;

module.exports.createPermission = async (serviceData) => {
    try {
        let data = new Permission({ ...serviceData })

        let result = await data.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > Permission Service ", err);
        throw new Error(err)
    }
}

module.exports.getAllPermission = async ({ }) => {
    try {
        let lst = await Permission.find().
        populate({
            path: 'tokenID'            
          });
        return (lst);
    } catch (err) {
        console.log("something went wrong: service > Get All Permission Service", err);
        throw new Error(err)
    }
}

module.exports.getAllUserPermission = async ({ roletype }) => {
    try {
        let lst = await Permission.find({typeId : roletype, typeName : 'R'}).
        populate({
            path: 'tokenID'            
          });;
        return (lst);
    } catch (err) {
        console.log("something went wrong: service > Get All User Permission Service", err);
        throw new Error(err)
    }
}

