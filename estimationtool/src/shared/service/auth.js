const Auth = {
     login:(data)=>{
        localStorage.setItem('auth', JSON.stringify(data));
    },
    logout:()=>{
        localStorage.removeItem("auth")
    }
}

export default Auth;