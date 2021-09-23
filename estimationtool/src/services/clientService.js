import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    
});

export function getAllClients() {
    let clients = [];
    api.get('/client/').then(res => {
        console.log(res.data)
        return res.data;
      //  this.setState({clients: res.data});
    })
    return clients;
}