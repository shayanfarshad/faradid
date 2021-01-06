import { ajax } from "../../utils/ajax"

export const getAllStates=()=>{
    return ajax('tokenJson','/Location/States','GET',false)
}
export const getAllTechnology=()=>{
    return ajax('tokenJson','/Technology/GetAll','GET',false)
}
export const getRankingByState = (date,tech,state,rank) =>{
    return ajax('tokenJson',`/Ranking/RankingWeeklyByState/${date}/${tech}/${state}/${rank}`,'GET',true)
}