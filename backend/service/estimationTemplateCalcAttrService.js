
const constant = require("../constant")
const EstimationTemplateCalcAttr = require("../database/models/estimationTemplateCalcAttrModel")

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
        let estAttCalc = await EstimationHeaderTemplateCalcAttr.aggregate().addFields({ selected: false, value: "" });
        let estCalcId1 = await EstimationTemplateCalcAttr();
        let a1 = await EstimationCalcAttr.aggregate().addFields({ selected: false, value: "" })
        let estSelAtt = await EstimationCalcAttr.aggregate().addFields({ selected: false, value: "" }).find({ estTypeId: esttype });
        //.addFields({ selected: true })
        // skip n limit remove, put est type id and est header id
        // if we get est header id- means get all est header calc attr table
        if (estheaderid) {
            let estSelAtt = await EstimationHeaderTemplateCalcAttr.find({ estHeaderId: estheaderid });
            var index = 0;
            estAttCalc.forEach(element => {
                estSelAtt.forEach(estSelAttElement => {
                    if (String(estSelAttElement.estAttributeId) == String(element._id)) {
                        estAttCalc[index].selected = true;
                    }
                });
                index = index + 1;
            })
        }
        if (esttype) {

            // let estSelAtt = await EstimationCalcAttr.aggregate().addFields({ selected: false, value: "" }).find({ estTypeId: esttype });
            var index = 0;
            estCalcId1.forEach(element => {
                estSelAtt.forEach(estSelAttElement => {
                    if (String(estSelAttElement._id) == String(estCalcId1.estCalcId)) {
                        estSelAtt[index].selected = true;
                    }
                });
                index = index + 1;
            });
        }

        return (estAttCalc)
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