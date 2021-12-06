const constant = require("../constant");
const estResourcePlanning = require("../database/models/estResourcePlanning");
const ResourceMixRepository = require("../repository/estResourceMixRepository.js")
const mongoose = require("mongoose");

module.exports.getResourceMixPlanning = async ({ id }) => {
    try {
  
      if (!mongoose.Types.ObjectId(id)) {
        throw new Error(constant.resourceMixMessage.INVALID_ID);
      }
      
      //var resourceMixData = await ResourceMixRepository.getEstResourceMixbyEstimationId(id);

      let result = {
            RequirmentMixList: [
              {
                _id: "232525432guy8734523",
                alocation: "100.00",
                role: {
                  id: "",
                  name: "Lead",
                  
                },
                Skills: "Frontend",
                Cost: "100:00",
                Price: "200:00"
              },
              {
                _id: "232525432guy8734523",
                alocation: "100.00",
                role: {
                  id: "",
                  name: "Lead",
                  
                },
                Skills: "Frontend",
                Cost: "100:00",
                Price: "200:00"
              }
            ],
            RequirmentMixTotal: {
              total: {
                cost: "1000",
                Price: "2000",
                
              },
              Margin: "10000",
              MarginPercenteg: "50"
            }
          }
      
        return result;
    } catch (err) {
      throw new Error(err);
    }
  };