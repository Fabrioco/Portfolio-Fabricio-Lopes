import { Hero } from "@/components/sections/Hero";
import { Audience } from "@/components/sections/Audience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Stack } from "@/components/sections/Stack";
import { Process } from "@/components/sections/Process";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Audience />
      <FeaturedProjects />
      <Services />
      <Stack />
      <Process />
      <FinalCTA />
    </>
  );
}
