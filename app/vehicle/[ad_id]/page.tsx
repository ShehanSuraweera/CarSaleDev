import CarAd from "@/components/Cars/CarAd";
import React from "react";

interface PageProps {
  params: {
    ad_id: string;
  };
}

const page = ({ params }: PageProps) => {
  return (
    <div>
      <CarAd ad_id={params.ad_id} />
    </div>
  );
};

export default page;
