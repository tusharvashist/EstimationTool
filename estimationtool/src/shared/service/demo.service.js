import axios from "axios";
const DemoService = {
    getData:async(arg,result)=>{
        axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>{
            let obj = {
                message:"successful",
                data: res
            }
            result = await obj;
        }).catch((err)=>{
            let obj = {
                message:"error",
                data:err
            }
            result = await obj
        })
        return result
    }
}
export default  HomeService;