import axios from "axios";
import Url from "../shared/service/urls.service";
const LoginService = {
    login:async (user)=>{
        let url = Url.login;
        const token = Buffer.from(`${user.email}:${user.pass}`, 'utf8').toString('base64')
       return await axios.post(url,{},{
        headers:{
            'Authorization': `Basic ${token}` 
        }
       })
       
    }
}
export default LoginService;