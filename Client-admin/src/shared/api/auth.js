import { axiosAuth } from "./api.js";

export const login = async (data) => {
    const response = await axiosAuth.post("/auth/login", data);
}