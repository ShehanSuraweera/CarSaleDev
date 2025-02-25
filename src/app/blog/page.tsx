import React from "react";

const BlogPage = () => {
  // Vehicle categories with icons and descriptions
  const vehicleCategories = [
    {
      title: "🚗 Passenger Cars",
      description: [
        "Sedan → 4-door, separate trunk (e.g., Toyota Corolla, Honda Accord)",
        "Hatchback → Rear door lifts up, cargo area connected (e.g., VW Golf, Ford Fiesta)",
        "Coupe → 2-door, sporty design (e.g., BMW 4 Series, Ford Mustang)",
        "Convertible → Open-top, soft/hard roof (e.g., Mazda MX-5, Mercedes SL-Class)",
        "Station Wagon → Extended cargo area (e.g., Volvo V60, Subaru Outback)",
      ],
    },
    {
      title: "🚙 SUVs (Sport Utility Vehicles)",
      description: [
        "Compact SUV → Small size (e.g., Honda CR-V, Toyota RAV4)",
        "Mid-Size SUV → Medium size, often 3 rows (e.g., Ford Explorer, Nissan Pathfinder)",
        "Full-Size SUV → Large, powerful (e.g., Chevy Suburban, Toyota Land Cruiser)",
        "Crossover (CUV) → Car-based SUV (e.g., Nissan Qashqai, Kia Sportage)",
      ],
    },
    {
      title: "🛻 Pickup Trucks",
      description: [
        "Single Cab → 2-door, 2-3 seats (e.g., Toyota Hilux Single Cab)",
        "Extended Cab → Extra small rear seats (e.g., Ford Ranger SuperCab)",
        "Crew Cab → Full 4-door, large seating (e.g., Ram 1500 Crew Cab)",
      ],
    },
    {
      title: "🚐 Vans & Minivans",
      description: [
        "Passenger Van → Transports people (e.g., Toyota HiAce, Mercedes Sprinter)",
        "Cargo Van → For goods transport (e.g., Ford Transit, Nissan NV200)",
        "Minivan → Family-friendly, sliding doors (e.g., Honda Odyssey, Toyota Sienna)",
      ],
    },
    {
      title: "🏎️ Sports Cars",
      description: [
        "Roadster → 2-seater, convertible (e.g., Porsche Boxster, Mazda MX-5)",
        "Supercar → High-performance (e.g., Ferrari 488, Lamborghini Huracan)",
        "Muscle Car → Big engine, American (e.g., Ford Mustang, Dodge Challenger)",
      ],
    },
    {
      title: "🚛 Commercial Trucks",
      description: [
        "Light Truck → Small commercial vehicle (e.g., Toyota Hilux, Ford Ranger)",
        "Medium-Duty Truck → Delivery, box trucks (e.g., Isuzu NPR, Hino 500)",
        "Heavy-Duty Truck → Large cargo, long haul (e.g., Volvo FH16, Scania R500)",
        "Semi-Truck → Tractor-trailer truck (e.g., Freightliner Cascadia)",
      ],
    },
    {
      title: "🚌 Buses",
      description: [
        "City Bus → Public transport (e.g., Mercedes Citaro, Volvo 7900)",
        "Coach Bus → Long-distance travel (e.g., MAN Lion’s Coach)",
        "Minibus → Small, 10-25 passengers (e.g., Toyota Coaster)",
        "School Bus → Student transport (e.g., Blue Bird Vision)",
      ],
    },
    {
      title: "🏍️ Motorcycles",
      description: [
        "Cruiser → Low seat, relaxed riding (e.g., Harley-Davidson Street Glide)",
        "Sport Bike → Fast, aerodynamic (e.g., Yamaha R1, Kawasaki Ninja)",
        "Touring → Comfortable for long rides (e.g., BMW R1250GS, Honda Goldwing)",
        "Off-Road → Dirt, adventure bikes (e.g., KTM 450 EXC, Honda CRF250L)",
        "Scooter → Small, urban commuting (e.g., Vespa, Honda PCX)",
      ],
    },
    {
      title: "⚡ Electric Vehicles (EVs)",
      description: [
        "Electric Sedan → (e.g., Tesla Model S, BMW i4)",
        "Electric SUV → (e.g., Tesla Model X, Rivian R1S)",
        "Electric Truck → (e.g., Rivian R1T, Ford F-150 Lightning)",
      ],
    },
  ];

  return (
    <div className="min-h-screen dark:bg-[#01172F] text-[#FDC221] p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <h1 className="mb-8 text-4xl font-bold text-center">
          Vehicle Categories
        </h1>

        {/* Grid Layout for Vehicle Categories */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicleCategories.map((category, index) => (
            <div
              key={index}
              className="dark:bg-[#02203F] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="mb-4 text-2xl font-semibold">{category.title}</h2>
              <ul className="space-y-2">
                {category.description.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-900 dark:text-slate-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
