import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import AppAlert from './index'
import { navigationRef } from '../App';
import RNFetchBlob from 'rn-fetch-blob'
// const base = 'http://localhost:5000/Home';
const base = 'http://shabakehafzar.net:5080/api';

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data.
    // console.log(navigationRef)
    return response

}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response !== undefined)
        if (error.response.status === 401) {
            navigationRef.current.reset()
            AppAlert('err', 'مدت زمان استفاده شما از نرم افزار به پایان رسیده است. لطفا مجددا وارد شوید')
        }


    return Promise.reject(error);
});



export function ajax(sys, url, Method, isbody, body) {
    let localUrl = base + url;

    switch (sys) {
        case 'tokenFormData':
            return AsyncStorage.getItem('userToken').then((token) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                return axios({
                    method: Method,
                    url: localUrl,
                    data: isbody ? body : null,
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token }
                });
            })


        case 'tokenJson':
            return (
                AsyncStorage.getItem('userToken').then((token) => {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    return axios({
                        url: localUrl,
                        method: Method,
                        data: isbody ? JSON.stringify(body) : null,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                })

            );

        case 'TokenUrl':
            return (
                AsyncStorage.getItem('userToken').then((token) => {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    return axios({
                        url: localUrl + body,
                        method: Method,
                        data: isbody ? JSON.stringify(body) : null,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    })
                })
            )

        case 'Url':
            function checkbody(localUrl, body) {
                if (typeof (body) === 'undefined') {
                    return localUrl
                } else {
                    return localUrl + body
                }
            }
            return AsyncStorage.getItem('userToken').then((token) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                return axios({
                    url: checkbody(localUrl, body),
                    method: Method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
            })

        case 'FormData':
            return AsyncStorage.getItem('userToken').then((token) => {
                return axios({
                    method: Method,
                    url: localUrl,
                    data: isbody ? body : null,
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token }
                });
            })
       
        default:
            return (
                axios({
                    url: localUrl,
                    method: Method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: isbody ? JSON.stringify(body) : null
                })
            )

    }
}

