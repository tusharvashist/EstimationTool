const Url = {
   login: process.env.REACT_APP_URL+'user/login',
   user: `${process.env.REACT_APP_URL}user`,
   allestimation: `${process.env.REACT_APP_URL}estimation`,
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
   createAttribute :   `${process.env.REACT_APP_URL}estimationattribute`,
   getCalculativeAttribute : `${process.env.REACT_APP_URL}estimationCalcAttr`,
   allEffortAttribute: `${process.env.REACT_APP_URL}estimation/atrribute`,
   allCalculativeAttribute: `${process.env.REACT_APP_URL}estimation/atrributeCalc`

}
export default Url;