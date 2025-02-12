import CarAd from "@/src/components/Cars/CarAd";

import * as React from "react";

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
    <div className="container w-full mx-0 my-3 rounded-lg sm:my-2 md:px-12 sm:p-6 xl:px-40">
      <div className="px-2 py-2 bg-white rounded-md shadow-md sm:py-5 dark:bg-slate-900 sm:px-10 lg:px-24 ">
        <CarAd ad_id={ad_id} />
      </div>
    </div>
  );
}
