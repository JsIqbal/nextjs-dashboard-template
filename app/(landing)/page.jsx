import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

import LandingNavabr from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavabr/>
      <LandingHero/>
    </div>
  );
};

export default LandingPage;
