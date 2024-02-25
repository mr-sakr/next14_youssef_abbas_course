import type { Metadata } from "next";
import AdminSidebar from "./AdminSidebar";

export const metadata:Metadata = {
  title: "Admin Dashboard",
  description: "This is Admin Dashboard",
}

interface AdminDashbourdLayoutProps{
    children : React.ReactNode;
}
const AdminDashbourdLayout = ({children} : AdminDashbourdLayoutProps) => {
  return (
    <div className="h-[calc(100vh-150px)] flex items-start justify-between overflow-hidden">
        <div className="h-[calc(100vh-150px)] w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5 ">
            <AdminSidebar/>
        </div>
        <div className="h-[calc(100vh-150px)] w-full lg:w-4/5 overflow-y-scroll">
            {children}
        </div>
    </div>
  )
}

export default AdminDashbourdLayout