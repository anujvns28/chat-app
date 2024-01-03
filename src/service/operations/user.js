import { userEndPoints } from "../api";
import { apiConnector } from "../apiConnecter";

const {
    ACCEPT_FRAIND_REQUST_API,
    FETCH_CONTACT_API
} = userEndPoints

export const acceptRequest = async (data) => {
    try {
        const response = await apiConnector("POST", ACCEPT_FRAIND_REQUST_API,data);
        console.log("accept request response", response);
    }
    catch (error) {
        console.log("accept request RESPONSE  API ERROR....", error);
       
    }

}


export const fetchContact = async (data) => {
    try {
        const response = await apiConnector("POST", FETCH_CONTACT_API,data);
        console.log("Fetching contact request response", response);
    }
    catch (error) {
        console.log("Fetching contact RESPONSE  API ERROR....", error);
       
    }

}