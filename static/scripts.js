/* ══════════ PREMIUM CURSOR ══════════ */
const cur = document.getElementById("cur");
const ring = document.getElementById("cur-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
let magnetActive = false;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (!magnetActive) {
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  }
});

(function lerp() {
  rx += (mx - rx) * 0.09;
  ry += (my - ry) * 0.09;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(lerp);
})();

// Hover state
document
  .querySelectorAll("a,button,.pc,.cert,.skill-card,.pill,.af,.an,.tl-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.classList.add("hover");
      ring.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cur.classList.remove("hover");
      ring.classList.remove("hover");
    });
  });

// Magnetic effect on CTA buttons
document
  .querySelectorAll(".btn-red,.btn-outline-ink,.nav-cta,.drawer-cta,.cl,.t-run")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.classList.remove("hover");
      ring.classList.remove("hover");
      cur.classList.add("magnetic");
      ring.classList.add("magnetic");
    });
    el.addEventListener("mouseleave", () => {
      cur.classList.remove("magnetic");
      ring.classList.remove("magnetic");
      magnetActive = false;
      el.style.transform = "";
    });
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      cur.style.left = cx + dx * 0.5 + "px";
      cur.style.top = cy + dy * 0.5 + "px";
      magnetActive = true;
    });
  });

/* ══════════ NAV SCROLL & EFFECTS ══════════ */
const nav = document.querySelector("nav");
window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  },
  { passive: true },
);

/* ══════════ MOBILE NAV DRAWER ══════════ */
const navToggle = document.getElementById("navToggle");
const mobileDrawer = document.getElementById("mobileDrawer");

// Create backdrop dynamically for cleaner DOM
const drawerBackdrop = document.createElement("div");
drawerBackdrop.className = "drawer-backdrop";
document.body.appendChild(drawerBackdrop);

function toggleMenu(forceClose = false) {
  const isOpen = forceClose ? false : !mobileDrawer.classList.contains("active");
  
  navToggle.classList.toggle("active", isOpen);
  mobileDrawer.classList.toggle("active", isOpen);
  drawerBackdrop.classList.toggle("active", isOpen);
  
  // Toggle body scroll locking
  document.body.style.overflow = isOpen ? "hidden" : "";
}

if (navToggle && mobileDrawer) {
  navToggle.addEventListener("click", () => toggleMenu());
  drawerBackdrop.addEventListener("click", () => toggleMenu(true));
  
  // Close drawer when clicking any link inside it
  const drawerLinks = mobileDrawer.querySelectorAll(".drawer-links a, .drawer-cta");
  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(true));
  });
}

/* ══════════ SCROLLSPY (ACTIVE SECTIONS) ══════════ */
const spySections = document.querySelectorAll("section[id]");
const desktopLinks = document.querySelectorAll(".nav-links a");
const sideLinks = document.querySelectorAll(".drawer-links a");

const spyOptions = {
  root: null,
  rootMargin: "-25% 0px -65% 0px", // Trigger when section occupies top-middle part of screen
  threshold: 0,
};

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute("id");
      
      const updateActiveState = (links) => {
        links.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${activeId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      };
      
      updateActiveState(desktopLinks);
      updateActiveState(sideLinks);
    }
  });
}, spyOptions);

spySections.forEach((section) => spyObserver.observe(section));

/* ══════════ TICKER ══════════ */
const skills = [
  "Python",
  "Flask",
  "React",
  "JavaScript",
  "PostgreSQL",
  "Git",
  "HTML/CSS",
  "SQLite",
  "Jinja2",
  "Tailwind",
  "CS50X",
  "Algorithms",
  "Bootstrap",
  "Java",
  "C",
  "REST APIs",
  "Django",
  "WebSockets",
];
const t = document.getElementById("ticker");
const row = [...skills, ...skills]
  .map((s) => `<span class="tk-item">${s}</span>`)
  .join("");
t.innerHTML = row + row;

/* ══════════ SCROLL REVEAL ══════════ */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("vis");
        e.target
          .querySelectorAll(".skill-card,.cert,.pc,.af,.an")
          .forEach((c, i) => {
            c.style.transitionDelay = i * 65 + "ms";
            c.style.opacity = "1";
          });
      }
    });
  },
  { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
);
document.querySelectorAll(".rv,.tl-row").forEach((el) => io.observe(el));

/* ══════════ RAG ASSISTANT ══════════ */
const DOCS = [
  {
    t: "identity name who rashni",
    c: "Rashni Thapa Magar aspiring software developer Kathmandu Nepal",
    a: "I'm Rashni's portfolio assistant! Rashni Thapa Magar is an aspiring software developer based in Kathmandu, Nepal — passionate about building scalable, user-friendly web applications. What would you like to know? 😊",
  },
  {
    t: "education study bca university degree semester college school",
    c: "BCA SESAM 5th semester 2027 Kamala Secondary Sindhuli",
    a: "Rashni is in her 5th semester of a Bachelor of Computer Applications (BCA) at SESAM (School of Environmental Science and Management), Kathmandu, graduating in 2027. She completed her +2 in Science from Kamala Secondary School, Sindhuli.",
  },
  {
    t: "skills programming languages python javascript java c tech stack know",
    c: "Python strongest JavaScript Java C C# HTML CSS React Tailwind Bootstrap Flask SQL MySQL PostgreSQL SQLite Git GitHub Django",
    a: "Rashni's tech stack: Python (strongest), JavaScript, Java, C, C#. Frontend: HTML, CSS, React, Tailwind, Bootstrap. Backend: Flask, Django. Databases: SQL, MySQL, PostgreSQL, SQLite. Tools: Git & GitHub. 💻",
  },
  {
    t: "velora ecommerce trust platform django react biggest project",
    c: "VELORA Django React PostgreSQL JWT WebSocket trust score multi-role buyer seller admin verified reviews real-time chat",
    a: "Rashni's flagship project is VELORA — a trust-focused ecommerce platform built with Django, React, and PostgreSQL. It features JWT auth, real-time buyer-seller messaging (WebSockets), verified reviews (only from delivered orders), a seller trust score system, and multi-role dashboards (Buyer / Seller / Admin). Her most complex full-stack system yet. 🏆",
  },
  {
    t: "project chat real time messaging flask javascript",
    c: "Real-Time Chat Application Flask JavaScript WebSockets",
    a: "Rashni built a Real-Time Chat Application with Flask and JavaScript — full-duplex messaging without page reloads, mastering client-server architecture and WebSocket patterns. 🚀",
  },
  {
    t: "project expense tracker finance python sqlite money",
    c: "Expense Tracker Python Flask SQLite analytics dashboard",
    a: "She built an Expense Tracker using Python, Flask, and SQLite — track, categorize, and analyze daily expenses with a financial insights dashboard.",
  },
  {
    t: "project blog vlog platform content postgresql jinja",
    c: "Blog Vlog Platform Flask Jinja2 PostgreSQL CMS",
    a: "The Blog/Vlog Platform is a full CMS built with Flask, Jinja2, and PostgreSQL — create, publish, and browse posts. Full-stack from top to bottom.",
  },
  {
    t: "project todo list task react crud",
    c: "To-Do List App React JavaScript CRUD",
    a: "Rashni's To-Do List App was her entry into React — responsive task manager with full CRUD operations and clean component architecture. 📝",
  },
  {
    t: "projects built all portfolio work how many",
    c: "5 projects Velora Chat Expense Blog ToDo",
    a: "Rashni has built 5 projects: VELORA (Django+React+PostgreSQL — her flagship), Real-Time Chat App (Flask+JS), Expense Tracker (Python+Flask+SQLite), Blog/Vlog Platform (Flask+PostgreSQL), and To-Do List (React). All built independently! 💪",
  },
  {
    t: "certificate cs50p python harvard",
    c: "CS50P Harvard 2025 Python",
    a: "Rashni earned CS50P — Introduction to Programming with Python from Harvard University (edX) in 2025. Deep Python: OOP, file I/O, regex, problem-solving. ⭐",
  },
  {
    t: "certificate cs50x computer science harvard",
    c: "CS50X Harvard 2026 algorithms C SQL",
    a: "She completed CS50X — Harvard's legendary intro CS course in 2026. C, Python, SQL, algorithms, data structures, and memory management across 11 weeks.",
  },
  {
    t: "certificate claude anthropic ai",
    c: "Claude 101 Anthropic 2026 AI Fundamentals",
    a: "Rashni earned Claude 101 from Anthropic in 2026 — prompt engineering, AI capabilities, and AI-native workflow design. Plus Generative AI Mastermind (Outskill) and AI Workshop (Growth School).",
  },
  {
    t: "certificates all credentials learning",
    c: "CS50P CS50X Claude101 Anthropic Outskill Growth School 5",
    a: "5 certificates total: CS50P & CS50X from Harvard, Claude 101 from Anthropic, Generative AI Mastermind (Outskill), and AI Workshop (Growth School). 🏆",
  },
  {
    t: "experience work job internship hire",
    c: "no formal work experience student first internship entry level",
    a: "Rashni doesn't have formal work experience yet — she's built 5 real projects independently and earned Harvard + Anthropic certs. Actively looking for her first internship or entry-level role. Her motto: 'Zero experience means all my best work is ahead.' 🌱",
  },
  {
    t: "contact hire email phone available freelance",
    c: "rashnithapamagar2@gmail.com 9828011064 Kathmandu Nepal",
    a: "Reach Rashni at rashnithapamagar2@gmail.com or call/WhatsApp 9828011064. Based in Kathmandu — open to internships, freelance, entry-level, and remote roles. She replies same day! 📬",
  },
  {
    t: "personality philosophy who curious detail",
    c: "detail-oriented curious zero experience best work ahead",
    a: "Rashni is detail-oriented, curious, and loves building things. She believes in understanding *why* code works. Philosophy: 'Zero work experience just means all my best work is still ahead of me.' She uses AI as a deliberate collaborator. 💚",
  },
  {
    t: "hello hi assistant what you",
    c: "portfolio AI assistant RAG",
    a: "Hi! I'm Rashni's portfolio assistant — a RAG system built right into this portfolio. Ask me about her skills, projects, certs, education, or how to get in touch. ✨",
  },
];

function bm25(q, doc) {
  const toks = q
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1);
  const combined = (doc.t + " " + doc.t + " " + doc.c)
    .toLowerCase()
    .split(/\s+/);
  const tf = {};
  combined.forEach((t) => (tf[t] = (tf[t] || 0) + 1));
  let sc = 0;
  toks.forEach((qt) => {
    Object.keys(tf)
      .filter((t) => t.includes(qt) || qt.includes(t))
      .forEach((t) => {
        const f = tf[t];
        sc += (f * 2.5) / (f + 1.5 * (0.25 + 0.75 * (combined.length / 20)));
      });
  });
  return sc;
}

function getAns(q) {
  const top = DOCS.map((d) => ({ ...d, s: bm25(q, d) }))
    .filter((d) => d.s > 0.15)
    .sort((a, b) => b.s - a.s);
  return top.length
    ? top[0].a
    : "I don't have that detail — reach Rashni at rashnithapamagar2@gmail.com, she replies same day! 😊";
}

const apMsgs = document.getElementById("apMsgs");
const apInp = document.getElementById("apInp");
const apSend = document.getElementById("apSend");

function addMsg(r, t) {
  const d = document.createElement("div");
  d.className = "tm " + r;
  d.innerHTML = `<div class="tm-av ${r}">${r === "ai" ? "AI" : "YOU"}</div><div class="tm-b">${t}</div>`;
  apMsgs.appendChild(d);
  apMsgs.scrollTop = apMsgs.scrollHeight;
}
function showDots() {
  const d = document.createElement("div");
  d.className = "tm ai";
  d.id = "td";
  d.innerHTML =
    '<div class="tm-av ai">AI</div><div class="tm-b"><div class="dots"><span></span><span></span><span></span></div></div>';
  apMsgs.appendChild(d);
  apMsgs.scrollTop = apMsgs.scrollHeight;
}
function rmDots() {
  document.getElementById("td")?.remove();
}
function send() {
  const q = apInp.value.trim();
  if (!q) return;
  apInp.value = "";
  apSend.disabled = true;
  addMsg("u", q);
  showDots();
  setTimeout(() => {
    rmDots();
    addMsg("ai", getAns(q));
    apSend.disabled = false;
  }, 600);
}
apSend.addEventListener("click", send);
apInp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});

/* ══════════ HERO ENTRANCE ══════════ */
document.querySelectorAll(".hero-word").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(44px)";
  el.style.transition = `opacity .8s ${0.1 + i * 0.14}s cubic-bezier(0.16,1,0.3,1), transform .8s ${0.1 + i * 0.14}s cubic-bezier(0.16,1,0.3,1)`;
  setTimeout(() => {
    el.style.opacity = "1";
    el.style.transform = "none";
  }, 80);
});

[".hero-left", ".hero-bottom"].forEach((s, i) => {
  const el = document.querySelector(s);
  if (!el) return;
  el.style.opacity = "0";
  el.style.transition = `opacity .9s ${0.55 + i * 0.18}s ease`;
  setTimeout(() => {
    el.style.opacity = "1";
  }, 80);
});
