const Url = {
   login: process.env.REACT_APP_URL+'user/login',
   user: `${process.env.REACT_APP_URL}user`,
   allestimation: `${process.env.REACT_APP_URL}allestimation`,
  
   createClient: `${process.env.REACT_APP_URL}client`,
   allClient: `${process.env.REACT_APP_URL}client`,
   updateClient: `${process.env.REACT_APP_URL}client`,
   deleteClient: `${process.env.REACT_APP_URL}client`,
  
   createProject: `${process.env.REACT_APP_URL}project`,
   allProject: `${process.env.REACT_APP_URL}project`,
   updateProject: `${process.env.REACT_APP_URL}project`,
   deleteProject: `${process.env.REACT_APP_URL}project`,
}
export default Url;