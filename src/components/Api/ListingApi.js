import axios from 'axios';

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};


function dashboardPropertyList(params) {
    return axios.get(`${process.env.API_IMAGE_URL}property`,{params});
}
function dashboardPropertyDetail(id) {
    return axios.get(`${process.env.API_IMAGE_URL}property/`+id);
}
function claimPropertyList(params) {
    return axios.get(`${process.env.API_IMAGE_URL}v1/claim`,{params});
}
export function unclaimPropertyList(id){
    return axios.put(`${process.env.API_IMAGE_URL}v1/Claim/${id}`)
}
function findAgentList(params) {
    return axios.get(`${process.env.API_IMAGE_URL}v1/agent`,{params});
}
function findAgentFeatureList(params) {
    return axios.get(`${process.env.API_IMAGE_URL}v1/featured-agent`,{params});
}
export function imageLikeList(id){
    return axios.get(`${process.env.API_IMAGE_URL}v1/favorite-property/${id}`);
}
export function imageLike(id,params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/favorite-property/${id}?property_id=${params}`);
}
export  function intrestedPropertyDetail(id){
    return axios.get(`${process.env.API_IMAGE_URL}v1/favorite-property/${id}?populate=property_id`);
}
export function sellerProspectList(params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/seller-prospect`,{params});
}
export function sendRequestToAgent(data){
    return axios.post(`${process.env.API_IMAGE_URL}v1/agent`,data);
}
export function buyerProspectList(params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/buyer-prospect`,{params});
}
export function profileView(id){
    return axios.get(`${process.env.API_IMAGE_URL}v1/user/${id}`);
}
export function agentAccept(id){
    return axios.put(`${process.env.API_IMAGE_URL}v1/prospect/${id}`,{ "status": "accept"});
}
export function agentDecline(id){
    return axios.put(`${process.env.API_IMAGE_URL}v1/prospect/${id}`,{ "status": "decline"});
}
export function buyerList(params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/buyer-prospect`,{params});
}
export function sellerList(params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/seller-prospect`,{params});
}
export function similarProperty(id){
    return axios.get(`${process.env.API_IMAGE_URL}similar-property/${id}`);
}
export function termsCondition(params){
    return axios.get(`${process.env.API_IMAGE_URL}page/${params}`);
}
export function privacyPolicy(params){
    return axios.get(`${process.env.API_IMAGE_URL}page/${params}`);
}
export function profileUpdate(uid){
    return axios.get(`${process.env.API_IMAGE_URL}v1/fire-user/${uid}`);
}
export function propertyActivity(id,params){
    return axios.get(`${process.env.API_IMAGE_URL}property-activity/${id}`,{params});
}
export function stateList(params){
    return axios.get(`${process.env.API_IMAGE_URL}v2/state`,params);
}
export function claimAgentList(id){
    return axios.get(`${process.env.API_IMAGE_URL}v1/my-agent/${id}`);
}
export function getAllAgents(params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/agent`,{params});
}
export function favoritePicture(user_id,params){
    // console.log("--getData--", user_id,params);
    return axios.get(`${process.env.API_IMAGE_URL}v1/property-img-fav/${user_id}`,{params});
}
export function sendPushNotification(params){
    return axios.post(`${process.env.API_IMAGE_URL}push-notification`,params)
}
export function inboundList(id,params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/agent-inbound/${id}`,params)
}
export function outboundList(id,params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/agent-outbound/${id}`,params)
}
export function upDateReferralFee(id,params){
    return axios.put(`${process.env.API_IMAGE_URL}v1/referral-update/${id}`,params)
}
export function uploadFile(params){
    console.log(params)
    return axios.post(`${process.env.API_IMAGE_URL}uploadFile?folder=user_image/`,params)
}
export function fileUpload(params){
    return axios.post(`${process.env.API_IMAGE_URL}uploadFile?folder=others/`,params)
}
export function rocommendedProperty(id,params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/recommended/${id}`,params)
}
export function appointmentDetail(id,params){
    //   console.log("--gettour--", id,params);
    return axios.get(`${process.env.API_IMAGE_URL}v1/appointment/${id}`,params)
}

export function createSchedule(params){
    return axios.post(`${process.env.API_IMAGE_URL}v1/staff`,params)
}
export function getScheduler(id){
    return axios.get(`${process.env.API_IMAGE_URL}v1/staff/${id}`)
}
export function updateScheduler(id,params){
    return axios.put(`${process.env.API_IMAGE_URL}v1/staff/${id}`,params)
}
export function getAvailableTime(params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/availableTimes`,{params})
}
export function notificationList(id,params){
    //   console.log("--gettour--", id,params);
    return axios.get(`${process.env.API_IMAGE_URL}push-notification/${id}`,params)
}
export function notificationDelete(id,params){
    return axios.delete(`${process.env.API_IMAGE_URL}push-notification/${id}`,params)
}
export function listedProperty(id,params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/listedproperties/${id}`,{params})
}
export function scheduleAppointment(params){
    return axios.post(`${process.env.API_IMAGE_URL}v1/appointment`,params)
}
export function tourList(params){
    return axios.get(`${process.env.API_IMAGE_URL}v1/Tours`,{params})
}

export function updateProfile(id,params){
    return axios.put(`${process.env.API_IMAGE_URL}v1/user/${id}`,params);
}
export {
    dashboardPropertyList,
    dashboardPropertyDetail,
    claimPropertyList,
    findAgentList,
    findAgentFeatureList,
}