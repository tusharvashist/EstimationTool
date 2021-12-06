const constant = require("../constant");
const { ObjectId } = require("mongodb");
const EstResourceCount = require("../database/models/estResourceCount");
const mongoose = require("mongoose");

module.exports.getEstResourceCountByAttrId = async (estAttributeId) => {
  return EstResourceCount.findOne({
    estAttributeId: estAttributeId,
  });
};

module.exports.getEstResourceCountByCalcAttrId = async (estAttributeId) => {
  return EstResourceCount.findOne({
    estCalcId: estAttributeId,
  });
};

module.exports.getEstResourceCountByHeaderId = async (estheaderid) => {
  let estHeadercount = await EstResourceCount.find({
    estHeaderId: estheaderid,
  });
  //.populate("estAttributeId estCalcId");

  return estHeadercount;
};

module.exports.updateResourceCount = async (
  updateResourceCount,
  resourceCount,
  estimation
) => {
  updateResourceCount.resourceCount =
    resourceCount.Total /
    (global.ResourceWeekHours * estimation.estTentativeTimeline);

  let estHeadercount = EstResourceCount.findOneAndUpdate(
    { _id: updateResourceCount._id },
    updateResourceCount,
    { new: true }
  );
  return estHeadercount;
};

module.exports.createResourceCount = async (
  resourceCount,
  estimation,
  type
) => {
  let estResourceCount = new EstResourceCount();
  if (type == "attribute") {
    estResourceCount.estAttributeId = resourceCount._id;
  } else {
    estResourceCount.estCalcId = resourceCount._id;
  }
  estResourceCount.estHeaderId = estimation._id;
  estResourceCount.resourceCount =
    resourceCount.Total /
    (global.ResourceWeekHours * estimation.estTentativeTimeline);
  estResourceCount.save();

  return estResourceCount;
};

module.exports.updateAttResourceCount = (EstimationAttributes, estimation) => {
  EstimationAttributes.forEach(async (element) => {
    let estResourceCount = await this.getEstResourceCountByAttrId(
      mongoose.Types.ObjectId(element._id)
    );
    console.log(estResourceCount);
    if (estResourceCount) {
      await this.updateResourceCount(estResourceCount, element, estimation);
    } else {
      await this.createResourceCount(element, estimation, "attribute");
    }
  });
};

module.exports.updateCalcAttResourceCount = (
  EstimationCalcAttributes,
  estimation
) => {
  EstimationCalcAttributes.forEach(async (element) => {
    let estResourceCount = await this.getEstResourceCountByCalcAttrId(
      mongoose.Types.ObjectId(element._id)
    );
    console.log(estResourceCount);
    if (estResourceCount) {
      await this.updateResourceCount(estResourceCount, element, estimation);
    } else {
      await this.createResourceCount(element, estimation, "calc");
    }
  });
};
