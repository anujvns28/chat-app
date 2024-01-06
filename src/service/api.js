const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    GET_OTP_API : BASE_URL + "/auth/getOtp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
}

export const userEndPoints = {
    ACCEPT_FRAIND_REQUST_API : BASE_URL + "/user/acceptRequest",
    SEND_FRAIND_REQUST_API : BASE_URL + "/user/sendRequest",
    FETCH_CONTACT_API : BASE_URL + "/user/fetchContact"
}