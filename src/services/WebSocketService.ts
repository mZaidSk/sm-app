// services/websocket.ts
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000/chat";

class WebSocketService {
    private socket: Socket | null = null;

    /**
     * Connect to the WebSocket server.
     * @param token - The authentication token to be sent with the connection query.
     */
    connect(token: string): void {
        if (!this.socket) {
            this.socket = io(SOCKET_URL, { query: { token } });

            // Connection event
            this.socket.on("connect", () => {
                console.log("Connected to WebSocket");
            });

            // Handle errors
            this.socket.on("connect_error", (err: Error) => {
                console.error("WebSocket connection error:", err);
            });

            // Disconnect event
            this.socket.on("disconnect", () => {
                console.log("Disconnected from WebSocket");
            });
        }
    }

    /**
     * Disconnect from the WebSocket server.
     */
    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    /**
     * Register an event listener.
     * @param event - The event name to listen for.
     * @param callback - The callback to execute when the event occurs.
     */
    on<T = any>(event: string, callback: (data: T) => void): void {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    /**
     * Remove a specific event listener.
     * @param event - The event name to stop listening for.
     */
    off(event: string): void {
        if (this.socket) {
            this.socket.off(event);
        }
    }

    /**
     * Emit an event to the server.
     * @param event - The event name to emit.
     * @param payload - The data to send with the event.
     */
    emit<T = any>(event: string, payload: T): void {
        if (this.socket) {
            this.socket.emit(event, payload);
        }
    }
}

// Create a singleton instance of the WebSocket service
const websocket = new WebSocketService();
export default websocket;
