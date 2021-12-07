const constant = require("../constant");
const { ObjectId } = require("mongodb");
const EstResourceCount = require("../database/models/estResourceCount");
const mongoose = require("mongoose");

module.exports.getEstResourceMixbyEstimationId = async (estId) => {
  return EstResourceCount.find({
    estHeaderId: estId,
  });
};