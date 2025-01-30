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
}

export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar_url: string;
}
