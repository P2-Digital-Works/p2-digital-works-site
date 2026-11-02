export const choices = {
  service: [
    "Business website",
    "Custom web application",
    "Website care",
    "E-commerce & integrations",
    "Help me decide",
  ],
  timeline: ["Within a month", "1–2 months", "3+ months", "Just exploring"],
  contact: ["Email", "Phone"],
};
export function validateQuote(input) {
  const errors = {};
  const data = {};
  const source =
    input && typeof input === "object" && !Array.isArray(input) ? input : {};
  for (const [key, min, max, label] of [
    ["name", 2, 100, "your name"],
    ["email", 3, 254, "a valid email address"],
    ["business", 0, 150, "your business or project name"],
    ["businessType", 0, 100, "your business type"],
    ["brief", 20, 5000, "a short description of 20–5,000 characters"],
    ["phone", 0, 40, "a phone number"],
    ["budget", 0, 100, "a short budget description"],
  ]) {
    data[key] = typeof source[key] === "string" ? source[key].trim() : "";
    if (
      data[key].length < min ||
      data[key].length > max ||
      (source[key] != null && typeof source[key] !== "string")
    )
      errors[key] =
        `Please enter ${label}${key === "brief" ? "." : ` (up to ${max} characters).`}`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter an email address such as name@business.com.";
  for (const [key, values] of Object.entries(choices)) {
    data[key] = typeof source[key] === "string" ? source[key] : "";
    if (key === "contact" && !data[key]) data[key] = "Email";
    if (data[key] && !values.includes(data[key]))
      errors[key] = "Choose one of the available options.";
  }
  if (data.contact === "Phone" && !/^[+\d][\d\s().-]{6,39}$/.test(data.phone))
    errors.phone =
      "Enter a phone number with its country code, or choose Email.";
  data.consent = source.consent === true;
  if (!data.consent)
    errors.consent = "Please agree to being contacted about this request.";
  return { data, errors };
}
