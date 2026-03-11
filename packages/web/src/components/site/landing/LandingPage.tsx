import { Features } from "./Features";
import { Hero } from "./Hero";
import { Highlights } from "./Highlights";
import { HowItWorks } from "./HowItWorks";
import { LandingCTA } from "./LandingCTA";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { MultiPlatform } from "./MultiPlatform";
import { QuickStart } from "./QuickStart";
import { TechStack } from "./TechStack";
import { WhyNotNextjs } from "./WhyNotNextjs";
import { WhyVibeCodingFails } from "./WhyVibeCodingFails";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors">
      <LandingHeader />
      <main>
        <Hero />
        <QuickStart />
        <WhyVibeCodingFails />
        <Features />
        <MultiPlatform />
        <WhyNotNextjs />
        <HowItWorks />
        <Highlights />
        <TechStack />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
