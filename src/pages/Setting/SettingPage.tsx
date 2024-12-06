import { useState } from "react";
import EditProfile from "./Edit/EditProfile";
import { ChevronRight, GlobeLock, History, MessageCircleQuestion, UserPen } from "lucide-react";

const settingsSections = [
    { label: "Edit Profile", key: "edit-profile",icon:UserPen },
    { label: "History", key: "history" ,icon:History},
    { label: "Help", key: "help" ,icon:MessageCircleQuestion},
    { label: "Privacy", key: "privacy",icon:GlobeLock },
];

const SettingPage=()=>{
    const [activeSection, setActiveSection] = useState("edit-profile");

    const renderContent = () => {
        switch (activeSection) {
            case "edit-profile":
                return <EditProfile />;
            case "history":
                return <h1>HISTORY</h1>
            case "help":
                return <h1>HELP</h1>
            case "privacy":
                return <h1>PRIVACY</h1>
            default:
                return <EditProfile />;
        }
    };

    return (
        <div className="max-w-9xl p-4 pt-1">
            <h2 className="text-xl font-bold mb-5">Settings</h2>
            <div className="flex">
                
            <div className="w-1/4 border-r pr-4">
    {settingsSections.map((section) => (
        <button
            key={section.key}
            className={`block w-full text-left p-3 mb-2 rounded-lg transition-colors duration-200 ${
                activeSection === section.key
                    ? "bg-zinc-100 text-zinc-700 font-semibold border-l-4 border-Zinc-500"
                    : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection(section.key)}
        >
            <div className="flex items-center gap-3">
                {/* <span className="text-md"><ChevronRight/></span>  */}
                <section.icon/>
                {section.label}
            </div>
        </button>
    ))}
</div>


                {/* Content */}
                <div className="w-3/4 pl-6">{renderContent()}</div>
            </div>
        </div>
    );
};

export default SettingPage;