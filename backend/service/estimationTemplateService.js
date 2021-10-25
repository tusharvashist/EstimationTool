
const constant = require("../constant")
const EstimationTemplate = require("../database/models/estimationTemplate")
const Client = require("../database/models/clientModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createEstimationTemplate = async (serviceData) => {
  try {
    let estimationTemplate = new EstimationTemplate({ ...serviceData })
    let result = await estimationTemplate.save();

    // const client = await Client.findById({ _id: project.client })
    // client.projects.push(project);
    // await client.save();

    return formatMongoData(result)
  } catch (err) {
    console.log("something went wrong: service > EstimationTemplateService ", err);
    throw new Error(err)
  }
}


module.exports.getAllEstimationTemplate = async ({ skip = 0, limit = 10 }) => {
  try {
    let estimationTemplate = await EstimationTemplate.find({ isDeleted: false }).skip(parseInt(skip)).limit(parseInt(limit));
    return formatMongoData(estimationTemplate)
  } catch (err) {
    console.log("something went wrong: service > EstimationTemplate ", err);
    throw new Error(err)
  }
}

// module.exports.getEstimationTemplateById = async ({ id }) => {
//   try {
//     if (!mongoose.Types.ObjectId(id)) {
//       throw new Error(constant.estimationTemplateMessage.INVALID_ID)
//     }
//     let project = await Project.findById(id)
//     if (!project) {
//       throw new Error(constant.projectMessage.PROJECT_NOT_FOUND)
//     }
//     return formatMongoData(project)
//   } catch (err) {
//     console.log("something went wrong: service > projectservice ", err);
//     throw new Error(err)
//   }
// }

// module.exports.projectUpdate = async ({ id, updateInfo }) => {
//   try {

//     let project = await Project.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
//     if (!project) {
//       throw new Error(constant.projectMessage.PROJECT_NOT_FOUND)
//     }
//     return formatMongoData(project)
//   } catch (err) {
//     console.log("something went wrong: service > projectservice ", err);
//     throw new Error(err)
//   }
// }


// module.exports.projectDelete = async ({ id }) => {
//   try {
//     let project = await Project.updateOne({ _id: id }, { isDeleted: true });
//     if (!project) {
//       throw new Error(constant.projectMessage.PROJECT_NOT_FOUND)
//     }
//     return formatMongoData(project)
//   } catch (err) {
//     console.log("something went wrong: service > projectservice ", err);
//     throw new Error(err)
//   }
// }