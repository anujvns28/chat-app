import { toast } from "react-toastify";
import { groupEndPoints } from "../api";
import { apiConnector } from "../apiConnecter";

const {
    CREATE_GROUP_API,
    FETCH_GROUP_API,
    FETCH_GROUP_INFO_API,
    FETCH_COMMON_GROUP_API,
    EXIST_GROUP_API
} = groupEndPoints

export const createGroup = async (data) => {
    let result
    const toastid = toast.loading("loading...")
    try {  
        const response = await apiConnector("POST", CREATE_GROUP_API,data);
        console.log("creting group response", response);
        result = response
        toast.success("group Created")
    }
    catch (error) {
        console.log("creating group API ERROR....", error);
        toast.error("Error in Creating Group")
    }
    toast.dismiss(toastid)
    return result

}

export const fetchGroups = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", FETCH_GROUP_API,{userId:data});
      //  console.log("fetching group response", response);
        result = response
    }
    catch (error) {
        console.log("fetching group API ERROR....", error);
    }
    return result

}

export const fetchGroupInfo = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", FETCH_GROUP_INFO_API,{groupId:data});
      //  console.log("fetching group response", response);
        result = response
    }
    catch (error) {
        console.log("fetching group information  API ERROR....", error);
    }
    return result

}

export const fetchCommonGroup = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", FETCH_COMMON_GROUP_API,data);
        //console.log("fetching common group response", response);
        result = response
    }
    catch (error) {
        console.log("fetching common group information  API ERROR....", error);
    }
    return result

}

// exist group
export const existFromGroup = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", EXIST_GROUP_API,data);
        console.log("exist user response", response);
        result = response
        toast.success("you successfully exist from Group")
    }
    catch (error) {
        console.log("exist user API ERROR....", error);
        toast.error("Error occured in existing")
    }
    return result

}
