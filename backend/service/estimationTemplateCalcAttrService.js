
const constant = require("../constant")
const EstimationTemplateCalcAttr = require("../database/models/estimationTemplateCalcAttrModel")
const ObjectId = require('mongodb').ObjectId;
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel")
//const EstimationHeaderAttributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel")
// estimationHeaderAtrributeCalc- header plus more
// estimationHeaderAtrribute
// EstimationCalcAttr

const EstimationHeaderTemplateCalcAttr = require("../database/models/estimationHeaderAtrributeCalcModel")
const Client = require("../database/models/clientModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createEstimationTemplateCalcAttr = async (serviceData) => {
    try {
        let estimationTemplateCalcAttr = new EstimationTemplateCalcAttr({ ...serviceData })
        let result = await estimationTemplateCalcAttr.save();

        // const client = await Client.findById({ _id: project.client })
        // client.projects.push(project);
        // await client.save();

        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > estimationTemplateCalcAttrService ", err);
        throw new Error(err)
    }
}

//-------------------------
// module.exports.getAllEstimationAttributes = async ({ esttype, estheaderid }) => {
//     try {
//         let estAtt = await EstimationAttribute.aggregate().addFields({ selected: false });
//         if (estheaderid) {
//             let estSelAtt = await EstimationHeaderAttributes.find({ estHeaderId: estheaderid });
//             var index = 0;
//             estAtt.forEach(element => {
//                 estSelAtt.forEach(estSelAttElement => {
//                     if (String(estSelAttElement.estAttributeId) == String(element._id)) {
//                         estAtt[index].selected = true;
//                     }
//                 });
//                 index = index + 1;
//             });
//         }

//         if (esttype) {
//             let estSelAtt = await EstimationTemplateAttribute.find({ estTypeId: esttype });
//             var index = 0;
//             estAtt.forEach(element => {
//                 estSelAtt.forEach(estSelAttElement => {
//                     if (String(estSelAttElement.estAttrId) == String(element._id)) {
//                         estAtt[index].selected = true;
//                     }
//                 });
//                 index = index + 1;
//             });
//         }
//         return (estAtt);
//         // var est = ObjectID(esttype);      
//         // console.log(est); 
//         // let estSelAtt = await EstimationTemplateAttribute.find({estTypeId : est});
//         // console.log(estSelAtt);

//     } catch (err) {
//         console.log("something went wrong: service > Get All Estimation Attribute Service ", err);
//         throw new Error(err)
//     }
// }



//-----------------------------



module.exports.getAllEstimationTemplateCalcAttr = async ({ esttype, estheaderid }) => {
    try {
        if (estheaderid) {
            let estAttCalc = await EstimationCalcAttr.aggregate().match({ estTypeId: ObjectId(esttype) }).addFields({ selected: false, value: "" });
            let estSelAtt = await EstimationHeaderTemplateCalcAttr.find({ estHeaderId: ObjectId(estheaderid) });
            var index = 0;
            estAttCalc.forEach(element => {
                estSelAtt.forEach(estSelAttElement => {
                    if (String(estSelAttElement.calcAttributeName) == String(element.calcAttributeName)) {
                        element.selected = true;
                        element.isFormula = estSelAttElement.isFormula;
                        element.formula = estSelAttElement.formula;
                        element.operator = estSelAttElement.operator;
                        element.unit = estSelAttElement.unit;
                        element.description = estSelAttElement.description;
                        element.value == estSelAttElement.value;
                    }
                });
            });
            return (estAttCalc)
        }
        
        if (esttype) {
            let estAttCalc = await EstimationCalcAttr.aggregate().match({ estTypeId: ObjectId(esttype) }).addFields({ selected: false, value: "" });
            let estSelAtt = await EstimationTemplateCalcAttr.find({ estTypeId: esttype });

            var index = 0;
            estAttCalc.forEach(element => {
                estSelAtt.forEach(estSelAttElement => {
                    if (String(estSelAttElement.estCalcId) == String(element._id)) {
                        element.selected = true;
                    }
                });
            });
            return (estAttCalc)
        }
    } catch (err) {
        console.log("something went wrong: service > estimationTemplateCalcAttrService ", err);
        throw new Error(err)
    }
}

module.exports.getEstimationTemplateCalcAttrById = async ({ id }) => {
    try {
        if (!mongoose.Types.ObjectId(id)) {
            throw new Error(constant.estimationTemplateCalcAttrMessage.INVALID_ID)
        }
        let estimationTemplateCalcAttr = await EstimationTemplateCalcAttr.findById(id).populate('estTypeId').populate({
            path: 'estimates',
            populate: { path: 'estTypeId' }
        })
        if (!estimationTemplateCalcAttr) {
            throw new Error(constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_NOT_FOUND)
        }
        return formatMongoData(estimationTemplateCalcAttr)
    } catch (err) {
        console.log("something went wrong: service > estimationTemplateCalcAttrservice ", err);
        throw new Error(err)
    }
}

module.exports.estimationTemplateCalcAttrUpdate = async ({ id, updateInfo }) => {
    try {

        let estimationTemplateCalcAttr = await EstimationTemplateCalcAttr.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
        if (!estimationTemplateCalcAttr) {
            throw new Error(constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_NOT_FOUND)
        }
        return formatMongoData(estimationTemplateCalcAttr)
    } catch (err) {
        console.log("something went wrong: service > estimationTemplateCalcAttrservice ", err);
        throw new Error(err)
    }
}


module.exports.estimationTemplateCalcAttrDelete = async ({ id }) => {
    try {
        let estimationTemplateCalcAttr = await EstimationTemplateCalcAttr.updateOne({ _id: id }, { isDeleted: true });
        if (!estimationTemplateCalcAttr) {
            throw new Error(constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_NOT_FOUND)
        }
        return formatMongoData(estimationTemplateCalcAttr)
    } catch (err) {
        console.log("something went wrong: service > estimationTemplateCalcAttrService ", err);
        throw new Error(err)
    }
}