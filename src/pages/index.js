import Head from "next/head";
import { FeatureSection } from "@/components/sections/FeatureSection";
import {
  Header,
  HeroSection,
  TestimonialSection,
  FaqSection,
  Footer,
  PricingSection,
  LargeFeatureSection,
  CtaSection,
} from "../components/sections";

import {
  header,
  faqs,
  testimonials,
  features,
  pricing,
  clients,
  footer,
} from "@/data";

export default function Home() {
  return (
    <>
      <Head>
        <title>Adapt-Ed – AI-Powered Personalized Education</title>
      </Head>
      <Header
        logo={header.logo}
        links={header.links}
        buttons={header.buttons}
      />

      
      <HeroSection
        id="home"
        badge={{
          href: "#",
          icon: "tabler:arrow-right",
          label: "🚀 Hyper-Personalized Learning Starts Here",
        }}
        title="Elevating Your Education to The Next Level"
        description="Adapt-Ed is an platform that identifies each student's unique learninig profile to create a personalized, study plan that align with their interest and learning style."
        buttons={[
          {
            href: "/test",
            label: "Find your Style",
            color: "dark",
          },
          {
            href: "#features",
            label: "Features",
            color: "transparent",
            variant: "link",
            icon: "tabler:arrow-right",
          },
        ]}
        image={{
          src: "./tablet-mockup.png",
          alt: "Adapt-Ed Screenshot",
          className: "w-full h-auto",
        }}
      
      />

      
      <FeatureSection
        id="features"
        title="Adapted learning for each student"
        description="Our powerful AI agent, find the optimal learning style for each user, and creates a learning plan for them which is effective and also aligns with their interests"
        features={features}
      />


      <LargeFeatureSection
        title="Break Subject Boundaries"
        description="No more boring and isolated subjects—Adapt-Ed connects subjects with passions to help students learn in ways that are naturally interconnected and fun."
        list={features.slice(0, 3)}
        image={{
          src: "./phone-mockup.png",
          alt: "Interdisciplinary Learning Demo",
          className:
            "w-full aspect-square object-contain rotate-6 hover:rotate-0 duration-300 ease-in-out",
        }}
      />

      <LargeFeatureSection
        reverse={true}
        title="Advanced Psychometric Learning"
        description="Leveraging cutting-edge psychometric data, Adapt-Ed builds dynamic learner profiles to recommend personalized content that fits each student’s unique cognitive strengths and learning style."
        list={features.slice(3, 6)}
        image={{
          src: "./phone-mockup.png",
          alt: "Psychometric Profile View",
          className:
            "w-full aspect-square object-contain -rotate-6 hover:rotate-0 duration-300 ease-in-out",
        }}
      />

      <PricingSection
        id="pricing"
        title="Accessible Plans for Every Institution"
        description="From small schools to large educational networks, Adapt-Ed offers scalable pricing to bring AI-powered personalization to every learner."
        badge={{
          leading: true,
          icon: "tabler:credit-card",
          label: "Plans",
        }}
        pricing={pricing}
      />

      <TestimonialSection
        id="testimonials"
        title="Real Impact, Real Stories"
        description="Hear from educators and students who’ve transformed their learning journeys through Adapt-Ed."
        badge={{
          leading: true,
          icon: "tabler:heart",
          label: "TESTIMONIALS",
        }}
        testimonials={testimonials}
        button={{
          icon: "tabler:brand-x",
          label: "Share Your Experience",
          href: "#",
          color: "white",
        }}
      />

      <FaqSection
        id="faqs"
        title="Got Questions?"
        description="We're here to help. Explore some frequently asked questions or reach out for personalized guidance."
        buttons={[
          {
            label: "Contact Support",
            href: "#",
            color: "primary",
            variant: "link",
            icon: "tabler:arrow-right",
          },
        ]}
        faqs={faqs}
      />

      <CtaSection
        title="Join the Education Evolution"
        description="Empower your institution with a learning platform that puts students first, adapts intelligently, and unlocks untapped potential."
        buttons={[{ label: "Start for Free", href: "#", color: "dark" }]}
      />

      <Footer
        id="footer"
        copyright={footer.copyright}
        logo={footer.logo}
        social={footer.social}
        links={footer.links}
      />
    </>
  );
}
