import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "warden" | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  studentName: string;
}

const RoleContext = createContext<RoleContextType>({ role: null, setRole: () => {}, studentName: "Rahul Sharma" });

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);
  return (
    <RoleContext.Provider value={{ role, setRole, studentName: "Rahul Sharma" }}>
      {children}
    </RoleContext.Provider>
  );
};
