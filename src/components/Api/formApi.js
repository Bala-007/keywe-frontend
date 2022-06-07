import axios from 'axios';

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

function signupPost(postData) {
    return axios.post(`${process.env.API_IMAGE_URL}registration`,postData,axiosConfig);
}

function signinDetails(postData) {
    //console.log("---kowsi signin--",postData);
    return axios.get(`${process.env.API_IMAGE_URL}v1/fire-user/${postData}`);
}

function userDetailInfo(postData) {
    return axios.get(`${process.env.API_IMAGE_URL}v1/user/`+postData);
}

function claimOwnershipPost(postData) {
    // console.log("--postData--", postData);
    return axios.post(`${process.env.API_IMAGE_URL}v1/claim`,postData);
}

function contactPost(postData) {
    return axios.post( `${process.env.API_IMAGE_URL}/contact`,postData);  
}

function LinkedInLogin(postData) {
    return axios.post( `${process.env.API_IMAGE_URL}login-with-linkedin`,postData);  
}

function getCompanyList() {
    return axios.get(`${process.env.API_IMAGE_URL}company`);
}

function getGroupList() {
    return axios.get(`${process.env.API_IMAGE_URL}v1/group`);
}

function createGroupApi(postData) {
    return axios.post(`${process.env.API_IMAGE_URL}v1/group`,postData);
}

function selectGroupApi(groupId,postData) {
    return axios.put(`${process.env.API_IMAGE_URL}v1/group/${groupId}`,postData);
}
function profileUpdate(uid,postData) {
    return axios.put(`${process.env.API_IMAGE_URL}v1/user/${uid}`,postData);
}
function connectAgent(postData) {
    // console.log("--postData--", postData);
    return axios.post(`${process.env.API_IMAGE_URL}v1/transfer-owner-agent`,postData);
}

function traferOwnership(postData) {
    return axios.post(`${process.env.API_IMAGE_URL}v1/agent`,postData);
}
function createGruop(postData) {
    return axios.post(`${process.env.API_IMAGE_URL}v1/group`,postData);
}
export function scheduleAppoinment(postData){
    console.log("--postData--..", postData);
  return axios.post(`${process.env.API_IMAGE_URL}v1/appointment`,postData)
}



export {
    signupPost,
    signinDetails,
    contactPost,
    userDetailInfo,
    claimOwnershipPost,
    LinkedInLogin,
    getCompanyList,
    getGroupList,
    createGroupApi,
    selectGroupApi,
    profileUpdate,
    connectAgent, 
    traferOwnership,
    createGruop
}



