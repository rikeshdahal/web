const CFG = {
    ejKey: 'RqsCDhU2n0Ej7-P8j',
    ejSvc: 'service_99bwjsx',
    ejTpl: 'template_ris6d79',
    ejTplTesti: 'template_hw5il78',
    sbUrl: 'https://ylfadchxihawbhgciket.supabase.co',
    sbKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZmFkY2h4aWhhd2JoZ2Npa2V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NjAyNTcsImV4cCI6MjA4OTEzNjI1N30.PiKAxYxkv9H5ejaZ8o_-2dHVhZT4oHG9dsLYE6m34aI',
    secs: ['home', 'about', 'skills', 'de-section', 'work', 'experience', 'blog', 'contact'],
    BUCKET_TABLE: 'bucket_list',
    QR_URL: 'https://i.postimg.cc/9QFmcq6X/myqr.png',
};

(function () { function init() { if (typeof emailjs !== 'undefined') emailjs.init(CFG.ejKey); } document.readyState === 'loading' ? window.addEventListener('load', init) : init(); })();
const _sb = (typeof supabase !== 'undefined') ? supabase.createClient(CFG.sbUrl, CFG.sbKey) : null;

// Declare globally early — used by testimonials, tBuildCards etc. before authBoot runs
let siteUser = null;
let siteIsAdmin = false;

/* ── LOADER ── */
window.addEventListener('load', () => { setTimeout(() => { const L = document.getElementById('loader'); L.style.opacity = '0'; L.style.visibility = 'hidden'; setTimeout(() => L.remove(), 700); }, 900); });

/* ── THEME ── */
const htmlEl = document.documentElement;
let isDark = localStorage.getItem('theme') !== 'light';
function applyTheme(dark) { htmlEl.classList.toggle('dark', dark); htmlEl.classList.toggle('light', !dark); const ico = dark ? 'fas fa-sun' : 'fas fa-moon';['pill-theme-icon', 'mob-theme-icon', 'mob-sheet-theme-icon'].forEach(id => { const e = document.getElementById(id); if (e) e.className = ico; }); localStorage.setItem('theme', dark ? 'dark' : 'light'); }
function toggleTheme(e) { if (e) e.stopPropagation(); isDark = !isDark; applyTheme(isDark); }
applyTheme(isDark);
['pill-theme-btn', 'mob-theme-btn', 'mob-sheet-theme-btn'].forEach(id => { const e = document.getElementById(id); if (e) e.addEventListener('click', toggleTheme); });

/* ── CLOCK ── */
(function () { const el = document.getElementById('MyClockDisplay'); if (!el) return; function tick() { const d = new Date(); let h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; el.textContent = [h, m, s].map(n => String(n).padStart(2, '0')).join(':') + '\u00a0' + ap; setTimeout(tick, 1000); } tick(); })();

/* ── NAVBAR + BTT ── */
const hdr = document.getElementById('hdr'), navCenter = document.getElementById('nav-center'), navTagline = document.getElementById('nav-tagline'), btt = document.getElementById('btt'), navAuthWrap = document.getElementById('nav-auth-wrap');
function handleScroll() { const s = window.scrollY; hdr.classList.toggle('scrolled', s > 30); const scrolled = s > 60; navCenter && navCenter.classList.toggle('visible', scrolled); navTagline && navTagline.classList.toggle('hide', scrolled); navAuthWrap && navAuthWrap.classList.toggle('visible', scrolled); if (s > 300) { if (!btt.classList.contains('visible')) btt.classList.add('visible'); } else { btt.classList.remove('visible'); } }
window.addEventListener('scroll', handleScroll, { passive: true }); handleScroll();
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── ACTIVE SECTION ── */
const cLinks = document.querySelectorAll('.c-link[data-sec]'), mobLinks = document.querySelectorAll('.mob-link[data-mob-sec]');
const secObs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { cLinks.forEach(l => l.classList.toggle('active', l.dataset.sec === e.target.id)); mobLinks.forEach(l => l.classList.toggle('active', l.dataset.mobSec === e.target.id)); } }); }, { rootMargin: '-35% 0px -60% 0px' });
CFG.secs.forEach(id => { const el = document.getElementById(id); if (el) secObs.observe(el); });

/* ── MOBILE NAV ── */
const mobSheet = document.getElementById('mob-sheet'); let mobOpen = false;
function openMobNav() { mobOpen = true; mobSheet.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeMobNav() { mobOpen = false; mobSheet.classList.remove('open'); document.body.style.overflow = ''; }
document.getElementById('nav-name-pill').addEventListener('click', () => { if (window.innerWidth <= 767) { mobOpen ? closeMobNav() : openMobNav(); } });

/* ── CURSOR ── */
(function () { if (window.matchMedia('(hover:none),(pointer:coarse)').matches) return; const dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring'); if (!dot || !ring) return; let mx = 0, my = 0, rx = 0, ry = 0; document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }); (function tick() { rx += (mx - rx) * .13; ry += (my - ry) * .13; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(tick); })(); document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', () => ring.classList.add('big')); el.addEventListener('mouseleave', () => ring.classList.remove('big')); }); })();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 56, behavior: 'smooth' }); } }));

/* ── REVEAL ── */
const revObs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }); }, { threshold: .1 });
document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => revObs.observe(el));

/* ── LIVE VIEWER ── */
(function () { const el = document.getElementById('lvc-count'); if (!el) return; function display(n) { el.textContent = n; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); setTimeout(() => el.classList.remove('bump'), 350); } fetch('https://api.counterapi.dev/v1/rikeshdahal/portfolio/up').then(r => r.json()).then(d => { if (d && d.value) { let s = Math.max(1, Math.round(d.value / 40)); display(s); function tick() { const dv = (Math.random() < .5 ? 1 : -1) * (Math.random() < .3 ? 2 : 1); s = Math.max(1, s + dv); display(s); setTimeout(tick, Math.floor(Math.random() * 9000) + 6000); } setTimeout(tick, 8000); } }).catch(() => display(Math.floor(Math.random() * 8) + 3)); })();

/* ── HERO CANVAS ── */
(function () { const canvas = document.getElementById('hero-canvas'); if (!canvas) return; const ctx = canvas.getContext('2d'); let W, H, pts = []; const COLS = ['#6d27d9', '#8f5cdf', '#b48ef5']; function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; } class P { constructor() { this.reset(true); } reset(init) { this.x = Math.random() * W; this.y = init ? Math.random() * H : H + 8; this.r = Math.random() * 1.5 + .3; this.vx = (Math.random() - .5) * .22; this.vy = -(Math.random() * .4 + .1); this.a = 0; this.ta = Math.random() * .35 + .06; this.col = COLS[Math.floor(Math.random() * COLS.length)]; this.life = 0; this.max = Math.random() * 280 + 180; } update() { this.x += this.vx; this.y += this.vy; this.life++; if (this.life < 28) this.a = this.ta * (this.life / 28); else if (this.life > this.max - 28) this.a = this.ta * ((this.max - this.life) / 28); else this.a = this.ta; if (this.life >= this.max) this.reset(false); } draw() { ctx.save(); ctx.globalAlpha = this.a * .75; ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = this.col; ctx.fill(); ctx.restore(); } } resize(); pts = Array.from({ length: 65 }, () => new P()); function frame() { ctx.clearRect(0, 0, W, H); pts.forEach(p => { p.update(); p.draw(); }); for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 72) { ctx.save(); ctx.globalAlpha = .05 * (1 - d / 72); ctx.strokeStyle = '#8f5cdf'; ctx.lineWidth = .4; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); ctx.restore(); } } requestAnimationFrame(frame); } frame(); window.addEventListener('resize', resize, { passive: true }); })();

/* ── HERO SPOTLIGHT ── */
(function () { const spot = document.getElementById('hero-spot'), sec = document.getElementById('home'); if (!spot || !sec) return; sec.addEventListener('mousemove', e => { const r = sec.getBoundingClientRect(); spot.style.background = `radial-gradient(580px circle at ${((e.clientX - r.left) / r.width * 100).toFixed(1)}% ${((e.clientY - r.top) / r.height * 100).toFixed(1)}%,rgba(109,39,217,.1) 0%,transparent 65%)`; }, { passive: true }); sec.addEventListener('mouseleave', () => { spot.style.background = ''; }, { passive: true }); })();

/* ── TYPING ── */
(function () { const words = ["YouTuber.", "Ethical Hacker.", "Game Developer.", "Programmer.", "UI/UX Designer.", "Data Engineer.", "Django DRF Developer.", "Databricks Engineer."]; let wi = 0, ci = 0, del = false; const el = document.getElementById('typed-el'); if (!el) return; function type() { const w = words[wi]; el.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci); let s = del ? 45 : 90; if (!del && ci === w.length) { s = 2000; del = true; } else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; s = 350; } setTimeout(type, s); } setTimeout(type, 1400); })();

/* ── HERO STARS ── */
(function () { const el = document.getElementById('hero-stars'); if (!el) return; const f = document.createDocumentFragment(); for (let i = 0; i < 75; i++) { const s = document.createElement('div'); const sz = (Math.random() * 1.7 + .5).toFixed(1); s.style.cssText = `position:absolute;background:#fff;border-radius:50%;width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation:starTwinkle ${(Math.random() * 4 + 2).toFixed(1)}s ease-in-out infinite ${-(Math.random() * 6).toFixed(1)}s;`; f.appendChild(s); } el.appendChild(f); })();

/* ── DEVOTION PARTICLES ── */
(function () { const el = document.getElementById('devotion-particles'); if (!el) return; const f = document.createDocumentFragment(); for (let i = 0; i < 16; i++) { const p = document.createElement('div'); p.style.cssText = `position:absolute;width:3px;height:3px;border-radius:50%;background:#fbbf24;left:${Math.random() * 100}%;bottom:0;opacity:0;animation:particleRise ${(Math.random() * 4 + 4).toFixed(1)}s ease-in ${(Math.random() * 6).toFixed(1)}s infinite;--drift:${(Math.random() * 40 - 20).toFixed(0)}px;`; f.appendChild(p); } el.appendChild(f); })();
function tryPlayFlute() { document.getElementById('flute-audio').play().catch(() => { }); }

/* ── SKILLS ── */
const SKILLS = [
    { ico: 'https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg', n: 'HTML', cat: 'web', p: 92, clr: '#8f5cdf', tag: 'Frontend' },
    { ico: 'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg', n: 'CSS', cat: 'web', p: 88, clr: '#8f5cdf', tag: 'Frontend' },
    { ico: 'https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg', n: 'JavaScript', cat: 'web', p: 65, clr: '#8f5cdf', tag: 'Frontend' },
    { ico: 'https://www.vectorlogo.zone/logos/djangoproject/djangoproject-icon.svg', n: 'Django DRF', cat: 'web', p: 60, clr: '#6d27d9', inv: true, tag: 'Backend' },
    { ico: 'https://www.vectorlogo.zone/logos/python/python-icon.svg', n: 'Python', cat: 'data', p: 70, clr: '#6d27d9', tag: 'Language' },
    { ico: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg', n: 'Pandas', cat: 'data', p: 72, clr: '#6d27d9', tag: 'Data Wrangling' },
    { ico: 'https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg', n: 'PySpark', cat: 'data', p: 58, clr: '#8f5cdf', tag: 'Big Data' },
    { ico: 'https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg', n: 'MySQL', cat: 'data', p: 65, clr: '#6d27d9', tag: 'Database' },
    { ico: 'https://www.vectorlogo.zone/logos/databricks/databricks-icon.svg', n: 'Databricks', cat: 'data', p: 62, clr: '#8f5cdf', tag: 'Data Platform' },
    { ico: 'https://i.postimg.cc/J0VLHY30/game.png', n: 'Game Dev', cat: 'dev', p: 95, clr: '#6d27d9', tag: 'Unity / UE5' },
    { ico: 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg', n: 'Git', cat: 'dev', p: 78, clr: '#8f5cdf', tag: 'Version Control' },
    { ico: 'https://www.vectorlogo.zone/logos/linux/linux-icon.svg', n: 'Ethical Hacking', cat: 'other', p: 75, clr: '#6d27d9', tag: 'Cybersecurity' },
    { ico: 'https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg', n: 'Graphic Design', cat: 'other', p: 80, clr: '#8f5cdf', tag: 'Adobe Suite' },
];
function buildSkillCard(s, i) { const d = document.createElement('div'); d.className = 'card'; d.dataset.cat = s.cat; d.style.cssText = `padding:20px;transition-delay:${i * .05}s;`; d.innerHTML = `<div style="position:absolute;top:0;left:0;right:0;height:3px;border-radius:16px 16px 0 0;background:linear-gradient(90deg,${s.clr},var(--accent2));opacity:.7;"></div><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;"><span style="font-family:'JetBrains Mono',monospace;font-size:.54rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--accent2);">${s.tag}</span><div style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s ease infinite;"></div></div><div style="display:flex;align-items:center;gap:11px;margin-bottom:12px;"><div style="width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:rgba(109,39,217,.1);border:1px solid rgba(109,39,217,.22);"><img src="${s.ico}" alt="${s.n}" width="22" height="22" style="object-fit:contain;${s.inv ? 'filter:invert(1) brightness(1.8);' : ''}"></div><div style="flex:1;min-width:0;"><div style="font-weight:800;font-size:.88rem;color:var(--text);">${s.n}</div><div style="font-weight:900;font-size:1rem;letter-spacing:-.02em;color:var(--accent2);margin-top:1px;">${s.p}%</div></div></div><div style="border-radius:100px;height:4px;overflow:hidden;background:rgba(109,39,217,.14);"><div class="skill-bar-fill" data-w="${s.p}%" style="background:linear-gradient(90deg,var(--accent),var(--accent2));"></div></div>`; return d; }
const sg = document.getElementById('skills-grid');
SKILLS.forEach((s, i) => sg.appendChild(buildSkillCard(s, i)));
new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.querySelectorAll('.skill-bar-fill').forEach(b => setTimeout(() => { b.style.width = b.dataset.w; }, 200)); }); }, { threshold: .15 }).observe(sg);
document.getElementById('sk-tabs').addEventListener('click', e => { const btn = e.target.closest('.sk-tab'); if (!btn) return; document.querySelectorAll('.sk-tab').forEach(t => t.classList.remove('active')); btn.classList.add('active'); const cat = btn.dataset.cat; document.querySelectorAll('#skills-grid .card').forEach(c => { const show = cat === 'all' || c.dataset.cat === cat; c.style.display = show ? '' : 'none'; if (show) { const b = c.querySelector('.skill-bar-fill'); if (b) { b.style.width = '0'; setTimeout(() => { b.style.width = b.dataset.w; }, 80); } } }); });

/* ── PROJECTS (Supabase-first, seed fallback) ── */
let projectsData = [];

function buildProjectCard(p) {
    const tags = Array.isArray(p.tags) ? p.tags : [];
    const title = p.title || '';
    const img = p.image_url || '';
    const desc = p.description || '';
    const link = p.link_url || '#';
    const el = document.createElement('div');
    el.style.cssText = 'flex:0 0 auto;width:285px;margin:0 10px;';
    el.innerHTML = `<div class="card" style="overflow:hidden;"><div style="overflow:hidden;height:170px;"><img src="${escHtml(img)}" alt="${escHtml(title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:transform .5s;" onerror="this.src='https://placehold.co/285x170/0a1020/6d27d9?text=${encodeURIComponent(title)}'" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform=''"></div><div style="padding:15px 17px;"><div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:7px;">${tags.map(x => `<span class="tag">${escHtml(x)}</span>`).join('')}</div><h3 style="font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:.92rem;margin-bottom:5px;color:var(--text);">${escHtml(title)}</h3><p style="font-size:.76rem;color:var(--muted);margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${escHtml(desc)}</p><a href="${escHtml(link)}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;font-size:.76rem;font-weight:700;color:var(--accent2);transition:gap .22s,color .22s;" onmouseover="this.style.gap='9px';this.style.color='var(--accent)'" onmouseout="this.style.gap='5px';this.style.color='var(--accent2)'">View Project <i class="fas fa-arrow-right" style="font-size:.6rem;"></i></a></div></div>`;
    return el;
}

function renderProjects() {
    const ct = document.getElementById('carousel-track');
    ct.innerHTML = '';
    if (!projectsData.length) { ct.innerHTML = `<div style="padding:40px;text-align:center;color:var(--muted);font-size:.88rem;width:100%;">No projects yet.</div>`; return; }
    [...projectsData, ...projectsData].forEach(p => ct.appendChild(buildProjectCard(p)));
}

async function loadProjectsFromDB() {
    if (_sb) {
        const { data } = await _sb.from('projects').select('*').order('sort_order', { ascending: true });
        if (data) projectsData = data;
    }
    renderProjects();
}
loadProjectsFromDB();
/* ── CAROUSEL MANUAL CONTROLS ── */
(function () {
    var CARD_W = 285 + 20; // card width + margin
    var cManual = false;   // false = auto-scroll (CSS anim), true = manual mode
    var cIdx = 0;
    var cAutoTimer = null;

    function getCount() {
        // half the track children (track is doubled for seamless loop)
        var ct = document.getElementById('carousel-track');
        return ct ? Math.floor(ct.children.length / 2) : 0;
    }

    function getVis() {
        return window.innerWidth <= 580 ? 1 : window.innerWidth <= 900 ? 2 : 3;
    }

    function getMax() { return Math.max(0, getCount() - getVis()); }

    function enterManual() {
        cManual = true;
        var ct = document.getElementById('carousel-track');
        if (!ct) return;
        // freeze the CSS animation exactly where it is
        var computed = window.getComputedStyle(ct);
        var mat = new DOMMatrix(computed.transform);
        var currentX = mat.m41; // current translateX in px
        ct.style.animation = 'none';
        ct.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1)';
        ct.style.transform = 'translateX(' + currentX + 'px)';
        // figure out which dot index we're at
        cIdx = Math.round(-currentX / CARD_W);
        cIdx = Math.max(0, Math.min(cIdx, getMax()));
        updateDots();
        updateBtns();
        var pb = document.getElementById('cpause-btn');
        if (pb) pb.innerHTML = '<i class="fas fa-redo" style="font-size:.62rem;margin-right:4px;"></i>Auto scroll';
    }

    function exitManual() {
        cManual = false;
        var ct = document.getElementById('carousel-track');
        if (!ct) return;
        ct.style.animation = '';
        ct.style.transform = '';
        ct.style.transition = '';
        updateDots();
        updateBtns();
        var pb = document.getElementById('cpause-btn');
        if (pb) pb.innerHTML = '<i class="fas fa-play" style="font-size:.62rem;margin-right:4px;"></i>Manual';
    }

    function goTo(idx) {
        if (!cManual) enterManual();
        cIdx = Math.max(0, Math.min(idx, getMax()));
        var ct = document.getElementById('carousel-track');
        if (ct) ct.style.transform = 'translateX(-' + (cIdx * CARD_W) + 'px)';
        updateDots();
        updateBtns();
        // auto-return to scroll after 8s of inactivity
        clearTimeout(cAutoTimer);
        cAutoTimer = setTimeout(exitManual, 8000);
    }

    function buildDots() {
        var wrap = document.getElementById('cdots');
        if (!wrap) return;
        wrap.innerHTML = '';
        var max = getMax();
        for (var i = 0; i <= max; i++) {
            (function (i) {
                var d = document.createElement('button');
                d.className = 't-dot';
                d.addEventListener('click', function () { goTo(i); });
                wrap.appendChild(d);
            })(i);
        }
        updateDots();
    }

    function updateDots() {
        var dots = document.querySelectorAll('#cdots .t-dot');
        dots.forEach(function (d, i) {
            d.classList.toggle('active', cManual && i === cIdx);
        });
    }

    function updateBtns() {
        var p = document.getElementById('cprev');
        var n = document.getElementById('cnext');
        if (p) p.disabled = cManual && cIdx === 0;
        if (n) n.disabled = cManual && cIdx >= getMax();
    }

    // wire up after DOM ready / projects loaded
    function init() {
        buildDots();
        updateBtns();

        document.getElementById('cprev')?.addEventListener('click', function () {
            goTo(cManual ? cIdx - 1 : 0);
        });
        document.getElementById('cnext')?.addEventListener('click', function () {
            goTo(cManual ? cIdx + 1 : 1);
        });
        document.getElementById('cpause-btn')?.addEventListener('click', function () {
            cManual ? exitManual() : enterManual();
        });

        // rebuild dots on resize
        window.addEventListener('resize', function () { buildDots(); updateBtns(); }, { passive: true });
    }

    // wait for projects to render
    var orig = window.renderProjects;
    window.renderProjects = function () {
        if (orig) orig.apply(this, arguments);
        setTimeout(init, 60);
    };
})();

/* ── EXPERIENCE ── */
const EXP = [
    { title: 'AI Developer', date: '2025 – Present', type: 'Personal Project', company: 'Kimi AI Assistant', loc: 'Kathmandu · Remote', desc: 'Building an AI-powered assistant for multilingual conversations, voice interaction, and emotional responses using modern LLM APIs.', items: ['Built a browser-based AI assistant using JavaScript and OpenRouter APIs', 'Implemented voice recognition and text-to-speech interaction', 'Designed multilingual responses with focus on Nepali language', 'Created AI personality with emotional and conversational intelligence'], tags: ['JavaScript', 'LLM APIs', 'AI Chatbot', 'Speech Recognition'] },
    { title: 'Unity Game Developer', date: '2024 – Present', type: 'University Project', company: 'Bhaire – Open World Game', loc: 'Kathmandu Inspired Map', desc: 'Developing a Nepali open-world game inspired by GTA with NPC interaction, mission systems, and real Kathmandu landmarks.', items: ['Created an open-world map including Dharahara, Pashupatinath, and Ranipokhari', 'Implemented NPC AI using NavMesh and A* pathfinding', 'Built a mission and reward system with dynamic dialogue', 'Added vehicles, police AI, and zombie combat mechanics'], tags: ['Unity', 'C#', 'Game AI', 'Open World Design'] },
    { title: 'Data Engineer Intern', date: 'Jan 2025 – Mar 2025', type: 'Internship', company: 'Insight Workshop', loc: 'Remote / Kathmandu', desc: 'Practicing Data Engineering using Databricks, SQL, and PySpark while contributing to the real-time earthquake data pipeline for Nepal.', items: ['Developed ETL pipelines on Databricks using PySpark for earthquake data ingestion', 'Stored and managed datasets in SQL databases for analysis', 'Cleaned, transformed, and validated earthquake datasets for real-time reporting', 'Applied best practices in big data pipelines and workflows'], tags: ['Databricks', 'SQL', 'PySpark', 'Data Pipeline'] },
];
(function () { const list = document.getElementById('exp-list'); if (!list) return; EXP.forEach(e => { const card = document.createElement('div'); card.className = 'exp-card'; card.innerHTML = `<div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:9px;margin-bottom:5px;"><h3 style="font-family:'Cabinet Grotesk',sans-serif;font-weight:900;font-size:1.12rem;color:var(--text);">${e.title}</h3><div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;"><span class="exp-date">${e.date}</span><span class="exp-type">${e.type}</span></div></div><div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;font-size:.81rem;color:var(--muted);margin-bottom:12px;"><strong style="color:var(--text);">${e.company}</strong><span>${e.loc}</span></div><p style="color:var(--muted);font-size:.85rem;line-height:1.75;margin-bottom:14px;">${e.desc}</p><div style="font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent2);display:flex;align-items:center;gap:5px;margin-bottom:9px;"><i class="fas fa-trophy" style="font-size:.72rem;"></i>Key Achievements</div><ul style="display:flex;flex-direction:column;gap:7px;margin-bottom:14px;">${e.items.map(it => `<li style="display:flex;align-items:flex-start;gap:7px;color:var(--muted);font-size:.83rem;line-height:1.6;"><span style="color:var(--accent2);margin-top:3px;flex-shrink:0;">›</span>${it}</li>`).join('')}</ul><div style="display:flex;flex-wrap:wrap;gap:6px;">${e.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`; list.appendChild(card); }); })();

const QSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent2);opacity:.55;margin-bottom:11px;flex-shrink:0;"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>`;

let testimonials = [];
let tIdx = 0, tAuto = true, tTimer = null, tRating = 0, mAvSeed = Math.floor(Math.random() * 1000) + 100;
const tGetVis = () => window.innerWidth <= 580 ? 1 : window.innerWidth <= 900 ? 2 : 3;
function fmtDate(iso) { try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); } catch (e) { return ''; } }
async function loadTestimonialsFromDB() {
    if (_sb) {
        try {
            const { data } = await _sb.from('testimonials').select('*').order('created_at', { ascending: false });
            if (data) testimonials = siteIsAdmin ? data : data.filter(t => t.approved === true);
        } catch (err) { console.error('testimonials:', err); }
    }
    tBuildCards();
    requestAnimationFrame(() => { tUpdate(false); resetTT(); });
}
function tBuildCards() { const track = document.getElementById('t-carousel-track'); track.innerHTML = ''; if (!testimonials.length) { track.innerHTML = `<div style="padding:40px;text-align:center;color:var(--muted);font-size:.88rem;width:100%;">No testimonials yet. Be the first!</div>`; return; } testimonials.forEach(t => { const avatarUrl = `https://picsum.photos/200/200?random=${t.avatar_seed || Math.floor(Math.random() * 999) + 100}`; const dateStr = t.created_at ? fmtDate(t.created_at) : (t.date || ''); const c = document.createElement('div'); c.className = 't-card'; c.style.cssText = 'display:flex;flex-direction:column;'; const isPending = t.approved === false; c.innerHTML = `${QSVG}${isPending ? `<span class="t-pending-badge">Pending</span>` : ''}<blockquote style="font-size:.85rem;color:var(--text);line-height:1.75;font-style:italic;margin-bottom:14px;flex:1;">"${t.text}"</blockquote><div style="display:flex;gap:2px;margin-bottom:12px;">${Array(t.stars).fill(0).map(() => '<span style="color:var(--accent2);font-size:.95rem;">★</span>').join('')}${Array(5 - t.stars).fill(0).map(() => '<span style="color:rgba(109,39,217,.2);font-size:.95rem;">★</span>').join('')}</div><div style="display:flex;align-items:center;gap:11px;"><img src="${avatarUrl}" alt="${t.name}" loading="lazy" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(109,39,217,.3);flex-shrink:0;" onerror="this.src='https://placehold.co/42x42/0a1020/6d27d9?text=${encodeURIComponent((t.name || '?')[0])}'"><div><div style="font-weight:800;font-size:.86rem;color:var(--text);">${t.name}</div>${t.company ? `<div style="font-size:.7rem;color:var(--accent2);font-weight:600;">${t.company}</div>` : ''}<div style="font-size:.7rem;color:var(--muted);">${t.role || ''}${dateStr ? ` · <span style="font-family:'JetBrains Mono',monospace;">${dateStr}</span>` : ''}</div></div></div>${siteIsAdmin && t.id ? `<div class="t-admin-bar">${isPending ? `<button class="t-admin-approve" onclick="tAdminApprove('${t.id}')">✓ Approve</button>` : ''}<button class="t-admin-del" onclick="tAdminDelete('${t.id}')">✕ Delete</button></div>` : ''}`; track.appendChild(c); }); }
function tUpdate(animate = true) { const track = document.getElementById('t-carousel-track'); const vis = tGetVis(), cards = track.querySelectorAll('.t-card'); if (!cards.length) return; const max = Math.max(0, testimonials.length - vis); tIdx = Math.min(Math.max(0, tIdx), max); const gap = 20, cw = cards[0].offsetWidth; if (!animate) { track.style.transition = 'none'; } track.style.transform = `translateX(-${tIdx * (cw + gap)}px)`; if (!animate) { void track.offsetWidth; track.style.transition = ''; } cards.forEach((c, i) => c.classList.toggle('inactive', i < tIdx || i >= tIdx + vis)); const dots = document.getElementById('tdots'); dots.innerHTML = ''; for (let i = 0; i <= max; i++) { const d = document.createElement('button'); d.className = 't-dot' + (i === tIdx ? ' active' : ''); d.addEventListener('click', () => { tIdx = i; tUpdate(); resetTT(); }); dots.appendChild(d); } const p = document.getElementById('tprev'), n = document.getElementById('tnext'); if (p) p.disabled = tIdx === 0; if (n) n.disabled = tIdx >= max; }
function tSlide(d) { tIdx += d; tUpdate(); resetTT(); }
function resetTT() { if (tTimer) clearInterval(tTimer); if (tAuto) tTimer = setInterval(() => { const mx = Math.max(0, testimonials.length - tGetVis()); tIdx = tIdx >= mx ? 0 : tIdx + 1; tUpdate(); }, 4000); }
function toggleTAutoplay() { tAuto = !tAuto; const b = document.getElementById('tpause-btn'); b.innerHTML = tAuto ? '<i class="fas fa-pause" style="font-size:.62rem;margin-right:4px;"></i>Pause' : '<i class="fas fa-play" style="font-size:.62rem;margin-right:4px;"></i>Resume'; if (tAuto) resetTT(); else clearInterval(tTimer); }
(function () { let sx = 0; const o = document.getElementById('t-carousel-outer'); if (!o) return; o.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true }); o.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) tSlide(dx < 0 ? 1 : -1); }, { passive: true }); })();
document.getElementById('tprev').addEventListener('click', () => tSlide(-1));
document.getElementById('tnext').addEventListener('click', () => tSlide(1));
let tRT; window.addEventListener('resize', () => { clearTimeout(tRT); tRT = setTimeout(() => tUpdate(false), 120); }, { passive: true });
loadTestimonialsFromDB();

/* ── TESTIMONIAL MODAL ── */
function openTestiModal() { document.getElementById('tmodal').style.display = 'flex'; document.body.style.overflow = 'hidden'; refreshModalAvatar(); tRating = 0; document.querySelectorAll('.modal-star').forEach(s => { s.style.color = 'var(--muted)'; s.textContent = '☆'; }); }
function closeTestiModal() { document.getElementById('tmodal').style.display = 'none'; document.body.style.overflow = ''; document.getElementById('testi-form').reset(); document.getElementById('t-cc').textContent = '0/500'; }
function refreshModalAvatar() { mAvSeed = Math.floor(Math.random() * 9000) + 1000; const img = document.getElementById('m-av-img'), ico = document.getElementById('m-av-icon'); img.src = `https://picsum.photos/200/200?random=${mAvSeed}`; img.style.display = 'block'; ico.style.display = 'none'; img.onerror = () => { img.style.display = 'none'; ico.style.display = 'block'; }; }
function setRating(v) { tRating = v; document.querySelectorAll('.modal-star').forEach(s => { const sv = parseInt(s.dataset.v); s.style.color = sv <= v ? 'var(--accent2)' : 'var(--muted)'; s.textContent = sv <= v ? '★' : '☆'; }); }
document.querySelectorAll('.modal-star').forEach(s => { s.addEventListener('mouseover', () => { const v = parseInt(s.dataset.v); document.querySelectorAll('.modal-star').forEach(ss => { const sv = parseInt(ss.dataset.v); ss.style.color = sv <= v ? 'var(--accent2)' : 'var(--muted)'; ss.textContent = sv <= v ? '★' : '☆'; }); }); s.addEventListener('mouseout', () => setRating(tRating)); });
async function submitTestimonial(e) { e.preventDefault(); if (!tRating) { alert('Please select a rating!'); return; } const submitBtn = document.querySelector('#testi-form button[type="submit"]'); const origTxt = submitBtn.innerHTML; submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving…'; submitBtn.disabled = true; const payload = { name: document.getElementById('t-name').value.trim(), email: document.getElementById('t-email').value.trim(), role: document.getElementById('t-role').value.trim(), company: document.getElementById('t-company').value.trim(), stars: tRating, text: document.getElementById('t-content').value.trim(), avatar_seed: mAvSeed, approved: false }; if (_sb) { const { error } = await _sb.from('testimonials').insert([payload]); if (error) { showToast(error.message, 'error'); submitBtn.innerHTML = origTxt; submitBtn.disabled = false; return; } } if (typeof emailjs !== 'undefined') { try { await emailjs.send(CFG.ejSvc, CFG.ejTplTesti, { tname: payload.name, temail: payload.email, trole: payload.role, tcompany: payload.company, stars: '★'.repeat(payload.stars) + '☆'.repeat(5 - payload.stars) + ' (' + payload.stars + '/5)', ttext: payload.text }); } catch (err) { } } submitBtn.innerHTML = origTxt; submitBtn.disabled = false; closeTestiModal(); showToast('✓ Thank you! Your testimonial will appear after review.', 'success'); }
document.getElementById('tmodal').addEventListener('click', function (e) { if (e.target === this) closeTestiModal(); });

/* ── TOAST ── */
function showToast(msg, type = 'success') { let t = document.getElementById('rd-toast'); if (!t) { t = document.createElement('div'); t.id = 'rd-toast'; t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(20px);z-index:9999;padding:13px 22px;border-radius:12px;font-size:.86rem;font-weight:600;font-family:"Cabinet Grotesk",sans-serif;max-width:90vw;text-align:center;pointer-events:none;opacity:0;transition:opacity .3s,transform .3s;box-shadow:0 8px 32px rgba(0,0,0,.5);'; document.body.appendChild(t); } const colors = { success: 'background:#0f2a1a;border:1px solid rgba(34,197,94,.35);color:#4ade80;', info: 'background:#0d1a30;border:1px solid rgba(109,39,217,.35);color:#a78bfa;', error: 'background:#2a0f0f;border:1px solid rgba(239,68,68,.35);color:#f87171;' }; t.setAttribute('style', t.style.cssText + (colors[type] || colors.info)); t.textContent = msg; requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; }); clearTimeout(t._tmr); t._tmr = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(-50%) translateY(20px)'; }, 4500); }

/* ══════════════════════════════════════════
   BLOG SYSTEM — full user write + approval
══════════════════════════════════════════ */
let blogsData = [];
let blogVis = 6;
let blogActiveFilter = 'All';
const blogGrid = document.getElementById('blog-grid');
const lmBtn = document.getElementById('load-more-btn');

/* ── simple markdown → HTML renderer ── */
/* ── syntax highlight (basic token colouring) ── */
function synHL(code, lang) {
    let h = code
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const shell = ['bash', 'sh', 'zsh', 'shell', 'powershell', 'cmd'];
    const py = ['python', 'py'];
    const js = ['javascript', 'js', 'jsx', 'ts', 'tsx'];
    if (shell.includes(lang)) {
        h = h.replace(/(#.*)$/gm, '<span class="tok-comment">$1</span>');
        h = h.replace(/\b(echo|sudo|apt|apt-get|pip|pip3|npm|yarn|git|wsl|curl|wget|cd|ls|mkdir|rm|cp|mv|cat|grep|chmod|export|source|export)\b/g, '<span class="tok-keyword">$1</span>');
        h = h.replace(/(--?[\w-]+)/g, '<span class="tok-flag">$1</span>');
        h = h.replace(/'([^']*)'|"([^"]*)"/g, (m, a, b) => `<span class="tok-string">${m}</span>`);
    } else if (py.includes(lang)) {
        h = h.replace(/(#.*)$/gm, '<span class="tok-comment">$1</span>');
        h = h.replace(/\b(def|class|import|from|return|if|elif|else|for|while|with|as|in|not|and|or|True|False|None|lambda|yield|async|await|try|except|finally|raise|pass|break|continue|global|nonlocal)\b/g, '<span class="tok-keyword">$1</span>');
        h = h.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="tok-func">$1</span>');
        h = h.replace(/'([^']*)'|"([^"]*)"/g, m => `<span class="tok-string">${m}</span>`);
        h = h.replace(/\b(\d+\.?\d*)\b/g, '<span class="tok-number">$1</span>');
    } else if (js.includes(lang)) {
        h = h.replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, '<span class="tok-comment">$1</span>');
        h = h.replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|default|new|this|typeof|instanceof|async|await|try|catch|finally|throw|of|in|from|=>)\b/g, '<span class="tok-keyword">$1</span>');
        h = h.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="tok-func">$1</span>');
        h = h.replace(/'([^']*)'|"([^"]*)"|`([^`]*)`/g, m => `<span class="tok-string">${m}</span>`);
        h = h.replace(/\b(\d+\.?\d*)\b/g, '<span class="tok-number">$1</span>');
    } else if (['sql'].includes(lang)) {
        h = h.replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|AND|OR|NOT|IN|IS|NULL|CREATE|TABLE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|DROP|ALTER|ADD|COLUMN|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|GROUP BY|ORDER BY|HAVING|LIMIT|OFFSET|DISTINCT|COUNT|SUM|AVG|MAX|MIN)\b/gi, '<span class="tok-keyword">$1</span>');
        h = h.replace(/'([^']*)'/g, '<span class="tok-string">\'$1\'</span>');
        h = h.replace(/--.*$/gm, '<span class="tok-comment">$&</span>');
    }
    return h;
}

function mdCodeBlock(rawCode, lang) {
    const cleanLang = (lang || '').toLowerCase().trim();
    const displayLang = cleanLang || 'code';
    const lines = rawCode.split('\n');
    const id = 'cb-' + Math.random().toString(36).slice(2, 8);
    const highlighted = synHL(rawCode, cleanLang);
    const lineNums = lines.map((_, i) =>
        `<div class="md-code-line-num">${i + 1}</div>`
    ).join('');
    return `<div class="md-code-block">
<div class="md-code-header">
  <span class="md-code-lang"><i class="fas fa-code" style="margin-right:5px;font-size:.6rem;opacity:.7;"></i>${escHtml(displayLang)}</span>
  <button class="md-code-copy" id="${id}" onclick="mdCopyCode(this,'${id}')">
    <i class="fas fa-copy" style="font-size:.6rem;"></i> Copy
  </button>
</div>
<div class="md-code-with-lines">
  <div class="md-code-lines">${lineNums}</div>
  <div class="md-code-scroll">
    <pre class="md-code-pre" id="${id}-pre">${highlighted}</pre>
  </div>
</div>
      </div>`;
}

function mdCopyCode(btn, id) {
    const pre = document.getElementById(id + '-pre');
    if (!pre) return;
    const text = pre.innerText || pre.textContent;
    navigator.clipboard.writeText(text).then(() => {
        btn.innerHTML = '<i class="fas fa-check" style="font-size:.6rem;"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy" style="font-size:.6rem;"></i> Copy';
            btn.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        btn.innerHTML = '<i class="fas fa-check" style="font-size:.6rem;"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy" style="font-size:.6rem;"></i> Copy'; btn.classList.remove('copied'); }, 2000);
    });
}

function mdToHtml(md) {
    if (!md) return '';

    /* 1 ─ extract + store code blocks to protect them */
    const blocks = [];
    let safe = md.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
        blocks.push({ lang: lang.trim(), code: code.replace(/\n$/, '') });
        return `\x00CODE${blocks.length - 1}\x00`;
    });

    /* 2 ─ escape HTML in everything else */
    safe = safe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    /* 3 ─ headings */
    safe = safe.replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>');
    safe = safe.replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>');
    safe = safe.replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>');

    /* 4 ─ HR */
    safe = safe.replace(/^---$/gm, '<hr class="md-hr">');

    /* 5 ─ blockquote */
    safe = safe.replace(/^&gt; (.+)$/gm, '<div class="md-quote">$1</div>');

    /* 6 ─ bold, italic, strikethrough */
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\*(.+?)\*/g, '<em>$1</em>');
    safe = safe.replace(/~~(.+?)~~/g, '<del>$1</del>');

    /* 7 ─ inline code */
    safe = safe.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');

    /* 8 ─ links */
    safe = safe.replace(/\[(.+?)\]\((.+?)\)/g, '<a class="md-link" href="$2" target="_blank" rel="noopener">$1</a>');

    /* 9 ─ tables */
    safe = safe.replace(/(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)+)/g, tableBlock => {
        const rows = tableBlock.trim().split('\n').filter(r => !r.match(/^\|[-| :]+\|$/));
        const [header, ...body] = rows;
        const ths = header.split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
        const trs = body.map(r => '<tr>' + r.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('') + '</tr>').join('');
        return `<div class="md-table-wrap"><table class="md-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
    });

    /* 10 ─ bullet lists */
    safe = safe.replace(/((?:^- .+\n?)+)/gm, match => {
        const items = match.trim().split('\n').map(l =>
            `<li class="md-li"><span class="md-li-dot">›</span><span>${l.replace(/^- /, '')}</span></li>`
        ).join('');
        return `<ul class="md-ul">${items}</ul>`;
    });

    /* 11 ─ numbered lists */
    safe = safe.replace(/((?:^\d+\. .+\n?)+)/gm, match => {
        const items = match.trim().split('\n').map(l =>
            `<li class="md-ol-li">${l.replace(/^\d+\. /, '')}</li>`
        ).join('');
        return `<ol class="md-ol">${items}</ol>`;
    });

    /* 12 ─ paragraphs (double newline) */
    const parts = safe.split(/\n\n+/);
    safe = parts.map(p => {
        p = p.trim();
        if (!p) return '';
        if (p.match(/^<(h[123]|ul|ol|hr|div|blockquote|pre|table)/)) return p;
        if (p.includes('\x00CODE')) return p;
        return `<p class="md-p">${p.replace(/\n/g, '<br>')}</p>`;
    }).join('\n');

    /* 13 ─ restore code blocks */
    safe = safe.replace(/\x00CODE(\d+)\x00/g, (_, i) => {
        const { lang, code } = blocks[parseInt(i)];
        return mdCodeBlock(code, lang);
    });

    return safe;
}

/* ── category filter tabs ── */
function blogBuildFilters() {
    const wrap = document.getElementById('blog-filter-tabs');
    if (!wrap) return;
    const cats = ['All', ...new Set(blogsData.map(b => b.category).filter(Boolean))];
    wrap.innerHTML = '';
    cats.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.className = 'sk-tab' + (cat === blogActiveFilter ? ' active' : '');
        btn.style.cssText = 'font-size:.68rem;padding:5px 14px;';
        btn.addEventListener('click', () => {
            blogActiveFilter = cat;
            blogVis = 6;
            wrap.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderBlogs();
        });
        wrap.appendChild(btn);
    });
}

/* ── build one blog card ── */
function buildBlogCard(b, i) {
    const title = b.title || '';
    const img = b.image_url || '';
    const excerpt = b.excerpt || '';
    const link = b.link_url || '';
    const cat = b.category || '';
    const date = b.d || (b.created_at ? new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '');
    const authorName = b.author_name || 'Rikesh Dahal';
    const authorAvatar = b.author_avatar || 'https://i.postimg.cc/MZhwPc85/rikesh.png';
    const isPending = b.approved === false;
    const hasContent = b.content && b.content.trim().length > 0;

    const el = document.createElement('article');
    el.className = 'reveal';
    el.style.transitionDelay = `${i * .07}s`;

    el.innerHTML = `
<div class="card" style="overflow:hidden;height:100%;display:flex;flex-direction:column;position:relative;cursor:pointer;" onclick="openBlogReader('${escHtml(b.id)}')">
  ${isPending ? `<div style="position:absolute;top:10px;left:10px;z-index:5;padding:2px 9px;border-radius:100px;background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.3);font-size:.6rem;font-weight:700;letter-spacing:.08em;color:#fbbf24;font-family:'JetBrains Mono',monospace;">⏳ PENDING</div>` : ''}
  <div style="overflow:hidden;height:166px;background:rgba(31,41,55,.4);">
    ${img ? `<img src="${escHtml(img)}" alt="${escHtml(title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:transform .5s;" onerror="this.style.display='none'" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform=''">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:2rem;opacity:.3;"><i class="fas fa-pen-nib"></i></div>`}
  </div>
  <div style="padding:15px 17px;flex:1;display:flex;flex-direction:column;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
      <span class="blog-cat">${escHtml(cat)}</span>
      <span style="font-size:.66rem;color:var(--muted);font-family:'JetBrains Mono',monospace;">${escHtml(date)}</span>
    </div>
    <h3 style="font-family:'Cabinet Grotesk',sans-serif;font-weight:800;font-size:.9rem;margin-bottom:6px;line-height:1.35;color:var(--text);">${escHtml(title)}</h3>
    <p style="font-size:.76rem;color:var(--muted);margin-bottom:11px;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${escHtml(excerpt)}</p>
    <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border);padding-top:10px;margin-top:auto;">
      <div style="display:flex;align-items:center;gap:6px;">
        <img src="${escHtml(authorAvatar)}" loading="lazy" alt="${escHtml(authorName)}" style="width:22px;height:22px;border-radius:50%;object-fit:cover;" onerror="this.src='https://placehold.co/22x22/0a1020/6d27d9?text=${encodeURIComponent((authorName[0] || 'R'))}'" >
        <span style="font-size:.68rem;color:var(--muted);">${escHtml(authorName)}</span>
      </div>
      <span style="display:inline-flex;align-items:center;gap:5px;font-size:.74rem;font-weight:700;color:var(--accent2);">${hasContent ? 'Read' : 'View'} <i class="fas fa-arrow-right" style="font-size:.6rem;"></i></span>
      <button onclick="event.stopPropagation();copyBlogLink('${escHtml(b.id)}')" 
  style="display:inline-flex;align-items:center;gap:4px;padding:4px 9px;border-radius:6px;
  background:rgba(109,39,217,.08);border:1px solid rgba(109,39,217,.2);color:var(--muted);
  font-size:.66rem;font-weight:600;font-family:'JetBrains Mono',monospace;cursor:pointer;
  transition:all .2s;" 
  onmouseover="this.style.color='var(--accent2)'" 
  onmouseout="this.style.color='var(--muted)'">
  <i class="fas fa-link" style="font-size:.58rem;"></i> Copy link
</button>
    </div>
  </div>
</div>`;

    /* admin overlay on hover */
    if (siteIsAdmin) {
        const adminBar = document.createElement('div');
        adminBar.style.cssText = 'position:absolute;bottom:0;left:0;right:0;display:none;gap:6px;padding:8px 12px;background:rgba(2,6,17,.92);border-top:1px solid var(--border);border-radius:0 0 16px 16px;z-index:10;justify-content:flex-end;';
        adminBar.innerHTML = `
  ${isPending ? `<button onclick="event.stopPropagation();blogAdminApprove('${escHtml(b.id)}')" style="padding:4px 10px;border-radius:6px;font-size:.67rem;font-weight:600;font-family:'JetBrains Mono',monospace;background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.25);cursor:pointer;">✓ Approve</button>` : ''}
  <button onclick="event.stopPropagation();blogAdminEdit('${escHtml(b.id)}')" style="padding:4px 10px;border-radius:6px;font-size:.67rem;font-weight:600;font-family:'JetBrains Mono',monospace;background:rgba(109,39,217,.1);color:var(--accent2);border:1px solid rgba(109,39,217,.25);cursor:pointer;">✎ Edit</button>
  <button onclick="event.stopPropagation();blogAdminDelete('${escHtml(b.id)}','${escHtml(title)}')" style="padding:4px 10px;border-radius:6px;font-size:.67rem;font-weight:600;font-family:'JetBrains Mono',monospace;background:rgba(248,113,113,.08);color:#f87171;border:1px solid rgba(248,113,113,.2);cursor:pointer;">✕ Delete</button>`;
        const card = el.querySelector('.card');
        card.appendChild(adminBar);
        card.addEventListener('mouseenter', () => adminBar.style.display = 'flex');
        card.addEventListener('mouseleave', () => adminBar.style.display = 'none');
    }

    return el;
}

/* ── render grid ── */
function renderBlogs() {
    blogGrid.innerHTML = '';
    const filtered = blogActiveFilter === 'All'
        ? blogsData
        : blogsData.filter(b => b.category === blogActiveFilter);

    if (!filtered.length) {
        blogGrid.innerHTML = `<div style="grid-column:1/-1;padding:40px 0;text-align:center;color:var(--muted);font-size:.88rem;">${blogActiveFilter === 'All' ? 'No posts yet.' : `No posts in "${blogActiveFilter}" yet.`}</div>`;
        lmBtn.style.display = 'none';
        return;
    }
    filtered.slice(0, blogVis).forEach((b, i) => {
        const el = buildBlogCard(b, i);
        blogGrid.appendChild(el);
        revObs.observe(el);
    });
    lmBtn.style.display = blogVis >= filtered.length ? 'none' : 'inline-flex';
}

/* ── load from Supabase ── */
async function loadBlogsFromDB() {
    if (_sb) {
        let q = _sb.from('writings').select('*');
        if (siteIsAdmin) {
            q = q.order('approved', { ascending: true }).order('created_at', { ascending: false });
        } else {
            q = q.eq('approved', true).order('sort_order', { ascending: true }).order('created_at', { ascending: false });
        }
        const { data } = await q;
        if (data) blogsData = data;
    }
    blogBuildFilters();
    renderBlogs();
    /* show Write Post btn for logged-in users */
    const wpBtn = document.getElementById('write-post-btn');
    if (wpBtn) wpBtn.style.display = siteUser ? 'inline-flex' : 'none';
}
loadBlogsFromDB();
lmBtn.addEventListener('click', () => { blogVis += 3; renderBlogs(); });

/* ══════════════════════════════════════════
   BLOG READER MODAL
══════════════════════════════════════════ */
function openBlogReader(id) {
    const b = blogsData.find(x => x.id === id);
    if (!b) return;
    const modal = document.getElementById('blog-reader-modal');
    const content = document.getElementById('blog-reader-content');
    const date = b.d || (b.created_at ? new Date(b.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '');
    const authorName = b.author_name || 'Rikesh Dahal';
    const authorAvatar = b.author_avatar || 'https://i.postimg.cc/MZhwPc85/rikesh.png';
    const readTime = b.content ? Math.max(1, Math.round(b.content.split(' ').length / 200)) : 1;
    const tags = Array.isArray(b.tags) ? b.tags : [];

    content.innerHTML = `
${b.image_url ? `<div style="margin:-36px -36px 28px;height:280px;overflow:hidden;border-radius:22px 22px 0 0;"><img src="${escHtml(b.image_url)}" alt="${escHtml(b.title || '')}" style="width:100%;height:100%;object-fit:cover;display:block;"></div>` : ''}
<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
  ${b.category ? `<span class="blog-cat">${escHtml(b.category)}</span>` : ''}
  <span style="font-family:'JetBrains Mono',monospace;font-size:.65rem;color:var(--muted);">${escHtml(date)}</span>
  <span style="font-family:'JetBrains Mono',monospace;font-size:.65rem;color:var(--muted);">· ${readTime} min read</span>
  ${b.approved === false ? `<span style="padding:2px 8px;border-radius:100px;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.25);font-size:.6rem;font-weight:700;color:#fbbf24;font-family:'JetBrains Mono',monospace;">⏳ Pending Approval</span>` : ''}
</div>
<h1 style="font-family:'Special Elite',cursive;font-size:clamp(1.5rem,4vw,2.2rem);line-height:1.2;color:var(--text);margin-bottom:16px;">${escHtml(b.title || '')}</h1>
${b.excerpt ? `<p style="font-size:1rem;color:var(--muted);line-height:1.75;margin-bottom:22px;border-left:3px solid var(--accent2);padding-left:14px;font-style:italic;">${escHtml(b.excerpt)}</p>` : ''}
<div style="display:flex;align-items:center;gap:10px;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:28px;">
  <img src="${escHtml(authorAvatar)}" alt="${escHtml(authorName)}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid rgba(109,39,217,.3);" onerror="this.src='https://placehold.co/40x40/0a1020/6d27d9?text=${encodeURIComponent((authorName[0] || 'R'))}'">
  <div>
    <div style="font-weight:700;font-size:.88rem;color:var(--text);">${escHtml(authorName)}</div>
    <div style="font-size:.7rem;color:var(--muted);font-family:'JetBrains Mono',monospace;">Author</div>
  </div>
  ${b.link_url ? `<a href="${escHtml(b.link_url)}" target="_blank" rel="noopener" class="btn-outline" style="margin-left:auto;padding:7px 16px;font-size:.78rem;">Read Original ↗</a>` : ''}
</div>
<div style="font-size:.92rem;line-height:1.85;">
  ${b.content ? mdToHtml(b.content) : `<p style="color:var(--muted);">${escHtml(b.excerpt || 'No content available.')}</p>`}
</div>
${tags.length ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:28px;padding-top:20px;border-top:1px solid var(--border);">${tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}</div>` : ''}
${siteIsAdmin && b.approved === false ? `
<div style="margin-top:24px;padding:16px;background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.22);border-radius:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
  <span style="font-family:'JetBrains Mono',monospace;font-size:.75rem;color:#fbbf24;">⏳ This post is pending your approval</span>
  <div style="display:flex;gap:8px;">
    <button onclick="blogAdminApprove('${escHtml(b.id)}')" style="padding:7px 16px;border-radius:8px;background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.25);font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:.82rem;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='rgba(34,197,94,.25)'" onmouseout="this.style.background='rgba(34,197,94,.12)'">✓ Approve Post</button>
    <button onclick="blogAdminDelete('${escHtml(b.id)}','${escHtml(b.title || '')}')" style="padding:7px 16px;border-radius:8px;background:rgba(248,113,113,.08);color:#f87171;border:1px solid rgba(248,113,113,.2);font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:.82rem;cursor:pointer;transition:all .2s;" onmouseover="this.style.background='rgba(248,113,113,.2)'" onmouseout="this.style.background='rgba(248,113,113,.08)'">✕ Reject</button>
  </div>
</div>` : ''}`;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    history.replaceState(null, '', 'blog.html?id=' + id);

    // inject comment section
    setTimeout(() => {
        const readerContent = document.getElementById('blog-reader-content');
        if (readerContent) {
            const existing = readerContent.querySelector('#bc-comments-wrap');
            if (existing) existing.remove();
            readerContent.appendChild(bcRenderSection(b.id));
            bcLoad(b.id);
        }
    }, 50);
    // scroll progress bar
    const _modal = document.getElementById('blog-reader-modal');
    const _bar = document.getElementById('blog-read-progress');
    if (_modal && _bar) {
        _bar.style.width = '0%';
        _bar.style.opacity = '1';                          // ← NEW: make it visible
        if (_modal._progressHandler) {                     // ← NEW: remove stale listener
            _modal.removeEventListener('scroll', _modal._progressHandler);
        }
        _modal._progressHandler = () => {
            const pct = _modal.scrollTop / (_modal.scrollHeight - _modal.clientHeight) * 100;
            _bar.style.width = Math.min(pct, 100) + '%';
        };
        _modal.addEventListener('scroll', _modal._progressHandler, { passive: true });
        _modal.scrollTop = 0;                              // ← NEW: reset scroll so bar starts at 0
    }
}

function closeBlogReader() {
    document.getElementById('blog-reader-modal').style.display = 'none';
    document.body.style.overflow = '';
    if (bcRealtime) { try { _sb?.removeChannel(bcRealtime); } catch (e) { } bcRealtime = null; }

    // reset + hide progress bar
    const bar = document.getElementById('blog-read-progress');
    if (bar) { bar.style.width = '0%'; bar.style.opacity = '0'; }

    // remove scroll listener stored on the modal
    const modal = document.getElementById('blog-reader-modal');
    if (modal && modal._progressHandler) {
        modal.removeEventListener('scroll', modal._progressHandler);
        delete modal._progressHandler;
    }

    // restore URL to #blog
    history.replaceState(null, '', window.location.pathname + '#blog');
    document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.addEventListener('popstate', () => {
    const modal = document.getElementById('blog-reader-modal');
    // If the reader is open, close it cleanly (without pushing another history entry)
    if (modal && modal.style.display !== 'none') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        if (typeof bcRealtime !== 'undefined' && bcRealtime) {
            try { _sb?.removeChannel(bcRealtime); } catch (e) { }
            bcRealtime = null;
        }
        const _bar = document.getElementById('blog-read-progress');
        if (_bar) _bar.style.width = '0%';
    }
    // Scroll to #blog regardless
    document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
/* ══════════════════════════════════════════
   WRITE POST MODAL
══════════════════════════════════════════ */
let wpmIsEditing = false;
let wpmEditId = null;
let wpmTags = [];
let wpeMode = 'write';
let wpeAutoSaveTimer = null;

function openWritePostModal(editData) {
    if (!siteUser) { openAuthModal(); return; }
    wpmIsEditing = !!editData;
    wpmEditId = editData?.id || null;
    wpmTags = editData?.tags ? [...editData.tags] : [];
    wpeMode = 'write';

    const modal = document.getElementById('write-post-modal');
    modal.style.cssText = 'display:flex;position:fixed;inset:0;z-index:9150;';
    document.body.style.overflow = 'hidden';
    /* hide site chrome */
    ['hdr', 'lvc', 'btt', 'kimi-win'].forEach(id => {
        const el = document.getElementById(id); if (el) el.dataset.wpeHid = el.style.display || ''; if (el) el.style.display = 'none';
    });
    document.querySelectorAll('.kimi-btn').forEach(el => { el.dataset.wpeHid = el.style.display || ''; el.style.display = 'none'; });

    document.getElementById('wpm-title-label').textContent = wpmIsEditing ? 'Edit Post' : 'New Post';
    document.getElementById('wpe-submit-label').textContent = wpmIsEditing ? 'Save Changes' : siteIsAdmin ? 'Publish' : 'Submit for Review';

    document.getElementById('wp-title').value = editData?.title || '';
    document.getElementById('wp-category').value = editData?.category || '';
    document.getElementById('wp-image').value = editData?.image_url || '';
    document.getElementById('wp-excerpt').value = editData?.excerpt || '';
    document.getElementById('wp-content').value = editData?.content || '';
    document.getElementById('wp-link').value = editData?.link_url || '';

    // Restore unsaved draft for new posts (not edits)
    if (!wpmIsEditing) {
        const draft = wpeLoadDraft();
        if (draft && draft.savedAt) {
            const ago = Math.round((Date.now() - draft.savedAt) / 60000);
            const label = ago < 1 ? 'just now' : ago + 'm ago';
            if (confirm(`You have an unsaved draft from ${label}. Restore it?`)) {
                document.getElementById('wp-title').value = draft.title || '';
                document.getElementById('wp-category').value = draft.category || '';
                document.getElementById('wp-image').value = draft.image || '';
                document.getElementById('wp-excerpt').value = draft.excerpt || '';
                document.getElementById('wp-content').value = draft.content || '';
                document.getElementById('wp-link').value = draft.link || '';
                wpmTags = Array.isArray(draft.tags) ? [...draft.tags] : [];
            }
        }
    }

    /* show sidebar toggle on narrow screens */
    const sBtn = document.getElementById('wpe-sidebar-btn');
    if (sBtn) sBtn.style.display = window.innerWidth < 960 ? 'flex' : 'none';

    wpeRenderTags();
    wpeSetMode('write');
    wpmUpdateCount();
    wpePreviewCover(editData?.image_url || '');
    const msgEl = document.getElementById('wpe-msg');
    if (msgEl) { msgEl.textContent = ''; msgEl.classList.remove('show'); }

    const excerptEl = document.getElementById('wp-excerpt');
    const excCount = document.getElementById('wpe-excerpt-count');
    if (excerptEl && excCount) {
        excCount.textContent = excerptEl.value.length + ' / 200';
        excerptEl.oninput = () => excCount.textContent = excerptEl.value.length + ' / 200';
    }

    window.addEventListener('resize', wpeHandleResize);
    setTimeout(() => document.getElementById('wp-title').focus(), 80);
}

function wpeHandleResize() {
    const sBtn = document.getElementById('wpe-sidebar-btn');
    if (sBtn) sBtn.style.display = window.innerWidth < 960 ? 'flex' : 'none';
    if (window.innerWidth >= 960) wpeCloseSidebar();
}

function closeWritePostModal() {
    const modal = document.getElementById('write-post-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    wpmIsEditing = false; wpmEditId = null; wpmTags = [];
    clearTimeout(wpeAutoSaveTimer);
    window.removeEventListener('resize', wpeHandleResize);
    wpeCloseSidebar();
    /* restore site chrome */
    ['hdr', 'lvc', 'btt'].forEach(id => {
        const el = document.getElementById(id); if (el) el.style.display = el.dataset.wpeHid ?? '';
    });
    document.querySelectorAll('.kimi-btn').forEach(el => { el.style.display = el.dataset.wpeHid ?? ''; });
}

function wpeToggleSidebar() {
    document.getElementById('wpe-sidebar')?.classList.toggle('open');
    document.getElementById('wpe-overlay')?.classList.toggle('on');
}
function wpeCloseSidebar() {
    document.getElementById('wpe-sidebar')?.classList.remove('open');
    document.getElementById('wpe-overlay')?.classList.remove('on');
}

function wpeOpenPostPreview() {
    const title = document.getElementById('wp-title')?.value?.trim() || 'Untitled Post';
    const excerpt = document.getElementById('wp-excerpt')?.value?.trim() || '';
    const content = document.getElementById('wp-content')?.value?.trim() || '';
    const cat = document.getElementById('wp-category')?.value?.trim() || '';
    const img = document.getElementById('wp-image')?.value?.trim() || '';
    const link = document.getElementById('wp-link')?.value?.trim() || '';
    const tags = wpmTags;
    const authorName = siteUser ? (siteUser.user_metadata?.full_name || siteUser.user_metadata?.name || siteUser.email?.split('@')[0] || 'You') : 'You';
    const authorAvatar = siteUser?.user_metadata?.avatar_url || siteUser?.user_metadata?.picture || 'https://i.postimg.cc/MZhwPc85/rikesh.png';
    const readTime = content ? Math.max(1, Math.round(content.split(/\s+/).length / 200)) : 1;
    const now = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const inner = document.getElementById('wpe-post-preview-inner');
    inner.innerHTML = `
${img ? `<div style="margin:-36px -36px 28px;height:300px;overflow:hidden;"><img src="${escHtml(img)}" alt="${escHtml(title)}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.parentElement.style.display='none'"></div>` : ''}
<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
  ${cat ? `<span class="blog-cat">${escHtml(cat)}</span>` : ''}
  <span style="font-family:'JetBrains Mono',monospace;font-size:.65rem;color:var(--muted);">${escHtml(now)}</span>
  <span style="font-family:'JetBrains Mono',monospace;font-size:.65rem;color:var(--muted);">· ${readTime} min read</span>
  <span style="padding:2px 8px;border-radius:100px;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.25);font-size:.6rem;font-weight:700;color:#fbbf24;font-family:'JetBrains Mono',monospace;">Preview</span>
</div>
<h1 style="font-family:'Special Elite',cursive;font-size:clamp(1.5rem,4vw,2.2rem);line-height:1.2;color:var(--text);margin-bottom:16px;">${escHtml(title)}</h1>
${excerpt ? `<p style="font-size:1rem;color:var(--muted);line-height:1.75;margin-bottom:22px;border-left:3px solid var(--accent2);padding-left:14px;font-style:italic;">${escHtml(excerpt)}</p>` : ''}
<div style="display:flex;align-items:center;gap:10px;padding:14px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:28px;">
  <img src="${escHtml(authorAvatar)}" alt="${escHtml(authorName)}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid rgba(109,39,217,.3);" onerror="this.src='https://placehold.co/40x40/0a1020/6d27d9?text=${encodeURIComponent(authorName[0] || 'U')}'" >
  <div>
    <div style="font-weight:700;font-size:.88rem;color:var(--text);">${escHtml(authorName)}</div>
    <div style="font-size:.7rem;color:var(--muted);font-family:'JetBrains Mono',monospace;">Author</div>
  </div>
  ${link ? `<a href="${escHtml(link)}" target="_blank" rel="noopener" style="margin-left:auto;display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;border:1px solid var(--border);color:var(--muted);font-size:.78rem;font-weight:600;font-family:'Cabinet Grotesk',sans-serif;transition:all .2s;" onmouseover="this.style.borderColor='var(--accent2)';this.style.color='var(--accent2)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--muted)'">View Original ↗</a>` : ''}
</div>
<div style="font-size:.92rem;line-height:1.85;">
  ${content ? mdToHtml(content) : '<p style="color:var(--muted);font-style:italic;">No content written yet. Go back and start writing!</p>'}
</div>
${tags.length ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:28px;padding-top:20px;border-top:1px solid var(--border);">${tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}</div>` : ''}
<div style="margin-top:28px;padding:16px;background:rgba(251,191,36,.05);border:1px solid rgba(251,191,36,.18);border-radius:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
  <i class="fas fa-eye" style="color:#fbbf24;font-size:.9rem;flex-shrink:0;"></i>
  <span style="font-size:.78rem;color:var(--muted);flex:1;">This is a preview of how your post will look once published. It has not been submitted yet.</span>
</div>`;

    /* update submit label in preview bar to match editor */
    const previewSubmit = document.getElementById('wpe-preview-submit-label');
    if (previewSubmit) previewSubmit.textContent = siteIsAdmin ? 'Publish Now' : 'Submit for Review';

    document.getElementById('wpe-post-preview').style.display = 'block';
    document.getElementById('wpe-post-preview').scrollTop = 0;
}

function wpeClosePostPreview() {
    document.getElementById('wpe-post-preview').style.display = 'none';
}

function wpmInsertCodeBlock() {
    wpmInsert('\n```bash\n', '\n```\n');
}

/* ── view mode: write / split / preview ── */
function wpeSetMode(mode) {
    wpeMode = mode;
    const area = document.getElementById('wpe-editor-area');
    const pane = document.getElementById('wpm-preview-pane');
    area.className = 'wpe-editor-area';
    if (mode === 'split') {
        area.classList.add('split');
        pane.innerHTML = mdToHtml(document.getElementById('wp-content').value);
    } else if (mode === 'preview') {
        area.classList.add('preview-only');
        pane.innerHTML = mdToHtml(document.getElementById('wp-content').value);
    }
    document.querySelectorAll('.wpe-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('wpe-tab-' + mode)?.classList.add('active');
}

function wpeAutoPreview() {
    if (wpeMode === 'split' || wpeMode === 'preview') {
        clearTimeout(wpeAutoSaveTimer);
        wpeAutoSaveTimer = setTimeout(() => {
            document.getElementById('wpm-preview-pane').innerHTML = mdToHtml(document.getElementById('wp-content').value);
        }, 300);
    }
    wpeSetAutosave();
}

let wpeDraftTimer;
function wpeSetAutosave() {
    const el = document.getElementById('wpe-autosave-status');
    if (!el) return;
    el.innerHTML = '<i class="fas fa-circle" style="font-size:.45rem;color:#fbbf24;"></i> Editing…';
    clearTimeout(wpeDraftTimer);
    wpeDraftTimer = setTimeout(() => {
        // Actually save draft to localStorage
        try {
            const draft = {
                title: document.getElementById('wp-title')?.value || '',
                excerpt: document.getElementById('wp-excerpt')?.value || '',
                content: document.getElementById('wp-content')?.value || '',
                category: document.getElementById('wp-category')?.value || '',
                image: document.getElementById('wp-image')?.value || '',
                link: document.getElementById('wp-link')?.value || '',
                tags: wpmTags,
                savedAt: Date.now(),
            };
            localStorage.setItem('wpe_draft', JSON.stringify(draft));
            el.innerHTML = '<i class="fas fa-circle" style="font-size:.45rem;color:#22c55e;"></i> Draft saved';
        } catch (err) {
            el.innerHTML = '<i class="fas fa-circle" style="font-size:.45rem;color:#f87171;"></i> Save failed';
        }
    }, 1200);
}

function wpeLoadDraft() {
    try {
        const raw = localStorage.getItem('wpe_draft');
        if (!raw) return null;
        return JSON.parse(raw);
    } catch { return null; }
}

function wpeClearDraft() {
    localStorage.removeItem('wpe_draft');
}

function wpeSyncScroll() {
    const ta = document.getElementById('wp-content');
    const pane = document.getElementById('wpm-preview-pane');
    if (wpeMode !== 'split' || !pane) return;
    const pct = ta.scrollTop / (ta.scrollHeight - ta.clientHeight);
    pane.scrollTop = pct * (pane.scrollHeight - pane.clientHeight);
}

/* ── markdown insert ── */
function wpmInsert(before, after) {
    const ta = document.getElementById('wp-content');
    const s = ta.selectionStart, e = ta.selectionEnd;
    const selected = ta.value.slice(s, e);
    ta.value = ta.value.slice(0, s) + before + selected + after + ta.value.slice(e);
    ta.selectionStart = s + before.length;
    ta.selectionEnd = s + before.length + selected.length;
    ta.focus();
    wpmUpdateCount();
    wpeAutoPreview();
}

function wpmInsertTable() {
    wpmInsert('\n| Column 1 | Column 2 | Column 3 |\n| --- | --- | --- |\n| Row 1 | Data | Data |\n| Row 2 | Data | Data |\n', '');
}

/* ── word / char count ── */
function wpmUpdateCount() {
    const ta = document.getElementById('wp-content');
    if (!ta) return;
    const text = ta.value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const rt = Math.max(1, Math.round(words / 200));

    const cc = document.getElementById('wp-char-count');
    if (cc) cc.textContent = words.toLocaleString() + ' words · ' + chars.toLocaleString() + ' chars';

    const wEl = document.getElementById('wpe-words');
    const cEl = document.getElementById('wpe-chars');
    const rEl = document.getElementById('wpe-readtime');
    if (wEl) wEl.textContent = words.toLocaleString();
    if (cEl) cEl.textContent = chars.toLocaleString();
    if (rEl) rEl.textContent = rt + 'm';
}

/* ── tag chips ── */
function wpeAddTag() {
    const inp = document.getElementById('wp-tag-input');
    const val = inp?.value?.trim();
    if (!val || wpmTags.includes(val)) { if (inp) inp.value = ''; return; }
    wpmTags.push(val);
    inp.value = '';
    wpeRenderTags();
    document.getElementById('wp-tags').value = wpmTags.join(', ');
}

function wpeRemoveTag(tag) {
    wpmTags = wpmTags.filter(t => t !== tag);
    wpeRenderTags();
    document.getElementById('wp-tags').value = wpmTags.join(', ');
}

function wpeRenderTags() {
    const wrap = document.getElementById('wpe-tag-wrap');
    if (!wrap) return;
    wrap.innerHTML = wpmTags.map(t =>
        `<span class="wpe-tag-chip">${escHtml(t)}<button class="wpe-tag-remove" onclick="wpeRemoveTag('${escHtml(t)}')" title="Remove">✕</button></span>`
    ).join('');
}

/* ── cover image preview ── */
function wpePreviewCover(url) {
    const wrap = document.getElementById('wpe-cover-preview');
    const img = document.getElementById('wpe-cover-img');
    if (!wrap || !img) return;
    if (url && url.startsWith('http')) {
        img.src = url;
        wrap.style.display = 'block';
    } else {
        wrap.style.display = 'none';
    }
}

/* ── keyboard shortcuts inside editor ── */
document.addEventListener('keydown', e => {
    const modal = document.getElementById('write-post-modal');
    if (modal?.style?.display !== 'flex' && modal?.style?.display !== 'block') return;
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b') { e.preventDefault(); wpmInsert('**', '**'); }
        if (e.key === 'i') { e.preventDefault(); wpmInsert('*', '*'); }
        if (e.key === 'k') { e.preventDefault(); wpmInsert('[', '](url)'); }
        if (e.key === 'Enter') { e.preventDefault(); submitUserPost(); }
    }
    if (e.key === 'Escape') {
        if (document.getElementById('wpe-post-preview')?.style.display === 'block') {
            wpeClosePostPreview(); return;
        }
        closeWritePostModal();
    }
});

async function submitUserPost() {
    if (!siteUser) { openAuthModal(); return; }
    const title = document.getElementById('wp-title')?.value?.trim();
    const cat = document.getElementById('wp-category')?.value?.trim();
    const excerpt = document.getElementById('wp-excerpt')?.value?.trim();
    const content = document.getElementById('wp-content')?.value?.trim();
    const msgEl = document.getElementById('wpe-msg');

    if (!title) { wpeShowMsg('Title is required.'); return; }
    if (!excerpt) { wpeShowMsg('Excerpt is required.'); return; }
    if (!content) { wpeShowMsg('Content is required.'); return; }

    function wpeShowMsg(txt) {
        const el = document.getElementById('wpe-msg');
        if (!el) return;
        el.textContent = txt; el.classList.add('show');
        setTimeout(() => { el.textContent = ''; el.classList.remove('show'); }, 3000);
    }

    const btn = document.getElementById('wp-submit-btn');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving…';

    const meta = siteUser.user_metadata || {};
    const authorName = meta.full_name || meta.name || meta.user_name || siteUser.email?.split('@')[0] || 'Anonymous';
    const authorAvatar = meta.avatar_url || meta.picture || null;

    const payload = {
        title,
        category: cat || null,
        tags: wpmTags.length ? wpmTags : (document.getElementById('wp-tags')?.value?.split(',').map(t => t.trim()).filter(Boolean) || []),
        image_url: document.getElementById('wp-image')?.value?.trim() || null,
        excerpt,
        content,
        link_url: document.getElementById('wp-link')?.value?.trim() || null,
        author_id: siteUser.id,
        author_name: authorName,
        author_avatar: authorAvatar,
        approved: siteIsAdmin ? true : false,
        sort_order: 99,
    };

    let error;
    if (wpmIsEditing && wpmEditId) {
        ({ error } = await _sb.from('writings').update(payload).eq('id', wpmEditId));
    } else {
        ({ error } = await _sb.from('writings').insert(payload));
    }

    btn.disabled = false;
    btn.innerHTML = orig;

    if (error) {
        msgEl.style.color = '#f87171';
        msgEl.textContent = error.message;
        return;
    }

    closeWritePostModal();
    wpeClearDraft(); // Draft successfully submitted — clear localStorage
    if (wpmIsEditing) {
        showToast('✓ Post updated!', 'success');
    } else if (siteIsAdmin) {
        showToast('✓ Post published!', 'success');
    } else {
        showToast('✓ Submitted! Admin will review your post shortly.', 'success');
    }
    await loadBlogsFromDB();
}

/* ── Admin quick actions from card / reader ── */
async function blogAdminApprove(id) {
    if (!_sb || !siteIsAdmin) return;
    const { error } = await _sb.from('writings').update({ approved: true }).eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('✓ Post approved & published!', 'success');
    closeBlogReader();
    await loadBlogsFromDB();
}

async function blogAdminDelete(id, title) {
    if (!_sb || !siteIsAdmin) return;
    if (!confirm(`Delete post "${title}"?`)) return;
    const { error } = await _sb.from('writings').delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Post deleted.', 'info');
    closeBlogReader();
    await loadBlogsFromDB();
}

function blogAdminEdit(id) {
    const b = blogsData.find(x => x.id === id);
    if (!b) return;
    openWritePostModal(b);
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeWritePostModal(); closeBlogReader(); }
});


/* ── CONTACT FORM ── */
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Honeypot check — if this hidden field has a value, it's a bot
    if (document.getElementById('form-website').value) return;
    const self = this; const btn = self.querySelector('button[type="submit"]'), msg = document.getElementById('form-msg');
    // Debounce — prevent double-submit
    if (btn.disabled) return;
    if (typeof emailjs === 'undefined') { msg.textContent = 'Email service unavailable. Please email: rikeshdahal0526@gmail.com'; msg.style.color = '#f87171'; return; } const origHtml = btn.innerHTML; btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending…'; btn.disabled = true; const params = { from_name: document.getElementById('form-name').value.trim(), from_email: document.getElementById('form-email').value.trim(), subject: document.getElementById('form-subject').value.trim() || 'Portfolio Contact', message: document.getElementById('form-message').value.trim(), to_email: 'rikeshdahal0526@gmail.com', reply_to: document.getElementById('form-email').value.trim() }; emailjs.send(CFG.ejSvc, CFG.ejTpl, params).then(function () { msg.textContent = "✓ Message sent! I'll reply within 24 hours."; msg.style.color = 'var(--accent2)'; self.reset(); showToast('Message sent successfully! 🎉', 'success'); }).catch(function (err) { console.error('EmailJS contact error:', err); msg.textContent = '✕ Failed to send. Please email: rikeshdahal0526@gmail.com'; msg.style.color = '#f87171'; showToast('Send failed — please email directly.', 'error'); }).finally(function () { btn.innerHTML = origHtml; btn.disabled = false; setTimeout(() => { msg.textContent = ''; }, 7000); });
});

/* ── KIMI ── */
function toggleKimi() { const w = document.getElementById('kimi-win'); w.style.display = w.style.display === 'block' ? 'none' : 'block'; }

/* ── BHAJAN PLAYER ── */
(function () { const tracks = [{ name: 'Hare Krishna Maha Mantra', src: 'https://image2url.com/r2/default/audio/1773515710772-2be7de61-becf-4a6e-9fb3-c09886a1c9eb.mp3' }, { name: 'Shiva Tandav', src: 'https://image2url.com/r2/default/audio/1773516066966-048aeb0a-0719-45bc-90c7-b3ba6c3298cb.mp3' }, { name: 'Radhe Govinda', src: 'https://image2url.com/r2/default/audio/1773515867617-522a5f5c-a491-44d8-ac4e-e0dc77ccfc49.mp3' }, { name: 'Mere Banke Bihari Lal', src: 'https://image2url.com/r2/default/audio/1773557472921-22690206-9ffd-43a6-ba13-5b23b8d386ca.mp3' }]; let cur = 0; const audio = new Audio(); audio.volume = 0.7; const waveEl = document.getElementById('bp-wave'); if (waveEl) { const heights = [10, 16, 22, 18, 26, 14, 20, 24, 12, 18, 22, 16, 10, 20, 16, 24, 18, 12]; const durs = [.55, .7, .48, .82, .65, .58, .75, .5, .68, .6, .72, .53, .8, .62, .57, .78, .66, .52]; const frag = document.createDocumentFragment(); heights.forEach((h, i) => { const b = document.createElement('div'); b.className = 'bp-wave-bar'; b.style.cssText = `height:${h}px;--d:${durs[i]}s;`; frag.appendChild(b); }); waveEl.appendChild(frag); } function syncUI() { const playing = !audio.paused && !audio.ended && audio.readyState > 2; const btn = document.getElementById('bp-play'); if (btn) btn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'; const vinyl = document.getElementById('bp-vinyl'); if (vinyl) vinyl.classList.toggle('spinning', playing); if (waveEl) { waveEl.querySelectorAll('.bp-wave-bar').forEach(b => { if (playing) { b.classList.remove('active'); void b.offsetWidth; b.classList.add('active'); } else { b.classList.remove('active'); } }); } } audio.addEventListener('play', syncUI); audio.addEventListener('pause', syncUI); audio.addEventListener('ended', () => { cur = (cur + 1) % tracks.length; loadTrack(cur); audio.play().catch(() => { }); updatePills(); }); audio.addEventListener('timeupdate', () => { if (!audio.duration) return; const pct = (audio.currentTime / audio.duration) * 100; const pf = document.getElementById('bp-progressFill'); if (pf) pf.style.width = pct + '%'; const pt = document.getElementById('bp-progressThumb'); if (pt) pt.style.left = `calc(${pct}% - 6px)`; const ct = document.getElementById('bp-currentTime'); if (ct) ct.textContent = fmt(audio.currentTime); }); audio.addEventListener('loadedmetadata', () => { const d = document.getElementById('bp-duration'); if (d) d.textContent = fmt(audio.duration); }); const tlEl = document.getElementById('bp-trackList'); if (tlEl) { tracks.forEach((t, i) => { const pill = document.createElement('button'); pill.className = 'bp-track-pill' + (i === 0 ? ' active' : ''); pill.textContent = t.name; pill.addEventListener('click', () => { const wp = !audio.paused; cur = i; loadTrack(i); if (wp) audio.play().catch(() => { }); updatePills(); }); tlEl.appendChild(pill); }); } const updatePills = () => { if (tlEl) tlEl.querySelectorAll('.bp-track-pill').forEach((p, i) => p.classList.toggle('active', i === cur)); }; const fmt = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'); function loadTrack(i) { cur = i; audio.src = tracks[i].src; const tn = document.getElementById('bp-trackName'); if (tn) tn.textContent = tracks[i].name; const pf = document.getElementById('bp-progressFill'); if (pf) pf.style.width = '0%'; const pt = document.getElementById('bp-progressThumb'); if (pt) pt.style.left = '0%'; const ct = document.getElementById('bp-currentTime'); if (ct) ct.textContent = '0:00'; const dur = document.getElementById('bp-duration'); if (dur) dur.textContent = '—'; updatePills(); } function bindBtn(id, fn) { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); } bindBtn('bp-play', () => { if (!audio.src || audio.src === '') loadTrack(0); audio.paused ? audio.play().catch(() => { }) : audio.pause(); }); bindBtn('bp-prev', () => { cur = (cur - 1 + tracks.length) % tracks.length; const wp = !audio.paused; loadTrack(cur); if (wp) audio.play().catch(() => { }); updatePills(); }); bindBtn('bp-next', () => { cur = (cur + 1) % tracks.length; const wp = !audio.paused; loadTrack(cur); if (wp) audio.play().catch(() => { }); updatePills(); }); bindBtn('bp-back', () => { audio.currentTime = Math.max(0, audio.currentTime - 10); }); bindBtn('bp-fwd', () => { audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10); }); const vol = document.getElementById('bp-vol'); if (vol) vol.addEventListener('input', () => { audio.volume = parseFloat(vol.value); }); const pw = document.getElementById('bp-progressWrap'); if (pw) pw.addEventListener('click', e => { if (!audio.duration) return; const r = pw.getBoundingClientRect(); audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration; }); loadTrack(0); syncUI(); })();

/* ── SCROLL-DRIVEN TIMELINE ── */
(function () { function initTimeline() { const expList = document.getElementById('exp-list'); const trackFill = document.getElementById('track-fill'); const dotsWrap = document.getElementById('timeline-dots'); if (!expList || !trackFill || !dotsWrap) return; const items = expList.querySelectorAll(':scope > *'); if (!items.length) return; dotsWrap.innerHTML = ''; items.forEach((_, i) => { const dot = document.createElement('div'); dot.style.cssText = 'width:12px;height:12px;background:rgba(109,39,217,.22);border-radius:50%;border:2px solid rgba(109,39,217,.18);box-shadow:none;transition:background .3s,box-shadow .3s,border-color .3s;flex-shrink:0;'; dot.dataset.index = i; dotsWrap.appendChild(dot); }); const dots = dotsWrap.querySelectorAll('div'); function update() { const section = document.getElementById('experience'); if (!section) return; const secRect = section.getBoundingClientRect(), secH = section.offsetHeight, winH = window.innerHeight; const scrolled = Math.min(1, Math.max(0, (-secRect.top + winH * 0.55) / (secH - winH * 0.45))); trackFill.style.height = (scrolled * 100) + '%'; items.forEach((item, i) => { const r = item.getBoundingClientRect(), active = r.top < winH * 0.6, dot = dots[i]; if (!dot) return; if (active) { dot.style.background = 'var(--accent)'; dot.style.borderColor = 'rgba(109,39,217,.4)'; dot.style.boxShadow = '0 0 9px var(--glow)'; } else { dot.style.background = 'rgba(109,39,217,.22)'; dot.style.borderColor = 'rgba(109,39,217,.18)'; dot.style.boxShadow = 'none'; } }); } window.addEventListener('scroll', update, { passive: true }); update(); } const expList = document.getElementById('exp-list'); if (expList && expList.children.length > 0) { initTimeline(); } else { const obs = new MutationObserver(() => { if (expList.children.length > 0) { obs.disconnect(); initTimeline(); } }); if (expList) obs.observe(expList, { childList: true }); } })();

/* ══════════════════════════════════════════
   MANIFEST MODAL
══════════════════════════════════════════ */
let manifestLoaded = false;

function openManifestModal() {
    const modal = document.getElementById('manifest-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!manifestLoaded) { loadBucketList(); manifestLoaded = true; }
}

function closeManifestModal() {
    document.getElementById('manifest-modal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close on backdrop click
document.getElementById('manifest-modal').addEventListener('click', function (e) {
    if (e.target === this) closeManifestModal();
});

// Close on Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeManifestModal();
        closeTestiModal();
    }
});

function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

async function loadBucketList() {
    const skeleton = document.getElementById('m-skeleton');
    const list = document.getElementById('m-bucket-list');
    const progWrap = document.getElementById('m-prog-bar-wrap');
    const progBar = document.getElementById('m-prog-bar');
    const progText = document.getElementById('m-progress-text');

    if (!_sb) {
        // No Supabase — show placeholder items
        renderBucketList([
            { label: 'Visit Japan 🇯🇵', completed: false },
            { label: 'Launch a published game', completed: false },
            { label: 'Complete BCA degree', completed: true },
            { label: 'Build an AI assistant', completed: true },
            { label: 'Get Databricks certification', completed: false },
            { label: 'Contribute to open source', completed: false },
        ]);
        return;
    }

    try {
        const { data, error } = await _sb
            .from(CFG.BUCKET_TABLE)
            .select('id, label, completed, image_url')
            .order('sort_order', { ascending: true });
        if (error) throw error;
        renderBucketList(data || []);
    } catch (err) {
        console.error('Bucket list load error:', err);
        skeleton.style.display = 'none';
        list.style.display = 'block';
        list.innerHTML = `<li style="padding:16px 0;font-family:'DM Mono',monospace;font-size:.8rem;color:#f87171;">⚠ Failed to load bucket list.</li>`;
        progText.style.display = 'block';
        progText.textContent = '';
    }
}

function renderBucketList(items) {
    const skeleton = document.getElementById('m-skeleton');
    const list = document.getElementById('m-bucket-list');
    const progWrap = document.getElementById('m-prog-bar-wrap');
    const progBar = document.getElementById('m-prog-bar');
    const progText = document.getElementById('m-progress-text');

    skeleton.style.display = 'none';
    list.style.display = 'block';
    progWrap.style.display = 'block';
    progText.style.display = 'block';
    list.innerHTML = '';

    if (!items.length) {
        list.innerHTML = `<li style="padding:16px 0;font-family:'DM Mono',monospace;font-size:.8rem;color:var(--muted);">No items yet.</li>`;
        progText.textContent = '0 out of 0 completed.';
        return;
    }

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'm-bucket-item';
        const hasImg = item.image_url && item.image_url.trim();
        li.innerHTML = `
  <div class="m-check ${item.completed ? 'checked' : ''}"></div>
  <span class="m-label ${item.completed ? 'done' : ''}">${escHtml(item.label)}</span>
  ${hasImg
                ? `<div class="m-thumb"><img src="${escHtml(item.image_url)}" alt="${escHtml(item.label)}" loading="lazy" onerror="this.parentElement.classList.add('empty');this.remove()"></div>`
                : `<div class="m-thumb empty"></div>`}
`;
        list.appendChild(li);
    });

    const done = items.filter(i => i.completed).length;
    const pct = Math.round((done / items.length) * 100);
    setTimeout(() => { progBar.style.width = pct + '%'; }, 100);
    progText.textContent = `${done} out of ${items.length} completed · ${pct}%`;
}

/* QR Download */
document.getElementById('m-dl-btn').addEventListener('click', async () => {
    try {
        const res = await fetch(CFG.QR_URL);
        if (!res.ok) throw new Error('fetch failed');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement('a'), { href: url, download: 'esewa-qr.png' });
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 3000);
        showToast('✓ QR code downloaded!', 'success');
    } catch {
        window.open(CFG.QR_URL, '_blank');
        showToast('Opened QR in new tab.', 'info');
    }
});

/* ══════════════════════════════════════════
   GUESTBOOK MODAL — with Likes & Replies
══════════════════════════════════════════ */
const GB_CFG = {
    table: 'guestbook',
    likes_table: 'guestbook_likes',
    bucket: 'guestbook-images',
    adminIds: ['5be465b2-450b-477f-bf9a-3396ee50435c'],
};
let gbLoaded = false;
let gbUser = null;
let gbAllEntries = [];
let gbFilter = 'all';
let gbPendingImage = null;
let gbRealtime = null;
let gbUserLikes = new Set(); // set of entry IDs the current user has liked
let gbReplyingTo = null; // { id, name } of entry being replied to

function openGuestbookModal() {
    const modal = document.getElementById('guestbook-modal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!gbLoaded) {
        gbBoot();
        gbLoaded = true;
    }
}

function closeGuestbookModal() {
    document.getElementById('guestbook-modal').classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('guestbook-modal').addEventListener('click', function (e) {
    if (e.target === this) closeGuestbookModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeGuestbookModal();
});

function gbInitials(name) {
    return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function gbTimeAgo(iso) {
    const diff = (Date.now() - new Date(iso)) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    if (diff < 86400 * 30) return Math.floor(diff / 86400) + 'd ago';
    if (diff < 86400 * 365) return Math.floor(diff / 86400 / 30) + 'mo ago';
    return Math.floor(diff / 86400 / 365) + 'y ago';
}

function gbEsc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ── render auth card ── */
function gbRenderAuth() {
    const card = document.getElementById('gb-auth-card');
    if (!card) return;
    if (gbUser) {
        const meta = gbUser.user_metadata || {};
        const name = meta.full_name || meta.name || meta.user_name || gbUser.email || 'User';
        const avatar = meta.avatar_url || meta.picture || '';
        card.innerHTML = `
  <div class="gb-compose-hdr">
    <div class="gb-compose-who">
      <div class="gb-avatar">
        ${avatar ? `<img src="${gbEsc(avatar)}" alt="${gbEsc(name)}" onerror="this.remove()">` : gbInitials(name)}
      </div>
      <span class="gb-signed-label">Signed in as <strong>${gbEsc(name)}</strong></span>
    </div>
    <button class="gb-signout-btn" id="gb-signout-btn">Sign out</button>
  </div>
  <div id="gb-reply-banner" style="display:none;" class="gb-reply-banner">
    <span id="gb-reply-banner-text"></span>
    <button onclick="gbCancelReply()" class="gb-reply-cancel-btn">✕ Cancel</button>
  </div>
  <div class="gb-compose-row">
    <input type="text" class="gb-msg-input" id="gb-msg-input" placeholder="Leave a message or some kudos!" maxlength="500">
    <label class="gb-img-btn" title="Attach image">
      <input type="file" id="gb-img-input" accept="image/*" style="display:none">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    </label>
    <button class="gb-send-btn" id="gb-send-btn" title="Send">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    </button>
  </div>
  <div id="gb-img-preview-wrap" style="display:none" class="gb-img-preview-wrap">
    <img id="gb-img-preview" src="" alt="preview">
    <button class="gb-remove-img-btn" id="gb-remove-img-btn">✕</button>
  </div>`;
        document.getElementById('gb-signout-btn').addEventListener('click', gbSignOut);
        document.getElementById('gb-send-btn').addEventListener('click', gbSubmit);
        document.getElementById('gb-msg-input').addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); gbSubmit(); }
        });
        document.getElementById('gb-img-input').addEventListener('change', gbHandleImage);
        document.getElementById('gb-remove-img-btn').addEventListener('click', gbClearImage);
    } else {
        gbReplyingTo = null;
        card.innerHTML = `
  <p class="gb-signin-title">Sign the Guestbook</p>
  <p class="gb-signin-sub">Log in to leave a message — it only takes a second.</p>
  <div class="gb-oauth-grid">
    <button class="gb-oauth-btn" id="gb-btn-github">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3C5.37.3 0 5.67 0 12.3c0 5.29 3.44 9.79 8.21 11.37.6.11.82-.26.82-.58 0-.29-.01-1.24-.02-2.25-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.77-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 22.09 24 17.59 24 12.3 24 5.67 18.63.3 12 .3z"/></svg>
      GitHub
    </button>
    <button class="gb-oauth-btn" id="gb-btn-google">
      <svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      Google
    </button>
  </div>`;
        document.getElementById('gb-btn-github').addEventListener('click', () => gbSignIn('github'));
        document.getElementById('gb-btn-google').addEventListener('click', () => gbSignIn('google'));
    }
}

async function gbSignIn(provider) {
    if (!_sb) { showToast('Supabase not configured', 'error'); return; }
    const { error } = await _sb.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.href }
    });
    if (error) showToast(error.message, 'error');
}

async function gbSignOut() {
    if (!_sb) return;
    await _sb.auth.signOut();
    gbUser = null;
    gbPendingImage = null;
    gbReplyingTo = null;
    gbRenderAuth();
    showToast('Signed out from Guestbook.', 'info');
}

function gbHandleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast('Image must be under 5 MB', 'error'); return; }
    const reader = new FileReader();
    reader.onload = ev => {
        gbPendingImage = { file, dataUrl: ev.target.result };
        const wrap = document.getElementById('gb-img-preview-wrap');
        const img = document.getElementById('gb-img-preview');
        if (wrap && img) { img.src = ev.target.result; wrap.style.display = 'block'; }
    };
    reader.readAsDataURL(file);
}

function gbClearImage() {
    gbPendingImage = null;
    const wrap = document.getElementById('gb-img-preview-wrap');
    const inp = document.getElementById('gb-img-input');
    if (wrap) wrap.style.display = 'none';
    if (inp) inp.value = '';
}

async function gbUploadImage(file) {
    if (!_sb) throw new Error('No Supabase');
    const ext = file.name.split('.').pop();
    const path = `${gbUser.id}/${Date.now()}.${ext}`;
    const { error } = await _sb.storage.from(GB_CFG.bucket).upload(path, file, { upsert: false });
    if (error) throw error;
    const { data } = _sb.storage.from(GB_CFG.bucket).getPublicUrl(path);
    return data.publicUrl;
}

/* ── Reply system ── */
function gbStartReply(entryId, name) {
    if (!gbUser) { openAuthModal(); return; }
    gbReplyingTo = { id: entryId, name };
    const banner = document.getElementById('gb-reply-banner');
    const bannerText = document.getElementById('gb-reply-banner-text');
    if (banner && bannerText) {
        bannerText.textContent = `↩ Replying to ${name}`;
        banner.style.display = 'flex';
    }
    const input = document.getElementById('gb-msg-input');
    if (input) {
        input.placeholder = `Reply to ${name}…`;
        input.focus();
    }
    // Scroll compose area into view
    document.getElementById('gb-auth-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function gbCancelReply() {
    gbReplyingTo = null;
    const banner = document.getElementById('gb-reply-banner');
    if (banner) banner.style.display = 'none';
    const input = document.getElementById('gb-msg-input');
    if (input) input.placeholder = 'Leave a message or some kudos!';
}

async function gbSubmit() {
    const input = document.getElementById('gb-msg-input');
    const btn = document.getElementById('gb-send-btn');
    const msg = (input?.value || '').trim();
    if (!msg && !gbPendingImage) return;
    if (!_sb || !gbUser) return;

    if (btn) btn.disabled = true;

    let image_url = null;
    if (gbPendingImage) {
        try {
            image_url = await gbUploadImage(gbPendingImage.file);
        } catch (err) {
            showToast('Image upload failed — check storage bucket config', 'error');
            if (btn) btn.disabled = false;
            return;
        }
    }

    const meta = gbUser.user_metadata || {};
    const name = meta.full_name || meta.name || meta.user_name || gbUser.email || 'Anonymous';
    const avatar = meta.avatar_url || meta.picture || null;

    const payload = {
        user_id: gbUser.id,
        name,
        avatar_url: avatar,
        message: msg || null,
        image_url,
        parent_id: gbReplyingTo ? gbReplyingTo.id : null,
        like_count: 0,
    };

    const { error } = await _sb.from(GB_CFG.table).insert(payload);

    if (btn) btn.disabled = false;
    if (error) { showToast(error.message, 'error'); return; }

    if (input) input.value = '';
    gbClearImage();
    gbCancelReply();
    showToast('✓ Message posted!', 'success');
    gbLoadEntries();
}

/* ── Like / Unlike ── */
async function gbToggleLike(entryId, btn) {
    if (!gbUser) { openAuthModal(); return; }
    if (!_sb) return;

    const isLiked = gbUserLikes.has(entryId);
    const countEl = btn.querySelector('.gb-like-count');

    // Optimistic UI
    if (isLiked) {
        gbUserLikes.delete(entryId);
        btn.classList.remove('liked');
        if (countEl) {
            const newCount = Math.max(0, parseInt(countEl.textContent || '0') - 1);
            countEl.textContent = newCount > 0 ? newCount : '';
        }
        await _sb.from(GB_CFG.likes_table)
            .delete()
            .eq('user_id', gbUser.id)
            .eq('entry_id', entryId);
    } else {
        gbUserLikes.add(entryId);
        btn.classList.add('liked');
        btn.classList.remove('like-pop');
        void btn.offsetWidth;
        btn.classList.add('like-pop');
        if (countEl) {
            const newCount = parseInt(countEl.textContent || '0') + 1;
            countEl.textContent = newCount;
        }
        await _sb.from(GB_CFG.likes_table)
            .insert({ user_id: gbUser.id, entry_id: entryId });
    }

}

/* ── Load user's liked entries ── */
async function gbLoadUserLikes() {
    gbUserLikes = new Set();
    if (!_sb || !gbUser) return;
    try {
        const { data } = await _sb.from(GB_CFG.likes_table)
            .select('entry_id')
            .eq('user_id', gbUser.id);
        if (data) data.forEach(r => gbUserLikes.add(r.entry_id));
    } catch (e) { /* likes table might not exist yet */ }
}

function gbSetFilter(filter, el) {
    gbFilter = filter;
    document.querySelectorAll('.gb-filter-btn').forEach(b => {
        const isActive = b === el;
        b.style.background = isActive ? 'rgba(34,197,94,.1)' : 'transparent';
        b.style.borderColor = isActive ? 'rgba(34,197,94,.3)' : 'var(--border)';
        b.style.color = isActive ? '#4ade80' : 'var(--muted)';
    });
    gbRenderEntries();
}

/* ── Build a single entry element (recursive for replies) ── */
function gbBuildEntry(entry, allEntries, depth) {
    depth = depth || 0;
    const isAdmin = GB_CFG.adminIds.includes(entry.user_id);
    const isMine = gbUser && gbUser.id === entry.user_id;
    const isLiked = gbUserLikes.has(entry.id);
    const likeCount = entry.like_count || 0;
    const replies = allEntries.filter(e => e.parent_id === entry.id);

    const li = document.createElement('li');
    li.className = 'gb-entry' + (depth > 0 ? ' gb-entry-reply' : '');
    li.id = 'gb-entry-' + entry.id;
    if (depth > 0) li.style.marginLeft = Math.min(depth * 40, 80) + 'px';

    li.innerHTML = `
  <div class="gb-entry-avatar">
    ${entry.avatar_url
            ? `<img src="${gbEsc(entry.avatar_url)}" alt="${gbEsc(entry.name)}" onerror="this.remove()">`
            : gbInitials(entry.name)}
  </div>
  <div class="gb-entry-body">
    <div class="gb-entry-meta">
      <span class="gb-entry-name">${gbEsc(entry.name)}</span>
      ${isAdmin ? `<span class="gb-admin-badge">Admin</span>` : ''}
      ${depth > 0 ? `<span class="gb-reply-tag">replied</span>` : `<span class="gb-entry-action">signed the guestbook</span>`}
      <span class="gb-entry-time">${gbTimeAgo(entry.created_at)}</span>
    </div>
    ${entry.message ? `<p class="gb-entry-message">${gbEsc(entry.message)}</p>` : ''}
    ${entry.image_url ? `<img class="gb-entry-img" src="${gbEsc(entry.image_url)}" alt="attachment" loading="lazy">` : ''}
    <div class="gb-entry-actions">
      <button class="gb-like-btn${isLiked ? ' liked' : ''}" data-id="${gbEsc(entry.id)}" onclick="gbToggleLike('${gbEsc(entry.id)}', this)" title="${isLiked ? 'Unlike' : 'Like'}">
        <svg class="gb-heart-icon" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span class="gb-like-count">${likeCount > 0 ? likeCount : ''}</span>
      </button>
      <button class="gb-reply-btn" onclick="gbStartReply('${gbEsc(entry.id)}', '${gbEsc(entry.name).replace(/'/g, "\\'")}')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
        Reply
      </button>
      ${isMine ? `<button class="gb-entry-delete" data-id="${gbEsc(entry.id)}">delete</button>` : ''}
    </div>
    ${replies.length > 0 ? `<ul class="gb-replies-list" id="gb-replies-${gbEsc(entry.id)}"></ul>` : ''}
  </div>`;

    // Append replies recursively
    if (replies.length > 0) {
        const repliesList = li.querySelector(`#gb-replies-${entry.id}`);
        if (repliesList) {
            replies.forEach(reply => {
                repliesList.appendChild(gbBuildEntry(reply, allEntries, depth + 1));
            });
        }
    }

    return li;
}

function gbRenderEntries() {
    const el = document.getElementById('gb-entries');
    const lbl = document.getElementById('gb-count-label');
    if (!el) return;

    // Top-level entries only (no parent_id)
    let topLevel = gbAllEntries.filter(e => !e.parent_id);

    if (gbFilter === 'with-image') {
        topLevel = topLevel.filter(e => e.image_url);
    }

    const total = gbFilter === 'with-image'
        ? gbAllEntries.filter(e => e.image_url).length
        : gbAllEntries.length;

    if (lbl) lbl.textContent = `${total} ${total === 1 ? 'entry' : 'entries'}`;
    el.innerHTML = '';

    if (!topLevel.length) {
        el.innerHTML = `<div class="gb-empty">${gbFilter === 'with-image' ? 'No entries with images yet.' : 'No entries yet. Be the first to sign!'}</div>`;
        return;
    }

    topLevel.forEach(entry => {
        el.appendChild(gbBuildEntry(entry, gbAllEntries, 0));
    });

    // Bind delete buttons
    el.querySelectorAll('.gb-entry-delete').forEach(btn => {
        btn.addEventListener('click', () => gbDelete(btn.dataset.id));
    });
}
async function gbLoadEntries() {
    if (!_sb) {
        gbAllEntries = [];
        gbRenderEntries();
        return;
    }
    const { data, error } = await _sb
        .from(GB_CFG.table)
        .select(`
            id, user_id, name, avatar_url, message, image_url, created_at, parent_id,
            like_count:guestbook_likes(count)
        `)
        .order('created_at', { ascending: true });
    if (error) { showToast(error.message, 'error'); return; }

    // Supabase returns count as [{count: N}], normalize it
    gbAllEntries = (data || []).map(e => ({
        ...e,
        like_count: Array.isArray(e.like_count) ? (e.like_count[0]?.count ?? 0) : (e.like_count ?? 0)
    }));
    gbRenderEntries();
}

async function gbDelete(id) {
    if (!_sb || !gbUser) return;
    if (!confirm('Delete this entry?')) return;
    // Delete replies first
    await _sb.from(GB_CFG.table).delete().eq('parent_id', id);
    const { error } = await _sb.from(GB_CFG.table).delete().eq('id', id).eq('user_id', gbUser.id);
    if (error) showToast(error.message, 'error');
    else { showToast('Entry deleted.', 'info'); gbLoadEntries(); }
}

async function gbBoot() {
    if (!_sb) {
        gbRenderAuth();
        gbRenderEntries();
        return;
    }
    const { data: { session } } = await _sb.auth.getSession();
    gbUser = session?.user ?? null;
    await gbLoadUserLikes();
    gbRenderAuth();
    await gbLoadEntries();

    _sb.auth.onAuthStateChange(async (_event, session) => {
        gbUser = session?.user ?? null;
        gbPendingImage = null;
        gbReplyingTo = null;
        await gbLoadUserLikes();
        gbRenderAuth();
        gbRenderEntries(); // re-render so like states update
    });

    if (!gbRealtime) {
        gbRealtime = _sb.channel('guestbook-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: GB_CFG.table }, () => {
                gbLoadEntries();
            })
            .subscribe();
    }
}

/* ══════════════════════════════════════════
   GEAR MODAL
══════════════════════════════════════════ */
const GEAR_TABLE = 'gear_items';
const GEAR_SECTIONS = [
    { key: 'gear', label: 'Gear', icon: 'fa-laptop' },
    { key: 'system', label: 'System', icon: 'fa-display' },
    { key: 'coding', label: 'Coding Tools', icon: 'fa-code' },
    { key: 'software', label: 'Software / Applications', icon: 'fa-layer-group' },
];
const GEAR_ICON_MAP = {
    // system / software logos via Clearbit / Vectorlogo / simple-icons CDN
    'google chrome': 'https://www.vectorlogo.zone/logos/google_chrome/google_chrome-icon.svg',
    'visual studio code': 'https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg',
    'cursor': 'https://www.vectorlogo.zone/logos/cursor/cursor-icon.svg',
    'windows 11': 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg',
    'microsoft edge': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg',
    'react.js': 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg',
    'next.js': 'https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg',
    'tailwindcss': 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
    'vercel': 'https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg',
    'netlify': 'https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg',
    'git': 'https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg',
    'github desktop': 'https://www.vectorlogo.zone/logos/github/github-icon.svg',
    'npm': 'https://www.vectorlogo.zone/logos/npmjs/npmjs-icon.svg',
    'notion': 'https://www.vectorlogo.zone/logos/notion/notion-icon.svg',
    'claude ai': 'https://i.postimg.cc/5tTNWYqp/rd.png',
    'openai chatgpt': 'https://www.vectorlogo.zone/logos/openai/openai-icon.svg',
    'spotify': 'https://www.vectorlogo.zone/logos/spotify/spotify-icon.svg',
    'photoshop': 'https://www.vectorlogo.zone/logos/adobe_photoshop/adobe_photoshop-icon.svg',
    'figma': 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg',
    'after effects': 'https://www.vectorlogo.zone/logos/adobe_aftereffects/adobe_aftereffects-icon.svg',
    'canva': 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg',
    'google drive': 'https://www.vectorlogo.zone/logos/google_drive/google_drive-icon.svg',
    'telegram': 'https://www.vectorlogo.zone/logos/telegram/telegram-icon.svg',
    'discord': 'https://www.vectorlogo.zone/logos/discord/discord-icon.svg',
    'vlc media player': 'https://www.vectorlogo.zone/logos/videolan/videolan-icon.svg',
};
let gearLoaded = false;

function openGearModal() {
    document.getElementById('gear-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!gearLoaded) { gearLoad(); gearLoaded = true; }
}
function closeGearModal() {
    document.getElementById('gear-modal').classList.remove('open');
    document.body.style.overflow = '';
}
document.getElementById('gear-modal').addEventListener('click', function (e) {
    if (e.target === this) closeGearModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeGearModal();
});

function gearGetLogo(item) {
    if (item.image_url) return { type: 'img', src: item.image_url };
    const key = (item.name || '').toLowerCase();
    if (GEAR_ICON_MAP[key]) return { type: 'logo', src: GEAR_ICON_MAP[key] };
    if (item.icon) return { type: 'emoji', val: item.icon };
    return { type: 'logo', src: `https://unavatar.io/${encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, ''))}?fallback=false` };
}

function gearBuildCell(item) {
    const cell = document.createElement('div');
    cell.className = 'gear-cell';
    const logo = gearGetLogo(item);
    let mediaHtml = '';
    if (logo.type === 'img') {
        mediaHtml = `<img class="gear-cell-img" src="${escHtml(logo.src)}" alt="${escHtml(item.name)}" loading="lazy" onerror="this.style.display='none'">`;
    } else if (logo.type === 'logo') {
        mediaHtml = `<img class="gear-cell-logo" src="${escHtml(logo.src)}" alt="${escHtml(item.name)}" loading="lazy" onerror="this.style.display='none'">`;
    } else if (logo.type === 'emoji') {
        mediaHtml = `<div class="gear-cell-icon">${escHtml(logo.val)}</div>`;
    }
    const tags = (item.tags || []).map(t => `<span class="gear-cell-tag">${escHtml(t)}</span>`).join('');
    cell.innerHTML = `
${mediaHtml}
<span class="gear-cell-name">${escHtml(item.name)}</span>
${item.model ? `<span class="gear-cell-model">${escHtml(item.model)}</span>` : ''}
${tags ? `<div class="gear-cell-tags">${tags}</div>` : ''}`;
    return cell;
}

function gearRender(dataBySection) {
    const body = document.getElementById('gear-modal-body');
    body.innerHTML = '';
    let hasAny = false;
    GEAR_SECTIONS.forEach(sec => {
        const items = dataBySection[sec.key] || [];
        if (!items.length) return;
        hasAny = true;
        const secEl = document.createElement('div');
        secEl.className = 'gear-sec';
        const hdr = document.createElement('div');
        hdr.className = 'gear-sec-title';
        hdr.innerHTML = `<i class="fas ${sec.icon}"></i> ${sec.label}`;
        secEl.appendChild(hdr);
        const grid = document.createElement('div');
        grid.className = 'gear-grid-modal';
        items.forEach(item => grid.appendChild(gearBuildCell(item)));
        secEl.appendChild(grid);
        body.appendChild(secEl);
    });
    if (!hasAny) {
        body.innerHTML = `<div style="padding:32px;text-align:center;color:var(--muted);font-family:'JetBrains Mono',monospace;font-size:.78rem;">No gear items yet.</div>`;
    }
}

async function gearLoad() {
    if (_sb) {
        const { data } = await _sb.from(GEAR_TABLE).select('*').order('sort_order', { ascending: true });
        if (data) {
            const bySection = {};
            GEAR_SECTIONS.forEach(s => { bySection[s.key] = []; });
            data.forEach(item => { if (bySection[item.section]) bySection[item.section].push(item); });
            gearRender(bySection);
            return;
        }
    }
    gearRender({});
}
/* ══════════════════════════════════════════
   GLOBAL AUTH SYSTEM
══════════════════════════════════════════ */
const AUTH_CFG = {
    adminIds: ['5be465b2-450b-477f-bf9a-3396ee50435c'], // Rikesh's admin UUID
};

/* ── Global auth state (declared early at top of script) ── */
// siteUser and siteIsAdmin are declared above near _sb to avoid TDZ errors

/* ── Helpers ── */
function authInitials(name) {
    return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
function authGetName(user) {
    const m = user?.user_metadata || {};
    return m.full_name || m.name || m.user_name || user?.email?.split('@')[0] || 'User';
}
function authGetAvatar(user) {
    const m = user?.user_metadata || {};
    return m.avatar_url || m.picture || null;
}

/* ── Update nav button ── */
function authUpdateNav() {
    const btn = document.getElementById('nav-auth-btn');
    const icon = document.getElementById('nav-auth-icon');
    const label = document.getElementById('nav-auth-label');
    if (!btn) return;
    if (siteUser) {
        const name = authGetName(siteUser);
        const avatar = authGetAvatar(siteUser);
        icon.innerHTML = avatar
            ? `<img src="${escHtml(avatar)}" class="nav-auth-avatar" onerror="this.parentElement.innerHTML='<div class=nav-auth-initials>${authInitials(name)}</div>'">`
            : `<div class="nav-auth-initials">${authInitials(name)}</div>`;
        label.textContent = name.split(' ')[0];
        if (siteIsAdmin) {
            // add gold admin dot
            if (!document.getElementById('nav-admin-dot')) {
                const dot = document.createElement('div');
                dot.id = 'nav-admin-dot';
                dot.className = 'nav-admin-dot';
                btn.appendChild(dot);
            }
        } else {
            document.getElementById('nav-admin-dot')?.remove();
        }
        btn.title = `Signed in as ${name}`;
    } else {
        icon.innerHTML = `<i class="fas fa-user" style="font-size:.72rem;"></i>`;
        label.textContent = 'Sign In';
        document.getElementById('nav-admin-dot')?.remove();
        btn.title = 'Sign In / Sign Up';
    }
    // update dropdown
    authBuildDropdown();
}

/* ── Build user dropdown ── */
function authBuildDropdown() {
    const dd = document.getElementById('nav-user-dropdown');
    if (!dd) return;
    if (!siteUser) { dd.innerHTML = ''; return; }
    const name = authGetName(siteUser);
    const email = siteUser.email || '';
    const avatar = authGetAvatar(siteUser);
    const avatarHtml = avatar
        ? `<img src="${escHtml(avatar)}" class="nud-avatar" onerror="this.outerHTML='<div class=nud-avatar-init>${authInitials(name)}</div>'">`
        : `<div class="nud-avatar-init">${authInitials(name)}</div>`;
    dd.innerHTML = `
<div class="nud-top">
  ${avatarHtml}
  <div style="min-width:0;">
    <div class="nud-name">${escHtml(name)}</div>
    <div class="nud-email">${escHtml(email)}</div>
    <div class="nud-role ${siteIsAdmin ? '' : 'user-role'}">
      ${siteIsAdmin ? '⚡ Admin' : '👤 User'}
    </div>
  </div>
</div>
<div class="nud-divider"></div>
${siteIsAdmin ? `
<button class="nud-item" onclick="closeDropdown();openAdminPanel()">
  <i class="fas fa-shield-halved" style="color:#fbbf24;"></i> Admin Panel
</button>
<div class="nud-divider"></div>` : ''}
<button class="nud-item" onclick="closeDropdown();openGuestbookModal()">
  <i class="fas fa-book-open"></i> Guestbook
</button>
<button class="nud-item" onclick="closeDropdown();openManifestModal()">
  <i class="fas fa-list-check"></i> Manifest
</button>
<button class="nud-item" onclick="closeDropdown();openGearModal()">
  <i class="fas fa-microchip"></i> My Gear
</button>
<div class="nud-divider"></div>
<button class="nud-item danger" onclick="authSignOut()">
  <i class="fas fa-right-from-bracket"></i> Sign Out
</button>`;
}

function navAuthClick() {
    if (siteUser) {
        const dd = document.getElementById('nav-user-dropdown');
        dd.classList.toggle('open');
    } else {
        openAuthModal();
    }
}

function closeDropdown() {
    document.getElementById('nav-user-dropdown')?.classList.remove('open');
}

// close dropdown on outside click
document.addEventListener('click', e => {
    const wrap = document.getElementById('nav-auth-wrap');
    if (wrap && !wrap.contains(e.target)) closeDropdown();
});

/* ── Auth Modal open/close ── */
let authTab = 'login';

function openAuthModal(defaultTab = 'login') {
    closeDropdown();
    authSwitchTab(defaultTab);
    document.getElementById('auth-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('auth-email')?.focus(), 120);
}
function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('open');
    document.body.style.overflow = '';
    clearAuthMsg();
    // reset fields
    ['auth-email', 'auth-password', 'auth-confirm', 'auth-name'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
    });
}
document.getElementById('auth-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('auth-modal')) closeAuthModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAuthModal();
});

/* ── Tab switching ── */
function authSwitchTab(tab) {
    authTab = tab;
    document.querySelectorAll('.auth-tab').forEach((t, i) => {
        t.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'signup'));
    });
    const isSignup = tab === 'signup';
    document.getElementById('auth-modal-title').textContent = isSignup ? 'Create Account' : 'Welcome Back';
    document.getElementById('auth-modal-sub').textContent = isSignup ? 'Join Rikesh\'s space' : 'Sign in to your account';
    document.getElementById('auth-submit-label').textContent = isSignup ? 'Create Account' : 'Sign In';
    document.getElementById('auth-name-wrap').style.display = isSignup ? '' : 'none';
    document.getElementById('auth-confirm-wrap').style.display = isSignup ? '' : 'none';
    document.getElementById('auth-forgot').style.display = isSignup ? 'none' : '';
    clearAuthMsg();
    const pwEl = document.getElementById('auth-password');
    if (pwEl) pwEl.setAttribute('autocomplete', isSignup ? 'new-password' : 'current-password');
}

/* ── Password toggle ── */
function authTogglePw() {
    const inp = document.getElementById('auth-password');
    const eye = document.getElementById('auth-pw-eye');
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
    eye.className = inp.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
}
function authToggleConfirmPw() {
    const inp = document.getElementById('auth-confirm');
    const eye = document.getElementById('auth-confirm-eye');
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
    eye.className = inp.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
}

/* ── Message helpers ── */
function setAuthMsg(msg, type = 'err') {
    const el = document.getElementById('auth-msg');
    if (!el) return;
    el.textContent = msg;
    el.className = `auth-msg ${type}`;
}
function clearAuthMsg() {
    const el = document.getElementById('auth-msg');
    if (el) { el.textContent = ''; el.className = 'auth-msg'; }
}

/* ── OAuth ── */
async function authOAuth(provider) {
    if (!_sb) { setAuthMsg('Supabase not configured.'); return; }
    const { error } = await _sb.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.href }
    });
    if (error) setAuthMsg(error.message);
}

/* ── Forgot password ── */
async function authForgotPassword() {
    const email = document.getElementById('auth-email')?.value?.trim();
    if (!email) { setAuthMsg('Enter your email first.'); return; }
    if (!_sb) return;
    const { error } = await _sb.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.href
    });
    if (error) setAuthMsg(error.message);
    else setAuthMsg('✓ Password reset email sent — check your inbox.', 'ok');
}

/* ── Main submit ── */
async function authSubmit() {
    if (!_sb) { setAuthMsg('Supabase not configured.'); return; }
    clearAuthMsg();
    const btn = document.getElementById('auth-submit-btn');
    const email = document.getElementById('auth-email')?.value?.trim();
    const pw = document.getElementById('auth-password')?.value;

    if (!email || !pw) { setAuthMsg('Email and password are required.'); return; }
    if (pw.length < 6) { setAuthMsg('Password must be at least 6 characters.'); return; }

    btn.disabled = true;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> ${authTab === 'login' ? 'Signing in…' : 'Creating account…'}`;

    if (authTab === 'login') {
        const { data, error } = await _sb.auth.signInWithPassword({ email, password: pw });
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-right-to-bracket"></i><span id="auth-submit-label">Sign In</span>`;
        if (error) { setAuthMsg(error.message); return; }
        siteUser = data.user;
        siteIsAdmin = AUTH_CFG.adminIds.includes(data.user?.id);
        authUpdateNav();
        syncAuthToModules();
        showToast(`✓ Welcome back, ${authGetName(data.user)}!`, 'success');
        closeAuthModal();
    } else {
        // signup
        const name = document.getElementById('auth-name')?.value?.trim();
        const confirm = document.getElementById('auth-confirm')?.value;
        if (pw !== confirm) { btn.disabled = false; btn.innerHTML = `<i class="fas fa-user-plus"></i><span id="auth-submit-label">Create Account</span>`; setAuthMsg('Passwords do not match.'); return; }
        const { data, error } = await _sb.auth.signUp({
            email, password: pw,
            options: {
                data: {
                    full_name: name || email.split('@')[0],
                }
            }
        });
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-user-plus"></i><span id="auth-submit-label">Create Account</span>`;
        if (error) { setAuthMsg(error.message); return; }
        if (data?.user?.identities?.length === 0) {
            setAuthMsg('An account with this email already exists.', 'err');
            return;
        }
        setAuthMsg('✓ Account created! Check your email to confirm.', 'ok');
        showToast('✓ Account created! Please check your email.', 'success');
        setTimeout(() => { authSwitchTab('login'); }, 2500);
    }
}

/* ── Sign out ── */
async function authSignOut() {
    closeDropdown();
    if (!_sb) return;
    await _sb.auth.signOut();
    siteUser = null;
    siteIsAdmin = false;
    authUpdateNav();
    syncAuthToModules();
    showToast('Signed out successfully.', 'info');
}

/* ── Sync auth state to guestbook & gear ── */
function syncAuthToModules() {
    gbUser = siteUser;
    if (document.getElementById('gb-auth-card')) gbRenderAuth();
    if (typeof gearLoaded !== 'undefined' && gearLoaded) gearLoad();
    loadTestimonialsFromDB();
    loadBlogsFromDB().then(() => checkHashForBlogPost());
}

/* ── Boot: restore session on page load ── */
async function authBoot() {
    if (!_sb) { authUpdateNav(); return; }
    const { data: { session } } = await _sb.auth.getSession();
    siteUser = session?.user ?? null;
    siteIsAdmin = AUTH_CFG.adminIds.includes(siteUser?.id);
    authUpdateNav();
    // Now that we know admin status, reload testimonials with correct filter
    loadTestimonialsFromDB();
    subscribeAdminRealtime();
    _sb.auth.onAuthStateChange((_event, session) => {
        siteUser = session?.user ?? null;
        siteIsAdmin = AUTH_CFG.adminIds.includes(siteUser?.id);
        authUpdateNav();
        syncAuthToModules();
        // keep guestbook gbUser in sync
        gbUser = siteUser;
        subscribeAdminRealtime();
    });
}
authBoot();


/* also allow Enter key on auth inputs */
['auth-email', 'auth-password', 'auth-confirm', 'auth-name'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
        if (e.key === 'Enter') authSubmit();
    });
});



/* ══════════════════════════════════════════
   TESTIMONIAL ADMIN ACTIONS
══════════════════════════════════════════ */
async function tAdminApprove(id) {
    if (!_sb || !siteIsAdmin) return;
    const { error } = await _sb.from('testimonials').update({ approved: true }).eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('✓ Testimonial approved!', 'success');
    loadTestimonialsFromDB();
}
async function tAdminDelete(id) {
    if (!_sb || !siteIsAdmin) return;
    if (!confirm('Delete this testimonial permanently?')) return;
    const { error } = await _sb.from('testimonials').delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Testimonial deleted.', 'info');
    loadTestimonialsFromDB();
}

/* ══════════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════════ */
let adminActiveTab = 'users';

function openAdminPanel() {
    if (!siteIsAdmin) { showToast('Admin access only.', 'error'); return; }
    document.getElementById('admin-panel').classList.add('open');
    document.body.style.overflow = 'hidden';
    adminLoadTab(adminActiveTab);
}
function closeAdminPanel() {
    document.getElementById('admin-panel').classList.remove('open');
    document.body.style.overflow = '';
}
document.getElementById('admin-panel').addEventListener('click', e => {
    if (e.target === document.getElementById('admin-panel')) closeAdminPanel();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAdminPanel();
});

function adminSwitchTab(tab, btn) {
    adminActiveTab = tab;
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('ap-' + tab)?.classList.add('active');
    adminLoadTab(tab);
}

async function adminLoadTab(tab) {
    if (!_sb || !siteIsAdmin) return;
    if (tab === 'users') await adminLoadUsers();
    else if (tab === 'testimonials') await adminLoadTestimonials();
    else if (tab === 'works') await adminLoadWorks();
    else if (tab === 'writings') await adminLoadWritings();
    else if (tab === 'guestbook') await adminLoadGuestbook();
    else if (tab === 'manifest') await adminLoadManifest();
    else if (tab === 'gear') await adminLoadGear();
    else if (tab === 'certificates') await adminLoadCertificates();
}

function adminFmt(iso) {
    if (!iso) return '—';
    try { return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
    catch { return iso; }
}

/* ── Users ── */
async function adminLoadUsers() {
    const el = document.getElementById('ap-users-content');
    el.innerHTML = `<div class="admin-loading"><i class="fas fa-spinner" style="animation:spin .8s linear infinite;margin-right:7px;"></i>Loading…</div>`;
    try {
        const { data, error } = await _sb.from('profiles').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        const users = data || [];
        if (!users.length) { el.innerHTML = `<div class="admin-empty">No profiles found. (Create a <code>profiles</code> view or table in Supabase.)</div>`; return; }
        el.innerHTML = `<div class="admin-table-wrap"><table class="admin-table">
  <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
  <tbody>${users.map(u => `<tr>
    <td style="font-weight:600;">${escHtml(u.full_name || u.name || '—')}</td>
    <td style="font-family:'JetBrains Mono',monospace;font-size:.72rem;">${escHtml(u.email || '—')}</td>
    <td><span class="admin-badge-pill ${AUTH_CFG.adminIds.includes(u.id) ? 'badge-admin' : 'badge-user'}">${AUTH_CFG.adminIds.includes(u.id) ? '⚡ Admin' : '👤 User'}</span></td>
    <td style="font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--muted);">${adminFmt(u.created_at)}</td>
    <td><button class="admin-action-btn btn-del-row" onclick="adminDeleteUser('${escHtml(u.id)}','${escHtml(u.full_name || u.email || 'this user')}')">Delete</button></td>
  </tr>`).join('')}</tbody>
</table></div>`;
    } catch (e) {
        el.innerHTML = `<div class="admin-empty" style="color:#f87171;">⚠ ${escHtml(e.message)}<br><small style="opacity:.6;margin-top:6px;display:block;">Make sure you have a <code>profiles</code> table/view with user data in Supabase.</small></div>`;
    }
}
async function adminDeleteUser(id, name) {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    const { error } = await _sb.from('profiles').delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('User deleted.', 'info');
    adminLoadUsers();
}

/* ── Testimonials ── */
async function adminLoadTestimonials() {
    const el = document.getElementById('ap-testi-content');
    el.innerHTML = `<div class="admin-loading"><i class="fas fa-spinner" style="animation:spin .8s linear infinite;margin-right:7px;"></i>Loading…</div>`;
    try {
        const { data, error } = await _sb.from('testimonials').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        const rows = data || [];
        if (!rows.length) { el.innerHTML = `<div class="admin-empty">No testimonials yet.</div>`; return; }
        el.innerHTML = `<div class="admin-table-wrap"><table class="admin-table">
  <thead><tr><th>Name</th><th>Review</th><th>Stars</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
  <tbody>${rows.map(r => `<tr>
    <td><div style="font-weight:600;font-size:.82rem;">${escHtml(r.name)}</div><div style="font-size:.68rem;color:var(--muted);">${escHtml(r.role || '')}${r.company ? ` · ${escHtml(r.company)}` : ''}</div></td>
    <td style="max-width:200px;font-size:.78rem;color:var(--muted);">${escHtml((r.text || '').slice(0, 80))}${(r.text || '').length > 80 ? '…' : ''}</td>
    <td style="color:var(--accent2);letter-spacing:.1em;">${'★'.repeat(r.stars || 0)}</td>
    <td><span class="admin-badge-pill ${r.approved ? 'badge-approved' : 'badge-pending'}">${r.approved ? '✓ Approved' : '⏳ Pending'}</span></td>
    <td style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--muted);">${adminFmt(r.created_at)}</td>
    <td style="display:flex;gap:5px;flex-wrap:wrap;">
      ${!r.approved ? `<button class="admin-action-btn btn-approve" onclick="adminApproveT('${escHtml(r.id)}')">Approve</button>` : ''}
      <button class="admin-action-btn btn-del-row" onclick="adminDeleteT('${escHtml(r.id)}')">Delete</button>
    </td>
  </tr>`).join('')}</tbody>
</table></div>`;
    } catch (e) { el.innerHTML = `<div class="admin-empty" style="color:#f87171;">⚠ ${escHtml(e.message)}</div>`; }
}
async function adminApproveT(id) {
    const { error } = await _sb.from('testimonials').update({ approved: true }).eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('✓ Approved!', 'success');
    adminLoadTestimonials(); loadTestimonialsFromDB();
}
async function adminDeleteT(id) {
    if (!confirm('Delete this testimonial?')) return;
    const { error } = await _sb.from('testimonials').delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Deleted.', 'info');
    adminLoadTestimonials(); loadTestimonialsFromDB();
}

/* ── Guestbook ── */
async function adminLoadGuestbook() {
    const el = document.getElementById('ap-gb-content');
    el.innerHTML = `<div class="admin-loading"><i class="fas fa-spinner" style="animation:spin .8s linear infinite;margin-right:7px;"></i>Loading…</div>`;
    try {
        const { data, error } = await _sb.from('guestbook').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        const rows = data || [];
        if (!rows.length) { el.innerHTML = `<div class="admin-empty">No guestbook entries yet.</div>`; return; }
        el.innerHTML = `<div class="admin-table-wrap"><table class="admin-table">
  <thead><tr><th>User</th><th>Message</th><th>Date</th><th>Actions</th></tr></thead>
  <tbody>${rows.map(r => `<tr>
    <td><div style="font-weight:600;font-size:.82rem;">${escHtml(r.name)}</div></td>
    <td style="max-width:240px;font-size:.78rem;color:var(--muted);">${escHtml((r.message || '').slice(0, 90))}${(r.message || '').length > 90 ? '…' : ''}</td>
    <td style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--muted);">${adminFmt(r.created_at)}</td>
    <td><button class="admin-action-btn btn-del-row" onclick="adminDeleteGB('${escHtml(r.id)}')">Delete</button></td>
  </tr>`).join('')}</tbody>
</table></div>`;
    } catch (e) { el.innerHTML = `<div class="admin-empty" style="color:#f87171;">⚠ ${escHtml(e.message)}</div>`; }
}
async function adminDeleteGB(id) {
    if (!confirm('Delete this guestbook entry?')) return;
    const { error } = await _sb.from('guestbook').delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Entry deleted.', 'info');
    adminLoadGuestbook(); gbLoadEntries();
}

/* ── Manifest / Bucket List ── */
let manifestEditingId = null;

async function adminLoadManifest() {
    const el = document.getElementById('ap-manifest-content');
    el.innerHTML = `<div class="admin-loading"><i class="fas fa-spinner" style="animation:spin .8s linear infinite;margin-right:7px;"></i>Loading…</div>`;
    try {
        const { data, error } = await _sb.from('bucket_list').select('*').order('sort_order', { ascending: true });
        if (error) throw error;
        const rows = data || [];
        el.innerHTML = `
  <!-- Add bar -->
  <div class="admin-add-bar">
    <span class="admin-add-bar-title">${rows.length} item${rows.length !== 1 ? 's' : ''}</span>
    <button class="btn-admin-add" onclick="adminManifestToggleForm()">
      <i class="fas fa-plus" style="font-size:.62rem;"></i> Add Item
    </button>
  </div>

  <!-- Inline add/edit form -->
  <div class="admin-inline-form" id="manifest-form">
    <div class="admin-form-title"><i class="fas fa-list-check" style="color:var(--accent2);font-size:.9rem;"></i> <span id="manifest-form-title">Add Bucket List Item</span></div>
    <div class="admin-form-grid">
      <div class="admin-form-group full">
        <label class="admin-form-label">Label / Goal *</label>
        <input class="admin-form-input" id="mf-label" placeholder="e.g. Visit Japan 🇯🇵">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Image URL (optional)</label>
        <input class="admin-form-input" id="mf-image" placeholder="https://...">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Sort Order</label>
        <input class="admin-form-input" id="mf-sort" type="number" placeholder="99" value="99">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Status</label>
        <select class="admin-form-select" id="mf-completed">
          <option value="false">○ Pending</option>
          <option value="true">✓ Completed</option>
        </select>
      </div>
    </div>
    <div class="admin-form-actions">
      <button class="btn-admin-cancel" onclick="adminManifestCancelForm()">Cancel</button>
      <button class="btn-admin-save" id="manifest-save-btn" onclick="adminSaveManifest()">
        <i class="fas fa-check" style="font-size:.72rem;"></i> Save Item
      </button>
    </div>
  </div>

  <!-- Table -->
  ${!rows.length
                ? `<div class="admin-empty">No items yet — click "Add Item" to get started.</div>`
                : `<div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>#</th><th>Label</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${rows.map(r => `<tr id="mrow-${escHtml(r.id)}">
        <td style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--muted);">${r.sort_order ?? '—'}</td>
        <td style="font-weight:600;font-size:.82rem;">${escHtml(r.label)}</td>
        <td><span class="admin-badge-pill ${r.completed ? 'badge-approved' : 'badge-pending'}">${r.completed ? '✓ Done' : '○ Pending'}</span></td>
        <td style="display:flex;gap:5px;flex-wrap:wrap;">
          <button class="btn-edit-row" onclick="adminManifestEdit('${escHtml(r.id)}','${escHtml(r.label).replace(/'/g, "\\'")}',${r.completed},'${escHtml(r.image_url || '')}',${r.sort_order ?? 99})">Edit</button>
          <button class="admin-action-btn ${r.completed ? 'btn-reject' : 'btn-approve'}" onclick="adminToggleManifest('${escHtml(r.id)}',${!r.completed})">${r.completed ? 'Pending' : 'Done'}</button>
          <button class="admin-action-btn btn-del-row" onclick="adminDeleteManifest('${escHtml(r.id)}')">Delete</button>
        </td>
      </tr>`).join('')}</tbody>
    </table></div>`}
`;
    } catch (e) { el.innerHTML = `<div class="admin-empty" style="color:#f87171;">⚠ ${escHtml(e.message)}</div>`; }
}

function adminManifestToggleForm() {
    manifestEditingId = null;
    const form = document.getElementById('manifest-form');
    const isOpen = form.classList.contains('open');
    form.classList.toggle('open', !isOpen);
    if (!isOpen) {
        document.getElementById('manifest-form-title').textContent = 'Add Bucket List Item';
        document.getElementById('mf-label').value = '';
        document.getElementById('mf-image').value = '';
        document.getElementById('mf-sort').value = '99';
        document.getElementById('mf-completed').value = 'false';
        document.getElementById('manifest-save-btn').innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Item';
        document.getElementById('mf-label').focus();
    }
}

function adminManifestEdit(id, label, completed, image_url, sort_order) {
    manifestEditingId = id;
    const form = document.getElementById('manifest-form');
    form.classList.add('open');
    document.getElementById('manifest-form-title').textContent = 'Edit Item';
    document.getElementById('mf-label').value = label;
    document.getElementById('mf-image').value = image_url || '';
    document.getElementById('mf-sort').value = sort_order;
    document.getElementById('mf-completed').value = String(completed);
    document.getElementById('manifest-save-btn').innerHTML = '<i class="fas fa-pen" style="font-size:.72rem;"></i> Update Item';
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('mf-label').focus();
}

function adminManifestCancelForm() {
    manifestEditingId = null;
    document.getElementById('manifest-form')?.classList.remove('open');
}

async function adminSaveManifest() {
    const label = document.getElementById('mf-label')?.value?.trim();
    if (!label) { showToast('Label is required.', 'error'); return; }
    const payload = {
        label,
        image_url: document.getElementById('mf-image')?.value?.trim() || null,
        sort_order: parseInt(document.getElementById('mf-sort')?.value) || 99,
        completed: document.getElementById('mf-completed')?.value === 'true',
    };
    const btn = document.getElementById('manifest-save-btn');
    btn.disabled = true;
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving…';
    let error;
    if (manifestEditingId) {
        ({ error } = await _sb.from('bucket_list').update(payload).eq('id', manifestEditingId));
    } else {
        ({ error } = await _sb.from('bucket_list').insert(payload));
    }
    btn.disabled = false;
    if (error) { showToast(error.message, 'error'); btn.innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Item'; return; }
    showToast(manifestEditingId ? '✓ Item updated!' : '✓ Item added!', 'success');
    adminManifestCancelForm();
    adminLoadManifest();
    manifestLoaded = false;
}

async function adminToggleManifest(id, completed) {
    const { error } = await _sb.from('bucket_list').update({ completed }).eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast(completed ? '✓ Marked as done!' : 'Marked as pending.', 'success');
    adminLoadManifest();
    manifestLoaded = false;
}

async function adminDeleteManifest(id) {
    if (!confirm('Delete this bucket list item?')) return;
    const { error } = await _sb.from('bucket_list').delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Item deleted.', 'info');
    adminLoadManifest(); manifestLoaded = false;
}

/* ── Gear ── */
let gearEditingId = null;
let _gearRowMap = {};
const GEAR_SECTION_OPTS = ['gear', 'system', 'coding', 'software'];

async function adminLoadGear() {
    const el = document.getElementById('ap-gear-content');
    _gearRowMap = {};
    el.innerHTML = `<div class="admin-loading"><i class="fas fa-spinner" style="animation:spin .8s linear infinite;margin-right:7px;"></i>Loading…</div>`;
    try {
        const { data, error } = await _sb.from('gear_items').select('*').order('section').order('sort_order', { ascending: true });
        if (error) throw error;
        const rows = data || [];
        rows.forEach(r => { _gearRowMap[r.id] = r; });
        el.innerHTML = `
  <!-- Add bar -->
  <div class="admin-add-bar">
    <span class="admin-add-bar-title">${rows.length} item${rows.length !== 1 ? 's' : ''}</span>
    <button class="btn-admin-add" onclick="adminGearToggleForm()">
      <i class="fas fa-plus" style="font-size:.62rem;"></i> Add Item
    </button>
  </div>

  <!-- Inline add/edit form -->
  <div class="admin-inline-form" id="gear-form">
    <div class="admin-form-title"><i class="fas fa-microchip" style="color:#fbbf24;font-size:.9rem;"></i> <span id="gear-form-title">Add Gear Item</span></div>
    <div class="admin-form-grid cols-3">
      <div class="admin-form-group">
        <label class="admin-form-label">Section *</label>
        <select class="admin-form-select" id="gf-section">
          <option value="gear">Gear</option>
          <option value="system">System</option>
          <option value="coding">Coding Tools</option>
          <option value="software">Software</option>
        </select>
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Name *</label>
        <input class="admin-form-input" id="gf-name" placeholder="e.g. Figma">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Model / Subtitle</label>
        <input class="admin-form-input" id="gf-model" placeholder="e.g. Acer Nitro V 16">
      </div>
      <div class="admin-form-group full">
        <label class="admin-form-label">Image URL (product photo)</label>
        <input class="admin-form-input" id="gf-image" placeholder="https://i.postimg.cc/...">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Icon / Emoji (if no image)</label>
        <input class="admin-form-input" id="gf-icon" placeholder="e.g. 🎧">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Tags (comma-separated)</label>
        <input class="admin-form-input" id="gf-tags" placeholder="e.g. Wireless, Gaming">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Sort Order</label>
        <input class="admin-form-input" id="gf-sort" type="number" placeholder="99" value="99">
      </div>
    </div>
    <div class="admin-form-actions">
      <button class="btn-admin-cancel" onclick="adminGearCancelForm()">Cancel</button>
      <button class="btn-admin-save" id="gear-save-btn" onclick="adminSaveGear()">
        <i class="fas fa-check" style="font-size:.72rem;"></i> Save Item
      </button>
    </div>
  </div>

  <!-- Table -->
  ${!rows.length
                ? `<div class="admin-empty">No gear items yet — click "Add Item" to get started.</div>`
                : `<div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>Section</th><th>#</th><th>Name</th><th>Model</th><th>Tags</th><th>Actions</th></tr></thead>
      <tbody>${rows.map(r => `<tr id="grow-${escHtml(r.id)}">
        <td><span class="admin-badge-pill badge-user" style="font-size:.58rem;">${escHtml(r.section)}</span></td>
        <td style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--muted);">${r.sort_order ?? '—'}</td>
        <td style="font-weight:600;font-size:.82rem;">${escHtml(r.name)}</td>
        <td style="font-size:.75rem;color:var(--muted);">${escHtml(r.model || '—')}</td>
        <td style="font-size:.7rem;color:var(--muted);max-width:120px;">${(r.tags || []).join(', ') || '—'}</td>
        <td style="display:flex;gap:5px;flex-wrap:wrap;">
          <button class="btn-edit-row" onclick="adminGearEdit('${escHtml(r.id)}')">Edit</button>
          <button class="admin-action-btn btn-del-row" onclick="adminDeleteGear('${escHtml(r.id)}','${escHtml(r.name)}')">Delete</button>
        </td>
      </tr>`).join('')}</tbody>
    </table></div>`}
`;
    } catch (e) { el.innerHTML = `<div class="admin-empty" style="color:#f87171;">⚠ ${escHtml(e.message)}</div>`; }
}

function adminGearToggleForm() {
    gearEditingId = null;
    const form = document.getElementById('gear-form');
    const isOpen = form.classList.contains('open');
    form.classList.toggle('open', !isOpen);
    if (!isOpen) {
        document.getElementById('gear-form-title').textContent = 'Add Gear Item';
        ['gf-name', 'gf-model', 'gf-image', 'gf-icon', 'gf-tags'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        document.getElementById('gf-section').value = 'gear';
        document.getElementById('gf-sort').value = '99';
        document.getElementById('gear-save-btn').innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Item';
        document.getElementById('gf-name').focus();
    }
}

function adminGearEdit(id) {
    const r = _gearRowMap[id];
    if (!r) return;
    // r is the full row object looked up from _gearRowMap
    gearEditingId = r.id;
    const form = document.getElementById('gear-form');
    form.classList.add('open');
    document.getElementById('gear-form-title').textContent = 'Edit Gear Item';
    document.getElementById('gf-section').value = r.section || 'gear';
    document.getElementById('gf-name').value = r.name || '';
    document.getElementById('gf-model').value = r.model || '';
    document.getElementById('gf-image').value = r.image_url || '';
    document.getElementById('gf-icon').value = r.icon || '';
    document.getElementById('gf-tags').value = (r.tags || []).join(', ');
    document.getElementById('gf-sort').value = r.sort_order ?? 99;
    document.getElementById('gear-save-btn').innerHTML = '<i class="fas fa-pen" style="font-size:.72rem;"></i> Update Item';
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('gf-name').focus();
}

function adminGearCancelForm() {
    gearEditingId = null;
    document.getElementById('gear-form')?.classList.remove('open');
}

async function adminSaveGear() {
    const name = document.getElementById('gf-name')?.value?.trim();
    if (!name) { showToast('Name is required.', 'error'); return; }
    const payload = {
        section: document.getElementById('gf-section')?.value || 'gear',
        name,
        model: document.getElementById('gf-model')?.value?.trim() || null,
        image_url: document.getElementById('gf-image')?.value?.trim() || null,
        icon: document.getElementById('gf-icon')?.value?.trim() || null,
        tags: document.getElementById('gf-tags')?.value?.split(',').map(t => t.trim()).filter(Boolean) || [],
        sort_order: parseInt(document.getElementById('gf-sort')?.value) || 99,
    };
    const btn = document.getElementById('gear-save-btn');
    btn.disabled = true;
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving…';
    let error;
    if (gearEditingId) {
        ({ error } = await _sb.from('gear_items').update(payload).eq('id', gearEditingId));
    } else {
        ({ error } = await _sb.from('gear_items').insert(payload));
    }
    btn.disabled = false;
    if (error) { showToast(error.message, 'error'); btn.innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Item'; return; }
    showToast(gearEditingId ? '✓ Item updated!' : '✓ Item added!', 'success');
    adminGearCancelForm();
    adminLoadGear();
    gearLoaded = false;
}

async function adminDeleteGear(id, name) {
    if (!confirm(`Delete gear item "${name}"?`)) return;
    const { error } = await _sb.from('gear_items').delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Gear item deleted.', 'info');
    adminLoadGear(); gearLoaded = false;
}
/* ══════════════════════════════════════════
   ADMIN — WORKS (Recent Projects)
══════════════════════════════════════════ */
let worksEditingId = null;
let _worksRowMap = {};

async function adminLoadWorks() {
    const el = document.getElementById('ap-works-content');
    _worksRowMap = {};
    el.innerHTML = `<div class="admin-loading"><i class="fas fa-spinner" style="animation:spin .8s linear infinite;margin-right:7px;"></i>Loading…</div>`;
    try {
        const { data, error } = await _sb.from('projects').select('*').order('sort_order', { ascending: true });
        if (error) throw error;
        const rows = data || [];
        rows.forEach(r => { _worksRowMap[r.id] = r; });
        el.innerHTML = `
  <div class="admin-add-bar">
    <span class="admin-add-bar-title">${rows.length} project${rows.length !== 1 ? 's' : ''}</span>
    <button class="btn-admin-add" onclick="adminWorksToggleForm()">
      <i class="fas fa-plus" style="font-size:.62rem;"></i> Add Project
    </button>
  </div>
  <div class="admin-inline-form" id="works-form">
    <div class="admin-form-title"><i class="fas fa-briefcase" style="color:var(--accent2);font-size:.9rem;"></i> <span id="works-form-title">Add Project</span></div>
    <div class="admin-form-grid">
      <div class="admin-form-group">
        <label class="admin-form-label">Title *</label>
        <input class="admin-form-input" id="wf-title" placeholder="e.g. FulKumari Live">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Link URL</label>
        <input class="admin-form-input" id="wf-link" placeholder="https://...">
      </div>
      <div class="admin-form-group full">
        <label class="admin-form-label">Image URL</label>
        <input class="admin-form-input" id="wf-image" placeholder="https://i.postimg.cc/...">
      </div>
      <div class="admin-form-group full">
        <label class="admin-form-label">Description</label>
        <input class="admin-form-input" id="wf-desc" placeholder="Short description of the project">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Tags (comma-separated)</label>
        <input class="admin-form-input" id="wf-tags" placeholder="e.g. Django, Python, DRF">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Sort Order</label>
        <input class="admin-form-input" id="wf-sort" type="number" placeholder="99" value="99">
      </div>
    </div>
    <div class="admin-form-actions">
      <button class="btn-admin-cancel" onclick="adminWorksCancelForm()">Cancel</button>
      <button class="btn-admin-save" id="works-save-btn" onclick="adminSaveWork()">
        <i class="fas fa-check" style="font-size:.72rem;"></i> Save Project
      </button>
    </div>
  </div>
  ${!rows.length
                ? `<div class="admin-empty">No projects yet — click "Add Project" to get started.</div>`
                : `<div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>#</th><th>Title</th><th>Tags</th><th>Link</th><th>Actions</th></tr></thead>
      <tbody>${rows.map(r => `<tr id="wrow-${escHtml(r.id)}">
        <td style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--muted);">${r.sort_order ?? '—'}</td>
        <td style="font-weight:600;font-size:.82rem;">${escHtml(r.title || r.t || '')}</td>
        <td style="font-size:.7rem;color:var(--muted);">${(r.tags || r.tg || []).join(', ') || '—'}</td>
        <td style="font-size:.72rem;"><a href="${escHtml(r.link_url || r.l || '#')}" target="_blank" style="color:var(--accent2);">↗ View</a></td>
        <td style="display:flex;gap:5px;flex-wrap:wrap;">
          <button class="btn-edit-row" onclick="adminWorksEdit('${escHtml(r.id)}')">Edit</button>
          <button class="admin-action-btn btn-del-row" onclick="adminDeleteWork('${escHtml(r.id)}','${escHtml(r.title || r.t || '')}')">Delete</button>
        </td>
      </tr>`).join('')}</tbody>
    </table></div>`}`;
    } catch (e) { el.innerHTML = `<div class="admin-empty" style="color:#f87171;">⚠ ${escHtml(e.message)}</div>`; }
}

function adminWorksToggleForm() {
    worksEditingId = null;
    const form = document.getElementById('works-form');
    const isOpen = form.classList.contains('open');
    form.classList.toggle('open', !isOpen);
    if (!isOpen) {
        document.getElementById('works-form-title').textContent = 'Add Project';
        ['wf-title', 'wf-link', 'wf-image', 'wf-desc', 'wf-tags'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        document.getElementById('wf-sort').value = '99';
        document.getElementById('works-save-btn').innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Project';
        document.getElementById('wf-title').focus();
    }
}

function adminWorksEdit(id) {
    const r = _worksRowMap[id]; if (!r) return;
    worksEditingId = id;
    const form = document.getElementById('works-form');
    form.classList.add('open');
    document.getElementById('works-form-title').textContent = 'Edit Project';
    document.getElementById('wf-title').value = r.title || r.t || '';
    document.getElementById('wf-link').value = r.link_url || r.l || '';
    document.getElementById('wf-image').value = r.image_url || r.i || '';
    document.getElementById('wf-desc').value = r.description || r.d || '';
    document.getElementById('wf-tags').value = (r.tags || r.tg || []).join(', ');
    document.getElementById('wf-sort').value = r.sort_order ?? 99;
    document.getElementById('works-save-btn').innerHTML = '<i class="fas fa-pen" style="font-size:.72rem;"></i> Update Project';
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('wf-title').focus();
}

function adminWorksCancelForm() {
    worksEditingId = null;
    document.getElementById('works-form')?.classList.remove('open');
}

async function adminSaveWork() {
    const title = document.getElementById('wf-title')?.value?.trim();
    if (!title) { showToast('Title is required.', 'error'); return; }
    const payload = {
        title,
        link_url: document.getElementById('wf-link')?.value?.trim() || null,
        image_url: document.getElementById('wf-image')?.value?.trim() || null,
        description: document.getElementById('wf-desc')?.value?.trim() || null,
        tags: document.getElementById('wf-tags')?.value?.split(',').map(t => t.trim()).filter(Boolean) || [],
        sort_order: parseInt(document.getElementById('wf-sort')?.value) || 99,
    };
    const btn = document.getElementById('works-save-btn');
    btn.disabled = true;
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving…';
    let error;
    if (worksEditingId) {
        ({ error } = await _sb.from('projects').update(payload).eq('id', worksEditingId));
    } else {
        ({ error } = await _sb.from('projects').insert(payload));
    }
    btn.disabled = false;
    if (error) { showToast(error.message, 'error'); btn.innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Project'; return; }
    showToast(worksEditingId ? '✓ Project updated!' : '✓ Project added!', 'success');
    adminWorksCancelForm();
    adminLoadWorks();
    loadProjectsFromDB(); // refresh carousel
}

async function adminDeleteWork(id, title) {
    if (!confirm(`Delete project "${title}"?`)) return;
    const { error } = await _sb.from('projects').delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Project deleted.', 'info');
    adminLoadWorks(); loadProjectsFromDB();
}

/* ══════════════════════════════════════════
   ADMIN — WRITINGS (Blog Posts)
══════════════════════════════════════════ */
let writingsEditingId = null;
let _writingsRowMap = {};

async function adminLoadWritings() {
    const el = document.getElementById('ap-writings-content');
    _writingsRowMap = {};
    el.innerHTML = `<div class="admin-loading"><i class="fas fa-spinner" style="animation:spin .8s linear infinite;margin-right:7px;"></i>Loading…</div>`;
    try {
        const { data, error } = await _sb.from('writings').select('*').order('approved', { ascending: true }).order('created_at', { ascending: false });
        if (error) throw error;
        const rows = data || [];
        rows.forEach(r => { _writingsRowMap[r.id] = r; });
        const pending = rows.filter(r => !r.approved).length;
        const approved = rows.filter(r => r.approved).length;
        el.innerHTML = `
  <div class="admin-add-bar">
    <span class="admin-add-bar-title">${rows.length} post${rows.length !== 1 ? 's' : ''} · <span style="color:#f87171;">${pending} pending</span> · <span style="color:#4ade80;">${approved} live</span></span>
    <button class="btn-admin-add" onclick="adminWritingsToggleForm()">
      <i class="fas fa-plus" style="font-size:.62rem;"></i> Add Post
    </button>
  </div>
  <div class="admin-inline-form" id="writings-form">
    <div class="admin-form-title"><i class="fas fa-pen-nib" style="color:var(--accent2);font-size:.9rem;"></i> <span id="writings-form-title">Add Blog Post</span></div>
    <div class="admin-form-grid">
      <div class="admin-form-group">
        <label class="admin-form-label">Title *</label>
        <input class="admin-form-input" id="bf-title" placeholder="e.g. Getting Started with Game Dev">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Category</label>
        <input class="admin-form-input" id="bf-cat" placeholder="e.g. Game Dev">
      </div>
      <div class="admin-form-group full">
        <label class="admin-form-label">Image URL</label>
        <input class="admin-form-input" id="bf-image" placeholder="https://i.postimg.cc/...">
      </div>
      <div class="admin-form-group full">
        <label class="admin-form-label">Excerpt / Description</label>
        <input class="admin-form-input" id="bf-excerpt" placeholder="Short summary shown on the card">
      </div>
      <div class="admin-form-group full">
        <label class="admin-form-label">Full Content (markdown)</label>
        <textarea class="admin-form-input" id="bf-content" rows="6" placeholder="Write full post content here..." style="resize:vertical;font-family:'JetBrains Mono',monospace;font-size:.78rem;line-height:1.6;"></textarea>
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Link URL</label>
        <input class="admin-form-input" id="bf-link" placeholder="https://hackerblogg.onrender.com/blog-detail/...">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Tags (comma-separated)</label>
        <input class="admin-form-input" id="bf-tags" placeholder="e.g. Python, Tutorial">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Published Date</label>
        <input class="admin-form-input" id="bf-date" placeholder="e.g. May 10, 2025">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Sort Order</label>
        <input class="admin-form-input" id="bf-sort" type="number" placeholder="99" value="99">
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Status</label>
        <select class="admin-form-select" id="bf-approved">
          <option value="true">✓ Approved (Live)</option>
          <option value="false">⏳ Pending</option>
        </select>
      </div>
    </div>
    <div class="admin-form-actions">
      <button class="btn-admin-cancel" onclick="adminWritingsCancelForm()">Cancel</button>
      <button class="btn-admin-save" id="writings-save-btn" onclick="adminSaveWriting()">
        <i class="fas fa-check" style="font-size:.72rem;"></i> Save Post
      </button>
    </div>
  </div>
  ${!rows.length
                ? `<div class="admin-empty">No posts yet — click "Add Post" to get started.</div>`
                : `<div class="admin-table-wrap"><table class="admin-table">
      <thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody>${rows.map(r => `<tr id="brow-${escHtml(r.id)}">
        <td style="font-weight:600;font-size:.82rem;max-width:160px;">${escHtml(r.title || '')}</td>
        <td style="font-size:.75rem;color:var(--muted);">${escHtml(r.author_name || 'Rikesh')}</td>
        <td><span class="admin-badge-pill badge-user" style="font-size:.58rem;">${escHtml(r.category || '—')}</span></td>
        <td><span class="admin-badge-pill ${r.approved ? 'badge-approved' : 'badge-pending'}">${r.approved ? '✓ Live' : '⏳ Pending'}</span></td>
        <td style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--muted);">${adminFmt(r.created_at)}</td>
        <td style="display:flex;gap:5px;flex-wrap:wrap;">
          ${!r.approved ? `<button class="admin-action-btn btn-approve" onclick="blogAdminApprove('${escHtml(r.id)}')">Approve</button>` : ''}
          <button class="btn-edit-row" onclick="adminWritingsEdit('${escHtml(r.id)}')">Edit</button>
          <button class="admin-action-btn btn-del-row" onclick="blogAdminDelete('${escHtml(r.id)}','${escHtml(r.title || '')}')">Delete</button>
        </td>
      </tr>`).join('')}</tbody>
    </table></div>`}`;
    } catch (e) { el.innerHTML = `<div class="admin-empty" style="color:#f87171;">⚠ ${escHtml(e.message)}</div>`; }
}

function adminWritingsToggleForm() {
    writingsEditingId = null;
    const form = document.getElementById('writings-form');
    const isOpen = form.classList.contains('open');
    form.classList.toggle('open', !isOpen);
    if (!isOpen) {
        document.getElementById('writings-form-title').textContent = 'Add Blog Post';
        ['bf-title', 'bf-cat', 'bf-image', 'bf-excerpt', 'bf-link', 'bf-date'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        document.getElementById('bf-sort').value = '99';
        document.getElementById('writings-save-btn').innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Post';
        document.getElementById('bf-title').focus();
    }
}

function adminWritingsEdit(id) {
    const r = _writingsRowMap[id]; if (!r) return;
    writingsEditingId = id;
    const form = document.getElementById('writings-form');
    form.classList.add('open');
    document.getElementById('writings-form-title').textContent = 'Edit Blog Post';
    document.getElementById('bf-title').value = r.title || '';
    document.getElementById('bf-cat').value = r.category || '';
    document.getElementById('bf-image').value = r.image_url || '';
    document.getElementById('bf-excerpt').value = r.excerpt || '';
    document.getElementById('bf-content').value = r.content || '';
    document.getElementById('bf-link').value = r.link_url || '';
    document.getElementById('bf-tags').value = (r.tags || []).join(', ');
    document.getElementById('bf-date').value = r.d || '';
    document.getElementById('bf-sort').value = r.sort_order ?? 99;
    document.getElementById('bf-approved').value = r.approved ? 'true' : 'false';
    document.getElementById('writings-save-btn').innerHTML = '<i class="fas fa-pen" style="font-size:.72rem;"></i> Update Post';
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('bf-title').focus();
}

function adminWritingsCancelForm() {
    writingsEditingId = null;
    document.getElementById('writings-form')?.classList.remove('open');
}

async function adminSaveWriting() {
    const title = document.getElementById('bf-title')?.value?.trim();
    if (!title) { showToast('Title is required.', 'error'); return; }
    const payload = {
        title,
        category: document.getElementById('bf-cat')?.value?.trim() || null,
        image_url: document.getElementById('bf-image')?.value?.trim() || null,
        excerpt: document.getElementById('bf-excerpt')?.value?.trim() || null,
        content: document.getElementById('bf-content')?.value?.trim() || null,
        link_url: document.getElementById('bf-link')?.value?.trim() || null,
        tags: document.getElementById('bf-tags')?.value?.split(',').map(t => t.trim()).filter(Boolean) || [],
        d: document.getElementById('bf-date')?.value?.trim() || null,
        sort_order: parseInt(document.getElementById('bf-sort')?.value) || 99,
        approved: document.getElementById('bf-approved')?.value === 'true',
        author_name: writingsEditingId ? undefined : 'Rikesh Dahal',
        author_avatar: writingsEditingId ? undefined : 'https://i.postimg.cc/MZhwPc85/rikesh.png',
        author_id: writingsEditingId ? undefined : siteUser?.id,
    };
    if (writingsEditingId) { delete payload.author_name; delete payload.author_avatar; delete payload.author_id; }
    const btn = document.getElementById('writings-save-btn');
    btn.disabled = true;
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving…';
    let error;
    if (writingsEditingId) {
        ({ error } = await _sb.from('writings').update(payload).eq('id', writingsEditingId));
    } else {
        const insertPayload = { ...payload, author_name: 'Rikesh Dahal', author_avatar: 'https://i.postimg.cc/MZhwPc85/rikesh.png', author_id: siteUser?.id };
        ({ error } = await _sb.from('writings').insert(insertPayload));
    }
    btn.disabled = false;
    if (error) { showToast(error.message, 'error'); btn.innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Post'; return; }
    showToast(writingsEditingId ? '✓ Post updated!' : '✓ Post added!', 'success');
    adminWritingsCancelForm();
    adminLoadWritings();
    loadBlogsFromDB();
}

/* GOOEY_BLOB_JS */
(function () {
    var nav = document.getElementById('nav-center');
    if (!nav) return;
    var b = document.getElementById('nav-goo-blob');
    if (!b) return;

    /* ── spark canvas ── */
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:-8px;pointer-events:none;overflow:visible;';
    b.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var sparks = [];
    var sparkInterval = null;
    var isHovering = false;

    function resizeCanvas() {
        canvas.width = (b.offsetWidth || 80) + 16;
        canvas.height = (b.offsetHeight || 30) + 16;
    }

    function spawnBurst(count) {
        var w = b.offsetWidth || 80, h = b.offsetHeight || 30;
        for (var i = 0; i < count; i++) {
            /* sparks from both edges + random along top/bottom rim */
            var type = Math.random();
            var x, y;
            if (type < 0.4) {
                /* left edge burst */
                x = Math.random() * 14 + 4;
                y = h / 2 + (Math.random() - 0.5) * h * 0.7;
            } else if (type < 0.8) {
                /* right edge burst */
                x = w - Math.random() * 14 - 4;
                y = h / 2 + (Math.random() - 0.5) * h * 0.7;
            } else {
                /* top/bottom rim */
                x = Math.random() * w;
                y = Math.random() < 0.5 ? Math.random() * 5 : h - Math.random() * 5;
            }
            sparks.push({
                x: x + 8,
                y: y + 8,
                vx: (Math.random() - 0.5) * 2.8,
                vy: (Math.random() - 0.72) * 3.2,
                life: 1,
                decay: 0.028 + Math.random() * 0.03,
                size: 1.0 + Math.random() * 1.8,
                col: Math.random() < 0.5 ? '143,92,223' : '180,142,245'
            });
        }
    }

    function startSparks() {
        /* always restart — so every hover gets a fresh burst cycle */
        clearInterval(sparkInterval);
        spawnBurst(10); /* immediate burst on hover */
        sparkInterval = setInterval(function () {
            if (isHovering) spawnBurst(3);
        }, 55);
    }

    function stopSparks() {
        clearInterval(sparkInterval);
        sparkInterval = null;
    }

    (function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparks = sparks.filter(function (s) { return s.life > 0; });
        sparks.forEach(function (s) {
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.06; /* gravity */
            s.life -= s.decay;
            ctx.beginPath();
            ctx.arc(s.x, s.y, Math.max(0.1, s.size * s.life), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + s.col + ',' + (s.life * 0.9) + ')';
            ctx.fill();
        });
        requestAnimationFrame(tick);
    })();

    /* ── blob movement ── */
    function move(el) {
        var nr = nav.getBoundingClientRect();
        var er = el.getBoundingClientRect();
        b.style.left = (er.left - nr.left) + 'px';
        b.style.width = er.width + 'px';
        b.style.opacity = '1';
        setTimeout(resizeCanvas, 30);
        startSparks(); /* always fires fresh burst */
    }

    function hide() {
        isHovering = false;
        stopSparks();
        b.style.opacity = '0';
    }

    nav.querySelectorAll('.c-link,.c-book').forEach(function (l) {
        l.addEventListener('mouseenter', function () {
            isHovering = true;
            move(l);
        });
    });

    nav.addEventListener('mouseleave', hide);
    window.addEventListener('scroll', hide, { passive: true });
})();

/* FOOTER LIKE JS */
(function () {
    var LIKED_KEY = 'rd_portfolio_liked';
    var TABLE = 'portfolio_likes';
    var btn = document.getElementById('footer-like-btn');
    var numEl = document.getElementById('flc-num');
    var countWrap = document.getElementById('footer-like-count');
    var lbl = document.getElementById('flb-label');
    if (!btn) return;
    var liked = localStorage.getItem(LIKED_KEY) === '1';
    function setLikedUI(v) {
        liked = v;
        btn.classList.toggle('liked', v);
        if (countWrap) countWrap.classList.toggle('liked', v);
        if (lbl) lbl.textContent = v ? 'You liked this! ♥' : 'Like my Portfolio';
    }
    setLikedUI(liked);
    async function fetchCount() {
        if (!_sb) { if (numEl) numEl.textContent = '--'; return; }
        try {
            var res = await _sb.from(TABLE).select('count', { count: 'exact', head: true });
            var c = res.count || 0;
            animCount(c);
        } catch (err) { if (numEl) numEl.textContent = '--'; }
    }
    function animCount(val) {
        if (!numEl) return;
        var old = parseInt(numEl.dataset.val) || 0;
        numEl.dataset.val = val;
        if (old === val) { numEl.textContent = fmt(val); return; }
        var start = null;
        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / 500, 1);
            numEl.textContent = fmt(Math.round(old + (val - old) * p));
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    function fmt(n) {
        if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
        return String(n);
    }
    function spawnHearts(x, y) {
        var e = ['♥', '❤', '♥', 'U0001f9e1', '♥', '❤'];
        for (var i = 0; i < 6; i++) {
            (function (i) {
                setTimeout(function () {
                    var el = document.createElement('div');
                    el.className = 'like-float';
                    el.textContent = e[i % e.length];
                    el.style.left = (x + Math.random() * 60 - 30) + 'px';
                    el.style.top = (y + Math.random() * 10) + 'px';
                    el.style.animationDelay = (i * 0.07) + 's';
                    el.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
                    document.body.appendChild(el);
                    setTimeout(function () { el.remove(); }, 1200);
                }, i * 60);
            })(i);
        }
        var ring = document.createElement('div');
        ring.className = 'like-ring-footer';
        ring.style.left = x + 'px';
        ring.style.top = y + 'px';
        document.body.appendChild(ring);
        setTimeout(function () { ring.remove(); }, 700);
    }
    btn.addEventListener('click', async function () {
        var rect = btn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        btn.classList.remove('pop');
        void btn.offsetWidth;
        btn.classList.add('pop');
        if (liked) {
            setLikedUI(false);
            localStorage.removeItem(LIKED_KEY);
            if (_sb) {
                try { await _sb.from(TABLE).delete().eq('session', getSess()); }
                catch (e) { }
            }
            var cv = parseInt(numEl && numEl.dataset.val) || 1;
            animCount(Math.max(0, cv - 1));
        } else {
            setLikedUI(true);
            localStorage.setItem(LIKED_KEY, '1');
            spawnHearts(cx, cy);
            if (_sb) {
                try { await _sb.from(TABLE).insert({ session: getSess() }); }
                catch (e) { }
            }
            var cv2 = parseInt(numEl && numEl.dataset.val) || 0;
            animCount(cv2 + 1);
        }
    });
    function getSess() {
        var k = 'rd_sess';
        var s = localStorage.getItem(k);
        if (!s) { s = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem(k, s); }
        return s;
    }
    fetchCount();
})();
// <!-- CLICK SOUND SYSTEM -->
(function () {
    var SOUND_URL = 'https://image2url.com/r2/default/audio/1775570627891-7a2e5e8d-22bc-46b6-a94e-f5c55decba95.mp3';
    var pool = [];
    var POOL_SIZE = 4;
    var loaded = false;
    var enabled = true;

    function preload() {
        for (var i = 0; i < POOL_SIZE; i++) {
            var a = new Audio();
            a.src = SOUND_URL;
            a.volume = 0.35;
            a.preload = 'auto';
            pool.push(a);
        }
        loaded = true;
    }

    function play() {
        if (!enabled || !loaded) return;
        var a = pool.find(function (x) { return x.paused || x.ended; });
        if (!a) { a = pool[0]; }
        a.currentTime = 0;
        a.volume = 0.35;
        a.play().catch(function () { });
    }

    document.addEventListener('DOMContentLoaded', function () {
        preload();
        document.body.addEventListener('click', function (e) {
            var t = e.target.closest('a,button,[role="button"],.btn-primary,.btn-outline,.c-link,.mob-link,.footer-link,.footer-soc,.soc-icon,.sk-tab,.t-nav-btn,.t-dot,.bp-btn,.nud-item,.auth-tab,.admin-tab,.wpe-tab,.gb-oauth-btn,.auth-oauth-btn,.footer-manifest-btn,.footer-guestbook-btn,.footer-music-btn,.footer-gear-btn,.kimi-btn,.nav-name-pill,#footer-like-btn,#btt,.c-theme,.nnp-theme,.mob-sun,.m-dl-btn,.bp-track-pill');
            if (t) play();
        }, true);
    });

    window.__clickSoundEnabled = function (v) { enabled = v; };
})();
// <!-- ═══ NAVIGATION WHEEL ═══ -->


(function () {
    var SECTIONS = [
        { icon: '⌂', label: 'Home', href: '#home' },
        { icon: '◉', label: 'About', href: '#about' },
        { icon: '⚡', label: 'Skills', href: '#skills' },
        { icon: '◈', label: 'Data', href: '#de-section' },
        { icon: '◼', label: 'Work', href: '#work' },
        { icon: '◎', label: 'Exp', href: '#experience' },
        { icon: '✦', label: 'Blog', href: '#blog' },
        { icon: '✉', label: 'Contact', href: '#contact' }
    ];
    var RADIUS = 95;
    var HOLD_MS = 1600;
    var open = false, selIdx = -1, holdRAF = null;
    var container = document.getElementById('navWheel');
    var ring = document.getElementById('nww-ring');
    var trigger = document.getElementById('nww-trigger');
    var tooltip = document.getElementById('nww-tooltip');
    var scrollSound = document.getElementById('nww-scroll-sound');
    var selectSound = document.getElementById('nww-select-sound');
    var items = [];
    var D = (RADIUS + 30) * 2;
    ring.style.width = D + 'px'; ring.style.height = D + 'px';
    ring.style.left = (-D / 2) + 'px'; ring.style.top = (-D / 2) + 'px';

    SECTIONS.forEach(function (s, i) {
        var n = SECTIONS.length;
        var angle = 2 * Math.PI * i / n - Math.PI / 2;
        var cx = D / 2 + RADIUS * Math.cos(angle);
        var cy = D / 2 + RADIUS * Math.sin(angle);
        var el = document.createElement('div');
        el.className = 'nww-item';
        el.style.left = cx + 'px'; el.style.top = cy + 'px';
        var circ = 2 * Math.PI * 24;
        el.setAttribute('aria-label', s.label);
        el.innerHTML = '<svg class="narc" width="58" height="58"><circle cx="29" cy="29" r="24" stroke="rgba(109,39,217,.15)" stroke-width="3" fill="none"/><circle class="narc-fill" cx="29" cy="29" r="24" stroke="#8f5cdf" stroke-width="3" fill="none" stroke-dasharray="' + circ + '" stroke-dashoffset="' + circ + '" stroke-linecap="round"/></svg><span class="ni-icon">' + s.icon + '</span><span class="ni-label">' + s.label + '</span>';
        el.addEventListener('mouseenter', function () { showItem(i, true); });
        el.addEventListener('mouseleave', function () { cancelHold(); items.forEach(function (e) { e.classList.remove('active'); }); tooltip.style.opacity = '0'; });
        el.addEventListener('click', function () { navigate(i); });
        el.addEventListener('touchstart', function () { showItem(i, true); }, { passive: true });
        el.addEventListener('touchend', function () { navigate(i); });
        ring.appendChild(el);
        items.push(el);
    });

    function showItem(idx, doHold) {
        selIdx = idx;
        items.forEach(function (el, i) { el.classList.toggle('active', i === idx); });
        var rect = items[idx].getBoundingClientRect();
        tooltip.textContent = SECTIONS[idx].label;
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top - 36) + 'px';
        tooltip.style.opacity = '1';
        cancelHold();
        if (doHold) startHold(idx);
    }

    function startHold(idx) {
        var el = items[idx];
        var arc = el.querySelector('.narc-fill');
        var circ = 2 * Math.PI * 24;
        arc.style.strokeDashoffset = circ;
        var start = null;
        function anim(t) {
            if (!start) start = t;
            var p = Math.min((t - start) / HOLD_MS, 1);
            arc.style.strokeDashoffset = circ * (1 - p);
            if (p < 1) holdRAF = requestAnimationFrame(anim);
            else navigate(idx);
        }
        holdRAF = requestAnimationFrame(anim);
    }

    function cancelHold() {
        if (holdRAF) cancelAnimationFrame(holdRAF); holdRAF = null;
        items.forEach(function (el) {
            var arc = el.querySelector('.narc-fill');
            if (arc) arc.style.strokeDashoffset = 2 * Math.PI * 24 + '';
        });
    }

    function openWheel() {
        open = true; selIdx = -1;
        ring.classList.add('open'); trigger.classList.add('open');
    }
    function closeWheel() {
        open = false; selIdx = -1; cancelHold();
        ring.classList.remove('open'); trigger.classList.remove('open');
        items.forEach(function (el) { el.classList.remove('active'); });
        tooltip.style.opacity = '0';
    }

    function navigate(idx) {
        selectSound.currentTime = 0; selectSound.play().catch(function () { });
        var target = document.querySelector(SECTIONS[idx].href);
        if (target) {
            var offset = target.offsetTop - 56;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        } else {
            window.location.hash = SECTIONS[idx].href;
        }
        closeWheel();
    }

    trigger.addEventListener('click', function () { open ? closeWheel() : openWheel(); });

    window.addEventListener('wheel', function (e) {
        if (!open) return;
        e.preventDefault();
        var n = SECTIONS.length;
        var nx = selIdx < 0 ? 0 : (e.deltaY > 0 ? (selIdx + 1) % n : (selIdx - 1 + n) % n);
        cancelHold(); showItem(nx, true);
        scrollSound.currentTime = 0; scrollSound.play().catch(function () { });
    }, { passive: false });

    var dragging = false, dsx, dsy, dox, doy;
    trigger.addEventListener('pointerdown', function (e) {
        dragging = true;
        var r = container.getBoundingClientRect();
        dox = r.left; doy = r.top;
        dsx = e.clientX; dsy = e.clientY;
        e.preventDefault();
    });
    window.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        var nx = dox + (e.clientX - dsx);
        var ny = doy + (e.clientY - dsy);
        nx = Math.max(26, Math.min(window.innerWidth - 26, nx));
        ny = Math.max(26, Math.min(window.innerHeight - 26, ny));
        container.style.left = nx + 'px';
        container.style.top = ny + 'px';
        container.style.bottom = 'auto';
        container.style.right = 'auto';
    });
    window.addEventListener('pointerup', function () { dragging = false; });
})();
// <!-- ═══ END NAVIGATION WHEEL ═══ -->
let notifList = JSON.parse(localStorage.getItem('rd_notifs') || '[]');
let notifUnread = 0;
let _realtimeSubs = [];

function notifAdd(type, data) {
    const icons = { testimonial: '★', guestbook: '💬', post: '📝' };
    const n = {
        id: Date.now(),
        type,
        icon: icons[type] || '🔔',
        title: type === 'testimonial'
            ? `New testimonial from ${data.name}`
            : type === 'guestbook'
                ? `${data.name} signed the guestbook`
                : `New post submitted: ${data.title}`,
        time: new Date().toISOString(),
        read: false
    };
    notifList.unshift(n);
    if (notifList.length > 30) notifList = notifList.slice(0, 30);
    localStorage.setItem('rd_notifs', JSON.stringify(notifList));
    notifRender();
    notifToastShow(n);
}

function notifRender() {
    const list = document.getElementById('notif-list');
    const badge = document.getElementById('notif-badge');
    const bellWrap = document.getElementById('notif-bell-wrap');
    if (!list) return;
    notifUnread = notifList.filter(n => !n.read).length;
    if (badge) {
        badge.textContent = notifUnread;
        badge.style.display = notifUnread > 0 ? 'flex' : 'none';
    }
    if (bellWrap) bellWrap.style.display = siteIsAdmin ? 'block' : 'none';
    if (!notifList.length) {
        list.innerHTML = `<div style="padding:24px;text-align:center;color:var(--muted);font-size:.78rem;">No notifications</div>`;
        return;
    }
    list.innerHTML = notifList.map(n => `
    <div onclick="notifMarkRead('${n.id}')" style="
      display:flex;gap:11px;padding:12px 16px;cursor:pointer;
      border-bottom:1px solid var(--border);transition:background .15s;
      background:${n.read ? 'transparent' : 'rgba(109,39,217,.06)'};"
      onmouseover="this.style.background='rgba(109,39,217,.1)'"
      onmouseout="this.style.background='${n.read ? 'transparent' : 'rgba(109,39,217,.06)'}'">
      <span style="font-size:1.1rem;flex-shrink:0;margin-top:2px;">${n.icon}</span>
      <div style="flex:1;min-width:0;">
<div style="font-size:.8rem;color:var(--text);line-height:1.4;
  ${n.read ? '' : 'font-weight:700;'}">${escHtml(n.title)}</div>
<div style="font-family:'JetBrains Mono',monospace;font-size:.62rem;
  color:var(--muted);margin-top:3px;">${timeAgoNotif(n.time)}</div>
      </div>
      ${!n.read ? `<div style="width:7px;height:7px;border-radius:50%;
background:var(--accent);flex-shrink:0;margin-top:6px;"></div>` : ''}
    </div>`).join('');
}

function notifMarkRead(id) {
    notifList = notifList.map(n => n.id == id ? { ...n, read: true } : n);
    localStorage.setItem('rd_notifs', JSON.stringify(notifList));
    notifRender();
}

function clearAllNotifs() {
    notifList = [];
    localStorage.removeItem('rd_notifs');
    notifRender();
}

function toggleNotifPanel() {
    const p = document.getElementById('notif-panel');
    if (!p) return;
    const open = p.style.display === 'block';
    p.style.display = open ? 'none' : 'block';
    if (!open) { notifList.forEach(n => n.read = true); localStorage.setItem('rd_notifs', JSON.stringify(notifList)); notifRender(); }
}

function timeAgoNotif(iso) {
    const d = (Date.now() - new Date(iso)) / 1000;
    if (d < 60) return 'just now';
    if (d < 3600) return Math.floor(d / 60) + 'm ago';
    if (d < 86400) return Math.floor(d / 3600) + 'h ago';
    return Math.floor(d / 86400) + 'd ago';
}

function notifToastShow(n) {
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;top:74px;right:20px;z-index:9999;
    max-width:300px;padding:13px 16px;background:var(--modal-bg);
    border:1px solid rgba(109,39,217,.35);border-radius:14px;
    box-shadow:0 12px 40px rgba(0,0,0,.6);
    display:flex;gap:10px;align-items:flex-start;
    font-family:'Cabinet Grotesk',sans-serif;
    animation:liftIn .3s ease both;`;
    t.innerHTML = `
    <span style="font-size:1.2rem;flex-shrink:0;">${n.icon}</span>
    <div>
      <div style="font-weight:700;font-size:.82rem;color:var(--text);margin-bottom:3px;">New Notification</div>
      <div style="font-size:.76rem;color:var(--muted);">${escHtml(n.title)}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="
      background:none;border:none;color:var(--muted);cursor:pointer;
      font-size:.75rem;padding:2px;flex-shrink:0;margin-left:4px;">✕</button>`;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = 'all .4s'; setTimeout(() => t.remove(), 400); }, 5000);
}

/* ── Subscribe to realtime (call after authBoot confirms admin) ── */
function subscribeAdminRealtime() {
    if (!_sb || !siteIsAdmin || _realtimeSubs.length) return;

    const testiSub = _sb.channel('admin-testi-notif')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'testimonials' }, payload => {
            notifAdd('testimonial', payload.new);
        }).subscribe();

    const gbSub = _sb.channel('admin-gb-notif')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guestbook' }, payload => {
            notifAdd('guestbook', payload.new);
        }).subscribe();

    const postSub = _sb.channel('admin-post-notif')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'writings' }, payload => {
            if (!payload.new.approved) notifAdd('post', payload.new);
        }).subscribe();

    _realtimeSubs = [testiSub, gbSub, postSub];
}

// Close notif panel on outside click
document.addEventListener('click', e => {
    const wrap = document.getElementById('notif-bell-wrap');
    if (wrap && !wrap.contains(e.target)) {
        const p = document.getElementById('notif-panel');
        if (p) p.style.display = 'none';
    }
});

notifRender();
/* ═══════════════════════════════════════
   SEARCH SYSTEM
═══════════════════════════════════════ */
let searchFilter = 'all';
let searchSelectedIdx = -1;

function openSearchModal() {
    document.getElementById('search-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('search-input')?.focus(), 80);
    renderSearchResults([]);
}

function closeSearchModal() {
    document.getElementById('search-modal').style.display = 'none';
    document.body.style.overflow = '';
    const inp = document.getElementById('search-input');
    if (inp) inp.value = '';
    searchSelectedIdx = -1;
}

function searchSetFilter(f, btn) {
    searchFilter = f;
    document.querySelectorAll('.search-filter-tab').forEach(b => {
        b.style.color = 'var(--muted)'; b.style.background = 'none';
    });
    if (btn) { btn.style.color = 'var(--accent2)'; btn.style.background = 'rgba(109,39,217,.1)'; }
    const val = document.getElementById('search-input')?.value || '';
    runSearch(val);
}

function hlText(text, query) {
    if (!query) return escHtml(text);
    const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return escHtml(text).replace(re, `<mark style="background:rgba(109,39,217,.35);color:#c4b5fd;border-radius:2px;padding:0 1px;">$1</mark>`);
}

function runSearch(query) {
    query = (query || '').trim();
    const empty = document.getElementById('search-empty');
    if (!query) {
        renderSearchResults([]);
        if (empty) { empty.style.display = 'block'; empty.innerHTML = '<i class="fas fa-search" style="font-size:1.5rem;opacity:.3;display:block;margin-bottom:10px;"></i>Start typing to search…'; }
        return;
    }
    if (empty) empty.style.display = 'none';
    const q = query.toLowerCase();
    let results = [];

    // Search blogs
    if (searchFilter === 'all' || searchFilter === 'blog') {
        const blogResults = (blogsData || []).filter(b =>
            (b.title || '').toLowerCase().includes(q) ||
            (b.excerpt || '').toLowerCase().includes(q) ||
            (b.category || '').toLowerCase().includes(q) ||
            (b.tags || []).some(t => t.toLowerCase().includes(q))
        ).map(b => ({ type: 'blog', id: b.id, title: b.title, sub: b.category || 'Blog', excerpt: b.excerpt, icon: 'fas fa-pen-nib' }));
        results = results.concat(blogResults);
    }

    // Search projects
    if (searchFilter === 'all' || searchFilter === 'project') {
        const projResults = (projectsData || []).filter(p =>
            (p.title || p.t || '').toLowerCase().includes(q) ||
            (p.description || p.d || '').toLowerCase().includes(q) ||
            (p.tags || p.tg || []).some(t => t.toLowerCase().includes(q))
        ).map(p => ({
            type: 'project', id: p.id, title: p.title || p.t, sub: 'Project',
            excerpt: p.description || p.d, link: p.link_url || p.l, icon: 'fas fa-rocket'
        }));
        results = results.concat(projResults);
    }

    searchSelectedIdx = results.length ? 0 : -1;
    renderSearchResults(results, query);
}

function renderSearchResults(results, query) {
    const el = document.getElementById('search-results');
    const empty = document.getElementById('search-empty');
    if (!el) return;
    if (!results.length && query) {
        el.innerHTML = '';
        if (empty) { empty.style.display = 'block'; empty.innerHTML = `<i class="fas fa-search" style="font-size:1.5rem;opacity:.3;display:block;margin-bottom:10px;"></i>No results for "<strong style="color:var(--text);">${escHtml(query)}</strong>"<br><span style="font-size:.72rem;margin-top:6px;display:block;">Try different keywords</span>`; }
        return;
    }
    if (empty) empty.style.display = 'none';
    el.innerHTML = results.map((r, i) => `
    <div class="search-result-item" data-idx="${i}" data-type="${r.type}" data-id="${escHtml(r.id || '')}" data-link="${escHtml(r.link || '')}"
      onclick="searchOpenResult(${i})"
      onmouseover="searchSelectIdx(${i})"
      style="display:flex;align-items:flex-start;gap:12px;padding:13px 18px;
cursor:pointer;border-bottom:1px solid var(--border);transition:background .13s;
background:${i === searchSelectedIdx ? 'rgba(109,39,217,.12)' : 'transparent'};">
      <div style="width:34px;height:34px;border-radius:9px;flex-shrink:0;
background:rgba(109,39,217,.1);border:1px solid rgba(109,39,217,.2);
display:flex;align-items:center;justify-content:center;color:var(--accent2);font-size:.76rem;">
<i class="${r.icon}"></i>
      </div>
      <div style="flex:1;min-width:0;">
<div style="font-weight:700;font-size:.86rem;color:var(--text);margin-bottom:2px;">${hlText(r.title || '', query)}</div>
${r.excerpt ? `<div style="font-size:.73rem;color:var(--muted);display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;">${hlText(r.excerpt, query)}</div>` : ''}
      </div>
      <span style="flex-shrink:0;padding:2px 8px;border-radius:100px;font-size:.6rem;font-weight:700;
letter-spacing:.07em;background:rgba(109,39,217,.1);border:1px solid rgba(109,39,217,.2);
color:var(--accent2);font-family:'JetBrains Mono',monospace;">${r.sub}</span>
    </div>`).join('');
}

function searchSelectIdx(idx) {
    searchSelectedIdx = idx;
    document.querySelectorAll('.search-result-item').forEach((el, i) => {
        el.style.background = i === idx ? 'rgba(109,39,217,.12)' : 'transparent';
    });
}

function searchOpenResult(idx) {
    const items = document.querySelectorAll('.search-result-item');
    const item = items[idx];
    if (!item) return;
    closeSearchModal();
    if (item.dataset.type === 'blog') {
        setTimeout(() => openBlogReader(item.dataset.id), 100);
    } else if (item.dataset.link) {
        window.open(item.dataset.link, '_blank');
    } else {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
}

// Keyboard navigation
document.addEventListener('keydown', e => {
    // Ctrl+/ to open
    if ((e.ctrlKey || e.metaKey) && e.key === '/') { e.preventDefault(); openSearchModal(); return; }
    const modal = document.getElementById('search-modal');
    if (!modal || modal.style.display === 'none') return;
    const items = document.querySelectorAll('.search-result-item');
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        searchSelectedIdx = Math.min(searchSelectedIdx + 1, items.length - 1);
        searchSelectIdx(searchSelectedIdx);
        items[searchSelectedIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        searchSelectedIdx = Math.max(searchSelectedIdx - 1, 0);
        searchSelectIdx(searchSelectedIdx);
        items[searchSelectedIdx]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && searchSelectedIdx >= 0) {
        e.preventDefault();
        searchOpenResult(searchSelectedIdx);
    } else if (e.key === 'Escape') {
        closeSearchModal();
    }
});
/* ══════════════════════════════════════════
   CERTIFICATES — dynamic (Supabase)
══════════════════════════════════════════ */
let certsData = [];

async function loadCertsFromDB() {
    if (_sb) {
        const { data } = await _sb.from('certificates').select('*').order('sort_order', { ascending: true });
        if (data) certsData = data;
    }
    renderCerts();
}

function renderCerts() {
    const grid = document.getElementById('certs-grid');
    if (!grid) return;
    grid.innerHTML = '';
    if (!certsData.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;padding:40px 0;text-align:center;color:var(--muted);font-size:.88rem;">No certificates yet.</div>`;
        return;
    }
    certsData.forEach((c, i) => {
        const el = buildCertCard(c, i);
        if (siteIsAdmin) {
            const adminBar = document.createElement('div');
            adminBar.style.cssText = 'position:absolute;bottom:0;left:0;right:0;display:none;gap:6px;padding:8px 12px;background:rgba(2,6,17,.92);border-top:1px solid var(--border);border-radius:0 0 16px 16px;z-index:10;justify-content:flex-end;';
            adminBar.innerHTML = `
              <button onclick="event.stopPropagation();adminCertsEdit('${c.id}')" style="padding:4px 10px;border-radius:6px;font-size:.67rem;font-weight:600;font-family:'JetBrains Mono',monospace;background:rgba(109,39,217,.1);color:var(--accent2);border:1px solid rgba(109,39,217,.25);cursor:pointer;">✎ Edit</button>
              <button onclick="event.stopPropagation();adminDeleteCert('${c.id}','${(c.title || '').replace(/'/g, "\\'")}')" style="padding:4px 10px;border-radius:6px;font-size:.67rem;font-weight:600;font-family:'JetBrains Mono',monospace;background:rgba(248,113,113,.08);color:#f87171;border:1px solid rgba(248,113,113,.2);cursor:pointer;">✕ Delete</button>`;
            const card = el.querySelector('.card') || el;
            card.style.position = 'relative';
            card.appendChild(adminBar);
            card.addEventListener('mouseenter', () => adminBar.style.display = 'flex');
            card.addEventListener('mouseleave', () => adminBar.style.display = 'none');
        }
        grid.appendChild(el);
        revObs.observe(el);
    });
}

function buildCertCard(c, i) {
    const tags = Array.isArray(c.tags) ? c.tags : [];
    const color = c.color || '#6d27d9';
    const icon = c.icon || 'fas fa-certificate';
    const el = document.createElement('div');
    el.className = 'reveal card';
    el.style.transitionDelay = `${i * .07}s`;
    const imgOnclick = c.image_url
        ? `openCertViewer(${JSON.stringify(c.image_url)},${JSON.stringify(c.title || '')})`
        : c.verify_url ? `window.open(${JSON.stringify(c.verify_url)},'_blank')` : '';
    el.innerHTML = `
    <div style="position:relative;overflow:hidden;border-radius:14px;">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;
        background:linear-gradient(90deg,${color},var(--accent2));border-radius:14px 14px 0 0;"></div>
      <div style="height:170px;background:rgba(31,41,55,.4);overflow:hidden;position:relative;${imgOnclick ? 'cursor:pointer;' : ''}"
        ${imgOnclick ? `onclick="${escHtml(imgOnclick)}"` : ''}>
        ${c.image_url
            ? `<img src="${escHtml(c.image_url)}" alt="${escHtml(c.title || '')}" loading="lazy"
                style="width:100%;height:100%;object-fit:cover;transition:transform .5s;"
                onmouseover="this.style.transform=\'scale(1.05)\'"
                onmouseout="this.style.transform=\'\'">`
            + `<div style="position:absolute;inset:0;background:rgba(0,0,0,.3);display:flex;align-items:center;`
            + `justify-content:center;opacity:0;transition:opacity .3s;"`
            + ` onmouseover="this.style.opacity=\'1\'" onmouseout="this.style.opacity=\'0\'">`
            + `<span style="background:rgba(109,39,217,.8);color:#fff;padding:8px 16px;border-radius:100px;`
            + `font-size:.76rem;font-weight:700;font-family:\'Cabinet Grotesk\',sans-serif;">`
            + `<i class="fas fa-expand"></i> View Certificate</span></div>`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;`
            + `justify-content:center;background:linear-gradient(135deg,rgba(109,39,217,.15),rgba(31,41,55,.4));">`
            + `<i class="${icon}" style="font-size:3rem;color:${color};opacity:.6;"></i></div>`}
        <div style="position:absolute;bottom:10px;left:10px;padding:3px 10px;border-radius:100px;
          background:rgba(2,6,17,.85);border:1px solid rgba(255,255,255,.1);
          font-size:.62rem;font-weight:700;font-family:\'JetBrains Mono\',monospace;
          color:var(--accent2);letter-spacing:.06em;">
          <i class="fas fa-certificate" style="margin-right:4px;"></i>${escHtml(c.issuer || '')}
        </div>
      </div>
      <div style="padding:15px 17px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:8px;">
          <h3 style="font-family:\'Cabinet Grotesk\',sans-serif;font-weight:800;
            font-size:.9rem;color:var(--text);line-height:1.3;">${escHtml(c.title || '')}</h3>
          <span style="font-family:\'JetBrains Mono\',monospace;font-size:.62rem;
            color:var(--muted);white-space:nowrap;flex-shrink:0;">${escHtml(c.date || '')}</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;">
          ${tags.map(t => `<span class="tag" style="font-size:.58rem;">${escHtml(t)}</span>`).join('')}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          ${c.image_url ? `<button onclick="openCertViewer(${JSON.stringify(c.image_url)},${JSON.stringify(c.title || '')})"
            style="flex:1;padding:8px;border-radius:8px;background:rgba(109,39,217,.1);
            border:1px solid rgba(109,39,217,.25);color:var(--accent2);
            font-family:\'Cabinet Grotesk\',sans-serif;font-size:.76rem;font-weight:700;
            cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:all .2s;"
            onmouseover="this.style.background=\'rgba(109,39,217,.22)\'"
            onmouseout="this.style.background=\'rgba(109,39,217,.1)\'">
            <i class="fas fa-eye" style="font-size:.68rem;"></i> View
          </button>` : ''}
          ${c.verify_url ? `<a href="${escHtml(c.verify_url)}" target="_blank" rel="noopener"
            style="padding:8px 12px;border-radius:8px;background:rgba(34,197,94,.08);
            border:1px solid rgba(34,197,94,.22);color:#4ade80;
            font-family:\'Cabinet Grotesk\',sans-serif;font-size:.76rem;font-weight:700;
            display:flex;align-items:center;gap:5px;transition:all .2s;"
            onmouseover="this.style.background=\'rgba(34,197,94,.18)\'"
            onmouseout="this.style.background=\'rgba(34,197,94,.08)\'">
            <i class="fas fa-external-link-alt" style="font-size:.62rem;"></i> Verify
          </a>` : ''}
        </div>
      </div>
    </div>`;
    return el;
}

function openCertViewer(imgUrl, title) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9600;background:rgba(0,0,0,.94);backdrop-filter:blur(12px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;cursor:zoom-out;';
    overlay.onclick = () => overlay.remove();
    const inner = document.createElement('div');
    inner.style.cssText = 'max-width:800px;width:100%;text-align:center;';
    inner.onclick = e => e.stopPropagation();
    inner.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <span style="font-family:\'Special Elite\',cursive;font-size:1rem;color:var(--text);">${escHtml(title)}</span>
        <button id="_cert_close_btn" style="width:32px;height:32px;border-radius:8px;background:rgba(248,113,113,.1);
          border:1px solid rgba(248,113,113,.25);color:#f87171;font-size:.8rem;
          cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>
      <img src="${escHtml(imgUrl)}" alt="${escHtml(title)}"
        style="max-width:100%;max-height:75vh;object-fit:contain;border-radius:14px;
        border:1px solid rgba(109,39,217,.3);box-shadow:0 24px 80px rgba(0,0,0,.7);">
      <div style="margin-top:14px;display:flex;gap:10px;justify-content:center;">
        <a href="${escHtml(imgUrl)}" download
          style="display:inline-flex;align-items:center;gap:7px;padding:9px 20px;border-radius:9px;
          background:var(--accent);color:#fff;font-family:\'Cabinet Grotesk\',sans-serif;
          font-weight:700;font-size:.82rem;text-decoration:none;">
          <i class="fas fa-download"></i> Download
        </a>
      </div>`;
    overlay.appendChild(inner);
    document.body.appendChild(overlay);
    inner.querySelector('#_cert_close_btn').onclick = () => overlay.remove();
}

loadCertsFromDB();

/* ══════════════════════════════════════════
   ADMIN — CERTIFICATES
══════════════════════════════════════════ */
let certsEditingId = null;
let _certsRowMap = {};

async function adminLoadCertificates() {
    const el = document.getElementById('ap-certs-content');
    _certsRowMap = {};
    el.innerHTML = '<div class="admin-loading"><i class="fas fa-spinner" style="animation:spin .8s linear infinite;margin-right:7px;"></i>Loading…</div>';
    try {
        const { data, error } = await _sb.from('certificates').select('*').order('sort_order', { ascending: true });
        if (error) throw error;
        const rows = data || [];
        rows.forEach(r => { _certsRowMap[r.id] = r; });
        el.innerHTML = `
          <div class="admin-add-bar">
            <span class="admin-add-bar-title">${rows.length} certificate${rows.length !== 1 ? 's' : ''}</span>
            <button class="btn-admin-add" onclick="adminCertsToggleForm()">
              <i class="fas fa-plus" style="font-size:.62rem;"></i> Add Certificate
            </button>
          </div>
          <div class="admin-inline-form" id="certs-form">
            <div class="admin-form-title"><i class="fas fa-certificate" style="color:var(--accent2);font-size:.9rem;"></i> <span id="certs-form-title">Add Certificate</span></div>
            <div class="admin-form-grid">
              <div class="admin-form-group">
                <label class="admin-form-label">Title *</label>
                <input class="admin-form-input" id="cf-title" placeholder="e.g. Data Engineering Internship">
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Issuer *</label>
                <input class="admin-form-input" id="cf-issuer" placeholder="e.g. Insight Workshop">
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Date</label>
                <input class="admin-form-input" id="cf-date" placeholder="e.g. March 2025">
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Sort Order</label>
                <input class="admin-form-input" id="cf-sort" type="number" placeholder="99" value="99">
              </div>
              <div class="admin-form-group full">
                <label class="admin-form-label">Certificate Image URL</label>
                <input class="admin-form-input" id="cf-image" placeholder="https://i.postimg.cc/...">
              </div>
              <div class="admin-form-group full">
                <label class="admin-form-label">Verify URL (optional)</label>
                <input class="admin-form-input" id="cf-verify" placeholder="https://...">
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Tags (comma-separated)</label>
                <input class="admin-form-input" id="cf-tags" placeholder="e.g. Databricks, PySpark">
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Icon class (if no image)</label>
                <input class="admin-form-input" id="cf-icon" placeholder="e.g. fas fa-graduation-cap">
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Accent Color</label>
                <input class="admin-form-input" id="cf-color" type="color" value="#6d27d9" style="height:38px;padding:4px 8px;cursor:pointer;">
              </div>
            </div>
            <div class="admin-form-actions">
              <button class="btn-admin-cancel" onclick="adminCertsCancelForm()">Cancel</button>
              <button class="btn-admin-save" id="certs-save-btn" onclick="adminSaveCert()">
                <i class="fas fa-check" style="font-size:.72rem;"></i> Save Certificate
              </button>
            </div>
          </div>
          ${!rows.length
                ? '<div class="admin-empty">No certificates yet — click "Add Certificate" to get started.</div>'
                : `<div class="admin-table-wrap"><table class="admin-table">
              <thead><tr><th>#</th><th>Title</th><th>Issuer</th><th>Date</th><th>Tags</th><th>Actions</th></tr></thead>
              <tbody>${rows.map(r => `<tr id="crow-${escHtml(r.id)}">
                <td style="font-family:\'JetBrains Mono\',monospace;font-size:.7rem;color:var(--muted);">${r.sort_order ?? '—'}</td>
                <td style="font-weight:600;font-size:.82rem;">${escHtml(r.title || '')}</td>
                <td style="font-size:.75rem;color:var(--muted);">${escHtml(r.issuer || '—')}</td>
                <td style="font-family:\'JetBrains Mono\',monospace;font-size:.68rem;color:var(--muted);">${escHtml(r.date || '—')}</td>
                <td style="font-size:.7rem;color:var(--muted);max-width:120px;">${(r.tags || []).join(', ') || '—'}</td>
                <td style="display:flex;gap:5px;flex-wrap:wrap;">
                  <button class="btn-edit-row" onclick="adminCertsEdit(\'${escHtml(r.id)}\')">Edit</button>
                  <button class="admin-action-btn btn-del-row" onclick="adminDeleteCert(\'${escHtml(r.id)}\',\'${escHtml(r.title || '')}\')" >Delete</button>
                </td>
              </tr>`).join('')}</tbody>
            </table></div>`}`;
    } catch (e) {
        el.innerHTML = `<div class="admin-empty" style="color:#f87171;">⚠ ${escHtml(e.message)}<br><small style="opacity:.6;margin-top:6px;display:block;">Make sure you have a <code>certificates</code> table in Supabase.</small></div>`;
    }
}

function adminCertsToggleForm() {
    certsEditingId = null;
    const form = document.getElementById('certs-form');
    const isOpen = form.classList.contains('open');
    form.classList.toggle('open', !isOpen);
    if (!isOpen) {
        document.getElementById('certs-form-title').textContent = 'Add Certificate';
        ['cf-title', 'cf-issuer', 'cf-date', 'cf-image', 'cf-verify', 'cf-tags', 'cf-icon'].forEach(id => {
            const el = document.getElementById(id); if (el) el.value = '';
        });
        document.getElementById('cf-sort').value = '99';
        document.getElementById('cf-color').value = '#6d27d9';
        document.getElementById('certs-save-btn').innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Certificate';
        document.getElementById('cf-title').focus();
    }
}

function adminCertsEdit(id) {
    // Open admin panel on certificates tab if not already open
    if (!document.getElementById('admin-panel').classList.contains('open')) {
        openAdminPanel();
        // Switch to certificates tab
        const tabBtns = document.querySelectorAll('.admin-tab');
        tabBtns.forEach(b => { if (b.textContent.trim().includes('Certificates')) b.click(); });
    }
    // Wait a tick for panel to render then populate form
    setTimeout(() => {
        const r = _certsRowMap[id];
        if (!r) { adminLoadCertificates().then(() => _fillCertsForm(id)); return; }
        _fillCertsForm(id);
    }, 100);
}

function _fillCertsForm(id) {
    const r = _certsRowMap[id]; if (!r) return;
    certsEditingId = id;
    const form = document.getElementById('certs-form');
    if (!form) return;
    form.classList.add('open');
    document.getElementById('certs-form-title').textContent = 'Edit Certificate';
    document.getElementById('cf-title').value = r.title || '';
    document.getElementById('cf-issuer').value = r.issuer || '';
    document.getElementById('cf-date').value = r.date || '';
    document.getElementById('cf-image').value = r.image_url || '';
    document.getElementById('cf-verify').value = r.verify_url || '';
    document.getElementById('cf-tags').value = (r.tags || []).join(', ');
    document.getElementById('cf-icon').value = r.icon || '';
    document.getElementById('cf-color').value = r.color || '#6d27d9';
    document.getElementById('cf-sort').value = r.sort_order ?? 99;
    document.getElementById('certs-save-btn').innerHTML = '<i class="fas fa-pen" style="font-size:.72rem;"></i> Update Certificate';
    form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('cf-title').focus();
}

function adminCertsCancelForm() {
    certsEditingId = null;
    document.getElementById('certs-form')?.classList.remove('open');
}

async function adminSaveCert() {
    const title = document.getElementById('cf-title')?.value?.trim();
    const issuer = document.getElementById('cf-issuer')?.value?.trim();
    if (!title) { showToast('Title is required.', 'error'); return; }
    if (!issuer) { showToast('Issuer is required.', 'error'); return; }
    const payload = {
        title,
        issuer,
        date: document.getElementById('cf-date')?.value?.trim() || null,
        image_url: document.getElementById('cf-image')?.value?.trim() || null,
        verify_url: document.getElementById('cf-verify')?.value?.trim() || null,
        tags: document.getElementById('cf-tags')?.value?.split(',').map(t => t.trim()).filter(Boolean) || [],
        icon: document.getElementById('cf-icon')?.value?.trim() || 'fas fa-certificate',
        color: document.getElementById('cf-color')?.value || '#6d27d9',
        sort_order: parseInt(document.getElementById('cf-sort')?.value) || 99,
    };
    const btn = document.getElementById('certs-save-btn');
    btn.disabled = true;
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Saving…';
    let error;
    if (certsEditingId) {
        ({ error } = await _sb.from('certificates').update(payload).eq('id', certsEditingId));
    } else {
        ({ error } = await _sb.from('certificates').insert(payload));
    }
    btn.disabled = false;
    if (error) { showToast(error.message, 'error'); btn.innerHTML = '<i class="fas fa-check" style="font-size:.72rem;"></i> Save Certificate'; return; }
    showToast(certsEditingId ? '✓ Certificate updated!' : '✓ Certificate added!', 'success');
    adminCertsCancelForm();
    adminLoadCertificates();
    loadCertsFromDB();
}

async function adminDeleteCert(id, title) {
    if (!confirm(`Delete certificate "${title}"?`)) return;
    const { error } = await _sb.from('certificates').delete().eq('id', id);
    if (error) { showToast(error.message, 'error'); return; }
    showToast('Certificate deleted.', 'info');
    adminLoadCertificates();
    loadCertsFromDB();
}




// <!-- ═══ REAL-TIME ADMIN NOTIFICATIONS ═══ -->



// Now playing 
/* ── open modal ── */
function openMusicModal() {
    const modal = document.getElementById('music-modal');
    const loader = document.getElementById('mm-loader');
    const content = document.getElementById('mm-content');
    const img = document.getElementById('sp-now-img');

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    /* reset UI */
    loader.style.display = 'flex';
    content.style.display = 'none';

    /* animated dots while loading */
    let d = 0;
    const dotsEl = document.getElementById('mm-dots');
    const dotsTmr = setInterval(() => {
        d = (d + 1) % 4;
        if (dotsEl) dotsEl.textContent = '.'.repeat(d || 1);
    }, 400);
    modal._dotsTmr = dotsTmr;

    /* fresh URL — cache busted so it always fetches latest */
    const BASE = 'https://spotify-github-profile.kittinanx.com/api/view';
    const UID = '31b23zmv73oakaogde5va5dcbdg4';
    img.src = `${BASE}?uid=${UID}&cover_image=true&theme=default&show_offline=true&background_color=000000&interchange=true&profanity=false&bar_color=000000&bar_color_cover=true&_t=${Date.now()}`;
}

/* ── close modal ── */
function closeMusicModal() {
    const modal = document.getElementById('music-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    clearInterval(modal._dotsTmr);
}

/* ── image loaded ── */
function onSpotifyLoad() {
    const modal = document.getElementById('music-modal');
    const loader = document.getElementById('mm-loader');
    const content = document.getElementById('mm-content');
    if (!modal || !modal.classList.contains('open')) return;
    clearInterval(modal._dotsTmr);
    loader.style.display = 'none';
    content.style.display = 'block';
}

/* ── image error ── */
function onSpotifyError() {
    const modal = document.getElementById('music-modal');
    const loader = document.getElementById('mm-loader');
    if (!modal || !modal.classList.contains('open')) return; // ignore spurious early fires
    clearInterval(modal._dotsTmr);
    loader.innerHTML = `
    <div class="mm-error">
        <i class="fas fa-circle-exclamation" style="font-size:1.4rem;margin-bottom:8px;display:block;"></i>
        Could not load Spotify data.<br>
        <span style="font-size:.68rem;opacity:.7;">Check UID or try refreshing.</span>
        <br><br>
        <button onclick="openMusicModal()" style="
            padding:7px 18px;border-radius:8px;
            background:rgba(30,215,96,.1);border:1px solid rgba(30,215,96,.25);
            color:#1db954;font-family:'Cabinet Grotesk',sans-serif;
            font-size:.8rem;font-weight:700;cursor:pointer;">
            Retry
        </button>
    </div>`;
}

/* ── ESC to close ── */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMusicModal();
});



// share link blog 

function checkHashForBlogPost() {
    const hash = window.location.hash;
    if (!hash.startsWith('#blog-post-')) return;
    const id = hash.replace('#blog-post-', '');
    if (!id) return;

    // If blogs are already loaded, open immediately
    const b = blogsData.find(x => x.id === id);
    if (b) {
        openBlogReader(id);
        return;
    }

    // Otherwise wait for blogs to load (up to ~3 seconds)
    let attempts = 0;
    const interval = setInterval(() => {
        attempts++;
        const found = blogsData.find(x => x.id === id);
        if (found) {
            clearInterval(interval);
            openBlogReader(id);
        } else if (attempts > 30) {
            clearInterval(interval);
        }
    }, 100);
}

// copy blog link helper
function copyBlogLink(id) {
    const url = 'https://rikeshdahal.com.np/blog.html?id=' + id;
    navigator.clipboard.writeText(url).then(() => {
        showToast('✓ Shareable link copied!', 'success');
    }).catch(() => {
        showToast('Link: ' + url, 'info');
    });
}
/* ══════════════════════════════════════════════════════════
   HIRE ME FLOATING CTA — appears 30s after page load
══════════════════════════════════════════════════════════ */
function isAnyModalOpen() {
    // Modals that show/hide via the `.open` CSS class
    const classModals = [
        'manifest-modal',
        'guestbook-modal',
        'gear-modal',
        'auth-modal',
        'admin-panel',
        'music-modal',
    ];
    for (const id of classModals) {
        const el = document.getElementById(id);
        if (el && el.classList.contains('open')) return true;
    }
    // Modals that show/hide via style.display
    const displayModals = [
        'tmodal',
        'blog-reader-modal',
        'write-post-modal',
        'wpe-post-preview',
        'search-modal',
    ];
    for (const id of displayModals) {
        const el = document.getElementById(id);
        if (el && el.style.display && el.style.display !== 'none') return true;
    }
    return false;
}
(function () {
    const DISMISS_KEY = 'rd_hireme_dismissed';
    const COPY_VARIANTS = [
        { headline: "Still here? That's a sign.", sub: "Let's build something wild together." },
        { headline: "You've been here 30s…", sub: "Longer than most interviews! Let's talk." },
        { headline: "Psst. Still scrolling?", sub: "I build things. You need things built. 🤝" },
        { headline: "Hire me before someone else does.", sub: "I'm kidding. (I'm not kidding.)" },
        { headline: "Your project called.", sub: "It said it needs a Data Engineer ASAP." },
    ];

    function inject() {
        // ── NEW: don't interrupt the user while any modal is open ──
        if (isAnyModalOpen()) return;

        if (document.getElementById('hire-me-cta')) return;
        const copy = COPY_VARIANTS[Math.floor(Math.random() * COPY_VARIANTS.length)];
        const el = document.createElement('div');
        el.id = 'hire-me-cta';
        el.innerHTML = `
            <div class="hmc-inner">
                <button class="hmc-close" id="hmc-close" aria-label="Dismiss">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M1 1l12 12M13 1L1 13"/></svg>
                </button>
                <div class="hmc-avatar-wrap">
                    <img src="https://i.postimg.cc/MZhwPc85/rikesh.png" alt="Rikesh" class="hmc-avatar">
                    <span class="hmc-status-dot"></span>
                </div>
                <div class="hmc-text">
                    <p class="hmc-headline">${copy.headline}</p>
                    <p class="hmc-sub">${copy.sub}</p>
                </div>
                <a href="#contact" class="hmc-btn" id="hmc-btn">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.67 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l1.07-1.01a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Let's Talk
                </a>
            </div>
            <div class="hmc-progress-bar"><div class="hmc-progress-fill" id="hmc-progress"></div></div>
        `;
        document.body.appendChild(el);
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('hmc-visible')));
        let elapsed = 0;
        const DURATION = 12000;
        const progressEl = document.getElementById('hmc-progress');
        const iv = setInterval(() => {
            elapsed += 50;
            if (progressEl) progressEl.style.width = ((elapsed / DURATION) * 100) + '%';
            if (elapsed >= DURATION) { clearInterval(iv); dismiss(false); }
        }, 50);
        function dismiss(permanent) {
            el.classList.remove('hmc-visible');
            el.classList.add('hmc-hiding');
            setTimeout(() => el.remove(), 500);
            if (permanent) { try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch (e) { } }
        }
        document.getElementById('hmc-close').addEventListener('click', () => { clearInterval(iv); dismiss(true); });
        document.getElementById('hmc-btn').addEventListener('click', () => { clearInterval(iv); dismiss(true); });
    }

    try { if (sessionStorage.getItem(DISMISS_KEY)) return; } catch (e) { }
    setTimeout(inject, 30000);
})();
/* ══════════════════════════════════════════
   BLOG COMMENT SYSTEM
══════════════════════════════════════════ */
const BC = {
    table: 'blog_comments',
    likes_table: 'blog_comment_likes',
};
let bcCurrentPostId = null;
let bcAllComments = [];
let bcUserLikes = new Set();
let bcReplyingTo = null;
let bcRealtime = null;

function bcTimeAgo(iso) {
    const d = (Date.now() - new Date(iso)) / 1000;
    if (d < 60) return 'just now';
    if (d < 3600) return Math.floor(d / 60) + 'm ago';
    if (d < 86400) return Math.floor(d / 3600) + 'h ago';
    if (d < 86400 * 30) return Math.floor(d / 86400) + 'd ago';
    return Math.floor(d / 86400 / 30) + 'mo ago';
}

function bcInitials(name) {
    return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

async function bcLoadUserLikes() {
    bcUserLikes = new Set();
    if (!_sb || !siteUser) return;
    try {
        const { data } = await _sb.from(BC.likes_table).select('comment_id').eq('user_id', siteUser.id);
        if (data) data.forEach(r => bcUserLikes.add(r.comment_id));
    } catch (e) { }
}

async function bcLoad(postId) {
    bcCurrentPostId = postId;
    bcAllComments = [];
    if (!_sb) return;
    await bcLoadUserLikes();
    const { data } = await _sb.from(BC.table).select('*').eq('post_id', postId).order('created_at', { ascending: true });
    if (data) bcAllComments = data;
    bcRender();
    if (bcRealtime) { try { _sb.removeChannel(bcRealtime); } catch (e) { } bcRealtime = null; }
    bcRealtime = _sb.channel('bc-' + postId)
        .on('postgres_changes', { event: '*', schema: 'public', table: BC.table, filter: `post_id=eq.${postId}` }, () => {
            bcLoad(postId);
        }).subscribe();
}

function bcBuildEntry(c, all, depth) {
    depth = depth || 0;
    const isLiked = bcUserLikes.has(c.id);
    const isMine = siteUser && siteUser.id === c.user_id;
    const replies = all.filter(r => r.parent_id === c.id);
    const av = c.avatar_url
        ? `<img src="${escHtml(c.avatar_url)}" alt="${escHtml(c.name)}" onerror="this.remove()" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
        : `<span style="font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:700;color:#fff;">${bcInitials(c.name)}</span>`;

    const el = document.createElement('div');
    el.id = 'bc-' + c.id;
    el.style.cssText = `display:flex;gap:10px;padding:14px 0;border-bottom:1px solid var(--border);animation:fadeUp .3s ease both;${depth > 0 ? 'margin-left:' + Math.min(depth * 36, 72) + 'px;' : ''}`;

    el.innerHTML = `
<div style="width:34px;height:34px;border-radius:50%;flex-shrink:0;background:var(--accent);display:flex;align-items:center;justify-content:center;border:1.5px solid rgba(109,39,217,.3);overflow:hidden;">${av}</div>
<div style="flex:1;min-width:0;">
  <div style="display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:4px;">
    <span style="font-weight:700;font-size:.84rem;color:var(--text);">${escHtml(c.name)}</span>
    ${depth > 0 ? `<span style="font-size:.6rem;font-weight:700;background:rgba(109,39,217,.1);border:1px solid rgba(109,39,217,.2);color:var(--accent2);padding:1px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;">replied</span>` : ''}
    <span style="font-family:'JetBrains Mono',monospace;font-size:.62rem;color:var(--muted);margin-left:auto;">${bcTimeAgo(c.created_at)}</span>
  </div>
  <p style="font-size:.84rem;color:var(--text);line-height:1.65;margin-bottom:8px;word-break:break-word;">${escHtml(c.message)}</p>
  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
    <button onclick="bcToggleLike('${c.id}',this)" style="display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:100px;border:1px solid ${isLiked ? 'rgba(239,68,68,.5)' : 'var(--border)'};background:${isLiked ? 'rgba(239,68,68,.1)' : 'transparent'};color:${isLiked ? '#ef4444' : 'var(--muted)'};font-size:.72rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Cabinet Grotesk',sans-serif;" data-liked="${isLiked}">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <span class="bc-like-n">${c.like_count > 0 ? c.like_count : ''}</span>
    </button>
    <button onclick="bcStartReply('${c.id}','${escHtml(c.name).replace(/'/g, "\\'")}' )" style="display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:100px;border:1px solid transparent;background:transparent;color:var(--muted);font-size:.72rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Cabinet Grotesk',sans-serif;" onmouseover="this.style.borderColor='rgba(109,39,217,.3)';this.style.color='var(--accent2)'" onmouseout="this.style.borderColor='transparent';this.style.color='var(--muted)'">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg> Reply
    </button>
    ${isMine ? `<button onclick="bcDelete('${c.id}')" style="font-size:.65rem;color:var(--muted);background:none;border:none;cursor:pointer;font-family:'JetBrains Mono',monospace;padding:2px 5px;border-radius:3px;transition:color .2s;" onmouseover="this.style.color='#f87171'" onmouseout="this.style.color='var(--muted)'">delete</button>` : ''}
    ${siteIsAdmin && !isMine ? `<button onclick="bcAdminDelete('${c.id}')" style="font-size:.65rem;color:#f87171;background:none;border:none;cursor:pointer;font-family:'JetBrains Mono',monospace;padding:2px 5px;">del</button>` : ''}
  </div>
  ${replies.length > 0 ? `<div id="bc-replies-${c.id}"></div>` : ''}
</div>`;

    if (replies.length > 0) {
        const repliesEl = el.querySelector('#bc-replies-' + c.id);
        if (repliesEl) replies.forEach(r => repliesEl.appendChild(bcBuildEntry(r, all, depth + 1)));
    }
    return el;
}

function bcRender() {
    const list = document.getElementById('bc-list');
    if (!list) return;
    const topLevel = bcAllComments.filter(c => !c.parent_id);
    const countEl = document.getElementById('bc-count');
    if (countEl) countEl.textContent = bcAllComments.length + (bcAllComments.length === 1 ? ' comment' : ' comments');
    list.innerHTML = '';
    if (!topLevel.length) {
        list.innerHTML = `<div style="padding:24px 0;text-align:center;color:var(--muted);font-size:.82rem;font-family:'JetBrains Mono',monospace;">No comments yet. Be the first!</div>`;
        return;
    }
    topLevel.forEach(c => list.appendChild(bcBuildEntry(c, bcAllComments, 0)));
}

function bcStartReply(id, name) {
    if (!siteUser) { openAuthModal(); return; }
    bcReplyingTo = { id, name };
    const banner = document.getElementById('bc-reply-banner');
    const bannerText = document.getElementById('bc-reply-text');
    if (banner && bannerText) { bannerText.textContent = `\u21a9 Replying to ${name}`; banner.style.display = 'flex'; }
    const inp = document.getElementById('bc-input');
    if (inp) { inp.placeholder = `Reply to ${name}\u2026`; inp.focus(); }
    document.getElementById('bc-compose')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function bcCancelReply() {
    bcReplyingTo = null;
    const banner = document.getElementById('bc-reply-banner');
    if (banner) banner.style.display = 'none';
    const inp = document.getElementById('bc-input');
    if (inp) inp.placeholder = 'Write a comment\u2026';
}

async function bcSubmit() {
    if (!siteUser) { openAuthModal(); return; }
    const inp = document.getElementById('bc-input');
    const msg = (inp?.value || '').trim();
    if (!msg) return;
    const btn = document.getElementById('bc-submit-btn');
    if (btn) btn.disabled = true;
    const meta = siteUser.user_metadata || {};
    const name = meta.full_name || meta.name || meta.user_name || siteUser.email?.split('@')[0] || 'Anonymous';
    const avatar = meta.avatar_url || meta.picture || null;
    const { error } = await _sb.from(BC.table).insert({
        post_id: bcCurrentPostId,
        user_id: siteUser.id,
        parent_id: bcReplyingTo ? bcReplyingTo.id : null,
        name, avatar_url: avatar, message: msg, like_count: 0,
    });
    if (btn) btn.disabled = false;
    if (error) { showToast(error.message, 'error'); return; }
    if (inp) inp.value = '';
    bcCancelReply();
    await bcLoad(bcCurrentPostId);
}

async function bcToggleLike(id, btn) {
    if (!siteUser) { openAuthModal(); return; }
    const isLiked = bcUserLikes.has(id);
    const nEl = btn.querySelector('.bc-like-n');
    const current = bcAllComments.find(c => c.id === id);
    if (isLiked) {
        bcUserLikes.delete(id);
        btn.style.borderColor = 'var(--border)'; btn.style.background = 'transparent'; btn.style.color = 'var(--muted)';
        btn.querySelector('svg').setAttribute('fill', 'none');
        if (nEl) { const n = Math.max(0, parseInt(nEl.textContent || '0') - 1); nEl.textContent = n > 0 ? n : ''; }
        if (_sb && current) {
            await _sb.from(BC.likes_table).delete().eq('user_id', siteUser.id).eq('comment_id', id);
            await _sb.from(BC.table).update({ like_count: Math.max(0, (current.like_count || 0) - 1) }).eq('id', id);
        }
    } else {
        bcUserLikes.add(id);
        btn.style.borderColor = 'rgba(239,68,68,.5)'; btn.style.background = 'rgba(239,68,68,.1)'; btn.style.color = '#ef4444';
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
        btn.classList.remove('bc-pop'); void btn.offsetWidth; btn.classList.add('bc-pop');
        if (nEl) { const n = parseInt(nEl.textContent || '0') + 1; nEl.textContent = n; }
        if (_sb && current) {
            await _sb.from(BC.likes_table).insert({ user_id: siteUser.id, comment_id: id });
            await _sb.from(BC.table).update({ like_count: (current.like_count || 0) + 1 }).eq('id', id);
        }
    }
}

async function bcDelete(id) {
    if (!siteUser || !_sb) return;
    if (!confirm('Delete your comment?')) return;
    await _sb.from(BC.table).delete().eq('id', id).eq('user_id', siteUser.id);
    await bcLoad(bcCurrentPostId);
}

async function bcAdminDelete(id) {
    if (!siteIsAdmin || !_sb) return;
    if (!confirm('Delete this comment?')) return;
    await _sb.from(BC.table).delete().eq('id', id);
    await bcLoad(bcCurrentPostId);
}

function bcRenderSection(postId) {
    const wrap = document.createElement('div');
    wrap.id = 'bc-comments-wrap';
    wrap.style.cssText = 'margin-top:28px;padding-top:24px;border-top:1px solid var(--border);';

    const authHtml = siteUser ? (() => {
        const meta = siteUser.user_metadata || {};
        const name = meta.full_name || meta.name || siteUser.email?.split('@')[0] || 'You';
        const av = meta.avatar_url || meta.picture;
        return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
<div style="width:28px;height:28px;border-radius:50%;flex-shrink:0;background:var(--accent);display:flex;align-items:center;justify-content:center;overflow:hidden;border:1.5px solid rgba(109,39,217,.3);">
  ${av ? `<img src="${escHtml(av)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.remove()">` : `<span style="font-size:.6rem;font-weight:700;color:#fff;font-family:'JetBrains Mono',monospace;">${bcInitials(name)}</span>`}
</div>
<span style="font-size:.78rem;color:var(--muted);">Commenting as <strong style="color:var(--text);">${escHtml(name)}</strong></span>
</div>`;
    })() : `<div style="padding:14px;background:rgba(109,39,217,.06);border:1px solid rgba(109,39,217,.14);border-radius:10px;margin-bottom:10px;text-align:center;">
  <p style="font-size:.82rem;color:var(--muted);margin-bottom:8px;">Sign in to comment</p>
  <button onclick="openAuthModal()" style="padding:7px 18px;border-radius:8px;background:var(--accent);border:none;color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:.8rem;cursor:pointer;">Sign In</button>
</div>`;

    wrap.innerHTML = `
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
  <div style="font-family:'Special Elite',cursive;font-size:1.05rem;color:var(--text);display:flex;align-items:center;gap:8px;">
    <i class="fas fa-comments" style="color:var(--accent2);font-size:.9rem;"></i>
    Comments <span id="bc-count" style="font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--muted);font-weight:400;margin-left:4px;"></span>
  </div>
</div>
<div id="bc-compose" style="background:rgba(31,41,55,.35);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:20px;">
  ${authHtml}
  <div id="bc-reply-banner" style="display:none;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;margin-bottom:8px;background:rgba(109,39,217,.08);border:1px solid rgba(109,39,217,.22);border-radius:8px;font-size:.76rem;color:var(--accent2);font-weight:600;">
    <span id="bc-reply-text"></span>
    <button onclick="bcCancelReply()" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:.65rem;font-family:'JetBrains Mono',monospace;transition:color .15s;" onmouseover="this.style.color='#f87171'" onmouseout="this.style.color='var(--muted)'">&#x2715; Cancel</button>
  </div>
  <div style="display:flex;gap:8px;">
    <textarea id="bc-input" placeholder="Write a comment\u2026" maxlength="1000" rows="2" style="flex:1;background:var(--input-bg);border:1.5px solid var(--border);border-radius:9px;color:var(--text);font-family:'Cabinet Grotesk',sans-serif;font-size:.84rem;padding:9px 12px;outline:none;resize:none;transition:border-color .22s,box-shadow .22s;line-height:1.5;" onfocus="this.style.borderColor='var(--accent)';this.style.boxShadow='0 0 0 3px rgba(109,39,217,.12)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();bcSubmit();}"></textarea>
    <button id="bc-submit-btn" onclick="bcSubmit()" style="padding:0 16px;border-radius:9px;background:var(--accent);border:none;color:#fff;font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:.82rem;cursor:pointer;transition:all .22s;flex-shrink:0;align-self:flex-end;height:40px;" onmouseover="this.style.background='var(--accent2)'" onmouseout="this.style.background='var(--accent)'">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    </button>
  </div>
</div>
<div id="bc-list"></div>`;

    return wrap;
}
