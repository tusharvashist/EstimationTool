const Url = {
  login: process.env.REACT_APP_URL + "user/login",
  user: `${process.env.REACT_APP_URL}user`,
  allestimation: `${process.env.REACT_APP_URL}estimation`,
  estimationDetail: `${process.env.REACT_APP_URL}estimationDetail`,
  uploadExcel: `${process.env.REACT_APP_URL}uploadExcel`,
  masterEstimationTypes: `${process.env.REACT_APP_URL}estimationTemplate`,

  createClient: `${process.env.REACT_APP_URL}client`,
  allClient: `${process.env.REACT_APP_URL}client`,
  getClientById: `${process.env.REACT_APP_URL}client`,
  updateClient: `${process.env.REACT_APP_URL}client`,
  deleteClient: `${process.env.REACT_APP_URL}client`,

  createProject: `${process.env.REACT_APP_URL}project`,
  allProject: `${process.env.REACT_APP_URL}project`,
  getProjectById: `${process.env.REACT_APP_URL}project`,
  updateProject: `${process.env.REACT_APP_URL}project`,
  deleteProject: `${process.env.REACT_APP_URL}project`,
  createAttribute: `${process.env.REACT_APP_URL}estimationattribute`,
  getCalculativeAttribute: `${process.env.REACT_APP_URL}estimationTemplateCalcAttr`,
  saveCalcAttribute: `${process.env.REACT_APP_URL}estimationCalcAttr`,
  allEffortAttribute: `${process.env.REACT_APP_URL}estimation/atrribute`,
  allCalculativeAttribute: `${process.env.REACT_APP_URL}estimation/atrributeCalc`,
  getRequirementTag: `${process.env.REACT_APP_URL}requirementTag`,
  getAllTechnologiesSkill: `${process.env.REACT_APP_URL}techskill/`,
  getResourceCountAll: `${process.env.REACT_APP_URL}resource/all`,
  getResourceCount: `${process.env.REACT_APP_URL}resource/`,
  updateTechnology: `${process.env.REACT_APP_URL}resource/updatetechnology`,
  updateResourceRole: `${process.env.REACT_APP_URL}resource/updateresourcerole`,
  getResourceRoleMaster: `${process.env.REACT_APP_URL}resourceRoleMaster`,
  getResourceMixData: `${process.env.REACT_APP_URL}resource/mix`,
  getTimelinePlanningData: `${process.env.REACT_APP_URL}resource/timelineplanning`,
  getAllExportData: `${process.env.REACT_APP_URL}export`,
  getReport: `${process.env.REACT_APP_URL}report`,
  releaseEstimation: `${process.env.REACT_APP_URL}estimation/releaseEstimation`
};
export default Url;
