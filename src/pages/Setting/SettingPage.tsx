import { useState } from "react";
import { ChevronRight, GlobeLock, History, MessageCircleQuestion, UserPen } from "lucide-react";
import EditProfile from "./Edit/EditProfile";
import HistoryPage from "./History/HistoryPage";


const settingsSections = [
    { label: "Edit Profile", key: "edit-profile",icon:UserPen },
    { label: "History", key: "history" ,icon:History},
    { label: "Help", key: "help" ,icon:MessageCircleQuestion},
    { label: "Privacy", key: "privacy",icon:GlobeLock },
];


const SettingPage=()=>{
    const [activeSection, setActiveSection] = useState("edit-profile");
const [historySection, setHistorySection] = useState<"Like" | "Comments">("Like");
    const renderContent = () => {
        switch (activeSection) {
            case "edit-profile":
                return (
                        <EditProfile />
                    //>
                );
            case "history":
                return (
                        <HistoryPage activeSection={historySection} setHistorySection={setHistorySection} />
                );
            case "help":
                return <h1>HELP</h1>;
            case "privacy":
                return <h1>PRIVACY</h1>;
            default:
                return <EditProfile />;
        }
    };

    return (
        <div className="h-screen flex flex-col ">
            <h2 className="text-xl font-bold p-2 border-b">Settings</h2>
            <div className="flex flex-1 overflow-hidden ">
                <div className="w-1/4 border-r p-4 overflow-y-auto">
                    {settingsSections.map((section) => (
                        <button
                            key={section.key}
                            className={`block w-full text-left p-3 mb-2 rounded-lg transition-colors duration-200 ${
                                activeSection === section.key
                                    ? "bg-zinc-100 text-zinc-700 font-semibold border-l-4 border-zinc-500"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() => setActiveSection(section.key)}
                        >
                            <div className="flex items-center gap-3">
                                <section.icon />
                                {section.label}
                            </div>
                        </button>
                    ))}
                </div>

                {/* content */}
                <div className="w-3/4 p-4 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingPage;