const constant = require("../constant");
const Project = require("../database/models/projectModel");
const Client = require("../database/models/clientModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const ShareDataModel = require("../database/models/shareDataModel");
const userService = require("../service/userService");

module.exports.createProject = async (serviceData) => {
  try {
    let project = new Project({ ...serviceData });
    project.createdBy = global.loginId;
    const findProject = await Project.find(
      { projectName: project.projectName },
      { client: project.client }
    );
    if (findProject.length != 0) {
      throw new Error(constant.projectMessage.DUPLICATE_PROJECT);
    }

    let result = await project.save();
    const client = await Client.findById({ _id: project.client });
    client.projects.push(project);
    await client.save();

    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service > ProjectService >  createProject ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getAllProject = async ({ skip = 0, limit = 10 }) => {
  try {
    let project = await Project.find()
      .populate({ path: "createdBy updatedBy" })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(project);
  } catch (err) {
    console.log(
      "something went wrong: service > ProjectService > getAllProject",
      err
    );
    throw new Error(err);
  }
};

module.exports.getProjectById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.projectMessage.INVALID_ID);
    }
    let project = await Project.findById(id)
      .populate({ path: "createdBy updatedBy" })
      .populate("client")
      .populate({
        path: "estimates",
        populate: { path: "estTypeId createdBy updatedBy" },
        //TODO: Please do not remove below liine , will implement this when implement token based permission things
        //match: { $or: [{createdBy: global.loginId}, {updatedBy: global.loginId}]}
      });
      const estimatesTemp = project.estimates;
      let estimates = [];
      const isUserAllowedToListAllEstimations = await userService.checkUserPermissionWithReqModuleToken(global.loginId, 'all_estimation_data');
      for(const estimate of estimatesTemp) {
        if(estimate){         
          const sharedEst = await ShareDataModel.findOne({typeId: estimate._id, shareUserId: global.loginId});
          const createdBy = estimate.createdBy !=null ? estimate.createdBy._id : '';
          const typeId = sharedEst!=null && sharedEst.typeId !=null ? sharedEst.typeId : '';           
          if(isUserAllowedToListAllEstimations || createdBy == global.loginId || (sharedEst!=null && typeId.equals(estimate._id) && sharedEst.shareUserId == global.loginId)){
            estimates.push(estimate);
          }
        }
      }
      project.estimates = estimates;
    if (!project) {
      throw new Error(constant.projectMessage.PROJECT_NOT_FOUND);
    }
    return formatMongoData(project);
  } catch (err) {
    console.log(
      "something went wrong: service > projectservice > getProjectById",
      err
    );
    throw new Error(err);
  }
};

module.exports.projectUpdate = async ({ id, updateInfo }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.projectMessage.INVALID_ID);
    }
    const findProject = await Project.find(
      { projectName: updateInfo.projectName },
      { client: updateInfo.client }
    );
    updateInfo.updatedBy = global.loginId;
    let project;
    if (findProject.length != 0) {
      if (findProject.length == 1 && String(findProject[0]._id) == id) {
        project = await Project.findOneAndUpdate({ _id: id }, updateInfo, {
          new: true,
        });
        if (!project) {
          throw new Error(constant.projectMessage.PROJECT_NOT_FOUND);
        }
        return formatMongoData(project);
      } else {
        throw new Error(constant.projectMessage.DUPLICATE_PROJECT);
      }
    }

    project = await Project.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!project) {
      throw new Error(constant.projectMessage.PROJECT_NOT_FOUND);
    }
    return formatMongoData(project);
  } catch (err) {
    console.log(
      "something went wrong: service > projectservice > projectUpdate",
      err
    );
    throw new Error(err);
  }
};

module.exports.projectDelete = async ({ id }) => {
  try {
    let project = await Project.updateOne(
      { _id: id },
      { isDeleted: true, updatedBy: global.loginId }
    );
    if (!project) {
      throw new Error(constant.projectMessage.PROJECT_NOT_FOUND);
    }
    return formatMongoData(project);
  } catch (err) {
    console.log(
      "something went wrong: service > projectservice > projectDelete",
      err
    );
    throw new Error(err);
  }
};
