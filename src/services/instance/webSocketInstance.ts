import { io } from "socket.io-client";

const socket = io("http://localhost:3000/chat", {
    query: {
        token: localStorage.getItem("token"), // Replace with your actual user ID retrieval logic
    },
});

export default socket;
