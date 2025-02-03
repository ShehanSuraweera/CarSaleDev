import CarAd from "@/src/components/Cars/CarAd";
import React from "react";

interface PageProps {
  params: {
    ad_id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { ad_id } = await params;

  return (
    <div>
      <CarAd ad_id={ad_id} />
    </div>
  );
};

export default page;
