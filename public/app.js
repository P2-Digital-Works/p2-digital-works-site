import { validateQuote } from "./validation.js";
import { deliveryEnabled } from "./site-config.js";
const menu = document.querySelector(".menu-toggle"),
  nav = document.querySelector("#main-nav");
const closeMenu = (restore = false) => {
  nav.classList.remove("is-open");
  menu.setAttribute("aria-expanded", "false");
  if (restore) menu.focus();
};
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.getAttribute("aria-expanded") === "true")
    closeMenu(true);
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".site-header")) closeMenu();
});
matchMedia("(min-width:801px)").addEventListener("change", (e) => {
  if (e.matches) closeMenu();
});
document.querySelector("#year").textContent = new Date().getFullYear();
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        if (e.isIntersecting)
          nav.querySelectorAll("a").forEach((a) => {
            if (a.hash === `#${e.target.id}`)
              a.setAttribute("aria-current", "location");
            else a.removeAttribute("aria-current");
          });
    },
    { rootMargin: "-15% 0px -60% 0px" },
  );
  document
    .querySelectorAll("main>section[id]")
    .forEach((s) => observer.observe(s));
}
const form = document.querySelector("#quote-form");
for (const link of document.querySelectorAll("[data-service]"))
  link.addEventListener("click", () => {
    form.elements.service.value = link.dataset.service;
    if (link.dataset.budget) form.elements.budget.value = link.dataset.budget;
    form.dispatchEvent(new Event("input", { bubbles: true }));
    form.elements.service.removeAttribute("aria-invalid");
    document.querySelector("#service-error").textContent = "";
  });
const projects = {
  northline: {
    title: "Northline Studio",
    intro: "A business website concept for a fictional architecture practice.",
    need: "Help prospective clients understand the studio’s approach, explore project types, and start a useful conversation.",
    scope: [
      "A visual introduction with clear service positioning",
      "A project gallery and individual project structure",
      "A simple inquiry journey for prospective clients",
    ],
    boundary:
      "Images, project descriptions, and credentials would need to come from the real business. This is an interface study, not a completed client website.",
    service: "Business website",
  },
  bakery: {
    title: "Daily Bread Bakery",
    intro: "A product catalog concept for a fictional neighborhood bakery.",
    need: "Make it easy to discover the range, check product information, and plan a visit or inquiry.",
    scope: [
      "A mobile-friendly product catalog",
      "Clear locations, hours, and product information",
      "A simple path to contact the bakery",
    ],
    boundary:
      "Ordering, inventory, allergens, prices, and payments require separate scoping and verified business content. This concept does not take orders.",
    service: "E-commerce & integrations",
  },
  pulse: {
    title: "Pulse Appointment Portal",
    intro: "An appointment interface concept for a fictional clinic.",
    need: "Explore how a focused daily schedule could help a team organize appointments and availability.",
    scope: [
      "A readable daily appointment overview",
      "A proposed booking and availability workflow",
      "Responsive layouts for front-desk tasks",
    ],
    boundary:
      "This visual concept contains no patient data. Authentication, access controls, privacy requirements, audit trails, and live scheduling must be designed and validated before clinical use.",
    service: "Custom web application",
  },
};
const dialog = document.querySelector("#project-dialog");
let opener;
for (const button of document.querySelectorAll("[data-project]"))
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    opener = button;
    document.querySelector("#project-title").textContent = project.title;
    document.querySelector("#project-intro").textContent = project.intro;
    const detail = document.querySelector("#project-detail");
    detail.replaceChildren();
    for (const [heading, value] of [
      ["The business need", project.need],
      ["Proposed scope", project.scope],
      ["Concept boundaries", project.boundary],
    ]) {
      const h = document.createElement("h3");
      h.textContent = heading;
      detail.append(h);
      if (Array.isArray(value)) {
        const ul = document.createElement("ul");
        for (const text of value) {
          const li = document.createElement("li");
          li.textContent = text;
          ul.append(li);
        }
        detail.append(ul);
      } else {
        const p = document.createElement("p");
        p.textContent = value;
        detail.append(p);
      }
    }
    document.querySelector("#project-cta").dataset.service = project.service;
    dialog.showModal();
    document.body.classList.add("body-modal");
    document.querySelector(".dialog-close").focus();
  });
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("body-modal");
  opener?.focus();
});
document.querySelector("#project-cta").addEventListener("click", (e) => {
  form.elements.service.value = e.currentTarget.dataset.service;
  form.dispatchEvent(new Event("input", { bubbles: true }));
  dialog.close();
});
const status = document.querySelector("#form-status"),
  submit = document.querySelector("#submit-quote"),
  submitLabel = document.querySelector("#submit-label"),
  download = document.querySelector("#download-request");
let downloadUrl,
  busy = false;
const setStatus = (message, tone = "") => {
  status.textContent = message;
  status.className = `form-status ${tone}`;
};
const renderErrors = (errors) => {
  for (const name of [
    "name",
    "email",
    "business",
    "businessType",
    "service",
    "budget",
    "timeline",
    "contact",
    "phone",
    "brief",
    "consent",
  ]) {
    const field = form.elements[name];
    document.querySelector(`#${name}-error`).textContent = errors[name] || "";
    if (errors[name]) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }
};
const prepareDownload = (data) => {
  if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  const rows = [
    "P2 Digital Works — project request",
    "This copy is a brief, not proof of delivery.",
    "",
    ...Object.entries(data).map(([k, v]) => `${k}: ${v}`),
  ];
  downloadUrl = URL.createObjectURL(
    new Blob([rows.join("\n")], { type: "text/plain;charset=utf-8" }),
  );
  download.href = downloadUrl;
  download.hidden = false;
};
if (deliveryEnabled) {
  submitLabel.textContent = "Send quote request";
  document.querySelector("#mode-notice").textContent =
    "Online delivery is connected. Your details will be sent for a project discussion.";
}
form.elements.contact.addEventListener("change", () => {
  const phone = form.elements.contact.value === "Phone";
  document.querySelector("#phone-field").hidden = !phone;
  form.elements.phone.required = phone;
});
form.elements.brief.addEventListener("input", (e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${Math.min(400, e.target.scrollHeight + 2)}px`;
});
form.addEventListener("input", () => {
  download.hidden = true;
  if (downloadUrl) {
    URL.revokeObjectURL(downloadUrl);
    downloadUrl = undefined;
  }
  if (!busy) setStatus("");
});
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (busy) return;
  const raw = {
    ...Object.fromEntries(new FormData(form)),
    consent: form.elements.consent.checked,
  };
  const { data, errors } = validateQuote(raw);
  renderErrors(errors);
  if (Object.keys(errors).length) {
    setStatus(
      "Please check the highlighted fields. Your details are still here.",
      "error",
    );
    form.elements[Object.keys(errors)[0]]?.focus();
    return;
  }
  if (raw.website) {
    setStatus("This request could not be accepted.", "error");
    return;
  }
  prepareDownload(data);
  if (!deliveryEnabled) {
    setStatus(
      "Your request is ready to download. It has not been sent to P2 Digital Works.",
      "success",
    );
    status.focus();
    return;
  }
  busy = true;
  submit.disabled = true;
  form.setAttribute("aria-busy", "true");
  submitLabel.textContent = "Sending request…";
  setStatus("Sending your request. Please keep this page open.");
  try {
    const result = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, website: raw.website }),
      signal: AbortSignal.timeout(12000),
    });
    const payload = await result.json();
    if (!result.ok) {
      if (payload.errors) {
        renderErrors(payload.errors);
        form.elements[Object.keys(payload.errors)[0]]?.focus();
      }
      throw Error(
        payload.error ||
          "Delivery could not be confirmed. Your details are still here.",
      );
    }
    if (payload.delivered !== true)
      throw Error(
        "Delivery could not be confirmed. Keep a copy before retrying.",
      );
    setStatus(payload.message, "success");
    status.focus();
  } catch (error) {
    setStatus(
      error.name === "TimeoutError"
        ? "Delivery confirmation timed out. Keep a copy before retrying; the service may have received your request."
        : error instanceof TypeError
          ? "Connection interrupted. Your details are still here. Download a copy and check your connection before retrying."
          : error.message,
      "error",
    );
  } finally {
    busy = false;
    submit.disabled = false;
    form.removeAttribute("aria-busy");
    submitLabel.textContent = "Send quote request";
  }
});
window.addEventListener("pagehide", () => {
  if (downloadUrl) URL.revokeObjectURL(downloadUrl);
});

// Enable only after the validated submit handler has been installed.
submit.disabled = false;
