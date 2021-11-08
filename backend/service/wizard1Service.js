const constant = require("../constant")
const EstimationHeaderAtrribute = require("../database/models/estimationHeaderAtrributeModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")
const EstimationHeaderAtrributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel")

module.exports.createEstimationHeaderAtrribute = async (serviceData) => {
    try {
        let estimationHeaderAtrribute = new EstimationHeaderAtrribute({ ...serviceData })
        const findRecord = await EstimationHeaderAtrribute.find({ estHeaderId: estimationHeaderAtrribute.estHeaderId });
        if (findRecord.length != 0) {
            throw new Error(constant.estimationHeaderAtrributeMessage.DUPLICATE_estimationHeaderAtrribute);
        }

        let result = await estimationHeaderAtrribute.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}


module.exports.getAllEstimationHeaderAtrribute = async ({ skip = 0, limit = 10 }) => {
    try {
        let estimationHeaderAtrribute = await EstimationHeaderAtrribute.find().sort({ updatedAt: -1 }).skip(parseInt(skip)).limit(parseInt(limit));

        return formatMongoData(estimationHeaderAtrribute)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}

module.exports.getEstimationHeaderAtrributeById = async ({ id }) => {
    try {
        if (!mongoose.Types.ObjectId(id)) {
            throw new Error(constant.estimationHeaderAtrributeMessage.INVALID_ID)
        }
        let estimationHeaderAtrribute = await EstimationHeaderAtrribute.findById(id)
            .populate(
                {
                    path: 'projects',
                    options: { sort: { updatedAt: -1 } }
                });
        if (!estimationHeaderAtrribute) {
            throw new Error(constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_NOT_FOUND)
        }
        return formatMongoData(estimationHeaderAtrribute)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}

module.exports.estimationHeaderAtrributeUpdate = async ({ id, updateInfo }) => {
    try {
        const findRecord = await EstimationHeaderAtrribute.find({ estHeaderId: updateInfo.estHeaderId });
        if (findRecord.length != 0) {
            throw new Error(constant.estimationHeaderAtrributeMessage.DUPLICATE_estimationHeaderAtrribute);
        }

        let estimationHeaderAtrribute = await EstimationHeaderAtrribute.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
        if (!estimationHeaderAtrribute) {
            throw new Error(constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_NOT_FOUND)
        }
        return formatMongoData(estimationHeaderAtrribute)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}


module.exports.estimationHeaderAtrributeDelete = async ({ id }) => {
    try {

        let estimationHeaderAtrribute = await EstimationHeaderAtrribute.updateOne({ _id: id }, { isDeleted: true });

        if (!estimationHeaderAtrribute) {
            throw new Error(constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_NOT_FOUND)
        }
        return formatMongoData(estimationHeaderAtrribute)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}
//=========================================================================================

module.exports.createEstimationHeaderAtrributeCalc = async (serviceData) => {
    try {
        let estimationHeaderAtrributeCalc = new EstimationHeaderAtrributeCalc({ ...serviceData })
        const findRecord = await EstimationHeaderAtrributeCalc.find({ estHeaderId: estimationHeaderAtrributeCalc.estHeaderId });
        if (findRecord.length != 0) {
            throw new Error(constant.estimationHeaderAtrributeCalcMessage.DUPLICATE_EstimationHeaderAtrributeCalc);
        }

        let result = await estimationHeaderAtrributeCalc.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}


module.exports.getAllEstimationHeaderAtrributeCalc = async ({ skip = 0, limit = 10 }) => {
    try {
        let estimationHeaderAtrributeCalc = await EstimationHeaderAtrributeCalc.find().sort({ updatedAt: -1 }).skip(parseInt(skip)).limit(parseInt(limit));

        return formatMongoData(estimationHeaderAtrributeCalc)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}

module.exports.getEstimationHeaderAtrributeCalcById = async ({ id }) => {
    try {
        if (!mongoose.Types.ObjectId(id)) {
            throw new Error(constant.estimationHeaderAtrributeCalcMessage.INVALID_ID)
        }
        let estimationHeaderAtrributeCalc = await findById(id).populate('estTypeId').populate({
            path: 'estimates',
            populate: { path: 'estTypeId' }
        });
        if (!estimationHeaderAtrributeCalc) {
            throw new Error(constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_NOT_FOUND)
        }
        return formatMongoData(estimationHeaderAtrributeCalc)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}

module.exports.estimationHeaderAtrributeCalcUpdate = async ({ id, updateInfo }) => {
    try {
        const findRecord = await EstimationHeaderAtrributeCalc.find({ estHeaderId: updateInfo.estHeaderId });
        if (findRecord.length != 0) {
            throw new Error(constant.estimationHeaderAtrributeCalcMessage.DUPLICATE_estimationHeaderAtrributeCalc);
        }

        let estimationHeaderAtrributeCalc = await EstimationHeaderAtrributeCalc.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
        if (!estimationHeaderAtrributeCalc) {
            throw new Error(constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_NOT_FOUND)
        }
        return formatMongoData(estimationHeaderAtrributeCalc)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}


module.exports.estimationHeaderAtrributeCalcDelete = async ({ id }) => {
    try {

        let estimationHeaderAtrributeCalc = await EstimationHeaderAtrributeCalc.updateOne({ _id: id }, { isDeleted: true });

        if (!estimationHeaderAtrributeCalc) {
            throw new Error(constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_NOT_FOUND)
        }
        return formatMongoData(estimationHeaderAtrributeCalc)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}