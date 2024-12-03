import { registerUserParams } from "@/lib/types";
import instance from "./instance";

const url = "auth";

export const logInApi = (payload: { email: string; password: string }) =>
    instance.post(url + "/login", payload);

export const registerApi = (payload: registerUserParams,
) =>
    instance.post(url + "/register", payload)

export const getLoginUserApi = () => instance.get(url + "/user");

