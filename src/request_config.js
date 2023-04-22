import axios from 'axios';


const req = () => {
    let new_req;
    if (axios.request == 'GET' || 'DELETE') {
        new_req = axios.create({ baseURL: 'http://localhost:8010' });
    } else if (axios.request == 'POST' || 'PUT' || 'PATCH') {
        new_req = axios.create({ baseURL: 'http://localhost:8010', headers: { 'Content-Type': 'application/json' } })
    }
    return new_req;
}

export default req();