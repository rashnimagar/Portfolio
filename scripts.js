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

/* ── AI ASSISTANT (RAG-style) ── */

// ── Full knowledge base — chunked by topic ──
const DOCS = [
  {
    topic: "identity",
    content: `Rashni Thapa Magar is an aspiring software developer based in Kathmandu, Nepal. 
    She is currently studying Bachelor of Computer Applications (BCA) at SESAM 
    (School of Environmental Science and Management), in her 5th semester, graduating in 2027. 
    She is detail-oriented, motivated, and passionate about building scalable, 
    user-friendly web applications. She is actively seeking internships and 
    entry-level software development opportunities.`,
  },
  {
    topic: "skills programming",
    content: `Rashni knows the following programming languages: Python (her strongest), 
    JavaScript, Java, C, and C#. She has strong foundations in computer science 
    fundamentals from Harvard's CS50 programs including memory management, 
    algorithms, and data structures.`,
  },
  {
    topic: "skills frontend",
    content: `Rashni's frontend skills include HTML, CSS, JavaScript, and React. 
    She also uses Tailwind CSS and Bootstrap for styling and responsive design. 
    She has built responsive UIs with clean component architecture.`,
  },
  {
    topic: "skills backend database",
    content: `Rashni's backend skills include Python and Flask for building web applications 
    and APIs. For databases she works with SQL, MySQL, PostgreSQL, and SQLite. 
    She understands routing, templates, backend logic, and data modeling.`,
  },
  {
    topic: "skills tools",
    content: `Rashni uses Git and GitHub for version control and collaboration. 
    She is comfortable with command line, project organization, and 
    maintaining clean codebases.`,
  },
  {
    topic: "projects chat",
    content: `Project: Real-Time Chat Application built with Flask and JavaScript. 
    This is Rashni's featured project. It enables real-time messaging between users 
    without page reloads. She built it to deeply understand client-server architecture 
    and how data flows between browser and server. She implemented real-time event 
    handling on the Flask backend and a JavaScript frontend that updates the UI 
    as messages arrive. This project gave her a strong mental model for real-time 
    web patterns.`,
  },
  {
    topic: "projects expense tracker finance",
    content: `Project: Expense Tracker built with Python, Flask, and SQLite. 
    This app lets users track, categorize, and analyze their daily expenses. 
    Rashni focused on clean data handling, structured storage, and building 
    a usable dashboard with financial insights. The project helped her 
    understand data modeling and analytics.`,
  },
  {
    topic: "projects blog vlog platform content",
    content: `Project: Blog/Vlog Platform built with Python, Flask, Jinja2, and PostgreSQL. 
    A full content management system where users can create, publish, and browse posts. 
    Rashni implemented routing, templates, and backend logic for the complete 
    content lifecycle. This project strengthened her full-stack skills.`,
  },
  {
    topic: "projects todo list react",
    content: `Project: To-Do List App built with React and JavaScript. 
    A responsive task manager with full CRUD operations (Create, Read, Update, Delete). 
    Rashni focused on clean component architecture, smooth state management, 
    and an intuitive user experience. This was her entry into modern React development.`,
  },
  {
    topic: "certificates education harvard",
    content: `Rashni has earned the following certificates:
    1. CS50P - Introduction to Programming with Python from Harvard University (edX), awarded 2025. 
    Covered functions, file I/O, regular expressions, OOP, and real problem-solving in Python.
    2. CS50X - Introduction to Computer Science from Harvard University (edX), awarded 2026. 
    Harvard's legendary intro course covering C, Python, SQL, algorithms, data structures, 
    memory management, and web development across 11 weeks.
    3. Claude 101 - AI Fundamentals from Anthropic. Covers working effectively with Claude, 
    prompting, AI capabilities and limitations, and building AI-native workflows.
    4. Generative AI Mastermind from Outskill (Vaibhav Sisinty). 
    A practical workshop on AI tools for developers.`,
  },
  {
    topic: "experience work",
    content: `Rashni currently has no formal work experience. She is a student who has 
    built 4 real-world projects independently. She considers her strong CS fundamentals 
    from Harvard CS50 programs and her hands-on project experience as her foundation. 
    She is actively looking for her first internship or entry-level opportunity 
    to work on real products with a real team.`,
  },
  {
    topic: "contact hire available",
    content: `To contact or hire Rashni Thapa Magar:
    Email: rashnithapamagar2@gmail.com
    Phone: 9828011064
    Location: Kathmandu, Nepal
    She is open to internships, collaborations, freelance projects, and 
    entry-level software development roles. She replies quickly — usually same day.`,
  },
  {
    topic: "personality philosophy",
    content: `Rashni is detail-oriented, curious, and genuinely excited about building things. 
    She started her CS journey through Harvard's CS50 programs which gave her 
    deeper foundations than most bootcamp graduates. She believes in understanding 
    why code works, not just copying solutions. Her personal philosophy: 
    'Zero work experience just means all my best work is still ahead of me.' 
    She uses AI as a deliberate collaborator, not a shortcut — 
    treating it as a skill for 2026 and beyond.`,
  },
];

// ── Simple keyword search to find relevant chunks ──
function retrieveChunks(query) {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);

  const scored = DOCS.map((doc) => {
    const combined = (doc.topic + " " + doc.content).toLowerCase();
    let score = 0;
    words.forEach((word) => {
      if (combined.includes(word)) score += 1;
      if (doc.topic.includes(word)) score += 2; // topic match weighs more
    });
    return { ...doc, score };
  });

  // Return top 3 most relevant chunks
  return scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((d) => d.content)
    .join("\n\n");
}

// ── Chat state ──
const msgs = document.getElementById("apMsgs");
const inp = document.getElementById("apInp");
const btn = document.getElementById("apSend");
const chatHistory = [];

function addM(r, t) {
  const d = document.createElement("div");
  d.className = "amsg " + r;
  d.style.animationDelay = "0s";
  d.innerHTML = `<div class="amsg-av ${r}">${r === "ai" ? "AI" : "You"}</div><div class="amsg-b">${t}</div>`;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function showDots() {
  const d = document.createElement("div");
  d.className = "amsg ai";
  d.id = "td";
  d.style.animationDelay = "0s";
  d.innerHTML =
    '<div class="amsg-av ai">AI</div><div class="amsg-b"><div class="dots"><span></span><span></span><span></span></div></div>';
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

function rmDots() {
  document.getElementById("td")?.remove();
}

async function send() {
  const q = inp.value.trim();
  if (!q) return;
  inp.value = "";
  addM("u", q);
  showDots();

  const context =
    retrieveChunks(q) ||
    "Rashni Thapa Magar is a BCA student and aspiring software developer in Kathmandu.";

  chatHistory.push({ role: "user", content: q });
  if (chatHistory.length > 8) chatHistory.splice(0, 2);

  const system = `You are a friendly AI assistant embedded in Rashni Thapa Magar's 
portfolio website. Only answer questions about Rashni using the context provided.
Be warm, conversational, and concise (2-4 sentences). 
If the answer isn't in the context, say you don't have that detail and 
invite them to contact Rashni at rashnithapamagar2@gmail.com.
RELEVANT CONTEXT:
${context}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD9ry_s_8VDrHCltH9Wr2ZLxfqqgoWW8CM`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: system + "\n\nUser question: " + q }],
            },
          ],
        }),
      },
    );

    const data = await res.json();
    console.log("API response:", data);
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't get a response.";
    rmDots();
    addM("ai", reply);
    chatHistory.push({ role: "assistant", content: reply });
  } catch (err) {
    console.log("Error:", err);
    rmDots();
    addM(
      "ai",
      "Something went wrong. Reach Rashni directly at rashnithapamagar2@gmail.com 🙂",
    );
  }
}
btn.addEventListener("click", send);
inp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") send();
});
