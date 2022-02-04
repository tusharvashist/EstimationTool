const constant = require("../constant");
const { ObjectId } = require("mongodb");
const EstResourceCount = require("../database/models/estResourceCount");
const mongoose = require("mongoose");
const ResourcePlanningModel = require("../database/models/estResourcePlanning");

module.exports.getEstResourceMixbyEstimationId = async (estId) => {
  await getResourceForAllocationQuery(estId);
  var resourceMixPlanningData = await getResourceMixPlanningQuery(estId);
  return resourceMixPlanningData;
};

const getResourceForAllocationQuery = async (estId) => {
  let result = await EstResourceCount.aggregate([
    [
      {
        $match: {
          estHeaderId: ObjectId(estId),
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
      }
    ]
  ])

  await updateAllocation(result);
}

const updateAllocation = async (result) => {
  result.forEach(async (item) => {
    let adjustmentDone = false;
    let allocationDone = 0;
    item.resourceMix.forEach(async (resource) => {
      if(resource.defaultAdjusted && !adjustmentDone){
        try{
          adjustmentDone = true;
       await ResourcePlanningModel.updateOne({_id: resource._id},
         {$set: { allocationPercent: getAllocationPercent(getFractionValue(item.resourceCount)) }});
        }catch (err){
          adjustmentDone = false;
        }
      }else{
        try {
          if(item.resourceCount >= allocationDone+1){
            allocationDone = allocationDone + 1;
            await ResourcePlanningModel.updateOne({_id: resource._id},
              {$set: { allocationPercent: 100 }});
          }else{
         await ResourcePlanningModel.updateOne({_id: resource._id},
          {$set: { allocationPercent: getAllocationPercent(getFractionValue(item.resourceCount)) }});
        }
        }catch (err){
          allocationDone = allocationDone - 1;
        }  
      }
    })
  })
}

const getFractionValue = (count) => {
  var decimals = count - Math.floor(count);
  return decimals;
}

const getAllocationPercent = (mincount) => {
  switch (true) {
    case mincount == 0:
     return 100;
    case mincount <= 0.25:
     return 25;
    case mincount <= 0.5:
      return 50;
    case mincount <= 0.75:
      return 75
    default:
      return 100;
  }
};

const getResourceMixPlanningQuery = async (estId) => {
  let resourceMixPlanning = await EstResourceCount.aggregate([
    {
      $match: {
        estHeaderId: ObjectId(estId),
      },
    },
    {
      $lookup: {
        from: "estheaders",
        localField: "estHeaderId",
        foreignField: "_id",
        as: "estimationHeader",
      },
    },
    {
      $lookup: {
        from: "estresourceplannings",
        localField: "_id",
        foreignField: "estResourceCountID",
        as: "resourceMix",
      },
    },
    {
      $unwind: {
        path: "$resourceMix",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: "resourcerolemasters",
        localField: "resourceMix.resourceRoleID",
        foreignField: "_id",
        as: "resourceMix.role",
      },
    },
    {
      $unwind: {
        path: "$resourceMix.role",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$estimationHeader",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        resourceMix: 1,
        estimationHeader: 1,
        attributeName: 1,
      },
    },
    {
      $addFields: {
        costcal: 0,
        pricecal: 0,
      },
    },
    {
      $addFields: {
        costcal: {
          $multiply: [
            "$estimationHeader.estTentativeTimeline",
            40,
            "$resourceMix.role.cost",
            {
              $divide: ["$resourceMix.allocationPercent", 100],
            },
          ],
        },
        pricecal: {
          $multiply: [
            "$estimationHeader.estTentativeTimeline",
            40,
            "$resourceMix.role.price",
            {
              $divide: ["$resourceMix.allocationPercent", 100],
            },
          ],
        },
      },
    },
  ]);

  if (resourceMixPlanning.length != 0) {
    return resourceMixPlanning;
  } else {
    return [];
  }
};