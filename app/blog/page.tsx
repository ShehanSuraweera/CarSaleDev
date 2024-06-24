import CarList from "@/components/Cars/CarList";
import MediumAd from "@/components/Cars/MediumAd";
import Search from "@/components/Search";
import { title } from "@/components/primitives";

export default function BlogPage() {
  return (
    <div>
      <Search />
      <CarList />
    </div>
  );
}
