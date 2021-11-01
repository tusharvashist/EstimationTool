const constant = require("../constant")
const EstimationHeaderAtrribute = require("../database/models/estimationHeaderAtrributeModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

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

module.exports.createWizard2 = async (serviceData) => {
    try {
        let wizard2 = new Wizard1({ ...serviceData })
        const findRecord = await Wizard1.find({ estHeaderId: wizard2.estHeaderId });
        if (findRecord.length != 0) {
            throw new Error(constant.wizard2Message.DUPLICATE_Wizard2);
        }

        let result = await wizard2.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}


module.exports.getAllWizard2 = async ({ skip = 0, limit = 10 }) => {
    try {
        let wizard2 = await Wizard1.find().sort({ updatedAt: -1 }).skip(parseInt(skip)).limit(parseInt(limit));

        return formatMongoData(wizard2)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}

module.exports.getWizard2ById = async ({ id }) => {
    try {
        if (!mongoose.Types.ObjectId(id)) {
            throw new Error(constant.wizard2Message.INVALID_ID)
        }
        let wizard2 = await findById(id).populate('estTypeId').populate({
            path: 'estimates',
            populate: { path: 'estTypeId' }
        });
        if (!wizard2) {
            throw new Error(constant.wizard2Message.WIZARD2_NOT_FOUND)
        }
        return formatMongoData(wizard2)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}

module.exports.wizard2Update = async ({ id, updateInfo }) => {
    try {
        const findRecord = await Wizard1.find({ estHeaderId: updateInfo.estHeaderId });
        if (findRecord.length != 0) {
            throw new Error(constant.wizard2Message.DUPLICATE_Wizard2);
        }

        let wizard2 = await Wizard1.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
        if (!wizard2) {
            throw new Error(constant.wizard2Message.WIZARD2_NOT_FOUND)
        }
        return formatMongoData(wizard2)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}


module.exports.wizard2Delete = async ({ id }) => {
    try {

        let wizard2 = await Wizard1.updateOne({ _id: id }, { isDeleted: true });

        if (!wizard2) {
            throw new Error(constant.wizard2Message.WIZARD2_NOT_FOUND)
        }
        return formatMongoData(wizard2)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}