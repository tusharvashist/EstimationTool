import axios from "axios";


const login = (user)=>{
    let info = { 'one': 1, 'two': 2, 'three': 3 };
    localStorage.setItem('auth', JSON.stringify(info));

}

const logout = (user)=>{
    // let getauth = localStorage.getItem('testObject');
    // console.log('retrieved Object: ', JSON.parse(getauth));
    localStorage.removeItem("auth")
}


export default Auth = {  login, logout }