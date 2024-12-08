import { useState } from "react";
import {
    ChevronRight,
    GlobeLock,
    History,
    MessageCircleQuestion,
    UserPen,
} from "lucide-react";
import { Route, Routes } from "react-router-dom";
import SettingLayout from "./layout/SettingLayout";
import HistoryLikes from "./components/HistoryLikes";
import HistoryComments from "./components/HistoryComments";
import GeneralHelp from "./components/GeneralHelp";
import GeneralFaq from "./components/GeneralFaq";
import TPtandc from "./components/TPtandc";
import TPpandp from "./components/TPpandp";
import ProfileEdit from "./components/ProfileEdit";
import ProfilePassword from "./components/ProfilePassword";

const settingsSections = [
    { label: "Edit Profile", key: "edit-profile", icon: UserPen },
    { label: "History", key: "history", icon: History },
    { label: "Help", key: "help", icon: MessageCircleQuestion },
    { label: "Privacy", key: "privacy", icon: GlobeLock },
];

const SettingPage = () => {
    return (
        <Routes>
            <Route element={<SettingLayout />}>
                <Route index element={<ProfileEdit />} />
                <Route path="edit-profile" element={<ProfileEdit />} />
                <Route path="change-password" element={<ProfilePassword />} />

                <Route path="likes" element={<HistoryLikes />} />
                <Route path="comments" element={<HistoryComments />} />

                <Route path="help" element={<GeneralHelp />} />
                <Route path="faq" element={<GeneralFaq />} />

                <Route path="tandc" element={<TPtandc />} />
                <Route path="pandp" element={<TPpandp />} />
            </Route>
        </Routes>
    );
};

export default SettingPage;
