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
      marginPercent = calculateMarginPercentage(margin,costTotal);

      response.total = {'cost': '$'+ costTotal, 'price': '$'+ priceTotal};
      response.margin = '$' + margin;
      response.marginPercent = marginPercent+'%';
    //   let result = {
    //         ResourceMixList: [
    //           {
    //             _id: "2325254324568734523",
    //             allocation: "100.00",
    //             role: {
    //               id: "",
    //               name: "Lead",
                  
    //             },
    //             skills: "Frontend",
    //             cost: "100:00",
    //             price: "200:00"
    //           },
    //           {
    //             _id: "2325254324568734523",
    //             allocation: "100.00",
    //             role: {
    //               id: "",
    //               name: "Lead",
                  
    //             },
    //             skills: "Frontend",
    //             cost: "100:00",
    //             price: "200:00"
    //           }
    //         ],
    //         ResourceMixTotal: {
    //           total: {
    //             cost: "1000",
    //             Price: "2000",
                
    //           },
    //           Margin: "10000",
    //           MarginPercentage: "50"
    //         }
    //       }
      
       // return result;
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

  function calculateMarginPercentage(margin,costTotal){
      return (margin/costTotal)*100;
  }