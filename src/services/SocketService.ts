import { io } from "socket.io-client";

const SOCKET_URL = "https://sm-api-rtii.onrender.com";

class SocketService {
    public socket: any = null; // Declare socket as 'any' to bypass type checks

    connect(namespace = "chat") {
        this.socket = io(`${SOCKET_URL}/${namespace}`, {
            query: {
                token: localStorage.getItem("token"), // Replace with your token logic
            },
            transports: ["websocket"],
        });

        this.socket.on("connect", () => {
            console.log("Connected to WebSocket server");
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket server");
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    on(event: string, callback: (...args: any[]) => void) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    emit(event: string, payload?: any) {
        if (this.socket) {
            this.socket.emit(event, payload);
        }
    }
}

const socketService = new SocketService();
export default socketService;
