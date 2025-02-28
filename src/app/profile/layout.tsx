// app/profile/layout.tsx
import Sidebar from "@/src/components/SideBar";
import NavTabs from "./NavTabs";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen md:flex-row">
        <Sidebar />
        <div className="flex-1 overflow-x-auto sm:p-4">{children}</div>
      </div>
    </>
  );
}
