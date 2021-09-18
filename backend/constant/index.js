module.exports = {
    defaultResponce:{
        status:400,
        message:"",
        body:{}
    },
    userMessage:{
        SIGNUP_SUCCESS:"Signup successfully",
        DUPLICATE_EMAIL:"User alrady exsist with given email",
        LOGIN_SUCCESS:"Login successfully",
        USER_NOT_FOUND:"User not found",
        INVALID_PASS:"Invalid password"
    },
    estimationMessage:{
        ESTIMATION_CREATED:"Estimation created successfully",
        ESTIMATION_ERROR:"Estimation create fail",
        ESTIMATION_FETCH:"All estimation fetch successfully",
        ESTIMATION_GET_ERROR:"All estimation featch error",
        ESTIMATION_NOT_FOUND:"Estimation not found",
        INVALID_ID:"Invalid id",
        ESTIMATION_UPDATE:"Estimation update successfully",
        ESTIMATION_DELETE:"Estimation delete successfully",
    },
    requestValidationMessage:{
        BAD_REQUEST:"Invalid filds",
        TOKEN_MISSING:"Token missing from header",
        AUTHORIZATION_MISSING:"Authorization missing from header",
    }
}