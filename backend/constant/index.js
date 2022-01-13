module.exports = {
  defaultResponce: {
    status: 400,
    message: "",
    body: {},
  },

  requirementExcelHeader: {
    Requirement: "Requirement",
    Description: "Description",
    Tag: "Tag",
    Type: "Type",
    Query: "Query",
    Assumption: "Assumption",
    Reply: "Reply",
  },

  requirementResponse: {
    basicDetails: {},
    featureList: [],
    requirementTag: [],
    requirementType: [],
    requirementList: [],
    summaryCallHeader: [],
    summaryCalData: [],
    estHeaderAttribute: [],
    tagSummaryHeader: [],
    tagSummaryData: [],
    estHeaderCalculatedAttribute: [],
    isReqValid: { err: [], isValid: true },
  },

  requirementListResponse: {
    showDeleteAllRequirement: false,
    noOfEstimation: 0,
    featureList: [],
    requirementSummary: [],
    requirementSaveResult: {},
    requirementMapResult: {},
  },

  estimationAttribute: {
    _id: "",
    attributeCode: "",
    description: "",
  },

  resourceMixPlanningResponse: {
    resourceMixData: [],
    total: {},
    margin: "",
    marginPercent: "",
  },

  userMessage: {
    SIGNUP_SUCCESS: "Signup successfully",
    DUPLICATE_EMAIL: "User alrady exsist with given email",
    LOGIN_SUCCESS: "Login successfully",
    USER_NOT_FOUND: "User not found",
    INVALID_PASS: "Invalid password",
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
    ESTIMATION_NAME_UNIQUE: "Estimation name should be unique",
  },
  requirementTagMessage: {
    REQUIREMENTTAG_FETCH: "All requirement tag fetch successfully",
  },

  requirementMessage: {
    REQUIREMENT_CREATED: "Requirement created successfully",
    REQUIREMENT_ERROR: "Requirement create fail",
    REQUIREMENT_FETCH: "All requirement fetch successfully",
    REQUIREMENT_GET_ERROR: "All requirement featch error",
    REQUIREMENT_NOT_FOUND: "Requirement not found",
    INVALID_ID: "Invalid id",
    INVALID_EST_ID: "Invalid Estimation id",
    REQUIREMENT_UPDATE: "Requirement update successfully",
    REQUIREMENT_DATA_UPDATE: "Requirement data update successfully",
    REQUIREMENT_DELETE: "Requirement delete successfully",
    DUPLICATE_REQUIREMENT: "Requirement already exist with given name.",
    DELETE_ALL_REQUIREMENT_ERROR:
      "ALL requirement can't be deleted because estimation in this project already exist.",
  },

  excelUploadMessage: {
    REQUIREMENT_RECEIVED: "Excel file received.",
    REQUIREMENT_FILE_NOT_RECEIVED: "Excel file not received.",
    REQUIREMENT_NOTFOUND_REQUIREMENT: "Requirement not found.",
    REQUIREMENT_NOTFOUND_Description: "Description not found.",
    REQUIREMENT_ALREADY_AVAILABLE: "Requirement already available in database.",
    REQUIREMENT_DUPLICATE: "Duplicate requirement found same as: ",
    REQUIREMENT_INVALID_TAGS: "Invalid requirement tags.",
    REQUIREMENT_INVALID_TYPE: "Invalid requirement type.",
  },

  estimationTemplateCalcAttrMessage: {
    ESTIMATIONTEMPLATECALCATTR_CREATED:
      "Estimation Template Calc Attr created successfully",
    ESTIMATIONTEMPLATECALCATTR_ERROR:
      "Estimation Template Calc Attr create fail",
    ESTIMATIONTEMPLATECALCATTR_FETCH:
      "All estimation Template Calc Attr fetch successfully",
    ESTIMATIONTEMPLATECALCATTR_GET_ERROR:
      "All estimation  Template Calc Attrfeatch error",
    ESTIMATIONTEMPLATECALCATTR_NOT_FOUND:
      "Estimation Template Calc Attr not found",
    INVALID_ID: "Invalid id",
    ESTIMATIONTEMPLATECALCATTR_UPDATE:
      "Estimation  Template Calc Attrupdate successfully",
    ESTIMATIONTEMPLATECALCATTR_DELETE:
      "Estimation Template Calc Attr delete successfully",
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
    estimationHeaderAtrribute_CREATED:
      "estimationHeaderAtrribute created successfully",
    estimationHeaderAtrribute_ERROR: "estimationHeaderAtrribute create fail",
    estimationHeaderAtrribute_FETCH:
      "All estimationHeaderAtrribute fetch successfully",
    estimationHeaderAtrribute_GET_ERROR:
      "All estimationHeaderAtrribute featch error",
    estimationHeaderAtrribute_NOT_FOUND: "estimationHeaderAtrribute not found",
    INVALID_ID: "Invalid id",
    estimationHeaderAtrribute_UPDATE:
      "estimationHeaderAtrribute update successfully",
    estimationHeaderAtrribute_DELETE:
      "estimationHeaderAtrribute delete successfully",
    DUPLICATE_estimationHeaderAtrribute:
      "estimationHeaderAtrribute already exist with given name.",
  },
  estimationHeaderAtrributeCalcMessage: {
    estimationHeaderAtrributeCalc_CREATED:
      "estimationHeaderAtrributeCalc created successfully",
    estimationHeaderAtrributeCalc_ERROR:
      "estimationHeaderAtrributeCalc create fail",
    estimationHeaderAtrributeCalc_FETCH:
      "All estimationHeaderAtrributeCalc fetch successfully",
    estimationHeaderAtrributeCalc_GET_ERROR:
      "All estimationHeaderAtrributeCalc featch error",
    estimationHeaderAtrributeCalc_NOT_FOUND: "Record not found",
    INVALID_ID: "Invalid id",
    estimationHeaderAtrributeCalc_UPDATE:
      "estimationHeaderAtrribute Calc record updated successfully",
    estimationHeaderAtrributeCalc_DELETE:
      "estimationHeaderAtrributeCalc delete successfully",
    DUPLICATE_estimationHeaderAtrributeCalc:
      "estimationHeaderAtrributeCalc already exist with given name.",
    estimationHeaderAtrributeCalcCyclic_ERROR:
      "Calc Attribute formula having circular references,Please check formula tags.",
  },

  techSkillMasterMessage: {
    TECHSKILL_CREATED: "Tech Skill created successfully",
    TECHSKILL_ERROR: "Tech Skill create fail",
    TECHSKILL_FETCH: "All Tech Skill fetch successfully",
    TECHSKILL_GET_ERROR: "All Tech Skill fetch error",
    TECHSKILL_NOT_FOUND: "Tech Skill not found",
    INVALID_ID: "Invalid id",
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

  estimationTemplateMessage: {
    ESTIMATIONTEMPLATE_CREATED: "Estimation Template created successfully",
    ESTIMATIONTEMPLATE_ERROR: "Estimation Template create fail",
    ESTIMATIONTEMPLATE_FETCH: "All Estimation Template fetch successfully",
    ESTIMATIONTEMPLATE_GET_ERROR: "All Estimation Template featch error",
    ESTIMATIONTEMPLATE_NOT_FOUND: "Estimation Template not found",
    INVALID_ID: "Invalid id",
  },
  estimationCalcAttrMessage: {
    ESTIMATIONCALCATTR_CREATED:
      "Estimation Calculate Attribute created successfully",
    ESTIMATIONCALCATTR_ERROR: "Estimation Calculate Attribute create fail",
    ESTIMATIONCALCATTR_FETCH:
      "All Estimation Calculate Attribute fetch successfully",
    ESTIMATIONCALCATTR_GET_ERROR:
      "All Estimation Calculate Attribute featch error",
    ESTIMATIONCALCATTR_NOT_FOUND: "Estimation Calculate Attribute not found",
    INVALID_ID: "Invalid id",
    ESTIMATIONCALCATTR_UPDATE:
      "Estimation Calculate Attribute update successfully",
    ESTIMATIONCALCATTR_DELETE:
      "Estimation Calculate Attribute delete successfully",
    ESTIMATIONCALCATTR_DUPLICATE: "Estimation Calculate Attribute duplicacy",
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
    ATTRIBUTE_DUPLICATE: "Estimation Attribute Duplicacy",
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
    PERMISSION_DUPLICATE: "User Permission already exist.",
  },
  ResourceCountMessage: {
    ResourceCount_CREATED: "Resource count generated successfully",
    ResourceCount_ERROR: "Resource count create fail",
    ResourceCount_FETCH: "All Resource counts fetch successfully",
    ResourceCount_GET_ERROR: "All Resource count error",
    ResourceCount_NOT_FOUND: "Resource count not found",
    INVALID_ID: "Invalid id",
    ResourceCount_UPDATE: "Resource count update successfully",
    ResourceCount_DELETE: "Resource count delete successfully",
    ResourceCount_DUPLICATE: "Resource count already exist.",
    ResourceCountTech_UPDATE: "Resource count technology updated successfully",
    ResourceRoleCount_UPDATE: "Resource Role count update successfully",
  },
  resourceRoleMasterMessage: {
    RESOURCEROLEMASTER_CREATED: "Resource role master created successfully",
    RESOURCEROLEMASTER_ERROR: "Resource role master create fail",
    RESOURCEROLEMASTER_FETCH: "Resource role master fetch successfully",
    RESOURCEROLEMASTER_GET_ERROR: "Resource role master fetch error",
    RESOURCEROLEMASTER_NOT_FOUND: "Resource role master not found",
    INVALID_ID: "Invalid id",
    RESOURCEROLEMASTER_UPDATE: "Resource role master Attrupdate successfully",
    RESOURCEROLEMASTER_DELETE: "Resource role master delete successfully",
  },
  resourceMixMessage: {
    RESOURMIX_ERROR: "Resource mix master fetch fail",
    RESOURMIX_FETCH: "Resource mix detail fetch successfully",
    INVALID_ID: "Invalid id",
  },
  timelinePlanningMessage: {
    TIMELINEPLANNING_FETCH: "Resource timeline planning fetch successfully",
    INVALID_ID: "Invalid id",
  },
  excelSheetName: {
    ESTIMATION_DETAIL: "Estimation Detail",
    RESOURMIX_FETCH: "Resource mix detail fetch successfully",
    INVALID_ID: "Invalid id",
    ESTIMATION_SUMMARY: "Estimation Summary",
    RESOURCE_MIX: "Resource Mix",
  },
};
