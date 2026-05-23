/* CURSOR */
const cur = document.getElementById("cur"),
  ring = document.getElementById("cur-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});
(function a() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(a);
})();
document
  .querySelectorAll("a,button,.pc,.cert,.skill-card,.pill,.af")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.style.width = "22px";
      cur.style.height = "22px";
      cur.style.background = "var(--ink)";
      ring.style.width = "52px";
      ring.style.height = "52px";
    });
    el.addEventListener("mouseleave", () => {
      cur.style.width = "14px";
      cur.style.height = "14px";
      cur.style.background = "var(--red)";
      ring.style.width = "38px";
      ring.style.height = "38px";
    });
  });

/* TICKER */
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
];
const t = document.getElementById("ticker");
const row = [...skills, ...skills]
  .map((s) => `<span class="tk-item">${s}</span>`)
  .join("");
t.innerHTML = row + row;

/* SCROLL REVEAL */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("vis");
        e.target
          .querySelectorAll(".skill-card,.cert,.pc,.af,.an")
          .forEach((c, i) => {
            c.style.transitionDelay = i * 70 + "ms";
            c.style.opacity = "1";
          });
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".rv,.tl-row").forEach((el) => io.observe(el));

/* RAG ASSISTANT */
const DOCS = [
  {
    t: "identity name who",
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
    c: "Python strongest JavaScript Java C C# HTML CSS React Tailwind Bootstrap Flask SQL MySQL PostgreSQL SQLite Git GitHub",
    a: "Rashni's tech stack: Python (strongest), JavaScript, Java, C, C#. Frontend: HTML, CSS, React, Tailwind, Bootstrap. Backend: Flask. Databases: SQL, MySQL, PostgreSQL, SQLite. Tools: Git & GitHub. 💻",
  },
  {
    t: "project chat real time messaging flask javascript",
    c: "Real-Time Chat Application Flask JavaScript",
    a: "Rashni's featured project is a Real-Time Chat Application built with Flask and JavaScript — real-time messaging without page reloads, mastering client-server architecture. 🚀",
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
    t: "projects built all portfolio work",
    c: "4 projects Chat Expense Blog ToDo",
    a: "Rashni has independently built 4 full-stack projects: Real-Time Chat App (Flask+JS), Expense Tracker (Python+Flask+SQLite), Blog/Vlog Platform (Flask+PostgreSQL), and To-Do List (React). All built solo! 💪",
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
    a: "Rashni doesn't have formal work experience yet — she's built 4 real projects independently and earned Harvard + Anthropic certs. Actively looking for her first internship or entry-level role. Her motto: 'Zero experience means all my best work is ahead.' 🌱",
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
  }, 650);
}
apSend.addEventListener("click", send);
apInp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});

/* HERO ENTRANCE */
document.querySelectorAll(".hero-word").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = `opacity .7s ${0.1 + i * 0.15}s,transform .7s ${0.1 + i * 0.15}s`;
  setTimeout(() => {
    el.style.opacity = "1";
    el.style.transform = "none";
  }, 60);
});
[".hero-left", ".hero-bottom"].forEach((s, i) => {
  const el = document.querySelector(s);
  if (!el) return;
  el.style.opacity = "0";
  el.style.transition = `opacity .7s ${0.5 + i * 0.2}s`;
  setTimeout(() => {
    el.style.opacity = "1";
  }, 60);
});
