
const constant = require("../constant")
const Wizard1 = require("../database/models/wizard1Model")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createWizard1 = async (serviceData) => {
    try {
        let wizard1 = new Wizard1({ ...serviceData })
        const findRecord = await Wizard1.find({ estHeaderId: wizard1.estHeaderId });
        if (findRecord.length != 0) {
            throw new Error(constant.wizard1Message.DUPLICATE_WIZARD1);
        }

        let result = await wizard1.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}


module.exports.getAllWizard1 = async ({ skip = 0, limit = 10 }) => {
    try {
        let wizard1 = await Wizard1.find().sort({ updatedAt: -1 }).skip(parseInt(skip)).limit(parseInt(limit));

        return formatMongoData(wizard1)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}

module.exports.getWizard1ById = async ({ id }) => {
    try {
        if (!mongoose.Types.ObjectId(id)) {
            throw new Error(constant.wizard1Message.INVALID_ID)
        }
        let wizard1 = await Wizard1.findById(id)
            .populate(
                {
                    path: 'projects',
                    options: { sort: { updatedAt: -1 } }
                });
        if (!wizard1) {
            throw new Error(constant.wizard1Message.WIZARD1_NOT_FOUND)
        }
        return formatMongoData(wizard1)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}

module.exports.wizard1Update = async ({ id, updateInfo }) => {
    try {
        const findRecord = await Wizard1.find({ estHeaderId: updateInfo.estHeaderId });
        if (findRecord.length != 0) {
            throw new Error(constant.wizard1Message.DUPLICATE_Wizard1);
        }

        let wizard1 = await Wizard1.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
        if (!wizard1) {
            throw new Error(constant.wizard1Message.WIZARD1_NOT_FOUND)
        }
        return formatMongoData(wizard1)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}


module.exports.wizard1Delete = async ({ id }) => {
    try {

        let wizard1 = await Wizard1.updateOne({ _id: id }, { isDeleted: true });

        if (!wizard1) {
            throw new Error(constant.wizard1Message.WIZARD1_NOT_FOUND)
        }
        return formatMongoData(wizard1)
    } catch (err) {
        console.log("something went wrong: service > createEstimation ", err);
        throw new Error(err)
    }
}