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
      <div className="flex flex-col min-h-screen lg:flex-row">
        <Sidebar />
        <div className="flex flex-col w-full overflow-x-auto sm:p-4">
          {children}
        </div>
      </div>
    </>
  );
}
