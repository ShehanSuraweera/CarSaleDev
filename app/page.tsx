import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Search from "@/components/Search";
import SmallAdsRow from "@/components/Cars/SmallAdsRow";

export default function Home() {
  return (
    <section className="">
      <Search />
      <SmallAdsRow topic="Trending Toyota Cars" />
      <SmallAdsRow topic="Trending Honda Cars" />
      <SmallAdsRow topic="Trending Suzuki Cars" />
    </section>
  );
}
