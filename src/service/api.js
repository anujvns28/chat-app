const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    GET_OTP_API : BASE_URL + "/auth/getOtp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
}

export const userEndPoints = {
    ACCEPT_FRAIND_REQUST_API : BASE_URL + "/user/acceptRequest",
    SEND_FRAIND_REQUST_API : BASE_URL + "/user/sendRequest",
    FETCH_CONTACT_API : BASE_URL + "/user/fetchContact",
    BLOCK_USER_API : BASE_URL + "/user/blockUser",
    UNBLOCK_USER_API : BASE_URL + "/user/unBlockUser",
    GET_USERDATA_API : BASE_URL + "/user/getUser",
    DELETE_USER_API : BASE_URL + "/user/deleteUser",
    ADD_USER_IN_CONTACT_API : BASE_URL + "/user/addUserinContact",
    GET_ALL_USERS_API : BASE_URL + "/user/getAllUsers"
}

export const chatEndPoints = {
    SEND_GROUP_MSZ_API : BASE_URL + "/chat/sendGroupMsz",
    FETCH_GROUP_MSZ_API : BASE_URL + '/chat/fetchGroupChat',
    SEND_ONE_ONE_MSZ_API : BASE_URL + "/chat/sendOneOneMsz",
    FETCH_ONE_ONE_MSZ_API : BASE_URL + "/chat/fetchOneOneChats"
}

export const groupEndPoints = {
    CREATE_GROUP_API : BASE_URL + "/group/createGroup",
    FETCH_GROUP_API : BASE_URL + "/group/fetchGroup",
    FETCH_GROUP_INFO_API : BASE_URL + "/group/fetchGroupInfo",
    FETCH_COMMON_GROUP_API : BASE_URL + "/group/commonGroup",
    EXIST_GROUP_API : BASE_URL + "/group/existGroup"
}