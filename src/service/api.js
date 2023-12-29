const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    GET_OTP_API : BASE_URL + "/user/getOtp",
    SIGNUP_API : BASE_URL + "/user/signup"
}