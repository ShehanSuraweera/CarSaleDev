import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Car {
  ad_id: string;

  ad_images: { image_url: string }[];

  body_type: string;

  make: string;

  model: string;

  build_year: string;

  mileage: string;

  fuel_type: string;

  price: string;

  engine: string;

  transmission: string;

  ad_location: string;
  created_at: string;
}

export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar_url: string;
}

export interface CarAdData {
  user_id: string;
  build_year: string;
  make: string;
  model: string;
  frame_code: string;
  owner_display_name: string;
  vehicle_condition: string;
  ad_location: string;
  created_at: string;
  ad_images: string[];
  owner_contact: string;
  price: string;
  is_negotiable: boolean;
  mileage: string;
  body_type: string;
  engine: string;
  transmission: string;
  fuel_type: string;
  reg_year: string;
  owner_comments: string;
  views: number;
  colour: string;
}
