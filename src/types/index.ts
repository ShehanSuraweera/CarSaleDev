import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface AdData {
  ad_id: string;
  body_type: string;
  build_year: string;
  city: { id: number; name: string };
  colour: string;
  created_at: string;
  district: { id: number; name: string };
  engine: string;
  frame_code: string;
  fuel_type: string;
  images: string[];
  is_negotiable: boolean;
  make: { id: number; name: string };
  mileage: string;
  model: { id: number; name: string };
  owner_comments: string;
  owner_contact: string;
  owner_display_name: string;
  price: number;
  reg_year: string;
  title: string;
  transmission: string;
  user_id: string;
  vehicle_condition: "";
  vehicle_type_id: "";
  views: number;
}

export interface MediumAdProps {
  ad_id: string;
  body_type: string;
}

export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  city: { name: string; id: number };
  district: { id: number; name: string };
}
