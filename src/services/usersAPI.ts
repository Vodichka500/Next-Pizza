import axios from "axios";
import {BASE_URL, USERS_PATH} from "@/services/constants";

const instance = axios.create({
    baseURL:BASE_URL
})

export const getAllUsers = async () => {
    return (await instance.get(USERS_PATH)).data;
};
