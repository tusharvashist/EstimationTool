const mongoose = require("mongoose");
const constant = require("../constant");
const ShareDataModel = require("../database/models/shareDataModel");
const userModel = require("../database/models/userModel");
const roleModel = require("../database/models/roleMasterModel");
const userService = require("../service/userService");
const EstimationHeader = require("../database/models/estHeaderModel");

module.exports.createShareData = async (serviceData) => {
  try {
    for (let estimation of serviceData.Estimations) {
      for (let user of serviceData.Users) {
        //Check User in Application and create it
        let userexists = await CheckUserandCreate(user);
        let sharedata = new ShareDataModel({
          typeId: mongoose.Types.ObjectId(estimation.id),
          typeName: "E",
          roleId: mongoose.Types.ObjectId(serviceData.RoleId),
          ownerUserId: global.loginId,
          shareUserId: mongoose.Types.ObjectId(userexists.id),
        });
        await ShareDataModel.deleteOne({
          $and: [
            { typeId: mongoose.Types.ObjectId(estimation.id) },
            { shareUserId: mongoose.Types.ObjectId(userexists.id) },
            { typeName: "E" },
          ],
        });
        await sharedata.save();
        const estShareLink = await prepareShareEstimationLink(estimation.id, userexists.id);
        //send mail...
        //callSendMailService(estimation.id, estShareLink);
      }
    }
    return "Success";
  } catch (err) {
    console.log("something went wrong: service > Sharing Data Service ", err);
    throw new Error(err);
  }
};

prepareShareEstimationLink = async (estimationId, shareUserId ) => {
  return await EstimationHeader.findById( estimationId ).then( async(res, err) => {
    return await userModel.findById(shareUserId).then( async(res, err) => {
      const token = await userService.getToken(shareUserId);
      const baseURL = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_URL : process.env.DEVELOPEMENT_URL;
      console.log(`${baseURL}/api/v1/user/validateshareestlink/${estimationId}?token=${token}`);
      return `${baseURL}/api/v1/user/validateshareestlink/${estimationId}?token=${token}`;
    });
  });
};

callSendMailService = ({ estimationId , estShareLink}) => {
  //Prepare the email data
  const estimationData = this.GetSharingData(estimationId);
  const data = {
    to: estimationData.shareuser.email,
    subject: constant.emailType.ESTIMATION_SUBJECT,
    bodyData: {
      senderName: `${estimationData.shareuser.firstName} ${estimationData.shareuser.lastName}`,
      ownerName: `${estimationData.owneruser.firstName} ${estimationData.owneruser.firstName}`,
      clientName: "TYC",
      projectName: "TYC_Client",
      estimationName: estimationData.estimation.estName,
      estimationLink: estShareLink,
      assignedRole: estimationData.sharingrole.roleName,
      mialType: constant.emailType.ESTIMATION,
    },
    isFileAttached: false,
  };
  //Call service method
  emsilService.sendEmail(data);
};
module.exports.GetSharingData = async ({ estimationId }) => {
  try {
    return await ShareDataModel.aggregate([
      {
        $match: {
          typeId: mongoose.Types.ObjectId(estimationId),
          typeName: "E",
          ownerUserId: mongoose.Types.ObjectId(global.loginId),
        },
      },
      {
        $lookup: {
          from: "estheaders",
          localField: "typeId",
          foreignField: "_id",
          as: "estimation",
        },
      },
      {
        $lookup: {
          from: "rolemasters",
          localField: "roleId",
          foreignField: "_id",
          as: "sharingrole",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "ownerUserId",
          foreignField: "_id",
          as: "owneruser",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "shareUserId",
          foreignField: "_id",
          as: "shareuser",
        },
      },
      {
        $unwind: {
          path: "$estimation",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$sharingrole",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$owneruser",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$shareuser",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          estimation: 1,
          sharingrole: 1,
          owneruser: 1,
          shareuser: 1,
          createdAt: 1,
        },
      },
      {
        $project: {
          "owneruser.password": 0,
          "shareuser.password": 0,
        },
      },
    ]);
  } catch (err) {
    console.log("something went wrong: service > Sharing Data Service ", err);
    throw new Error(err);
  }
};
async function CheckUserandCreate(user) {
  let userexists = await userModel.findOne({ email: user.vc_Email });
  if (!userexists) {
    //Create New User
    let role = await roleModel.find({ seq: 8 });
    userexists = await userService.signup({
      email: user.vc_Email,
      password: "admin@321",
      roleId: role._id,
      firstname: user.EmpFName,
      lastname: user.EmpLName,
    });
  }
  return userexists;
}
