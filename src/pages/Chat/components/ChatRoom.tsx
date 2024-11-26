// import { useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const ChatRoom = () => {
    // const { id } = useParams(); // Fetch chat room ID from the URL
    const [id, setId] = useState(1); //

    if (!id) {
        return (
            <div className="flex justify-center items-center h-full text-gray-500">
                <p>
                    No chat room selected. Please select a valid chat room to
                    continue.
                </p>
            </div>
        );
    }

    return (
        <Card className="flex h-full flex-col shadow-lg bg-white border border-gray-200 rounded-lg p-0 m-0">
            <CardHeader className="px-4 py-2 flex items-start justify-between sticky top-0 border-b-2 bg-white z-auto">
                <div className="flex items-center space-x-4">
                    {/* Avatar for the user */}
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="/path-to-avatar.jpg" alt="John Doe" />
                        <AvatarFallback>J</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            John Doe
                        </h2>
                        <p className="text-sm text-gray-500">
                            Last seen: 10 minutes ago
                        </p>
                    </div>
                </div>
            </CardHeader>

            {/* Chat Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50">
                {/* Sender Message (Right-Aligned) */}
                <div className="flex justify-end">
                    <div className="flex items-start gap-4 flex-row-reverse max-w-lg">
                        {/* Sender Avatar */}
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src="/path-to-sender-avatar.jpg"
                                alt="Sender Name"
                            />
                            <AvatarFallback>J</AvatarFallback>
                        </Avatar>
                        {/* Message Bubble */}
                        <div>
                            <div className="bg-gray-700 text-white p-4 shadow-sm rounded-lg">
                                Hey, how are you?
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block text-right">
                                10:30 AM
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="flex items-start gap-4 flex-row-reverse max-w-lg">
                        {/* Sender Avatar */}
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src="/path-to-sender-avatar.jpg"
                                alt="Sender Name"
                            />
                            <AvatarFallback>J</AvatarFallback>
                        </Avatar>
                        {/* Message Bubble */}
                        <div>
                            <div className="bg-gray-700 text-white p-4 shadow-sm rounded-lg">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Earum eveniet consequatur,
                                porro laborum mollitia laudantium blanditiis
                                ipsam ab dolores quasi beatae ad suscipit illo,
                                saepe praesentium quaerat tempore modi
                                quibusdam!
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block text-right">
                                10:30 AM
                            </span>
                        </div>
                    </div>
                </div>

                {/* Receiver Message (Left-Aligned) */}
                <div className="flex justify-start">
                    <div className="flex items-start gap-4 max-w-lg">
                        {/* Receiver Avatar */}
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src="/path-to-receiver-avatar.jpg"
                                alt="Receiver Name"
                            />
                            <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                        {/* Message Bubble */}
                        <div>
                            <div className="bg-gray-300 p-4 text-gray-900 shadow-sm rounded-lg">
                                I'm doing well, thanks! How about you?
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">
                                10:32 AM
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start">
                    <div className="flex items-start gap-4 max-w-lg">
                        {/* Receiver Avatar */}
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src="/path-to-receiver-avatar.jpg"
                                alt="Receiver Name"
                            />
                            <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                        {/* Message Bubble */}
                        <div>
                            <div className="bg-gray-300 p-4 text-gray-900 shadow-sm rounded-lg">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aperiam corporis, voluptas
                                voluptates ratione iste quasi harum hic.
                                Incidunt, iste minus vero illum pariatur
                                distinctio harum, doloribus quidem odio quo
                                architecto.
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">
                                10:32 AM
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>

            {/* Message Input */}
            <CardFooter className="p-4 bg-gray-100 border-t border-gray-200 sticky bottom-0">
                <div className="flex items-center space-x-4 w-full">
                    <Textarea
                        className="flex-grow border border-gray-300 px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none transition-all overflow-hidden"
                        placeholder="Type your message..."
                        rows={1}
                    />
                    <Button className="bg-gray-700 text-white hover:bg-gray-800 px-6 py-2 flex items-center space-x-2 shadow-lg transition-all">
                        <MessageCircle size={20} />
                        <span>Send</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ChatRoom;
