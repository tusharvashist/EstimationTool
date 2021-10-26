
const constant = require("../constant")
const EstimationTemplateCalcAttr = require("../database/models/estimationTemplateCalcAttrModel")
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


module.exports.getAllEstimationTemplateCalcAttr = async ({ skip = 0, limit = 10 }) => {
    try {
        let estimationTemplateCalcAttr = await EstimationTemplateCalcAttr.find({ isDeleted: false }).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(estimationTemplateCalcAttr)
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
        // let estimationTemplateCalcAttr = await EstimationTemplateCalcAttr.findById(id).populate('client').populate({
        //      path: 'estimates',
        //      populate: { path: 'esttypeId' }
        // })
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