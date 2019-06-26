import axios from 'axios'

const request = axios.create({
    baseURL:'http://ec2-18-218-40-213.us-east-2.compute.amazonaws.com:7001'
})

export default request