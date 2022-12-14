const constant = require("../constant");
const Assumption = require("../database/models/Assumption");
const AssumptionTag = require("../database/models/AssumptionTag");
const EstHeaderModel = require("../database/models/estHeaderModel");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

exports.createConsolidatedAssumption = async (serviceData) => {
  try {
    let assumption = new Assumption({
      assumption: serviceData.assumption,
      assumptionTag: serviceData.assumptionTag,
      isDeleted: false,
    });
    const findRecord = await Assumption.find({
      assumption: assumption.assumption,
    });
    if (findRecord.length != 0) {
      throw new Error(constant.assumption.DUPLICATE_ASSUMPTION);
    }
    let result = await assumption.save();
    return result;
  } catch (err) {
    console.log(
      "something went wrong: service > clientService > createClient ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getTag = async () => {
  try {
    let assumptionTag = await AssumptionTag.find();
    return assumptionTag;
  } catch (err) {
    console.log("something went wrong: service > Role Master Service ", err);
    throw new Error(err);
  }
};

module.exports.getConsolidatedAssumption = async () => {
  try {
    let assumption = await Assumption.find().populate({
      path: "assumptionTag",
    });
    return assumption;
  } catch (err) {
    console.log(
      "something went wrong: service > ProjectService > getAllProject",
      err
    );
    throw new Error(err);
  }
};

module.exports.putUpdatedAssumption = async (req) => {
  try {
    return await Assumption.findByIdAndUpdate(req.assumptionId, {
      assumption: req.assumptionName,
      assumptionTag: req.assumptionTag,
    });
  } catch (err) {
    console.log(
      "something went wrong: service > assumptionRepository > putUpdatedAssumption",
      err
    );
  }
};

module.exports.deleteAssumption = async (id) => {
  try {
    return await Assumption.findByIdAndUpdate(id, { isDeleted: true });
  } catch (err) {
    console.log(
      "something went wrong: service > assumptionRepository > deleteAssumption",
      err
    );
    throw new Error(err);
  }
};

module.exports.linkAssumptionWithEstimation = async ({ id, updateInfo }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.projectMessage.INVALID_ID);
    }
    const estHeaderModel = await EstHeaderModel.findById({ _id: id });
    if (estHeaderModel.length != 0) {
      await Assumption.updateMany({}, { $pull: { estHeader: id } });
      var bulk_Assumption = Assumption.collection.initializeOrderedBulkOp();
      var recordUpdated = 0;
      updateInfo.assumptionsList.forEach(async (assumption, i) => {
        recordUpdated = recordUpdated + 1;
        const result = await Assumption.updateOne(
          { _id: assumption.id },
          { $addToSet: { estHeader: id } }
        );
      });
      return { recordUpdated: recordUpdated };
    } else {
      throw new Error(constant.assumption.ASSUMPTION_EST_NOT_FOUND);
    }
  } catch (err) {
    console.log("Error: ", err);
    throw new Error(err);
  }
};

module.exports.getLinkAssumptionWithEstimation = async (id) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.projectMessage.INVALID_ID);
    }
    return await Assumption.aggregate([{
    $match: {
        isDeleted: false
    }
},
      {
        $addFields: {
          selected: {
            $cond: [
              {
                $setIsSubset: [[ObjectId(id)], "$estHeader"],
              },
              true,
              false,
            ],
          },
        },
      },
      {
        $lookup: {
          from: "assumptiontags",
          localField: "assumptionTag",
          foreignField: "_id",
          as: "assumptionTag",
        },
      },
      {
        $unwind: {
          path: "$assumptionTag",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);
  } catch (err) {
    console.log(
      "something went wrong: service > ProjectService > getAllProject",
      err
    );
    throw new Error(err);
  }
};
