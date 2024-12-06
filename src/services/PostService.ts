import instance from "./instance";

const url = "post";

export const getAllPostApi = () => instance.get(`${url}/user`);

export const getAllPostByUserIdApi = (userId: string) =>
    instance.get(`${url}/user/${userId}`);

export const createPostApi = (payload: FormData) =>
    instance.post(url, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

const postReactionUrl = "post-reactions";

export const createPostReactionApi = (payload: {
    postId: string;
    reaction: "LIKE" | "LOVE" | "LAUGH";
}) => instance.post(`${postReactionUrl}`, payload);

export const removePostReactionApi = (postId: string) =>
    instance.delete(`${postReactionUrl}/${postId}`);
