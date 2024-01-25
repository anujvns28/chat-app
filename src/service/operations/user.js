import { toast } from "react-toastify";
import { userEndPoints } from "../api";
import { apiConnector } from "../apiConnecter";

const {
    ACCEPT_FRAIND_REQUST_API,
    FETCH_CONTACT_API,
    SEND_FRAIND_REQUST_API,
    BLOCK_USER_API
} = userEndPoints

export const acceptRequest = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", ACCEPT_FRAIND_REQUST_API,data);
        console.log("accept request response", response);
        result = response
    }
    catch (error) {
        console.log("accept request RESPONSE  API ERROR....", error);
    }
    return result

}


export const fetchContact = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", FETCH_CONTACT_API,{userId:data});
       // console.log("Fetching contact request response", response);
        result = response
    }
    catch (error) {
        console.log("Fetching contact RESPONSE  API ERROR....", error);
       
    }
    return result
}

export const sendFraindRequest = async (data) => {
    let result
    const loading = toast.loading("loading...")
    try {
        const response = await apiConnector("POST",SEND_FRAIND_REQUST_API,data);
        console.log("send fraind request response", response);
        result = response
        toast.success("Fraind Request Sent Successfully")
    }
    catch (error) {
        console.log("send fraind request RESPONSE  API ERROR....", error);
        toast.error("Error in Sending Fraind Request")
    }
    toast.dismiss(loading);
    return result
}

// block user

export const blockContact = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", BLOCK_USER_API,data);
        console.log("block user response", response);
        result = response
        toast.success("User Blocked successfully")
    }
    catch (error) {
        console.log("block user API ERROR....", error);
        toast.error("Error occured in blocking")
    }
    return result

}