import instance from "./instance";

const url = "auth";

export const logInApi = (payload: any) =>
    instance.post(url + "/login", payload);
export const getLoginUserApi = () => instance.get(url + "/check-user");
