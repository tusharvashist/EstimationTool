module.exports = {
    defaultResponce: {
        status: 400,
        message: "",
        body: {}
    },
    userMessage: {
        SIGNUP_SUCCESS: "Signup successfully",
        DUPLICATE_EMAIL: "User alrady exsist with given email",
        LOGIN_SUCCESS: "Login successfully",
        USER_NOT_FOUND: "User not found",
        INVALID_PASS: "Invalid password"
    },
    estimationMessage: {
        ESTIMATION_CREATED: "Estimation created successfully",
        ESTIMATION_ERROR: "Estimation create fail",
        ESTIMATION_FETCH: "All estimation fetch successfully",
        ESTIMATION_GET_ERROR: "All estimation featch error",
        ESTIMATION_NOT_FOUND: "Estimation not found",
        INVALID_ID: "Invalid id",
        ESTIMATION_UPDATE: "Estimation update successfully",
        ESTIMATION_DELETE: "Estimation delete successfully",
    },
    clientMessage: {
        CLIENT_CREATED: "Client created successfully",
        CLIENT_ERROR: "Client create fail",
        CLIENT_FETCH: "All clients fetch successfully",
        CLIENT_GET_ERROR: "All client featch error",
        CLIENT_NOT_FOUND: "Client not found",
        INVALID_ID: "Invalid id",
        CLIENT_UPDATE: "Client update successfully",
        CLIENT_DELETE: "Client delete successfully",
    },
    projectMessage: {
        PROJECT_CREATED: "Project created successfully",
        PROJECT_ERROR: "Project create fail",
        PROJECT_FETCH: "All Projects fetch successfully",
        PROJECT_GET_ERROR: "All Project featch error",
        PROJECT_NOT_FOUND: "Project not found",
        INVALID_ID: "Invalid id",
        PROJECT_UPDATE: "Project update successfully",
        PROJECT_DELETE: "Project delete successfully",
    },

    estimationTemplateMessage: {
        ESTIMATIONTEMPLATE_CREATED: "Estimation Template created successfully",
        ESTIMATIONTEMPLATE_ERROR: "Estimation Template create fail",
        ESTIMATIONTEMPLATE_FETCH: "All Estimation Template fetch successfully",
        ESTIMATIONTEMPLATE_GET_ERROR: "All Estimation Template featch error",
        ESTIMATIONTEMPLATE_NOT_FOUND: "Estimation Template not found",
        INVALID_ID: "Invalid id",

    },

    requestValidationMessage: {
        BAD_REQUEST: "Invalid filds",
        TOKEN_MISSING: "Token missing from header",
        AUTHORIZATION_MISSING: "Authorization missing from header",
    },
    roleMessage: {
        ROLE_CREATED: "Role created successfully",
        ROLE_ERROR: "Role create fail",
        ROLE_FETCH: "All Roles fetch successfully",
        ROLE_GET_ERROR: "All Role featch error",
        ROLE_NOT_FOUND: "Role not found",
        INVALID_ID: "Invalid id",
        ROLE_UPDATE: "Role update successfully",
        ROLE_DELETE: "Role delete successfully",
    },

    pageMessage: {
        PAGE_CREATED: "Page Master created successfully",
        PAGE_ERROR: "Page Master create fail",
        PAGE_FETCH: "All Page Masters fetch successfully",
        PAGE_GET_ERROR: "All Page fetch error",
        PAGE_NOT_FOUND: "Page Master not found",
        INVALID_ID: "Invalid id",
        PAGE_UPDATE: "Page Master update successfully",
        PAGE_DELETE: "Page Master delete successfully",
    },
}