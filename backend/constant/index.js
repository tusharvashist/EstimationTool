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
    clientMessage:{
        CLIENT_CREATED:"Client created successfully",
        CLIENT_ERROR:"Client create fail",
        CLIENT_FETCH:"All clients fetch successfully",
        CLIENT_GET_ERROR:"All client featch error",
        CLIENT_NOT_FOUND:"Client not found",
        INVALID_ID:"Invalid id",
        CLIENT_UPDATE:"Client update successfully",
        CLIENT_DELETE:"Client delete successfully",
    },
    projectMessage:{
        PROJECT_CREATED:"Project created successfully",
        PROJECT_ERROR:"Project create fail",
        PROJECT_FETCH:"All Projects fetch successfully",
        PROJECT_GET_ERROR:"All Project featch error",
        PROJECT_NOT_FOUND:"Project not found",
        INVALID_ID:"Invalid id",
        PROJECT_UPDATE:"Project update successfully",
        PROJECT_DELETE:"Project delete successfully",
    },
    requestValidationMessage:{
        BAD_REQUEST:"Invalid filds",
        TOKEN_MISSING:"Token missing from header",
        AUTHORIZATION_MISSING:"Authorization missing from header",
    }
}