const constant = require("../constant");
const { ObjectId } = require("mongodb");
const EstResourceCount = require("../database/models/estResourceCount");
const mongoose = require("mongoose");

module.exports.getEstResourceMixbyEstimationId = async (estId) => {
  var resourceMixPlanningData = await getResourceMixPlanningQuery(estId);
    return resourceMixPlanningData;
};

const getResourceMixPlanningQuery = async (estId) => {
    let resourceMixPlanning = await EstResourceCount.aggregate(
      [
        {
          $match: {
            estHeaderId:  ObjectId(estId)
          }
        }, {
          $lookup: {
            from: 'estheaders', 
            localField: 'estHeaderId', 
            foreignField: '_id', 
            as: 'estimationHeader'
          }
        }, {
          $lookup: {
            from: 'estresourceplannings', 
            localField: '_id', 
            foreignField: 'estResourceCountID', 
            as: 'resourceMix'
          }
        }, {
          $unwind: {
            path: '$resourceMix', 
            preserveNullAndEmptyArrays: false
          }
        }, {
          $lookup: {
            from: 'resourcerolemasters', 
            localField: 'resourceMix.resourceRoleID', 
            foreignField: '_id', 
            as: 'resourceMix.role'
          }
        }, {
          $unwind: {
            path: '$resourceMix.role', 
            preserveNullAndEmptyArrays: true
          }
        }, {
          $unwind: {
            path: '$estimationHeader', 
            preserveNullAndEmptyArrays: true
          }
        }, {
          $project: {
            resourceMix: 1, 
            estimationHeader: 1, 
            attributeName: 1
          }
        }, {
          $addFields: {
            costcal: 0, 
            pricecal: 0
          }
        }, {
          $set: {
            costcal: {
              $multiply: [
                '$estimationHeader.estTentativeTimeline', 40, '$resourceMix.role.cost', {
                  $divide: [
                    '$resourceMix.allocationPercent', 100
                  ]
                }
              ]
            }, 
            pricecal: {
              $multiply: [
                '$estimationHeader.estTentativeTimeline', 40, '$resourceMix.role.price', {
                  $divide: [
                    '$resourceMix.allocationPercent', 100
                  ]
                }
              ]
            }
          }
        }
      ]
    );
  
    if (resourceMixPlanning.length != 0) {
      return resourceMixPlanning;
    } else {
      return [];
    }
  };
  
