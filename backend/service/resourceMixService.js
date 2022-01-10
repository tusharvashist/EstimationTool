const constant = require("../constant");
//const estResourcePlanning = require("../database/models/estResourcePlanning");
const ResourceMixRepository = require("../repository/estResourceMixRepository.js")
const mongoose = require("mongoose");
const { formatMongoData } = require("../helper/dbhelper")

module.exports.getResourceMixPlanning = async ({ id }) => {
    try {
  
      if (!mongoose.Types.ObjectId(id)) {
        throw new Error(constant.resourceMixMessage.INVALID_ID);
      }
      
      var queryResult = await ResourceMixRepository.getEstResourceMixbyEstimationId(id);
      let response = { ...constant.resourceMixPlanningResponse };
      response.resourceMixData = queryResult;

      var costTotal = 0;
      var priceTotal = 0;
      var margin = 0;
      var marginPercent = 0;

      costTotal = getSumFromObjects(queryResult,"costcal");
      priceTotal = getSumFromObjects(queryResult,"pricecal");
      margin = calculateMargin(priceTotal,costTotal);
      marginPercent = calculateMarginPercentage(margin,priceTotal);

      response.total = {'cost': '$'+ costTotal, 'price': '$'+ priceTotal};
      response.margin = '$' + margin;
      response.marginPercent = marginPercent+'%';
      return response;
    } catch (err) {
      throw new Error(err);
    }
  };

  function getSumFromObjects(arr,prop) {
    return arr.reduce((a,curr) => a + curr[prop], 0);
  }

  function calculateMargin(priceTotal,costTotal){
      return priceTotal - costTotal
  }

  function calculateMarginPercentage(margin,priceTotal){
      return ((margin/priceTotal)*100).toFixed(2);
  }