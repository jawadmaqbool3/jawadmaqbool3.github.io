const d = portfolioData;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function fmtDate(str) {
  if (!str) return "Present";
  const [y, m] = str.split("-");
  return `${MONTHS[parseInt(m) - 1]} ${y}`;
}

const SVG = {
  github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  email: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  location: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  upwork: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/></svg>`,
};

// NAV
const NAV_LINKS = ["about","skills","experience","projects","achievements","contact"];

document.getElementById("nav").innerHTML = `
  <a href="#hero" class="nav-logo">
    <span class="nav-initials">${d.name.split(" ").map(n => n[0]).join("")}</span>
    <span class="nav-name">${d.name}</span>
  </a>
  <div class="nav-links">
    ${NAV_LINKS.map(s => `<a href="#${s}" class="nav-link" data-section="${s}">${s.charAt(0).toUpperCase() + s.slice(1)}</a>`).join("")}
  </div>
  <div class="nav-actions">
    <a href="${d.contact.github}" target="_blank" class="nav-icon-btn" title="GitHub">${SVG.github}</a>
    <a href="${d.contact.linkedin}" target="_blank" class="nav-icon-btn" title="LinkedIn">${SVG.linkedin}</a>
    <a href="mailto:${d.contact.email}" class="nav-cta">Hire Me</a>
  </div>
`;

// scroll-spy
const navLinks = document.querySelectorAll(".nav-link");
const sections = NAV_LINKS.map(id => document.getElementById(id)).filter(Boolean);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle("active", l.dataset.section === entry.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => observer.observe(s));

// nav shadow on scroll
window.addEventListener("scroll", () => {
  document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

// HERO
document.getElementById("hero").innerHTML = `
  <div class="hero-layout">
    <div class="hero-content">
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        ${d.availability}
      </div>
      <h1 class="hero-name">Hi, I'm <span>${d.name.split(" ")[0]}</span></h1>
      <p class="hero-role">${d.title}</p>
      <p class="hero-tagline">${d.tagline}</p>
      <div class="hero-actions">
        <a href="#projects" class="btn btn-primary">View My Work</a>
        <a href="#contact" class="btn btn-outline">Get In Touch</a>
      </div>
      <div class="hero-upwork-strip">
        <span class="upwork-strip-item">${SVG.upwork} Upwork</span>
        <span class="divider">·</span>
        <span class="upwork-strip-item accent">${d.upwork.job_success_score}% Job Success</span>
        <span class="divider">·</span>
        <span class="upwork-strip-item">${SVG.star} ${d.upwork.average_rating.toFixed(1)} Rating</span>
        <span class="divider">·</span>
        <span class="upwork-strip-item">${d.upwork.total_completed_jobs}+ Jobs Completed</span>
      </div>
    </div>
    ${d.avatar ? `
    <div class="hero-image">
      <div class="hero-image-frame">
        <img src="${d.avatar}" alt="${d.name}" />
      </div>
      <div class="hero-image-badge">
        <span class="badge-dot"></span>
        <div>
          <div class="badge-text">${d.availability}</div>
          <div class="badge-sub">${d.experience_years}+ Years Experience</div>
        </div>
      </div>
    </div>` : ""}
  </div>
`;

// ABOUT
document.getElementById("about").innerHTML = `
  <p class="section-label">About Me</p>
  <h2 class="section-title">Who I Am</h2>

  <div class="about-bio-row">
    <p class="about-bio-text">${d.about}</p>
    <div class="about-bio-meta">
      <div class="about-meta-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${d.contact.location}
      </div>
      <div class="about-meta-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${d.experience_years}+ Years in the Industry
      </div>
      <div class="about-meta-item accent">
        <span class="about-meta-dot"></span>
        ${d.availability}
      </div>
    </div>
  </div>

  <div class="about-stats-row">
    <div class="about-stat-card card">
      <div class="about-stat-value">${d.experience_years}+</div>
      <div class="about-stat-label">Years Experience</div>
    </div>
    <div class="about-stat-card card">
      <div class="about-stat-value">${d.upwork.job_success_score}%</div>
      <div class="about-stat-label">Upwork Job Success</div>
    </div>
    <div class="about-stat-card card">
      <div class="about-stat-value">${d.upwork.average_rating.toFixed(1)}<span class="about-stat-unit">★</span></div>
      <div class="about-stat-label">Average Rating</div>
    </div>
    <div class="about-stat-card card">
      <div class="about-stat-value">${d.upwork.total_completed_jobs}+</div>
      <div class="about-stat-label">Jobs Completed</div>
    </div>
  </div>

  <div class="about-services">
    <p class="about-services-label">What I Do</p>
    <div class="about-focus">
      ${d.services.map(s => `<span class="focus-tag">${s}</span>`).join("")}
    </div>
  </div>
`;

// SKILLS
const skillCategories = [["All", Object.values(d.skills).flat()], ...Object.entries(d.skills)];

const skillTabsHTML = skillCategories.map(([name], i) => `
  <button class="skill-tab ${i === 0 ? "active" : ""}" data-index="${i}">${name}</button>
`).join("");

const skillPanelsHTML = skillCategories.map(([, items], i) => `
  <div class="skill-panel ${i === 0 ? "active" : ""}" data-index="${i}">
    ${items.map(s => `<span class="skill-pill">${s}</span>`).join("")}
  </div>
`).join("");

document.getElementById("skills").innerHTML = `
  <p class="section-label">What I Know</p>
  <h2 class="section-title">Skills & Technologies</h2>
  <div class="skills-tabs">${skillTabsHTML}</div>
  <div class="skills-panels">${skillPanelsHTML}</div>
`;

document.getElementById("skills").addEventListener("click", e => {
  const tab = e.target.closest(".skill-tab");
  if (!tab) return;
  const idx = tab.dataset.index;
  document.querySelectorAll(".skill-tab").forEach(t => t.classList.toggle("active", t.dataset.index === idx));
  document.querySelectorAll(".skill-panel").forEach(p => p.classList.toggle("active", p.dataset.index === idx));
});

// EXPERIENCE
const timelineHTML = d.experience.map(e => `
  <div class="timeline-item card">
    <div class="timeline-header">
      <div>
        <div class="timeline-role">${e.role}</div>
        <div class="timeline-company">${e.company}</div>
        <div class="timeline-type">${e.type}</div>
      </div>
      <span class="timeline-duration ${e.current ? "current" : ""}">
        ${fmtDate(e.start_date)} — ${fmtDate(e.end_date)}
      </span>
    </div>
    <p class="timeline-desc">${e.description}</p>
    <div class="timeline-tech">
      ${e.skills.map(t => `<span class="tech-tag">${t}</span>`).join("")}
    </div>
  </div>
`).join("");

document.getElementById("experience").innerHTML = `
  <p class="section-label">Work History</p>
  <h2 class="section-title">Experience</h2>
  <div class="timeline">${timelineHTML}</div>
`;

// EDUCATION (appended into experience section)
const educationHTML = d.education.map(e => `
  <div class="edu-card card">
    <div class="edu-left">
      <div class="edu-degree">${e.degree}</div>
      <div class="edu-institution">${e.institution}</div>
      <div class="edu-awarded">Awarded by: ${e.awarded_by}</div>
    </div>
    <div class="edu-badge">${e.achievement}</div>
  </div>
`).join("");

document.getElementById("experience").innerHTML += `
  <p class="section-label" style="margin-top:6rem">Education</p>
  <h2 class="section-title">Academic Background</h2>
  ${educationHTML}
`;

// PROJECTS CAROUSEL
const starsHTML = rating => Array.from({length: 5}, (_, i) =>
  `<svg width="13" height="13" viewBox="0 0 24 24" fill="${i < Math.round(rating) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
).join("");

const projectCardHTML = (p, idx) => `
  <div class="carousel-card card">
    <div class="proj-card-inner">

      <div class="proj-card-left">
        <span class="proj-index">${String(idx + 1).padStart(2, "0")}</span>
        <h3 class="proj-title">${p.name}</h3>
        <p class="proj-desc">${p.description}</p>
        ${p.feedback ? `
        <blockquote class="proj-feedback">
          <svg class="proj-quote-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          ${p.feedback}
        </blockquote>` : ""}
      </div>

      <div class="proj-card-right">
        ${p.rating ? `
        <div class="proj-rating-block">
          <div class="proj-stars">${starsHTML(p.rating)}</div>
          <span class="proj-rating-label">Client Rating</span>
        </div>` : ""}

        <div class="proj-tech-block">
          <p class="proj-tech-label">Tech Stack</p>
          <div class="proj-tech-tags">
            ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
        </div>

        ${p.github || p.live ? `
        <div class="proj-links">
          ${p.github ? `<a href="${p.github}" target="_blank" class="proj-link">${SVG.github} GitHub</a>` : ""}
          ${p.live ? `<a href="${p.live}" target="_blank" class="proj-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Live Demo
          </a>` : ""}
        </div>` : ""}
      </div>

    </div>
  </div>
`;

document.getElementById("projects").innerHTML = `
  <p class="section-label">Selected Work</p>
  <div class="projects-carousel-header">
    <h2 class="section-title" style="margin-bottom:0">Projects</h2>
    <div class="carousel-controls">
      <button class="carousel-btn" id="proj-prev" aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <span class="carousel-counter"><span id="proj-current">1</span> / <span id="proj-total">${d.projects.length}</span></span>
      <button class="carousel-btn" id="proj-next" aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
  <div class="carousel-viewport">
    <div class="carousel-track" id="proj-track">
      ${d.projects.map((p, i) => projectCardHTML(p, i)).join("")}
    </div>
  </div>
  <div class="carousel-dots" id="proj-dots">
    ${d.projects.map((_, i) => `<button class="carousel-dot ${i === 0 ? "active" : ""}" data-i="${i}"></button>`).join("")}
  </div>
`;

(function () {
  const track = document.getElementById("proj-track");
  const dots = document.querySelectorAll("#proj-dots .carousel-dot");
  const counter = document.getElementById("proj-current");
  let current = 0;
  const total = d.projects.length;

  function goTo(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    counter.textContent = current + 1;
  }

  document.getElementById("proj-prev").addEventListener("click", () => { goTo(current - 1); resetTimer(); });
  document.getElementById("proj-next").addEventListener("click", () => { goTo(current + 1); resetTimer(); });
  dots.forEach(dot => dot.addEventListener("click", () => { goTo(+dot.dataset.i); resetTimer(); }));

  // auto-play
  let timer = setInterval(() => goTo(current + 1), 4000);
  function resetTimer() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 4000); }

  const viewport = document.querySelector(".carousel-viewport");
  viewport.addEventListener("mouseenter", () => clearInterval(timer));
  viewport.addEventListener("mouseleave", () => { timer = setInterval(() => goTo(current + 1), 4000); });

  // swipe support
  let startX = 0;
  track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetTimer(); }
  });
})();

// ACHIEVEMENTS
const achievementsHTML = d.achievements.map(a => `
  <div class="achievement-card card">
    <div class="achievement-icon">${a.icon}</div>
    <div class="achievement-body">
      <div class="achievement-type">${a.type}</div>
      <div class="achievement-title">${a.title}</div>
      <div class="achievement-subtitle">${a.subtitle}</div>
      <p class="achievement-desc">${a.description}</p>
      <div class="achievement-awarded">Awarded by: <span>${a.awarded_by}</span></div>
    </div>
  </div>
`).join("");

document.getElementById("achievements").innerHTML = `
  <p class="section-label">Recognition</p>
  <h2 class="section-title">Achievements</h2>
  <div class="achievements-grid">${achievementsHTML}</div>
`;

// TESTIMONIALS (inside achievements section as continuation)
const testimonialsHTML = d.testimonials.map(t => `
  <div class="testimonial-card card">
    <div class="testimonial-quote">"</div>
    <p class="testimonial-text">${t.text}</p>
    <div class="testimonial-author">
      <div class="testimonial-name">${t.author}</div>
      <div class="testimonial-role">${t.position} · ${t.company}</div>
      ${t.verified ? `<span class="testimonial-verified">Verified</span>` : ""}
    </div>
  </div>
`).join("");

document.getElementById("testimonials").innerHTML = `
  <p class="section-label">What People Say</p>
  <h2 class="section-title">Testimonials</h2>
  <div class="testimonials-grid">${testimonialsHTML}</div>
`;

// CONTACT
document.getElementById("contact").innerHTML = `
  <div class="contact-wrapper">
    <p class="section-label">Get In Touch</p>
    <h2 class="section-title">Let's Work Together</h2>
    <p class="contact-text">I'm currently <strong>${d.availability.toLowerCase()}</strong> and open to new opportunities, SaaS projects, API integrations, or backend consulting. Let's build something great.</p>
    <div class="contact-links">
      <a href="mailto:${d.contact.email}" class="contact-link card">
        ${SVG.email} Email Me
      </a>
      <a href="${d.contact.github}" target="_blank" class="contact-link card">
        ${SVG.github} GitHub
      </a>
      <a href="${d.contact.linkedin}" target="_blank" class="contact-link card">
        ${SVG.linkedin} LinkedIn
      </a>
      <a href="${d.upwork.profile_url}" target="_blank" class="contact-link upwork-link">
        ${SVG.upwork} Upwork Profile
      </a>
    </div>
    <div class="contact-location">${SVG.location} ${d.contact.location}</div>
  </div>
`;

// FOOTER
document.getElementById("footer").innerHTML = `
  <p>Built by ${d.name} · ${new Date().getFullYear()}</p>
`;

document.title = `${d.name} — ${d.title}`;
