import instance from "./instance";

const url = "user";

export const getAllUserApi = () => instance.get(`${url}`);

export const getUserByUsernameApi = (username: any) => {
    return instance.get(`${url}/search`, {
        params: { username },
    });
};
