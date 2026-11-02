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
