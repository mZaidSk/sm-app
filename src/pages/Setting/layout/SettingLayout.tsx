import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { SettingSidebar } from "./SettingSidebar";

function SettingLayout() {
    return (
        <div className="!h-[90vh] overflow-hidden">
            <SidebarProvider className="flex h-full items-start">
                {/* Sidebar with fixed height */}
                <SettingSidebar className="flex-shrink-0 w-64 h-full overflow-auto" />

                {/* Scrollable content area */}
                <SidebarInset className="flex-1 h-full overflow-y-auto">
                    <div className="gap-4 p-4 overflow-y-auto">
                        {/* Outlet or other content */}
                        <Outlet />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}

export default SettingLayout;
