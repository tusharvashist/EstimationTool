const constant = require("../constant")
const EstimationAttribute = require("../database/models/estimationAttributesModel")
const EstimationTemplateAttribute = require("../database/models/estimationTemplateAttrModel")
const EstimationHeaderAttributes = require("../database/models/estimationHeaderAtrributeModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")
const ObjectId = require('mongodb').ObjectId;

module.exports.createEstimationAttribute = async (serviceData) => {
    try {
        let page = new EstimationAttribute({ ...serviceData })

        let result = await page.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > Estimation Attribute Service ", err);
        throw new Error(err)
    }
}

module.exports.createEstimationTempplateAttribute = async (serviceData) => {
    try {
        let page = new EstimationTemplateAttribute({ ...serviceData })

        let result = await page.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > Estimation Template Attribute Service ", err);
        throw new Error(err)
    }
}


module.exports.getAllEstimationAttributes = async ({ esttype, estheaderid }) => {
    try {
        let estAtt = await EstimationAttribute.aggregate().addFields({ selected: false });
        if (estheaderid) {
            // let ids = [];
            // let estSelAtt = await EstimationHeaderAttributes.find({ estHeaderId: estheaderid }).lean().exec(function (error, records) {
            //     records.forEach(element => {
            //         ids.push(element.estAttributeId);
            //         console.log(estAtt[0]._id);
            //     })
            // });            

            //console.log(ids);
            //db.getCollection('sms').aggregate([{ "$addFields": {"hasRead" : {"$in":[ ObjectId("59c25751dcfdaf2944ee2fae"), "$readings"] } } }])

            //let estAtt1 = await EstimationAttribute.aggregate([{ "$addFields": { "selected": { "$in":[ids, "$_id" ]} } }])
            return (estAtt);
        }

        if (esttype) {
            let estSelAtt = await EstimationTemplateAttribute.find({ estTypeId: esttype });
            estSelAtt.forEach(element => {
                console.log(element)
            });

            return (estAtt);
        }

        // var est = ObjectID(esttype);      
        // console.log(est); 
        // let estSelAtt = await EstimationTemplateAttribute.find({estTypeId : est});
        // console.log(estSelAtt);

    } catch (err) {
        console.log("something went wrong: service > Get All Estimation Attribute Service ", err);
        throw new Error(err)
    }
}

