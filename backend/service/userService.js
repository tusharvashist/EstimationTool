const constant = require("../constant");
const userModel = require("../database/models/userModel");
const roleModel = require("../database/models/roleMasterModel");
const { formatMongoData } = require("../helper/dbhelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EstimationHeader = require("../database/models/estHeaderModel");
const ShareDataModel = require("../database/models/shareDataModel");
const mongoose = require("mongoose");
const Client = require("../database/models/clientModel");
const Project = require("../database/models/projectModel");

module.exports.signup = async ({
  email,
  password,
  roleId,
  firstname,
  lastname,
}) => {
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error(constant.userMessage.DUPLICATE_EMAIL);
    }
    const pass = await bcrypt.hash(password, 12);
    const newUser = new userModel({
      email: email,
      password: pass,
      roleId: roleId,
      firstName: firstname,
      lastName: lastname,
    });
    let result = await newUser.save();
    return formatMongoData(result);
  } catch (err) {
    console.log("something went wrong: service > signup ", err);
    throw new Error(err);
  }
};

//Do Not Delete this Code
module.exports.login = async (req) => {
  try {
    const headresEmailAndPass = req.headers.authorization
      .split("Basic ")[1]
      .replace('"', "");
    const emailNpass = Buffer.from(headresEmailAndPass, "base64")
      .toString()
      .split(":");
    const email = emailNpass[0].trim();
    const pass = emailNpass[1].trim();

    const users = await userModel.aggregate([
      {
        $match: {
          email: email,
        },
      },
      {
        $lookup: {
          from: "rolemasters",
          localField: "roleId",
          foreignField: "_id",
          as: "roles",
        },
      },
      {
        $unwind: {
          path: "$roles",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "permissions",
          localField: "roles._id",
          foreignField: "typeId",
          as: "tokenPermission",
        },
      },
      {
        $lookup: {
          from: "moduletokens",
          localField: "tokenPermission.tokenID",
          foreignField: "_id",
          as: "RolePermission",
        },
      },
      {
        $project: {
          tokenPermission: 0,
        },
      },
      {
        $addFields: {
          token: "",
        },
      },
    ]);

    let user = users[0];
    if (!user) {
      throw new Error(constant.userMessage.USER_NOT_FOUND);
    }
    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) {
      throw new Error(constant.userMessage.INVALID_PASS);
    }

    var token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || "py-estimation#$#",
      { expiresIn: "1d" }
    );
    user.token = token;
    delete user["password"];
    return { user };
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.getAllUserByName = async ({ search }) => {
  try {
    let regex = new RegExp(search, "i");
    return await userModel.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
      ],
    });
  } catch (err) {
    console.log("something went wrong: service > user service ", err);
    throw new Error(err);
  }
};

module.exports.getEstimationRolePermission = async (roleId) => {
  return roleModel.aggregate([
    {
      $match: {
        _id: roleId,
      },
    },
    {
      $lookup: {
        from: "permissions",
        localField: "_id",
        foreignField: "typeId",
        as: "tokenPermission",
      },
    },
    {
      $lookup: {
        from: "moduletokens",
        localField: "tokenPermission.tokenID",
        foreignField: "_id",
        as: "RolePermission",
      },
    },
    {
      $project: {
        tokenPermission: 0,
      },
    },
  ]);
};

module.exports.testUser = async (emailID, pass) => {
  try {
    const users = await userModel.find({ email: emailID });

    let user = users[0];
    if (!user) {
      throw new Error(constant.userMessage.USER_NOT_FOUND);
    }
    var token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || "py-estimation#$#",
      { expiresIn: "1d" }
    );
    return { token };
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.validateshareestlink = async (req) => {
  try {

    const decodedEstId = Buffer.from(req.params.estheaderId, 'base64').toString();
    try {
      if (!mongoose.Types.ObjectId(decodedEstId)) {
        throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND);
      }
    } catch (err) {
      console.log("Estimation Header ID is Not Correct ", err);
      throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND);
    }

    const decodedToken = Buffer.from(req.query.token, 'base64').toString();

    //1. Validate Token
    var tokenData = jwt.verify(
      decodedToken,
      process.env.SECRET_KEY || "py-estimation#$#"
    );

    //2. Validate Estimation
    let sharedEst;
    const estimationDetails = await EstimationHeader.findById(decodedEstId).then(
      async (res, err) => {
        if (res) {
          sharedEst = await ShareDataModel.findOne({
            typeId: res._id,
            shareUserId: tokenData.id,
          });
          if (sharedEst) {
            return res;
          } else {
            throw new Error(constant.PermssionMessage.PERMISSION_NOT_FOUND);
          }
        } else {
          throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND);
        }
      }
    );

    //3. Validate User
    const users = await this.getUsersData(tokenData.id);
    let user = users[0];
    if (!user) {
      throw new Error(constant.userMessage.USER_NOT_FOUND);
    }

    user.token = decodedToken;
    user.estimationDetails = estimationDetails;

    //Find Project Details
    const projectDetails = await Project.findById(estimationDetails.projectId);
    if (!projectDetails) {
      throw new Error(constant.projectMessage.PROJECT_NOT_FOUND);
    }
    user.projectDetails = projectDetails;

    //Find Client Details
    const clientDetails = await Client.findById(projectDetails.client);
    if (!clientDetails) {
      throw new Error(constant.clientMessage.CLIENT_NOT_FOUND);
    }
    user.clientDetails = clientDetails;

    delete user["password"];
    return { user };
  } catch (err) {
    console.log("something went wrong: service > validateshareestlink ", err);
    throw new Error(err);
  }
};

module.exports.getUsersData = async (userid) => {
  const users = await userModel.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(userid),
      },
    },
    {
      $lookup: {
        from: "rolemasters",
        localField: "roleId",
        foreignField: "_id",
        as: "roles",
      },
    },
    {
      $unwind: {
        path: "$roles",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "permissions",
        localField: "roles._id",
        foreignField: "typeId",
        as: "tokenPermission",
      },
    },
    {
      $lookup: {
        from: "moduletokens",
        localField: "tokenPermission.tokenID",
        foreignField: "_id",
        as: "RolePermission",
      },
    },
    {
      $project: {
        tokenPermission: 0,
      },
    },
    {
      $addFields: {
        clientDetails: new Client(),
        projectDetails: new Project(),
        estimationDetails: new EstimationHeader(),
        token: "",
      },
    },
  ]);

  return users;
};

module.exports.getToken = async (userId) => {
  var token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY || "py-estimation#$#",
    { expiresIn: "1d" }
  );
  return token;
};

module.exports.updateuserrole = async (req) => {
  try {

    const user = await userModel.findByIdAndUpdate(req.params.id, {
      roleId: req.query.roleId
    }, { new: true });

    return { user };
  } catch (err) {
    console.log("something went wrong: service > updateuserrole ", err);
    throw new Error(err);
  }
};

module.exports.fetchalluserswithrole = async () => {
  try {
    return await userModel.find().populate("roleId");
  } catch (err) {
    console.log("something went wrong: service > user service > fetchalluserswithrole  ", err);
    throw new Error(err);
  }
};