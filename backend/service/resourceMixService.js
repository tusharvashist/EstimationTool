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
            ResourceMixList: [
              {
                _id: "2325254324568734523",
                allocation: "100.00",
                role: {
                  id: "",
                  name: "Lead",
                  
                },
                skills: "Frontend",
                cost: "100:00",
                price: "200:00"
              },
              {
                _id: "2325254324568734523",
                allocation: "100.00",
                role: {
                  id: "",
                  name: "Lead",
                  
                },
                skills: "Frontend",
                cost: "100:00",
                price: "200:00"
              }
            ],
            ResourceMixTotal: {
              total: {
                cost: "1000",
                Price: "2000",
                
              },
              Margin: "10000",
              MarginPercentage: "50"
            }
          }
      
        return result;
    } catch (err) {
      throw new Error(err);
    }
  };