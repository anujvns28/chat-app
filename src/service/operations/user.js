import { toast } from "react-toastify";
import { userEndPoints } from "../api";
import { apiConnector } from "../apiConnecter";

const {
    ACCEPT_FRAIND_REQUST_API,
    FETCH_CONTACT_API,
    SEND_FRAIND_REQUST_API,
    BLOCK_USER_API,
    UNBLOCK_USER_API,
    GET_USERDATA_API,
    ADD_USER_IN_CONTACT_API,
    DELETE_USER_API,
    GET_ALL_USERS_API
} = userEndPoints

export const acceptRequest = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", ACCEPT_FRAIND_REQUST_API,data);
        //console.log("accept request response", response);
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
        //console.log("send fraind request response", response);
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
        //console.log("block user response", response);
        result = response
        toast.success("User Blocked successfully")
    }
    catch (error) {
        console.log("block user API ERROR....", error);
        toast.error("Error occured in blocking")
    }
    return result

}

// block user

export const unblockContact = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", UNBLOCK_USER_API,data);
        //console.log("unblock user response", response);
        result = response
        toast.success("User unblocked successfully")
    }
    catch (error) {
        console.log("unblock user API ERROR....", error);
        toast.error("Error occured in unblocking")
    }
    return result

}

// get userDAta
export const fetchUserInformaion = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST",GET_USERDATA_API ,{userId:data});
        //console.log("fetching user information response", response);
        result = response
    }
    catch (error) {
        console.log("fetching user  information  API ERROR....", error);
    }
    return result

}


export const deletContact = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST",DELETE_USER_API,data);
        console.log("delete user response", response);
        result = response
        toast.success("User deleted successfully")
    }
    catch (error) {
        console.log("deletion user API ERROR....", error);
        toast.error("Error occured in deleting")
    }
    return result

}

export const addUserInConatact = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", ADD_USER_IN_CONTACT_API,data);
        console.log("add user response", response);
        result = response
        toast.success("User added successfully")
    }
    catch (error) {
        console.log("add user API ERROR....", error);
        toast.error("Error occured in adding")
    }
    return result

}

export const fetchAllUser = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST",GET_ALL_USERS_API ,{userId:data});
        console.log("Geta all user response", response);
        result = response
    }
    catch (error) {
        console.log("all user fetching API ERROR....", error);
    }
    return result

}