"use client";

import SmallAdsRow from "@/src/components/Cars/SmallAdsRow";
// import { useUser } from "../UserContext";

import WelcomeComponent from "../components/WelcomeComponent";
import { motion } from "framer-motion";
import OneTapComponent from "../components/OneTapComponent";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Home() {
  // const { user, loading } = useUser();
  const router = useRouter();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  interface Make {
    id: string;
    name: string;
  }

  const handleSellButton = () => {
    router.push("/sell");
    if (!user && !loading) {
      toast.error("Please login to post an ad");
    }
  };

  return (
    <section className="">
      <div className="flex justify-center sm:hidden">
        <Button
          color="warning"
          onPress={handleSellButton}
          size="md"
          className="font-medium"
        >
          POST FREE
        </Button>
      </div>

      <WelcomeComponent />
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <SmallAdsRow
          topic="Trending Toyota Cars"
          make_id="1"
          vehicle_type_id="1"
          make_name="Toyota"
          vehicle_type_name="Car"
        />
        <SmallAdsRow
          topic="Trending Honda Cars"
          make_id="3"
          make_name="Honda"
          vehicle_type_id="1"
          vehicle_type_name="Car"
        />
        <SmallAdsRow
          topic="Trending Suzuki Cars"
          make_id="2"
          make_name="Suzuki"
          vehicle_type_name="Car"
          vehicle_type_id="1"
        />
      </motion.div>
      {!loading && !user && <OneTapComponent />}
    </section>
  );
}
