const constant = require("../constant");
const ShareDataModel = require("../database/models/shareDataModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");

module.exports.createShareData = async (serviceData) => {
  try {
    for (let estimation of serviceData.Estimations) {
      for (let user of serviceData.Users) {
        let sharedata = new ShareDataModel({
          typeId: mongoose.Types.ObjectId(estimation.id),
          typeName: "E",
          roleId: mongoose.Types.ObjectId(serviceData.RoleId),
          ownerUserId: global.loginId,
          shareUserId: mongoose.Types.ObjectId(user.id),
        });
        await ShareDataModel.deleteOne({
          $and: [
            { typeId: mongoose.Types.ObjectId(estimation.id) },
            { shareUserId: mongoose.Types.ObjectId(user.id) },
            { typeName: "E" },
          ],
        });
        await sharedata.save();
        //send mail...
        callSendMailService(estimation.id);
      }
    }
  } catch (err) {
    console.log("something went wrong: service > Sharing Data Service ", err);
    throw new Error(err);
  }
};

callSendMailService=({estimationId})=>{
  //Prepare the email data
  const estimationData=GetSharingData(estimationId);
  const data = {
    to: estimationData.shareuser.email,
    subject: constant.emailType.ESTIMATION_SUBJECT,
    bodyData: {
      senderName: `${estimationData.shareuser.firstName} ${estimationData.shareuser.lastName}`,
      ownerName: `${estimationData.owneruser.firstName} ${estimationData.owneruser.firstName}`,
      clientName: "TYC",
      projectName: "TYC_Client",
      estimationName: estimationData.estimation.estName,
      estimationLink: "http://localhost:3000/All-Clients/BioIQ/BioIQ%20healtcare%20Applications/uid?13432/estHeaderId?123456709",
      assignedRole: estimationData.sharingrole.roleName,
      mialType: constant.emailType.ESTIMATION
    },
    isFileAttached: false
  }
  //Call service method
  emsilService.sendEmail(data);
}
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
