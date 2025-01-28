import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Search from "@/components/Search";
import SmallAdsRow from "@/components/Cars/SmallAdsRow";

export default function Home() {
  return (
    <section className="">
      <Search />
      <SmallAdsRow topic="Trending Toyota Cars" make="Toyota" type="Cars" />
      <SmallAdsRow topic="Trending Honda Cars" make="Honda" type="Cars" />
      <SmallAdsRow topic="Trending Suzuki Cars" make="Suzuki" type="Cars" />
    </section>
  );
}
