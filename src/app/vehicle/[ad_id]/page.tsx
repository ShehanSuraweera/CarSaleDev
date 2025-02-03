import CarAd from "@/src/components/Cars/CarAd";
import React from "react";

interface PageProps {
  params: {
    ad_id: string;
  };
}

// const Page = async ({ params }: PageProps) => {
//   const { ad_id } = params;

//   return (
//     <div>
//       <CarAd ad_id={ad_id} />
//     </div>
//   );
// };

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
