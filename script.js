/*!
 * Portfolio — script.js
 * Author  : Bushra Zafar             
 * Version : 2.0.0
 */
"use strict";

/* ════════════════════════════════════════════════
   EMAILJS CONFIG — replace with your real keys
   https://www.emailjs.com (free tier)
════════════════════════════════════════════════ */
const CONFIG = {
    emailjs: {
        publicKey:  "YOUR_PUBLIC_KEY",
        serviceID:  "YOUR_SERVICE_ID",
        templateID: "YOUR_TEMPLATE_ID",
    },
    typewriter: {
        roles:        ["Web Experiences", "React Apps", "REST APIs", "UI Designs", "Open Source"],
        typeSpeed:    115,
        deleteSpeed:  55,
        pauseAfter:   1800,
        pauseBefore:  400,
    },
    particles: {
        count:       75,
        maxDist:     130,
        color:       "108, 99, 255",
        lineOpacity: 0.14,
        speedMax:    0.55,
        speedMin:    0.18,
        radiusMin:   1,
        radiusMax:   2.5,
    },
    counter: {
        duration: 2000,
    },
};

/* ════════════════════════════════════════════════
   DOM READY — INIT ALL MODULES
════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    initEmailJS();
    initAOS();
    initNavbar();
    initHamburger();
    initTypewriter();
    initParticles();
    initScrollReveal();
    initSkillBars();
    initCounters();
    initProjectFilter();
    initSkillTabs();
    initContactForm();
    initBackToTop();
    initFooterYear();
    initSmoothScroll();
});

/* ════════════════════════════════════════════════
   1. EMAILJS INIT
════════════════════════════════════════════════ */
function initEmailJS() {
    if (typeof emailjs !== "undefined") {
        emailjs.init(CONFIG.emailjs.publicKey);
    }
}

/* ════════════════════════════════════════════════
   2. AOS INIT
════════════════════════════════════════════════ */
function initAOS() {
    if (typeof AOS === "undefined") return;
    AOS.init({
        duration: 720,
        easing:   "ease-out-cubic",
        once:     true,
        offset:   75,
        disable:  () => window.innerWidth < 480,
    });
}

/* ════════════════════════════════════════════════
   3. NAVBAR — scroll + active link tracking
════════════════════════════════════════════════ */
function initNavbar() {
    const navbar   = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    if (!navbar) return;

    function onScroll() {
        /* Scrolled class */
        navbar.classList.toggle("scrolled", window.scrollY > 80);

        /* Active link */
        const mid = window.scrollY + window.innerHeight / 2;
        sections.forEach((sec) => {
            const top    = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            const link   = navbar.querySelector(`.nav-link[href="#${sec.id}"]`);
            if (!link) return;
            if (mid >= top && mid < bottom) {
                navLinks.forEach((l) => { l.classList.remove("active"); l.removeAttribute("aria-current"); });
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            }
        });
    }

    window.addEventListener("scroll", throttle(onScroll, 100), { passive: true });
    onScroll();
}

/* ════════════════════════════════════════════════
   4. HAMBURGER MENU
════════════════════════════════════════════════ */
function initHamburger() {
    const btn      = document.getElementById("hamburger");
    const drawer   = document.getElementById("nav-links");
    const overlay  = document.getElementById("nav-overlay");
    const navLinks = document.querySelectorAll(".nav-link");
    if (!btn || !drawer) return;

    let open = false;

    function openMenu() {
        open = true;
        btn.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        drawer.classList.add("open");
        document.body.style.overflow = "hidden";
        if (overlay) { overlay.removeAttribute("hidden"); overlay.setAttribute("aria-hidden", "false"); }
    }

    function closeMenu() {
        open = false;
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        drawer.classList.remove("open");
        document.body.style.overflow = "";
        if (overlay) { overlay.setAttribute("hidden", ""); overlay.setAttribute("aria-hidden", "true"); }
    }

    btn.addEventListener("click", () => (open ? closeMenu() : openMenu()));
    if (overlay) overlay.addEventListener("click", closeMenu);
    navLinks.forEach((l) => l.addEventListener("click", () => { if (open) closeMenu(); }));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && open) { closeMenu(); btn.focus(); } });
    window.addEventListener("resize", debounce(() => { if (window.innerWidth > 768 && open) closeMenu(); }, 200));
}

/* ════════════════════════════════════════════════
   5. TYPEWRITER EFFECT
════════════════════════════════════════════════ */
function initTypewriter() {
    const el = document.getElementById("typewriter-text");
    if (!el) return;

    const { roles, typeSpeed, deleteSpeed, pauseAfter, pauseBefore } = CONFIG.typewriter;
    let roleIdx   = 0;
    let charIdx   = 0;
    let deleting  = false;
    let paused    = false;
    let timer     = null;

    function tick() {
        if (paused || !document.contains(el)) return;

        const role = roles[roleIdx];

        if (deleting) {
            charIdx--;
            el.textContent = role.substring(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                roleIdx  = (roleIdx + 1) % roles.length;
                paused   = true;
                timer    = setTimeout(() => { paused = false; tick(); }, pauseBefore);
                return;
            }
            timer = setTimeout(tick, deleteSpeed);
        } else {
            charIdx++;
            el.textContent = role.substring(0, charIdx);
            if (charIdx === role.length) {
                paused = true;
                timer  = setTimeout(() => { paused = false; deleting = true; tick(); }, pauseAfter);
                return;
            }
            timer = setTimeout(tick, typeSpeed);
        }
    }

    timer = setTimeout(tick, 900);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) { clearTimeout(timer); }
        else { tick(); }
    });
}

/* ════════════════════════════════════════════════
   6. PARTICLE CANVAS
════════════════════════════════════════════════ */
function initParticles() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const C   = CONFIG.particles;
    let pts   = [];
    let raf   = null;
    let mx    = null;
    let my    = null;

    /* Resize */
    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    /* Create particle */
    function mkPt() {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(C.speedMin, C.speedMax);
        return {
            x:  rand(0, canvas.width),
            y:  rand(0, canvas.height),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r:  rand(C.radiusMin, C.radiusMax),
            a:  rand(0.2, 0.7),
        };
    }

    /* Init pool */
    function init() {
        pts = Array.from({ length: C.count }, mkPt);
    }

    /* Draw */
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* Connections */
        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const dx   = pts[i].x - pts[j].x;
                const dy   = pts[i].y - pts[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < C.maxDist) {
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = `rgba(${C.color},${(1 - dist / C.maxDist) * C.lineOpacity})`;
                    ctx.lineWidth   = 1;
                    ctx.stroke();
                }
            }
        }

        /* Dots + mouse repulsion */
        pts.forEach((p) => {
            if (mx !== null && my !== null) {
                const dx   = p.x - mx;
                const dy   = p.y - my;
                const dist = Math.hypot(dx, dy);
                if (dist < 100) {
                    const f = (100 - dist) / 100 * 0.45;
                    p.vx += (dx / dist) * f;
                    p.vy += (dy / dist) * f;
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${C.color},${p.a})`;
            ctx.fill();
        });
    }

    /* Update positions */
    function update() {
        pts.forEach((p) => {
            p.vx *= 0.992;
            p.vy *= 0.992;

            const speed = Math.hypot(p.vx, p.vy);
            if (speed < C.speedMin) {
                const a = Math.random() * Math.PI * 2;
                p.vx += Math.cos(a) * 0.08;
                p.vy += Math.sin(a) * 0.08;
            }
            if (speed > C.speedMax) {
                const s = C.speedMax / speed;
                p.vx *= s;
                p.vy *= s;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -10)               p.x = canvas.width  + 10;
            if (p.x > canvas.width  + 10) p.x = -10;
            if (p.y < -10)               p.y = canvas.height + 10;
            if (p.y > canvas.height + 10) p.y = -10;
        });
    }

    /* Loop */
    function loop() {
        draw();
        update();
        raf = requestAnimationFrame(loop);
    }

    /* Mouse */
    const hero = document.getElementById("home");
    if (hero) {
        hero.addEventListener("mousemove", (e) => {
            const r = canvas.getBoundingClientRect();
            mx = e.clientX - r.left;
            my = e.clientY - r.top;
        });
        hero.addEventListener("mouseleave", () => { mx = null; my = null; });
    }

    /* Visibility */
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) { cancelAnimationFrame(raf); }
        else { loop(); }
    });

    /* Resize */
    window.addEventListener("resize", debounce(() => { resize(); init(); }, 300));

    resize();
    init();
    loop();
}

/* ════════════════════════════════════════════════
   7. SCROLL REVEAL (IntersectionObserver)
════════════════════════════════════════════════ */
function initScrollReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (en.isIntersecting) {
                en.target.classList.add("revealed");
                obs.unobserve(en.target);
            }
        });
    }, { rootMargin: "0px 0px -60px 0px", threshold: 0.1 });

    els.forEach((el) => obs.observe(el));
}

/* ════════════════════════════════════════════════
   8. SKILL PROGRESS BARS
════════════════════════════════════════════════ */
function initSkillBars() {
    const cards = document.querySelectorAll(".skill-card");
    if (!cards.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const bar = en.target.querySelector(".skill-bar-fill");
            if (bar) {
                setTimeout(() => {
                    bar.style.width = `${bar.dataset.width || 0}%`;
                }, 250);
            }
            obs.unobserve(en.target);
        });
    }, { rootMargin: "0px 0px -80px 0px", threshold: 0.2 });

    cards.forEach((c) => obs.observe(c));
}

/* ════════════════════════════════════════════════
   9. ANIMATED COUNTERS
════════════════════════════════════════════════ */
function initCounters() {
    const nums = document.querySelectorAll(".stat-number");
    if (!nums.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
            if (!en.isIntersecting) return;
            countUp(en.target, parseInt(en.target.dataset.target, 10) || 0);
            obs.unobserve(en.target);
        });
    }, { threshold: 0.5 });

    nums.forEach((el) => obs.observe(el));
}

function countUp(el, target) {
    const dur   = CONFIG.counter.duration;
    const start = performance.now();

    (function frame(now) {
        const p = Math.min((now - start) / dur, 1);
        const v = Math.floor(easeOutCubic(p) * target);
        el.textContent = v.toLocaleString();
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = target.toLocaleString();
    })(start);
}

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

/* ════════════════════════════════════════════════
   10. PROJECT FILTER
════════════════════════════════════════════════ */
function initProjectFilter() {
    const btns  = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");
    const grid  = document.getElementById("projects-grid");
    if (!btns.length || !cards.length) return;

    let active = "all";

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const f = btn.dataset.filter;
            if (f === active) return;
            active = f;

            btns.forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");

            let visible = 0;
            cards.forEach((card) => {
                const match = active === "all" || card.dataset.category === active;
                if (match) {
                    card.classList.remove("hidden");
                    void card.offsetWidth;
                    card.classList.add("animating-in");
                    card.addEventListener("animationend", () => card.classList.remove("animating-in"), { once: true });
                    visible++;
                } else {
                    card.classList.remove("animating-in");
                    card.classList.add("hidden");
                }
            });

            /* No results message */
            const existing = grid.querySelector(".no-results-msg");
            if (visible === 0 && !existing) {
                const msg = document.createElement("p");
                msg.className   = "no-results-msg";
                msg.textContent = `No "${active}" projects yet — check back soon!`;
                grid.appendChild(msg);
            } else if (visible > 0 && existing) {
                existing.remove();
            }
        });
    });
}

/* ════════════════════════════════════════════════
   11. SKILLS TAB FILTER
════════════════════════════════════════════════ */
function initSkillTabs() {
    const tabs  = document.querySelectorAll(".skills-tab");
    const cards = document.querySelectorAll(".skill-card");
    if (!tabs.length || !cards.length) return;

    let active = "all";

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const t = tab.dataset.tab;
            if (t === active) return;
            active = t;

            tabs.forEach((tb) => { tb.classList.remove("active"); tb.setAttribute("aria-selected", "false"); });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            cards.forEach((card) => {
                const match = active === "all" || card.dataset.category === active;
                card.classList.toggle("hidden", !match);

                if (match) {
                    const bar = card.querySelector(".skill-bar-fill");
                    if (bar) {
                        bar.style.width = "0%";
                        setTimeout(() => { bar.style.width = `${bar.dataset.width || 0}%`; }, 120);
                    }
                }
            });
        });
    });
}

/* ════════════════════════════════════════════════
   12. CONTACT FORM + EMAILJS
════════════════════════════════════════════════ */
function initContactForm() {
    const form   = document.getElementById("contact-form");
    const btn    = document.getElementById("submit-btn");
    if (!form || !btn) return;

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const fields = {
        name:    { el: document.getElementById("field-name"),    errEl: document.getElementById("error-name") },
        email:   { el: document.getElementById("field-email"),   errEl: document.getElementById("error-email") },
        subject: { el: document.getElementById("field-subject"), errEl: document.getElementById("error-subject") },
        message: { el: document.getElementById("field-message"), errEl: document.getElementById("error-message") },
    };

    /* Validation rules */
    const rules = {
        name:    (v) => !v ? "Full name is required." : v.length < 2 ? "At least 2 characters." : v.length > 60 ? "Max 60 characters." : "",
        email:   (v) => !v ? "Email address is required." : !EMAIL_RE.test(v) ? "Enter a valid email address." : "",
        subject: (v) => !v ? "Subject is required." : v.length < 3 ? "At least 3 characters." : "",
        message: (v) => !v ? "Message is required." : v.length < 10 ? "At least 10 characters." : v.length > 2000 ? "Max 2000 characters." : "",
    };

    /* Validate single field */
    function validateField(key) {
        const { el, errEl } = fields[key];
        if (!el) return true;
        const val = el.value.trim();
        const msg = rules[key](val);

        el.classList.toggle("is-invalid", !!msg);
        el.classList.toggle("is-valid",   !msg && val.length > 0);

        if (errEl) {
            errEl.textContent = msg;
            errEl.classList.toggle("show", !!msg);
        }
        return !msg;
    }

    /* Live validate */
    Object.keys(fields).forEach((k) => {
        const { el } = fields[k];
        if (!el) return;
        el.addEventListener("input", () => validateField(k));
        el.addEventListener("blur",  () => validateField(k));
    });

    /* Loading state */
    function setLoading(on) {
        btn.disabled = on;
        btn.classList.toggle("is-loading", on);
    }

    /* Reset form */
    function resetForm() {
        form.reset();
        Object.values(fields).forEach(({ el, errEl }) => {
            el?.classList.remove("is-valid", "is-invalid");
            if (errEl) { errEl.textContent = ""; errEl.classList.remove("show"); }
        });
    }

    /* Submit */
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const allValid = Object.keys(fields).map(validateField).every(Boolean);
        if (!allValid) {
            /* Shake form */
            form.style.animation = "none";
            void form.offsetWidth;
            form.style.animation = "";
            return;
        }

        if (typeof emailjs === "undefined") {
            showToast("error", "Email service unavailable. Please email me directly.");
            return;
        }

        setLoading(true);

        const params = {
            user_name:  fields.name.el.value.trim(),
            user_email: fields.email.el.value.trim(),
            subject:    fields.subject.el.value.trim(),
            message:    fields.message.el.value.trim(),
            reply_to:   fields.email.el.value.trim(),
        };

        try {
            await emailjs.send(CONFIG.emailjs.serviceID, CONFIG.emailjs.templateID, params);
            showToast("success", "Message sent! I'll get back to you within 24 hours. 🚀");
            resetForm();
        } catch (err) {
            console.error("EmailJS Error:", err);
            showToast("error", "Failed to send. Please try emailing me directly at john@example.com");
        } finally {
            setLoading(false);
        }
    });
}

/* ════════════════════════════════════════════════
   13. TOAST NOTIFICATION SYSTEM
════════════════════════════════════════════════ */
function showToast(type, message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", "status");

    const icon = type === "success"
        ? '<i class="fa-solid fa-circle-check"></i>'
        : '<i class="fa-solid fa-circle-xmark"></i>';

    toast.innerHTML = `
        <div class="toast-icon" aria-hidden="true">${icon}</div>
        <p class="toast-message">${message}</p>
        <button class="toast-close" aria-label="Dismiss notification">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
    `;

    container.appendChild(toast);

    /* Trigger enter animation */
    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add("show"));
    });

    const dismiss = () => {
        toast.classList.add("hide");
        toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    };

    toast.querySelector(".toast-close").addEventListener("click", dismiss);
    setTimeout(dismiss, 5000);
}

/* ════════════════════════════════════════════════
   14. BACK TO TOP
════════════════════════════════════════════════ */
function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    function onScroll() {
        if (window.scrollY > 420) {
            btn.removeAttribute("hidden");
            requestAnimationFrame(() => btn.classList.add("visible"));
        } else {
            btn.classList.remove("visible");
            btn.addEventListener("transitionend", () => {
                if (!btn.classList.contains("visible")) btn.setAttribute("hidden", "");
            }, { once: true });
        }
    }

    window.addEventListener("scroll", throttle(onScroll, 200), { passive: true });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const hero = document.getElementById("home");
        if (hero) { hero.setAttribute("tabindex", "-1"); hero.focus({ preventScroll: true }); }
    });
}

/* ════════════════════════════════════════════════
   15. FOOTER YEAR
════════════════════════════════════════════════ */
function initFooterYear() {
    const el = document.getElementById("footer-year");
    if (el) el.textContent = new Date().getFullYear();
}

/* ════════════════════════════════════════════════
   16. SMOOTH SCROLL
════════════════════════════════════════════════ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            const id     = link.getAttribute("href").slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            const offset = (document.getElementById("navbar")?.offsetHeight || 72);
            const top    = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
            history.pushState(null, "", `#${id}`);
        });
    });
}

/* ════════════════════════════════════════════════
   UTILITIES
════════════════════════════════════════════════ */
function throttle(fn, ms) {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last >= ms) { last = now; fn(...args); }
    };
}

function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}