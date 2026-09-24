// ---- Theme switcher ----
const root = document.documentElement;
const THEME_KEY = 'scanty-theme';
function applyTheme(t){
  root.setAttribute('data-theme', t);
  document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s.dataset.t === t));
  try { localStorage.setItem(THEME_KEY, t); } catch(e) {}
}
let savedTheme = 'spooky';
try { savedTheme = localStorage.getItem(THEME_KEY) || 'spooky'; } catch(e) {}
applyTheme(savedTheme);
document.querySelectorAll('.swatch').forEach(s => {
  s.addEventListener('click', () => applyTheme(s.dataset.t));
});

// ---- Cursor glow ----
const glow = document.getElementById('cursorGlow');
if (window.matchMedia('(hover:hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
  });
  window.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
}

// ---- Particle system ----
const particleContainer = document.getElementById('particles');
for (let i = 0; i < 16; i++) {
  const d = document.createElement('div');
  d.className = 'p-dot';
  const size = 2 + Math.random() * 3;
  d.style.width = size + 'px';
  d.style.height = size + 'px';
  d.style.left = (Math.random() * 100) + '%';
  d.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
  d.style.animationDuration = (8 + Math.random() * 8) + 's';
  d.style.animationDelay = (Math.random() * 10) + 's';
  particleContainer.appendChild(d);
}

// ---- Typewriter role text ----
const ROLES = [
  'builds things that beep, blink, and sometimes behave',
  'ships small robots and smaller bugs',
  'turns sensors into decisions, and decisions into motion',
];
const roleEl = document.getElementById('roleText');
let roleIdx = 0, charIdx = 0, deleting = false;
function typeLoop(){
  const current = ROLES[roleIdx];
  if (!deleting) {
    charIdx++;
    roleEl.innerHTML = current.slice(0, charIdx) + '<span class="cursor">&nbsp;</span>';
    if (charIdx === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    charIdx--;
    roleEl.innerHTML = current.slice(0, charIdx) + '<span class="cursor">&nbsp;</span>';
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; }
  }
  setTimeout(typeLoop, deleting ? 28 : 42);
}
typeLoop();

// ---- Skills data ----
const SKILLS = [
  { group: 'Robotics & Hardware', items: [
    { name: 'SPIKE Prime', note: 'Python — sensors, motors, control loops', level: 70 },
    { name: 'Arduino', note: 'C++ — circuits, breadboarding, sensor wiring', level: 45 },
    { name: 'LEGO EV3', note: 'block & text programming, autonomous builds', level: 55 },
  ]},
  { group: 'Web & Software', items: [
    { name: 'HTML / CSS', note: 'structure & styling', level: 75 },
    { name: 'JavaScript', note: 'front-end logic, interactivity', level: 60 },
    { name: 'Python', note: 'scripting, automation, robotics code', level: 65 },
    { name: 'Node.js', note: 'back-end & small servers', level: 40 },
  ]},
];
const skillGroupsEl = document.getElementById('skillGroups');
SKILLS.forEach(group => {
  const groupLabel = document.createElement('p');
  groupLabel.className = 'skill-group-label mono';
  groupLabel.textContent = group.group;
  skillGroupsEl.appendChild(groupLabel);
  group.items.forEach(skill => {
    const row = document.createElement('div');
    row.className = 'skill-row';
    row.innerHTML = `
      <div class="skill-top"><span class="skill-name">${skill.name}</span><span class="skill-note">${skill.note}</span></div>
      <div class="bar-track"><div class="bar-fill" data-level="${skill.level}"></div></div>
      <div class="bar-pct">${skill.level}%</div>
    `;
    skillGroupsEl.appendChild(row);
  });
});

// ---- Projects data ----
const PROJECTS = [
  { glyph: '◈', title: 'Line-Following Robot', desc: 'SPIKE Prime robot that tracks a black line using a color sensor and proportional steering.', tags: ['SPIKE Prime', 'Python'] },
  { glyph: '◐', title: 'Proximity Alarm', desc: 'Distance-sensor triggered alarm on the hub — light matrix reaction plus a beep when something gets close.', tags: ['SPIKE Prime', 'Python'] },
  { glyph: '◇', title: 'This Portfolio', desc: 'Self-built theme-switching developer site — hand-written HTML, CSS, and JS, no framework.', tags: ['HTML', 'CSS', 'JavaScript'] },
];
const projectGrid = document.getElementById('projectGrid');
PROJECTS.forEach(p => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <div class="project-glyph">${p.glyph}</div>
    <h3 class="project-title">${p.title}</h3>
    <p class="project-desc">${p.desc}</p>
    <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
  `;
  projectGrid.appendChild(card);
});

// ---- Magnetic tilt on project cards ----
document.addEventListener('pointermove', (e) => {
  document.querySelectorAll('.project-card').forEach(card => {
    const r = card.getBoundingClientRect();
    if (e.clientX < r.left-40 || e.clientX > r.right+40 || e.clientY < r.top-40 || e.clientY > r.bottom+40) return;
    const cx = e.clientX - r.left - r.width/2;
    const cy = e.clientY - r.top - r.height/2;
    const rx = (-cy / r.height) * 8;
    const ry = (cx / r.width) * 8;
    if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    }
  });
});
document.querySelectorAll('.projects-grid').forEach(grid => {
  grid.addEventListener('pointerleave', () => {
    grid.querySelectorAll('.project-card').forEach(c => { c.style.transform = ''; });
  });
});

// ---- Contact data ----
const CONTACTS = [
  { label: 'Email', handle: 'scanty@example.com', href: 'mailto:scanty@example.com', icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>' },
  { label: 'Telegram', handle: '@scanty', href: 'https://t.me/scanty', icon: '<path d="M21 4 3 11.5l6 2m12-9.5-4 16-8-6.5m12-9.5L9 13"/>' },
  { label: 'TikTok', handle: '@scanty', href: 'https://www.tiktok.com/@scanty', icon: '<path d="M16 3v9.5a3.5 3.5 0 1 1-3-3.46V6.5a6 6 0 1 0 6 6V8.8A6.5 6.5 0 0 0 22 9V6a4 4 0 0 1-4-3z"/>' },
  { label: 'GitHub', handle: '@scanty', href: 'https://github.com/scanty', icon: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.6 2.8 5.5 3.1 5.5 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.1 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>' },
];
const contactGrid = document.getElementById('contactGrid');
CONTACTS.forEach(c => {
  const a = document.createElement('a');
  a.className = 'contact-card';
  a.href = c.href;
  if (c.href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  a.innerHTML = `
    <span class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${c.icon}</svg></span>
    <span><span class="contact-label">${c.label}</span><span class="contact-handle">${c.handle}</span></span>
  `;
  contactGrid.appendChild(a);
});

// ---- Scroll reveal (sections + staggered children) ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const children = entry.target.querySelectorAll('.fact, .skill-row, .project-card, .contact-card');
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * 90);
      });
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---- Animate skill bars when visible ----
const barIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.bar-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-level') + '%';
      });
      barIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
barIo.observe(document.getElementById('skills'));