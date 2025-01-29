import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/src/config/site";
import { title, subtitle } from "@/src/components/primitives";
import { GithubIcon } from "@/src/components/icons";
import Search from "@/src/components/Search";
import SmallAdsRow from "@/src/components/Cars/SmallAdsRow";

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
