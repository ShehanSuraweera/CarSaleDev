import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen dark:bg-[#01172F] dark:text-[#FDC221] p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <h1 className="mb-8 text-4xl font-bold text-center">About Us</h1>

        {/* Our Mission Section */}
        <div className="dark:bg-[#02203F] p-8 rounded-lg shadow-lg mb-8">
          <div className="flex items-center mb-4">
            🚗
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-sm dark:text-slate-300">
            At Wandi.lk, our mission is to provide a seamless and trustworthy
            platform for buying and selling vehicles in Sri Lanka. We aim to
            empower our customers with the best deals, transparent information,
            and exceptional service.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="dark:bg-[#02203F] p-8 rounded-lg shadow-lg mb-8">
          <div className="flex items-center mb-4">
            🤝
            <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
          </div>
          <ul className="space-y-2 text-sm list-disc list-inside dark:text-slate-300">
            <li>Wide selection of vehicles from trusted sellers.</li>
            <li>Transparent pricing with no hidden fees.</li>
            <li>Dedicated customer support to assist you at every step.</li>
            <li>Secure and hassle-free transactions.</li>
          </ul>
        </div>

        {/* Our Team Section */}
        <div className="dark:bg-[#02203F] p-8 rounded-lg shadow-lg mb-8">
          <div className="flex items-center mb-4">
            👥
            <h2 className="text-2xl font-semibold">Our Team</h2>
          </div>
          <p className="text-sm dark:text-slate-300">
            Our team consists of passionate automotive enthusiasts and industry
            experts who are committed to delivering the best experience for our
            customers. From vehicle inspections to customer service, we ensure
            every detail is taken care of.
          </p>
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
            {/* Team Member Cards */}
            {[
              {
                name: "Pat Cummins",
                role: "Founder & CEO",
                bio: "Automotive expert with over 10 years of experience.",
              },
              {
                name: "John Doe",
                role: "Head of Sales",
                bio: "Specializes in customer relations and sales strategy.",
              },
              {
                name: "Jane Smith",
                role: "Marketing Manager",
                bio: "Drives brand awareness and customer engagement.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="dark:bg-[#01172F] p-4 rounded-lg shadow-md text-center dark:text-slate-300"
              >
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm ">{member.role}</p>
                <p className="mt-2 text-xs ">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="dark:bg-[#02203F] p-8 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            📧
            <h2 className="text-2xl font-semibold">Contact Us</h2>
          </div>
          <p className="mb-4 text-sm dark:text-slate-300">
            Have questions or need assistance? Reach out to us!
          </p>
          <ul className="space-y-2 text-sm dark:text-slate-300">
            <li>📧 Email: info@Wandi.lk</li>
            <li>📞 Phone: +94 77 123 4567</li>
            <li>📍 Address: 123 Colombo, Sri Lanka</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
