import { ajax } from '../../utils/ajax';

export const getThinClients = () => {
    return ajax('tokenJson', '/Host/ThinClients/Status', 'GET', false)
}
export const getRaspberryTci = () => {
    return ajax('tokenJson', '/Host/RaspberryTCIs/Status', 'GET', false)
}
export const getRaspberryTic = () => {
    return ajax('tokenJson', '/Host/RaspberryTICs/Status', 'GET', false)
}
export const getModems = () => {
    return ajax('tokenJson', '/Modem/Status?providerCode=-1&StateId=-1', 'GET', true)
}
export const saveDeviceInfo = (data) => {
    return ajax(null, '/api/Main/SaveDataDevices', 'POST', true, data)
}
export const getModemGrid = () => {
    return ajax('tokenJson', '/Modem/GetAll?providerCode=-1&StateId=-1', 'GET', true)
}
export const getThinClientGrid = () => {
    return ajax('tokenJson', '/Host/ThinClients', 'GET', true)
}
export const getTciGrid = () => {
    return ajax('tokenJson', '/Host/RaspberryTCIs', 'GET', true)
}
export const getTicGrid = () => {
    return ajax('tokenJson', '/Host/RaspberryTICs', 'GET', true)
}

export const getServiceActivity = (start, end) => {
    return ajax('tokenJson', `/ReportManagement/ReportManagementModemStatusSummery?Startdate=${start}&Enddate=${end}&StateId=-1&RequlatoryId=-1&CityId=-1&TechId=-1&ProviderId=-1`, 'GET', true)
}

export const getProblem = (start, end) => {
    return ajax('tokenJson', `/ReportManagement/LatestProblemSummery?Startdate=${start}&Enddate=${end}&StateId=-1&RequlatoryId=-1&CityId=-1&TechId=-1&ProviderId=-1`, 'GET', true)
}

export const getTicketIssue = () => {
    return ajax('tokenJson', `/ReportManagement/GetJiraIssueInfo`, 'GET', false)

}
export const changeAvatar = (data) => {
    return ajax('tokenFormData', `/UserManager/ChangeAvatar`, 'POST', true, data)
}


export const getAllDeactiveService = (data) =>{
    return ajax('tokenJson','/ReportManagement/ReportManagementModemStatusIsInActive','POST',true,data)
}