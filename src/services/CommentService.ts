import { crateCommentType } from "@/lib/types";
import instance from "./instance";

const url = "comments";

export const getCommentByPostIdApi = (postId: string) =>
    instance.get(`${url}/post/${postId}`);

export const createCommentApi = (payload: crateCommentType) =>
    instance.post(`${url}`, payload);
