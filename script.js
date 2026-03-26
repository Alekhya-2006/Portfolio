/*
  Portfolio Interactions and Data
  -------------------------------
  Update the arrays below to add new projects, learning log entries,
  and weekly progress checkpoints without touching the HTML.
*/

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const projects = [
  {
    title: "Port Scanner (Upcoming)",
    description: "A focused networking utility for scanning common ports and learning how exposed services are discovered in real environments.",
    stack: ["Python", "Sockets", "CLI"],
    github: "#",
    status: "Upcoming"
  },
  {
    title: "Log Analyzer (Upcoming)",
    description: "A log parsing and summarization tool intended to strengthen debugging, pattern detection, and security monitoring fundamentals.",
    stack: ["Python", "Regex", "Automation"],
    github: "#",
    status: "Upcoming"
  },
  {
    title: "Security Tools Collection (Upcoming)",
    description: "A growing repository of small, practical security-focused scripts that can evolve alongside daily learning and experiments.",
    stack: ["Python", "Linux", "Utilities"],
    github: "#",
    status: "Upcoming"
  }
];

const learningLog = [
  {
    label: "Day 1",
    title: "Linux basics and terminal navigation",
    description: "Focused on moving confidently through the command line and understanding the structure of a Linux environment."
  },
  {
    label: "Day 2",
    title: "File system and command practice",
    description: "Worked through file operations, permissions, and repeatable terminal workflows to build stronger habits."
  }
];

const weeklyProgress = [
  {
    title: "Linux and CLI confidence",
    summary: "Strengthening daily command line usage and core operating system familiarity.",
    percent: 72
  },
  {
    title: "Networking fundamentals",
    summary: "Building a more practical understanding of IP, DNS, and HTTP behavior.",
    percent: 61
  },
  {
    title: "Python for security tooling",
    summary: "Turning scripting practice into small utilities that can grow into real projects.",
    percent: 68
  }
];

function renderProjects() {
  const container = $("#projects-grid");
  if (!container) return;

  container.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card reveal">
          <div class="project-top">
            <span class="status-badge">${project.status}</span>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-copy">${project.description}</p>
          <div class="stack-list">
            ${project.stack.map((item) => `<span class="stack-tag">${item}</span>`).join("")}
          </div>
          <div class="project-links">
            <a class="project-link ${project.github === "#" ? "placeholder" : ""}" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderLearningLog() {
  const container = $("#learning-log");
  if (!container) return;

  container.innerHTML = learningLog
    .map(
      (entry) => `
        <article class="journal-entry">
          <strong>${entry.label}: ${entry.title}</strong>
          <p class="journal-copy">${entry.description}</p>
        </article>
      `
    )
    .join("");
}

function renderWeeklyProgress() {
  const container = $("#weekly-progress");
  if (!container) return;

  container.innerHTML = weeklyProgress
    .map(
      (item) => `
        <article class="progress-entry">
          <strong>${item.title}</strong>
          <p class="progress-copy">${item.summary}</p>
          <div class="progress-bar" aria-hidden="true">
            <span style="width: ${item.percent}%"></span>
          </div>
        </article>
      `
    )
    .join("");
}

function updateScrollProgress() {
  const progressBar = $("#scroll-progress");
  if (!progressBar) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

function setupRevealAnimations() {
  const revealElements = $$(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupNavigation() {
  const menuToggle = $("#menu-toggle");
  const siteNav = $("#site-nav");
  const navLinks = $$(".nav-link");
  const sections = $$("main section[id]");

  function closeMenu() {
    if (!siteNav || !menuToggle) return;
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  function setActiveLink() {
    const currentPosition = window.scrollY + 180;
    let currentId = sections[0]?.id || "";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (currentPosition >= top && currentPosition < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${currentId}`);
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
    setActiveLink();
  });
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
}

function preventPlaceholderJump() {
  $$('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
}

renderProjects();
renderLearningLog();
renderWeeklyProgress();
setupRevealAnimations();
setupNavigation();
preventPlaceholderJump();
updateScrollProgress();

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
