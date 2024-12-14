import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
} from "@/components/ui/sidebar";
import ChatSidebarUser from "@/components/common/ChatSidebarUser";

const ChatList = ({
    chats,
    joinChat,
}: {
    chats: any;
    joinChat: (chat: any) => void;
}) => {
    // const chatSelector = useSelector(
    //     (state: RootState) => state?.chat?.chats || []
    // );

    return (
        <Sidebar collapsible="none" className="hidden flex-1 md:flex w-96">
            <SidebarHeader className="gap-3.5 border-b p-4 mt-1 bg-white">
                <SidebarInput
                    placeholder="Type to search..."
                    className="w-full px-4 py-5 bg-gray-100 border-gray-300 rounded-md hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-zinc-600 border-2"
                />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup className="">
                    <SidebarGroupContent className="">
                        {chats.map((chat: any) => (
                            <span
                                key={chat.id}
                                onClick={() => joinChat(chat)}
                                className="flex flex-col items-start gap-1 whitespace-nowrap border-b p-2 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
                            >
                                {chat.chatType == "DIRECT" ? (
                                    <ChatSidebarUser
                                        profileImage={
                                            chat.otherUser.profilePictureUrl
                                        }
                                        username={chat.otherUser.username}
                                        firstName={chat.otherUser.firstName}
                                        lastName={chat.otherUser.lastName}
                                        lastDate={chat.otherUser.createdAt}
                                        msg={"Hii"}
                                    />
                                ) : (
                                    <ChatSidebarUser
                                        profileImage={
                                            chat.otherUser.groupPictureUrl
                                        }
                                        username={chat.chatName}
                                        firstName={chat.chatName}
                                        lastName={chat.chatName}
                                        lastDate={chat.lastMessageAt}
                                        msg={"Hii"}
                                    />
                                )}
                            </span>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default ChatList;
