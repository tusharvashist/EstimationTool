const mongoose = require("mongoose");
const constant = require("../constant");
const ShareDataModel = require("../database/models/shareDataModel");
const userModel = require("../database/models/userModel");
const roleModel = require("../database/models/roleMasterModel");
const userService = require("../service/userService");
const EstimationHeader = require("../database/models/estHeaderModel");
const emailservice = require("../service/emailService");

module.exports.createShareData = async (serviceData) => {
  try {
    for (let estimation of serviceData.Estimations) {
      for (let user of serviceData.Users) {
        //Check User in Application and create it
        let userexists = await userService.CheckUserandCreate(user);
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
        const estShareLink = await prepareShareEstimationLink(
          estimation.id,
          userexists.id
        );
        //send mail...
        await callSendMailService(estimation.id, userexists.id, estShareLink);
      }
    }
    return "Success";
  } catch (err) {
    console.log("something went wrong: service > Sharing Data Service ", err);
    throw new Error(err);
  }
};

const prepareShareEstimationLink = async (estimationId, shareUserId) => {
  return EstimationHeader.findById(estimationId).then(async (res, err) => {
    return userModel.findById(shareUserId).then(async (res, err) => {
      const token = await userService.getToken(shareUserId);
      const baseURL =
        process.env.REACT_ENV === "production"
          ? process.env.REACT_PRODUCTION_URL
          : process.env.REACT_DEVELOPEMENT_URL;
      // Encode estimationId 
      const encodedEstId = Buffer.from(estimationId).toString('base64');

      // Encode token 
      const encodedToken = Buffer.from(token).toString('base64');

      console.log(
        `${baseURL}/validateshare?estimationId=${encodedEstId}&token=${encodedToken}`
      );
      return `${baseURL}/validateshare?estimationId=${encodedEstId}&token=${encodedToken}`;
    });
  });
};

const callSendMailService = async (estimationId, userid, estShareLink) => {
  //Prepare the email data
  const estimation = await this.GetSharingData({
    estimationId: estimationId,
    loginId: userid,
  });
  if (estimation.length > 0) {
    let estimationData = estimation[0];
    const data = {
      to: estimationData.shareuser.email,
      subject: constant.emailType.ESTIMATION_SUBJECT,
      bodyData: {
        senderName: `${estimationData.shareuser.firstName} ${estimationData.shareuser.lastName}`,
        ownerName: `${estimationData.owneruser.firstName} ${estimationData.owneruser.lastName}`,
        clientName: estimationData.estimation.projectId.client.clientName,
        projectName: estimationData.estimation.projectId.projectName,
        estimationName: estimationData.estimation.estName,
        estimationLink: estShareLink,
        assignedRole: estimationData.sharingrole.roleName,
        mialType: constant.emailType.ESTIMATION,
      },
      isFileAttached: false,
    };
    //Call service method
    emailservice.sendEmail(data);
  }
};

module.exports.GetSharingData = async ({ estimationId, loginId }) => {
  try {
    let filter = {};
    if (loginId) {
      filter = {
        typeId: mongoose.Types.ObjectId(estimationId),
        typeName: "E",
        shareUserId: mongoose.Types.ObjectId(loginId),
      };
    } else {
      filter = {
        typeId: mongoose.Types.ObjectId(estimationId),
        typeName: "E",
        ownerUserId: mongoose.Types.ObjectId(global.loginId),
      };
    }
    return await ShareDataModel.aggregate([
      {
        $match: filter,
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
        $lookup: {
          from: "projectmasters",
          localField: "estimation.projectId",
          foreignField: "_id",
          as: "estimation.projectId",
        },
      },
      {
        $unwind: {
          path: "$estimation.projectId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "clientmasters",
          localField: "estimation.projectId.client",
          foreignField: "_id",
          as: "estimation.projectId.client",
        },
      },
      {
        $unwind: {
          path: "$estimation.projectId.client",
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
