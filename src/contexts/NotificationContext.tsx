import { createContext, useContext, useState, ReactNode } from "react";

export interface Notification {
  id: string;
  type: "text" | "poll" | "image";
  title: string;
  message: string;
  imageUrl?: string;
  pollOptions?: { text: string; votes: number }[];
  target: "all" | string; // "all" or student name
  createdAt: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (n: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markRead: (id: string) => void;
}

const defaultNotifications: Notification[] = [
  { id: "1", type: "text", title: "Republic Day Holiday", message: "🎉 Happy Republic Day! Hostel closed tomorrow.", target: "all", createdAt: new Date(Date.now() - 7200000).toISOString(), read: false },
  { id: "2", type: "text", title: "Mid-sem Exam Notice", message: "📝 Mid-sem exams start Feb 24. Mess timings extended.", target: "all", createdAt: new Date(Date.now() - 18000000).toISOString(), read: false },
  { id: "3", type: "text", title: "Laundry Ready", message: "👕 Your laundry is ready for pickup.", target: "Rahul Sharma", createdAt: new Date(Date.now() - 86400000).toISOString(), read: true },
  { id: "4", type: "poll", title: "Weekend Outing Poll", message: "Which day do you prefer for the weekend outing?", pollOptions: [{ text: "Saturday", votes: 42 }, { text: "Sunday", votes: 31 }], target: "all", createdAt: new Date(Date.now() - 3600000).toISOString(), read: false },
];

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  markRead: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);

  const addNotification = (n: Omit<Notification, "id" | "createdAt" | "read">) => {
    setNotifications((prev) => [
      { ...n, id: crypto.randomUUID(), createdAt: new Date().toISOString(), read: false },
      ...prev,
    ]);
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
