import instance from "./instance";

const url = "chat";

export const getChatsByUserIdApi = (userId: string) =>
    instance.get(url + `/${userId}`);

export const getChatByChatIdApi = (userId: string) =>
    instance.get(url + `/${userId}`);

// export const getMessages = (payload: any) => instance.get(url, payload);
export const getMessagesApi = ({ chatId }: any) =>
    instance.get(url + "/messages" + `/${chatId}`);

export const createDirectChatApi = (payload: any) =>
    instance.post(url, payload); // payload = {type: "direct", creatorId: id, receiverId: id}
export const createGroupChatApi = (payload: any) => instance.post(url, payload); // payload = {type: "group", creatorId: id, participantIds: [id]
