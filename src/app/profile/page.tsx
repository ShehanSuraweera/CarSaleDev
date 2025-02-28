// app/profile/page.tsx
import NavTabs from "@/src/app/profile/NavTabs";
import ProfileContent from "@/src/components/ProfileContent";

export default function ProfilePage() {
  return (
    <div className="flex flex-col p-4">
      <NavTabs />
      <ProfileContent />
    </div>
  );
}
