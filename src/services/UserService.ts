import instance from "./instance";

const url = "user";

export const getUserApi = () => instance.get(`${url}/me`);

export const getAllUserApi = () => instance.get(`${url}`);

export const getUserByUsernameApi = (username: any) => {
    return instance.get(`${url}/search`, {
        params: { username },
    });
};

export const getUserByIdApi = (id: string) => {
    return instance.get(`${url}/${id}`);
};
