import instance from "./instance";

export const getUserFeedApi = () => instance.get(`post/random`);
