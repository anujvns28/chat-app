import { chatEndPoints } from "../api";
import { apiConnector } from "../apiConnecter";


const {SEND_MSZ_API,FETCH_MSZ_API} = chatEndPoints

export const sendMsz = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", SEND_MSZ_API,data);
        console.log("Send msz response", response);
        result = response
    }
    catch (error) {
        console.log("send msz API ERROR....", error);
    }
    return result

}


export const fetchMsz = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", FETCH_MSZ_API,data);
        console.log("fetch msz response", response);
        result = response
    }
    catch (error) {
        console.log("fetch msz API ERROR....", error);
    }
    return result

}