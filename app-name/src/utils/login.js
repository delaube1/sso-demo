import axios from 'axios';
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://localhost:8080";
// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的base_url
    timeout: 6000, // 请求超时时间
    withCredentials: true
})

export default service