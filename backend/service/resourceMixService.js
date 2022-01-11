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
      var weeks = [];
      costTotal = getSumFromObjects(queryResult,"costcal");
      priceTotal = getSumFromObjects(queryResult,"pricecal");
      margin = calculateMargin(priceTotal,costTotal);
      marginPercent = calculateMarginPercentage(margin,priceTotal);
      weeks = calculateWeeks(queryResult);
      console.log(weeks);
      response.total = {'cost': '$'+ costTotal, 'price': '$'+ priceTotal};
      response.margin = '$' + margin;
      response.marginPercent = marginPercent+'%';
      response.weeks= weeks;
      return response;
    } catch (err) {
      throw new Error(err);
    }
  };

  function getSumFromObjects(arr,prop) {
    return arr.reduce((a,curr) => a + curr[prop], 0);
  }

  function calculateWeeks(arr) {
    var weeksArray = [];
    let totalhours = 40
    let flag =0;
    arr.forEach(t => {
      var temp = {};
      temp._id=t._id;
      for(let i=1;i<=t.estimationHeader.estTentativeTimeline; i++) {
        let str = 'week'+i;
        let cal = totalhours * (t.resourceMix.allocationPercent / 100);
        temp[str] = cal;
      }
      weeksArray.push(temp);
    });
    return weeksArray;
  }

  function calculateMargin(priceTotal,costTotal){
      return priceTotal - costTotal
  }

  function calculateMarginPercentage(margin,priceTotal){
      return ((margin/priceTotal)*100).toFixed(2);
  }