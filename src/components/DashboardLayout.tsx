import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon, Menu, X, Bell, LogOut } from "lucide-react";
import AbodeLogo from "./AbodeLogo";
import { useRole } from "@/contexts/RoleContext";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  userName: string;
  userSubtitle: string;
  avatarLetter: string;
}

const DashboardLayout = ({ children, navItems, userName, userSubtitle, avatarLetter }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { setRole } = useRole();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
          <AbodeLogo size={28} />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-sidebar-foreground">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-primary-foreground text-sm font-bold">
              {avatarLetter}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
              <p className="text-xs text-sidebar-muted truncate">{userSubtitle}</p>
            </div>
            <button onClick={() => setRole(null)} className="text-sidebar-muted hover:text-sidebar-foreground transition-colors" title="Switch role">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground hover:text-primary transition-colors">
            <Menu size={22} />
          </button>
          <div className="lg:hidden"><AbodeLogo size={24} showText={false} /></div>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
