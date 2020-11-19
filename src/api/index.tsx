import axios from 'axios';

const base_url = 'http://localhost:9999';

const client = axios.create({
    baseURL:base_url,
    headers:{
        'Content-Type':'application/json'
    }
});

export function fetchCharts()
{
    console.log("api - fetching charts");
    return client.get('/charts');
}

export function createChart( chart : any):Promise<any>
{
    debugger;
    return client.put('/charts', chart);
}