import React from 'react';
import axios from 'axios';

const LoginService = {

    login: async (user) => {
        let url = "https://jsonplaceholder.typicode.com/posts";
        const token = Buffer.from(`${user.email}: ${user.pass}`, "utf8").toString("base64");
        return axios.post(url, {}, {
            headers: {
                "authorization": `Basic ${token}`
            }
        });
    }

}
export default LoginService