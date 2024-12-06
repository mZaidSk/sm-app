import instance from "./instance";

const url = "post";

export const getAllPostApi = () => instance.get(`${url}/user`);

export const getAllPostByUserIdApi = (userId: string) =>
    instance.get(`${url}/user/${userId}`);

export const createPostApi = (payload: any) => instance.post(url, payload);
