module.exports = {
    defaultResponce: {
        status: 400,
        message: "",
        body: {}
    },

    requirmentResponce: {
        basicDetails: {},
        featureList: [],
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
        INVALID_ID: "Invalid Estimation id",
        ESTIMATION_UPDATE: "Estimation update successfully",
        ESTIMATION_DELETE: "Estimation delete successfully",
    },
    estimationTemplateCalcAttrMessage: {
        ESTIMATIONTEMPLATECALCATTR_CREATED: "Estimation Template Calc Attr created successfully",
        ESTIMATIONTEMPLATECALCATTR_ERROR: "Estimation Template Calc Attr create fail",
        ESTIMATIONTEMPLATECALCATTR_FETCH: "All estimation Template Calc Attr fetch successfully",
        ESTIMATIONTEMPLATECALCATTR_GET_ERROR: "All estimation  Template Calc Attrfeatch error",
        ESTIMATIONTEMPLATECALCATTR_NOT_FOUND: "Estimation Template Calc Attr not found",
        INVALID_ID: "Invalid id",
        ESTIMATIONTEMPLATECALCATTR_UPDATE: "Estimation  Template Calc Attrupdate successfully",
        ESTIMATIONTEMPLATECALCATTR_DELETE: "Estimation Template Calc Attr delete successfully",
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
        DUPLICATE_CLIENT: "Client already exist with given name.",

    },
    estimationHeaderAtrributeMessage: {
        estimationHeaderAtrribute_CREATED: "estimationHeaderAtrribute created successfully",
        estimationHeaderAtrribute_ERROR: "estimationHeaderAtrribute create fail",
        estimationHeaderAtrribute_FETCH: "All estimationHeaderAtrribute fetch successfully",
        estimationHeaderAtrribute_GET_ERROR: "All estimationHeaderAtrribute featch error",
        estimationHeaderAtrribute_NOT_FOUND: "estimationHeaderAtrribute not found",
        INVALID_ID: "Invalid id",
        estimationHeaderAtrribute_UPDATE: "estimationHeaderAtrribute update successfully",
        estimationHeaderAtrribute_DELETE: "estimationHeaderAtrribute delete successfully",
        DUPLICATE_estimationHeaderAtrribute: "estimationHeaderAtrribute already exist with given name.",

    },
    estimationHeaderAtrributeCalcMessage: {
        estimationHeaderAtrributeCalc_CREATED: "estimationHeaderAtrributeCalc created successfully",
        estimationHeaderAtrributeCalc_ERROR: "estimationHeaderAtrributeCalc create fail",
        estimationHeaderAtrributeCalc_FETCH: "All estimationHeaderAtrributeCalc fetch successfully",
        estimationHeaderAtrributeCalc_GET_ERROR: "All estimationHeaderAtrributeCalc featch error",
        estimationHeaderAtrributeCalc_NOT_FOUND: "estimationHeaderAtrributeCalc not found",
        INVALID_ID: "Invalid id",
        estimationHeaderAtrributeCalc_UPDATE: "estimationHeaderAtrributeCalc update successfully",
        estimationHeaderAtrributeCalc_DELETE: "estimationHeaderAtrributeCalc delete successfully",
        DUPLICATE_estimationHeaderAtrributeCalc: "estimationHeaderAtrributeCalc already exist with given name.",

    },
    wizard2Message: {
        WIZARD2_CREATED: "Wizard 2 created successfully",
        WIZARD2_ERROR: "Wizard 2 create fail",
        WIZARD2_FETCH: "All Wizard 2 fetch successfully",
        WIZARD2_GET_ERROR: "All Wizard 2 featch error",
        WIZARD2_NOT_FOUND: "Wizard 2 not found",
        INVALID_ID: "Invalid id",
        WIZARD2_UPDATE: "Wizard 2 update successfully",
        WIZARD2_DELETE: "Wizard 2 delete successfully",
        DUPLICATE_Wizard2: "Wizard 2 already exist with given name.",

    },
    projectMessage: {
        PROJECT_CREATED: "Project created successfully",
        PROJECT_ERROR: "Project create fail",
        PROJECT_FETCH: "All Projects fetch successfully",
        PROJECT_GET_ERROR: "All Project fetch error",
        PROJECT_NOT_FOUND: "Project not found",
        INVALID_ID: "Invalid id",
        PROJECT_UPDATE: "Project update successfully",
        PROJECT_DELETE: "Project delete successfully",
        DUPLICATE_PROJECT: "Project already exist with given name.",
    },
    
    requirmentMessage: {
        REQUIREMENT_CREATED: "Requirement created successfully",
        REQUIREMENT_ERROR: "Requirement create fail",
        REQUIREMENT_FETCH: "All Requirement fetch successfully",
        REQUIREMENT_GET_ERROR: "All Requirement fetch error",
        REQUIREMENT_NOT_FOUND: "Requirement not found",
        INVALID_ID: "Invalid id",
        REQUIREMENT_UPDATE: "Requirement update successfully",
        REQUIREMENT_DELETE: "Requirement delete successfully",
        DUPLICATE_REQUIREMENT: "Requirement already exist with given name.",
        REQUIREMENT_ESTHEADER_REQUIRED: "estHeader paramater requied. ",
    },

    estimationTemplateMessage: {
        ESTIMATIONTEMPLATE_CREATED: "Estimation Template created successfully",
        ESTIMATIONTEMPLATE_ERROR: "Estimation Template create fail",
        ESTIMATIONTEMPLATE_FETCH: "All Estimation Template fetch successfully",
        ESTIMATIONTEMPLATE_GET_ERROR: "All Estimation Template featch error",
        ESTIMATIONTEMPLATE_NOT_FOUND: "Estimation Template not found",
        INVALID_ID: "Invalid id",

    },
    estimationCalcAttrMessage: {
        ESTIMATIONCALCATTR_CREATED: "Estimation Calculate Attribute created successfully",
        ESTIMATIONCALCATTR_ERROR: "Estimation Calculate Attribute create fail",
        ESTIMATIONCALCATTR_FETCH: "All Estimation Calculate Attribute fetch successfully",
        ESTIMATIONCALCATTR_GET_ERROR: "All Estimation Calculate Attribute featch error",
        ESTIMATIONCALCATTR_NOT_FOUND: "Estimation Calculate Attribute not found",
        INVALID_ID: "Invalid id",
        ESTIMATIONCALCATTR_UPDATE: "Estimation Calculate Attribute update successfully",
        ESTIMATIONCALCATTR_DELETE: "Estimation Calculate Attribute delete successfully",

    },

    requestValidationMessage: {
        BAD_REQUEST: "Invalid fields",
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

    moduleMessage: {
        MODULE_CREATED: "Module Master created successfully",
        MODULE_DUPLICATE: "Module Master already exists",
        MODULE_ERROR: "Module Master create fail",
        MODULE_FETCH: "All Module Masters fetch successfully",
        MODULE_GET_ERROR: "All Module fetch error",
        MODULE_NOT_FOUND: "Module Master not found",
        INVALID_ID: "Invalid id",
        MODULE_UPDATE: "Module Master update successfully",
        MODULE_DELETE: "Module Master delete successfully",
    },

    EstimationAttributeMessage: {
        ATTRIBUTE_CREATED: "Estimation Attribute created successfully",
        ATTRIBUTE_ERROR: "Estimation Attribute create fail",
        ATTRIBUTE_FETCH: "All Estimation Attribute s fetch successfully",
        ATTRIBUTE_GET_ERROR: "All Estimation Attribute error",
        ATTRIBUTE_NOT_FOUND: "Estimation Attribute not found",
        INVALID_ID: "Invalid id",
        ATTRIBUTE_UPDATE: "Estimation Attribute update successfully",
        ATTRIBUTE_DELETE: "Estimation Attribute delete successfully",
        ATTRIBUTE_DUPLICATE: "Estimation Attribute already exist with given name."
    },

    TokenMessage: {
        MODULETOKEN_CREATED: "Module Token created successfully",
        MODULETOKEN_ERROR: "Module Token create fail",
        MODULETOKEN_FETCH: "All Module Tokens fetch successfully",
        MODULETOKEN_GET_ERROR: "All Module Tokenerror",
        MODULETOKEN_NOT_FOUND: "Module Token not found",
        INVALID_ID: "Invalid id",
        MODULETOKEN_UPDATE: "Module Token update successfully",
        MODULETOKEN_DELETE: "Module Token delete successfully",
    },

    PermssionMessage: {
        PERMISSION_CREATED: "User Permission created successfully",
        PERMISSION_ERROR: "User Permission create fail",
        PERMISSION_FETCH: "All User Permissions fetch successfully",
        PERMISSION_GET_ERROR: "All User Permission error",
        PERMISSION_NOT_FOUND: "User Permission not found",
        INVALID_ID: "Invalid id",
        PERMISSION_UPDATE: "User Permission update successfully",
        PERMISSION_DELETE: "User Permission delete successfully",
    },
}