const constant = require("../constant");
const userModel = require("../database/models/userModel");
const { formatMongoData } = require("../helper/dbhelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    pass = await bcrypt.hash(password, 12);
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

// module.exports.login = async({email,pass})=>{
//   try{
//    const user = await userModel.findOne({email});
//    if(!user){
//        throw new Error(constant.userMessage.USER_NOT_FOUND);
//    }
//    const isValid = await bcrypt.compare(pass, user.pass);
//    if(!isValid){
//       throw new Error(constant.userMessage.INVALID_PASS);
//    }
//    var token = jwt.sign({ id: user._id },process.env.SECRET_KEY || "py-estimation#$#", {expiresIn:"1d"});
//    return {token};
//   }catch(err){
//     console.log("something went wrong: service > createEstimation ", err);
//     throw new Error(err)
//   }
// }

module.exports.login1 = async (req) => {
  try {
    const headresEmailAndPass = req.headers.authorization
      .split("Basic ")[1]
      .replace('"', "");
    const emailNpass = Buffer.from(headresEmailAndPass, "base64")
      .toString()
      .split(":");
    const email = emailNpass[0].trim();
    const pass = emailNpass[1].trim();
    const user = await userModel.findOne({ email });
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
    return { token };
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
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
    const users = await userModel.aggregate()
      .match({ email: email })
      .lookup({
        from: "rolemasters",
        localField: "roleId",
        foreignField: "_id",
        as: "roles",
      })
      .unwind("roles")
      .lookup({
        from: "permissions",
        localField: "roles._id",
        foreignField: "typeId",
        as: "tokenPermission",
      })
      .unwind("tokenPermission")
      .lookup({
        from: "moduletokens",
        localField: "moduletokens._id",
        foreignField: "tokenPermission.tokenID",
        as: "RolePermission"
      })
      .addFields({ token: "" });


    // const users = await userModel
    //   .aggregate([
    //     {
    //       $match: { email: email },
    //     },
    //     {
    //       $lookup: {
    //         from: "rolemasters",
    //         localField: "roleId",
    //         foreignField: "_id",
    //         as: "roles",
    //       },
    //     },
    //     { $unwind: "$roles" },
    //     {
    //       $lookup: {
    //         from: "permissions",
    //         localField: "roleId._id",
    //         foreignField: "roleId",
    //         as: "tokenPermission",
    //       },
    //     },
    //     { $unwind: "$tokenPermission" },
    //     {
    //       $lookup: {
    //         from: "moduletokens",
    //         localField: "moduletokens._id",
    //         foreignField: "tokenPermission.tokenID",
    //         as: "RolePermission",
    //       },
    //     },
    //     //{$unwind : "$tokenPermission"}
    //   ])
    //   .addFields({ token: "" });
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
