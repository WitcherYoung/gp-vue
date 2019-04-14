import axios from 'axios';
import { baseURL, getBase, postBase } from './config'

const errorMsg = '您的网络状况不佳，请稍后再试'
const errorFunction = errer => {
	console.log(errer);
	return false
}
const resultFunction = result => {
    let data = result.data;
    let status = data.returnCode;
    if (status == 505) {
        console.log(status);
        return false
    }
    if (status == 400) {
        console.log(status);
        return false
    }
    if (status == 500) {
        console.log(status);
        return false
    }
    if (status == 506) {
        console.log(status);
    }
    return data
}

const get = (url, param) => {
    return new Promise((resolve, reject) => {
        // param为参数对象
        axios.get(url, {
            params: param,
        }, getBase).then(res => {
            if (res.data.ret_code == 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch(function (err) {
            console.log(err)
        })
    })
}

const post = (url, param) => {
    return new Promise((resolve, reject) => {
        // param为参数对象
        axios.post(url, {
            data: param,
        }, postBase).then(res => {
            if (res.data.ret_code == 200) {
                resolve(res.data)
            } else {
                reject(res.data)
            }
        }).catch(function (err) {
            console.log(err)
        })
    })
}

const getTest = () => get(baseURL + '/getTest');
const postTest = () => get(baseURL + '/postTest');
const getNews = (param) => get(baseURL + '/loadNews', param);

const postRegister = (param) => post(baseURL + '/register', param);

export default {
    getTest,
    postTest,
    getNews,
    postRegister
}