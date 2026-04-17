/* ── CURSOR ── */
const c1 = document.getElementById("c1"),
  c2 = document.getElementById("c2");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  c1.style.left = mx + "px";
  c1.style.top = my + "px";
});
(function loop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  c2.style.left = rx + "px";
  c2.style.top = ry + "px";
  requestAnimationFrame(loop);
})();

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(
  (es) => {
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".rv,.sk-c").forEach((el) => obs.observe(el));

/* ── ACTIVE NAV ── */
const nsec = document.querySelectorAll("section[id]"),
  nla = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let c = "";
  nsec.forEach((s) => {
    if (scrollY >= s.offsetTop - 160) c = s.id;
  });
  nla.forEach((a) =>
    a.classList.toggle("act", a.getAttribute("href") === "#" + c),
  );
});

/* ── PROJECT FILTER ── */
document.querySelectorAll(".pf").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pf").forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");
    const f = btn.dataset.f;
    document.querySelectorAll(".p-card").forEach((c) => {
      const show = f === "all" || c.dataset.c?.includes(f);
      c.style.opacity = show ? "1" : "0.18";
      c.style.transform = show ? "" : "scale(.97)";
      c.style.transition = "opacity .35s,transform .35s";
    });
  });
});

/* ── CERTIFICATES — open PDF in new tab ── */
document.querySelectorAll(".cert-c").forEach((card) => {
  card.addEventListener("click", () => window.open(card.dataset.pdf, "_blank"));
});
