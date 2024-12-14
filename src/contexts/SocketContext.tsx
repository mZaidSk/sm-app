import socketService from "@/services/SocketService";
import React, { createContext, useEffect, ReactNode } from "react";

export const SocketContext = createContext<typeof socketService | null>(null);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token) socketService.connect();

        return () => {
            socketService.disconnect();
        };
    }, [token]);

    return (
        <SocketContext.Provider value={socketService}>
            {children}
        </SocketContext.Provider>
    );
};
