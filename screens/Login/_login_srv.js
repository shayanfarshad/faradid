import {ajax} from '../../utils/ajax';

export const getCaptcha = () =>{
    return ajax(null, '/Captcha', 'GET', false)
}

export const authorize = () =>{
    return ajax('tokenJson', `/Auth/GetMyAccessList` ,'GET',false )
}

export const login = (data) =>{
    return ajax(null, `/Auth/Login` ,'POST' ,true, data)
}