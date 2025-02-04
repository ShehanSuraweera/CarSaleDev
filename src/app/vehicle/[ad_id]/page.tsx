import CarAd from "@/src/components/Cars/CarAd";
import React from "react";

interface PageProps {
  params: {
    ad_id: string;
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ ad_id: string }>;
}) {
  const ad_id = (await params).ad_id;
  return (
    <div>
      <CarAd ad_id={ad_id} />
    </div>
  );
}
