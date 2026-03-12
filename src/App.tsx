import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  LayoutDashboard, QrCode, MessageSquareWarning, MapPin, Heart, UtensilsCrossed,
  Users, ClipboardList, UserCheck, TrendingUp, FileText, Phone, Wifi, Bell
} from "lucide-react";
import { RoleProvider, useRole } from "./contexts/RoleContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentRoommates from "./pages/student/StudentRoommates";
import StudentComplaints from "./pages/student/StudentComplaints";
import StudentOutpass from "./pages/student/StudentOutpass";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentMessMenu from "./pages/student/StudentMessMenu";
import StudentWifi from "./pages/student/StudentWifi";

// Warden pages
import WardenDashboard from "./pages/warden/WardenDashboard";
import WardenAttendance from "./pages/warden/WardenAttendance";
import WardenComplaints from "./pages/warden/WardenComplaints";
import WardenFood from "./pages/warden/WardenFood";
import WardenOutpass from "./pages/warden/WardenOutpass";
import WardenRoommates from "./pages/warden/WardenRoommates";
import WardenReports from "./pages/warden/WardenReports";
import WardenContacts from "./pages/warden/WardenContacts";
import WardenWifi from "./pages/warden/WardenWifi";
import WardenNotifications from "./pages/warden/WardenNotifications";

const studentNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
  { icon: QrCode, label: "Attendance", path: "/student/attendance" },
  { icon: Heart, label: "Roommates", path: "/student/roommates" },
  { icon: MessageSquareWarning, label: "Complaints", path: "/student/complaints" },
  { icon: MapPin, label: "Outpass", path: "/student/outpass" },
  { icon: UtensilsCrossed, label: "Mess Menu", path: "/student/mess" },
  { icon: Wifi, label: "WiFi Help Desk", path: "/student/wifi" },
];

const wardenNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/warden" },
  { icon: Users, label: "Live Attendance", path: "/warden/attendance" },
  { icon: ClipboardList, label: "Complaint Queue", path: "/warden/complaints" },
  { icon: TrendingUp, label: "Food Analytics", path: "/warden/food" },
  { icon: MapPin, label: "Outpass Monitor", path: "/warden/outpass" },
  { icon: Heart, label: "Roommate Success", path: "/warden/roommates" },
  { icon: Phone, label: "Contacts", path: "/warden/contacts" },
  { icon: Wifi, label: "WiFi Heatmap", path: "/warden/wifi" },
  { icon: Bell, label: "Notifications", path: "/warden/notifications" },
  { icon: FileText, label: "Reports", path: "/warden/reports" },
];

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { role } = useRole();

  if (!role) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (role === "student") {
    return (
      <DashboardLayout navItems={studentNav} userName="Rahul Sharma" userSubtitle="B.Tech CSE • Room 101" avatarLetter="R">
        <Routes>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/attendance" element={<StudentAttendance />} />
          <Route path="/student/roommates" element={<StudentRoommates />} />
          <Route path="/student/complaints" element={<StudentComplaints />} />
          <Route path="/student/outpass" element={<StudentOutpass />} />
          <Route path="/student/mess" element={<StudentMessMenu />} />
          <Route path="/student/wifi" element={<StudentWifi />} />
          <Route path="*" element={<Navigate to="/student" replace />} />
        </Routes>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navItems={wardenNav} userName="Dr. Sharma" userSubtitle="Chief Warden • Block A" avatarLetter="W">
      <Routes>
        <Route path="/warden" element={<WardenDashboard />} />
        <Route path="/warden/attendance" element={<WardenAttendance />} />
        <Route path="/warden/complaints" element={<WardenComplaints />} />
        <Route path="/warden/food" element={<WardenFood />} />
        <Route path="/warden/outpass" element={<WardenOutpass />} />
        <Route path="/warden/roommates" element={<WardenRoommates />} />
        <Route path="/warden/contacts" element={<WardenContacts />} />
        <Route path="/warden/wifi" element={<WardenWifi />} />
        <Route path="/warden/reports" element={<WardenReports />} />
        <Route path="*" element={<Navigate to="/warden" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RoleProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
