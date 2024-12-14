import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import websocket from "@/services/WebSocketService";
import { setChats } from "@/store/slice/ChatSocketSlice";

import * as React from "react";
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react";
// import { NavUser } from "@/components/nav-user"
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import ChatSidebarUser from "@/components/common/ChatSidebarUser";
import { format, formatDistanceToNow } from "date-fns";

const data = {
  mails: [
    {
      name: "William",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      name: "Alice",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Weekend Plans",
      date: "2 days ago",
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Re: Question about Budget",
      date: "2 days ago",
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
    },
    {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Important Announcement",
      date: "1 week ago",
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
    },
    {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Re: Feedback on Proposal",
      date: "1 week ago",
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
    },
    {
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "New Project Idea",
      date: "1 week ago",
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
    },
    {
      name: "Olivia",
      email: "oliviawilson@example.com",
      subject: "Vacation Plans",
      date: "1 week ago",
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
    },
    {
      name: "James Martin",
      email: "jamesmartin@example.com",
      subject: "Re: Conference Registration",
      date: "1 week ago",
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
    },
    {
      name: "Sophia White",
      email: "sophiawhite@example.com",
      subject: "Team Dinner",
      date: "1 week ago",
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
    },
  ],
};

const ChatList = ({ setChatId }: { setChatId: (id: string) => void }) => {
  // const chatSelector = useSelector(
  //     (state: RootState) => state?.chat?.chats || []
  // );

  const dispatch = useDispatch<AppDispatch>();
  const chatSelector = useSelector(
    (state: RootState) => state.chat.chats || []
  );

  // const chatSelector: any[] = [];

  useEffect(() => {
    // Listen for incoming messages
    websocket.emit("loadChats", {});

    websocket.on("chatsLoaded", ({ chats }) => {
      dispatch(setChats(chats));
      console.log(chatSelector);
    });

    return () => {
      websocket.off("chatsLoaded");
    };
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [mails, setMails] = React.useState(data.mails);
  const { setOpen } = useSidebar();

  const timestamp = "2024-12-06T09:27:24.809Z";
  const relativeTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });
  const getRelativeTime = (timestamp: string | number | Date) => {
    const now = new Date();
    const date = new Date(timestamp);

    const minutesDifference = Math.floor(
      (now.getTime() - date.getTime()) / 60000
    ); // Get the difference in minutes
    if (minutesDifference < 60) {
      return format(date, "p"); // Show the exact time if the difference is less than an hour (format: HH:mm)
    }

    const relativeTime = formatDistanceToNow(date, { addSuffix: true });

    return relativeTime; // Return the relative time (days, months, or years)
  };

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
            {mails.map((mail) => (
              <a
                href="#"
                key={mail.email}
                className="flex flex-col items-start gap-1 whitespace-nowrap border-b p-2 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <ChatSidebarUser
                  profileImage={"https://github.com/shadcn.png"}
                  username={mail.name}
                  firstName={mail.name}
                  lastName={"lastName"}
                  lastDate={getRelativeTime(new Date())} //change with real dte
                  msg={"Hii"}
                />
              </a>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatList;
