export type Option = {
  id: string;
  title: string;
  desc?: string;
  hint?: string;
  /** Budget tiers only: the range in pesos (no max = "starts at"), for the USD view. */
  php?: { min: number; max?: number };
};

export const BUSINESS_SERVICES: Option[] = [
  { id: "business-website", title: "Business Website" },
  { id: "landing-page", title: "Landing Page" },
  { id: "web-system", title: "Web System / Portal" },
  { id: "inventory", title: "Inventory System" },
  { id: "booking", title: "Booking & Services" },
  { id: "other", title: "Something else" },
];

// The ids are stored with each request and mapped to labels by the API
// (budget_label in app/mailer.php, BUDGETS in public/requests.php).
export const BUSINESS_BUDGETS: Option[] = [
  { id: "15k", title: "Starts at ₱15,000", hint: "Static website", php: { min: 15000 } },
  { id: "20-40k", title: "₱20,000 – ₱40,000", hint: "Business website / system", php: { min: 20000, max: 40000 } },
  { id: "60k-up", title: "Starts at ₱60,000", hint: "Custom platform", php: { min: 60000 } },
  { id: "custom", title: "Set your own budget", hint: "Tell us your range" },
];

export const QUOTE_EMAIL = "systemasolution26@gmail.com";

export type QuoteData = {
  path: "business";
  service: string;
  businessName: string;
  industry: string;
  hasExisting: string;
  description: string;
  budget: string;
  customBudget: string;
  downpayment: string;
  name: string;
  email: string;
  phoneCode: string;
  phone: string;
  org: string;
};

export const INITIAL_DATA: QuoteData = {
  path: "business",
  service: "",
  businessName: "",
  industry: "",
  hasExisting: "",
  description: "",
  budget: "",
  customBudget: "",
  downpayment: "",
  name: "",
  email: "",
  phoneCode: "+63",
  phone: "",
  org: "",
};
