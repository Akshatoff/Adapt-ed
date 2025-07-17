export const pricing = [
  {
    name: "Free",
    description: "For schools exploring AI-based learning",
    value: {
      monthly: 0,
      yearly: 0,
    },
    unit: "per user/month",
    currency: "₹",
    features: [
      "Access to sample learning paths",
      "Basic psychometric insights",
      "Interdisciplinary module previews",
      "Email support",
    ],
    button: {
      label: "Get started",
      href: "#",
      color: "light",
      icon: "tabler:arrow-right",
    },
  },
  {
    name: "Pro",
    description: "For institutions scaling personalization",
    value: {
      monthly: 799,
      yearly: 699,
    },
    unit: "per user/month",
    currency: "₹",
    features: [
      "All Free features",
      "Full AI-driven personalization",
      "Advanced learner analytics",
      "Customizable learning journeys",
    ],
    button: {
      label: "Start free trial",
      href: "#",
      icon: "tabler:rocket",
    },
  },
  {
    name: "Enterprise",
    description: "For large-scale adaptive learning rollouts",
    value: {
      monthly: 2499,
      yearly: 2349,
    },
    unit: "per user/month",
    currency: "₹",
    features: [
      "All Pro features",
      "Dedicated AI onboarding team",
      "Custom psychometric configurations",
      "Data dashboards & bulk integrations",
    ],
    button: {
      label: "Contact sales",
      href: "#",
      color: "light",
      icon: "tabler:mail",
    },
  },
];
