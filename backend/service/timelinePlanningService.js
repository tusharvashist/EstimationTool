const constant = require("../constant");
const ResourceMixRepository = require("../repository/estResourceMixRepository.js")
const mongoose = require("mongoose");
const { formatMongoData } = require("../helper/dbhelper")

module.exports.getTimelinePlanning = async ({ id }) => {
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
      let totalNumberOfHours = 0;
      let timelinePlanning = [];
      let number = 1;
      queryResult.forEach(t => {
        let totalNumberOfHoursForResource = 0;
        let timelinePlanningForResource = {};
        timelinePlanningForResource.id = number++;
        timelinePlanningForResource.attributeName = t.resourceMix.role.resourceRole;
        timelinePlanningForResource.resourceRole = t.attributeName;
        for(let i=1;i<=t.estimationHeader.estTentativeTimeline; i++) {
          let str = 'week'+i;
          let cal = 40 * (t.resourceMix.allocationPercent / 100);
          timelinePlanningForResource[str] = cal;
          totalNumberOfHoursForResource += cal;
          totalNumberOfHours += cal;
        }
        timelinePlanningForResource.totalHours = totalNumberOfHoursForResource;
        timelinePlanning.push(timelinePlanningForResource);
      });
      response.timelinePlanning = timelinePlanning;
      response.totalNumberOfHours = totalNumberOfHours;
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