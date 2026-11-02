export function createInquiryDraft(recipient, data) {
  if (
    !/^[A-Za-z0-9.!#$%&'*+/=^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      recipient,
    )
  )
    throw new Error("A valid inquiry address is required.");
  const labels = {
    name: "Name",
    email: "Reply email",
    business: "Business / project",
    businessType: "Business type",
    brief: "Project description",
    service: "Interested service",
    timeline: "Timeframe",
    budget: "Budget context",
    contact: "Preferred contact",
    phone: "Phone",
  };
  const body = Object.entries(labels)
    .filter(([key]) => data[key])
    .map(([key, label]) => `${label}: ${data[key]}`)
    .join("\n\n");
  const subject = `Project inquiry — ${data.business || data.name || "Your project"}`;
  return {
    recipient,
    subject,
    body,
    text: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
    mailto: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

export function createInquiryEmail(recipient, data) {
  return createInquiryDraft(recipient, data).mailto;
}
