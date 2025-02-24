"use client";

import SmallAdsRow from "@/src/components/Cars/SmallAdsRow";
import { useUser } from "../UserContext";

import WelcomeComponent from "../components/WelcomeComponent";
import { motion } from "framer-motion";
import OneTapComponent from "../components/OneTapComponent";
import { useCallback, useState } from "react";

export default function Home() {
  const { user, loading } = useUser();

  interface Make {
    id: string;
    name: string;
  }

  return (
    <section className="">
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
        />
        <SmallAdsRow
          topic="Trending Honda Cars"
          make_id="3"
          make_name="Honda"
          vehicle_type_id="1"
        />
        <SmallAdsRow
          topic="Trending Suzuki Cars"
          make_id="2"
          make_name="Suzuki"
          vehicle_type_id="1"
        />
      </motion.div>
      {!loading && !user && <OneTapComponent />}
    </section>
  );
}
