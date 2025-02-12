import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface AdData {
  ad_id: string;
  frame_code: string;
  ad_images: { image_url: string; created_at: string }[];
  owner_display_name: string;
  body_type: string;
  vehicle_condition: string;
  make: string;
  owner_contact: string;
  model: string;
  colour: string;
  owner_comments: string;
  is_negotiable: boolean;
  views: number;
  build_year: string;
  mileage: string;
  fuel_type: string;
  price: string;
  engine: string;
  transmission: string;
  reg_year: string;
  created_at: string;
  cities: { name: string; districts: { name: string } }; // City object with district inside
}

export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar_url: string;
  cities: { id: number; name: string; districts: { id: number; name: string } };
}

// export interface CarAdData {
//   user_id: string;
//   build_year: string;
//   make: string;
//   model: string;
//   frame_code: string;
//   owner_display_name: string;
//   vehicle_condition: string;
//   ad_location: string;
//   created_at: string;
//   ad_images: string[];
//   owner_contact: string;
//   price: string;
//   is_negotiable: boolean;
//   mileage: string;
//   body_type: string;
//   engine: string;
//   transmission: string;
//   fuel_type: string;
//   reg_year: string;
//   owner_comments: string;
//   views: number;
//   colour: string;
// }

export interface AdFormData {
  user_id: string;
  make: "";
  model: "";
  frame_code: "";
  build_year: "";
  transmission: "";
  body_type: "";
  vehicle_condition: "";
  reg_year: "";
  mileage: "";
  engine: "";
  colour: "";
  fuel_type: "";
  price: "";
  owner_comments: "";
  owner_contact: "";
  owner_display_name: "";
  is_negotiable: false;
  vehicle_type: "";
  district_id: "";
  city_id: "";
  imageUrls: string[];
}
