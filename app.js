/* ============================================================
   Offluencer – one-page site
   ============================================================ */

// ---- Config: switch things on here when they exist ----
const CONFIG = {
  instagram: null,        // e.g. "offluencer" once the account exists
  legalName: null,        // e.g. "Offluencer, Ime Prezime s.p." after registration
  formEndpoint: "https://formsubmit.co/ajax/mail@offluencer.com"
};

// ---- Language ----
const LANGS = { sr: "sr-Latn", en: "en" };
let lang = "sr";
try { const s = localStorage.getItem("lang"); if (s in LANGS) lang = s; } catch (e) {}

const t = (k) => (window.I18N[lang] && window.I18N[lang][k]) || window.I18N.sr[k] || k;
const L = (obj) => (typeof obj === "string" ? obj : obj[lang] || obj.sr);

function applyLang() {
  document.documentElement.lang = LANGS[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
  document.getElementById("prev").setAttribute("aria-label", t("arrow.prev"));
  document.getElementById("next").setAttribute("aria-label", t("arrow.next"));
  renderServices();
  renderTabs();
  renderRail(false);
}

document.getElementById("lang").addEventListener("click", () => {
  lang = lang === "sr" ? "en" : "sr";
  try { localStorage.setItem("lang", lang); } catch (e) {}
  applyLang();
});

// ---- Services ----
const SERVICES = [
  { sr: "Reels i shorts", en: "Reels & shorts" },
  { sr: "Instagram postovi", en: "Instagram posts" },
  { sr: "Karuseli i stories", en: "Carousels & stories" },
  { sr: "Vođenje društvenih mreža", en: "Social media management" },
  { sr: "Logo i rebranding", en: "Logo & rebranding" },
  { sr: "Bilbordi i print", en: "Billboards & print" },
  { sr: "Katalozi", en: "Catalogues" },
  { sr: "Najave i teaseri", en: "Launches & teasers" },
  { sr: "Video montaža", en: "Video editing" },
  { sr: "Foto i video na terenu", en: "On-site photo & video" },
  { sr: "Web sajtovi", en: "Websites" }
];
function renderServices() {
  document.getElementById("services").innerHTML = SERVICES.map((s) => `<li>${L(s)}</li>`).join("");
}

// ---- Work: categories and cards ----
// Cards live in primjeri.js (all brands fictional, every card badged).
const CATS = [
  { id: "reels", sr: "Reels", en: "Reels" },
  { id: "posts", sr: "Postovi", en: "Posts" },
  { id: "carousels", sr: "Karuseli", en: "Carousels" },
  { id: "results", sr: "Rezultati", en: "Results" },
  { id: "reviews", sr: "Recenzije", en: "Reviews" },
  { id: "branding", sr: "Brending", en: "Branding" },
  { id: "print", sr: "Print", en: "Print" },
  { id: "web", sr: "Web", en: "Web" }
];

// ---- Tabs + rail ----
const rail = document.getElementById("rail");
const tabsEl = document.getElementById("tabs");
let cat = "reels";
{ const q = new URLSearchParams(location.search).get("cat"); if (CATS.some((c) => c.id === q)) cat = q; } // ?cat=results opens that tab

function renderTabs() {
  tabsEl.innerHTML = CATS.map((c) =>
    `<button class="tab" role="tab" data-cat="${c.id}" aria-selected="${c.id === cat}">${L(c)}</button>`).join("");
}
tabsEl.addEventListener("click", (e) => {
  const b = e.target.closest(".tab");
  if (!b || b.dataset.cat === cat) return;
  cat = b.dataset.cat;
  tabsEl.querySelectorAll(".tab").forEach((x) => x.setAttribute("aria-selected", x === b));
  b.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  renderRail(true);
});

function renderRail(animate) {
  rail.innerHTML = window.PRIMJERI.filter((c) => c.cat === cat).map((c) => `
    <article class="card ${c.f}" ${c.ar ? `style="--ar:${c.ar}"` : ""}>
      <div class="card-frame">${c.html()}</div>
      <div class="card-cap"><div><strong>${c.brand}</strong><span>${L(c.type)}</span></div><em class="badge">${t(c.badge || "badge.concept")}</em></div>
    </article>`).join("");
  rail.scrollLeft = 0;
  if (animate) { rail.classList.remove("fade-in"); void rail.offsetWidth; rail.classList.add("fade-in"); }
  rail.querySelectorAll(".card").forEach((c) => cardObserver.observe(c));
  updateArrows();
}

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); });
}, { threshold: .35 });

// Arrows
const prev = document.getElementById("prev"), next = document.getElementById("next");
const step = () => (rail.querySelector(".card")?.offsetWidth || 300) + 20;
prev.addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: "smooth" }));
next.addEventListener("click", () => rail.scrollBy({ left: step(), behavior: "smooth" }));
function updateArrows() {
  prev.disabled = rail.scrollLeft < 8;
  next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
}
rail.addEventListener("scroll", updateArrows, { passive: true });
window.addEventListener("resize", updateArrows);

// Mouse drag to swipe (touch already swipes natively)
let drag = null;
rail.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse") return;
  drag = { x: e.clientX, left: rail.scrollLeft, moved: false };
});
window.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (Math.abs(dx) > 4) { drag.moved = true; rail.classList.add("dragging"); }
  rail.scrollLeft = drag.left - dx;
});
window.addEventListener("pointerup", () => {
  if (!drag) return;
  const moved = drag.moved; drag = null;
  rail.classList.remove("dragging");
  if (moved) { // snap to the nearest card
    const w = step();
    rail.scrollTo({ left: Math.round(rail.scrollLeft / w) * w, behavior: "smooth" });
  }
});
rail.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
  if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
});

// Chart tooltips (hover + focus)
function showTip(el) {
  const chart = el.closest(".r-chart"); const tip = chart && chart.querySelector(".tip");
  if (!tip) return;
  const r = el.getBoundingClientRect(), c = chart.getBoundingClientRect();
  const dot = el.querySelector("i.bar") || el;
  const dr = dot.getBoundingClientRect();
  tip.textContent = el.dataset.tip;
  tip.style.left = (r.left + r.width / 2 - c.left) + "px";
  tip.style.top = (dr.top - c.top) + "px";
  tip.classList.add("on");
}
function hideTip(el) { const tip = el.closest(".r-chart")?.querySelector(".tip"); if (tip) tip.classList.remove("on"); }
["pointerover", "focusin"].forEach((ev) => rail.addEventListener(ev, (e) => { const el = e.target.closest("[data-tip]"); if (el) showTip(el); }));
["pointerout", "focusout"].forEach((ev) => rail.addEventListener(ev, (e) => { const el = e.target.closest("[data-tip]"); if (el) hideTip(el); }));

// ---- Reveal on scroll ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); } });
}, { threshold: .15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---- Liquid glass: light follows the pointer ----
document.addEventListener("pointermove", (e) => {
  const el = e.target.closest && e.target.closest(".btn, .chips li, .tab, .arrow, .lang");
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", e.clientX - r.left + "px");
  el.style.setProperty("--my", e.clientY - r.top + "px");
}, { passive: true });

// ---- Nav border on scroll ----
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });

// ---- Contact form (FormSubmit AJAX, falls back to normal POST without JS) ----
const form = document.getElementById("form"), formStatus = document.getElementById("form-status");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true; formStatus.textContent = t("ct.f.sending");
  try {
    const res = await fetch(CONFIG.formEndpoint, {
      method: "POST", headers: { Accept: "application/json" }, body: new FormData(form)
    });
    if (!res.ok) throw new Error(res.status);
    form.reset(); formStatus.textContent = t("ct.f.ok");
  } catch (err) {
    formStatus.textContent = t("ct.f.err");
  } finally { btn.disabled = false; }
});

// ---- Config switches ----
if (CONFIG.instagram) {
  const a = document.getElementById("insta");
  a.href = "https://instagram.com/" + CONFIG.instagram;
  document.getElementById("insta-handle").textContent = "@" + CONFIG.instagram;
  a.hidden = false;
}
document.getElementById("year").textContent = new Date().getFullYear();
if (CONFIG.legalName) document.getElementById("legal").textContent = "© " + new Date().getFullYear() + " " + CONFIG.legalName;

applyLang();
