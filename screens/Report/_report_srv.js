import { ajax } from "../../utils/ajax"

export const getAllStates=()=>{
    return ajax('tokenJson','/Location/States','GET',false)
}
export const getAllTechnology=()=>{
    return ajax('tokenJson','/Technology/GetAll','GET',false)
}
export const getAllParameter=()=>{
    return ajax('tokenJson','/Parameter/GetAll','GET',false)
}
export const getReportByState = (data) =>{
    return ajax('tokenJson','/Report/StateDaily','POST',true,data)
}

export const getAllOperator=()=>{
    return ajax('tokenJson','/Provider/GetAll?OrderBy=-1',false)
}
