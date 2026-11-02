export const defaultEmail = "paulrodolf.castor@g.msuiit.edu.ph";
export function getPublicConfig(env = {}) {
  const contactEmail = env.CONTACT_EMAIL || defaultEmail;
  if (
    !/^[A-Za-z0-9.!#$%&'*+/=^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      contactEmail,
    )
  )
    throw Error("CONTACT_EMAIL must be a single valid email address.");
  return { deliveryEnabled: Boolean(env.QUOTE_WEBHOOK_URL), contactEmail };
}
export function publicConfigScript(env = {}) {
  const config = getPublicConfig(env);
  return `export const deliveryEnabled = ${config.deliveryEnabled};\nexport const contactEmail = ${JSON.stringify(config.contactEmail)};\n`;
}
export function applySiteSettings(html, env = {}) {
  const { contactEmail, deliveryEnabled } = getPublicConfig(env);
  let result = html.replaceAll(defaultEmail, contactEmail);
  if (deliveryEnabled && result.includes("<!-- delivery-privacy -->")) {
    if (!env.INQUIRY_PRIVACY_NOTE)
      throw Error(
        "INQUIRY_PRIVACY_NOTE must explain the actual receiver and retention/contact arrangements before enabling direct inquiry delivery.",
      );
    const note = env.INQUIRY_PRIVACY_NOTE.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
    result = result.replace(
      "<!-- delivery-privacy -->",
      `<h2>Direct website inquiries</h2><p>${note}</p>`,
    );
  }
  return result;
}
