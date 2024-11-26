import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Left side for the Chat Room */}
            <div className="flex-1 p-6 border-r border-gray-300">
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <h2 className="text-xl font-semibold">Chats</h2>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                        <Outlet />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ChatLayout;
