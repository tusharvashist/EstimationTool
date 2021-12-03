const constant = require("../constant");
const mongoose = require("mongoose");
const { formatMongoData } = require("../helper/dbhelper");
const EstResourceCount = require("../database/models/estResourceCount");
const EstHeaderRequirement = require("../database/models/estHeaderRequirement");
const EstRequirementData = require("../database/models/estRequirementData");
const EstimationHeader = require("../database/models/estHeaderModel");
const { ObjectId } = require("mongodb");

module.exports.generateResourceCount = async ({ estheaderid }) => {
  try {
    //console.log("GetByID Starts");
    if (!mongoose.Types.ObjectId(estheaderid)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    //let response = { ...constant.defaultResponce };

    let estimation = await EstimationHeader.findById(estheaderid);

    let estHeaderRequirement = await EstHeaderRequirement.aggregate([
      {
        $match: {
          estHeader: new ObjectId(estheaderid),
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "estrequirementdatas",
          localField: "_id",
          foreignField: "ESTHeaderRequirementID",
          as: "attributeData",
        },
      },
      {
        $unwind: {
          path: "$attributeData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          attributeData: 1,
        },
      },
      {
        $group: {
          _id: "$attributeData.ESTAttributeID",
          sum: {
            $sum: "$attributeData.ESTData",
          },
        },
      },
    ]);

    estHeaderRequirement.forEach((element) => {
      const estResourceCount = EstResourceCount.find({
        estAttributeId: element._id,
      });
      if (estResourceCount.count > 0) {
        estResourceCount.resourceCount =
          element.sum /
          (global.ResourceWeekHours * estimation.estTentativeTimeline);
        let estimationCalcAttr = EstResourceCount.findOneAndUpdate(
          { _id: estResourceCount._id },
          estResourceCount,
          { new: true }
        );
      } else {
        let estResourceCount = new EstResourceCount();
        estResourceCount.estAttributeId = element._id;
        estResourceCount.estHeaderId = estheaderid;
        estResourceCount.resourceCount =
          element.sum /
          (global.ResourceWeekHours * estimation.estTentativeTimeline);
        estResourceCount.save();
      }
    });

    return estHeaderRequirement;
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err);
  }
};

module.exports.getResourceCount = async ({ estheaderid }) => {
  try {
    if (!mongoose.Types.ObjectId(estheaderid)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    let estHeaderRequirement = await EstResourceCount.find({
      estHeaderId: estheaderid,
    }).populate("estAttributeId estCalcId");

    return estHeaderRequirement;
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err);
  }
};
