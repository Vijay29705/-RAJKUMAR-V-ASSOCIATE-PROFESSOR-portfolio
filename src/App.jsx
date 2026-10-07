// App.jsx — Mobile navigation synced version
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Mail, Linkedin } from "lucide-react";
import "./App.css";

import {
  publications,
  scholars,
  saeDetails,
  competitions,
  organized,
  attended,
} from "./data.js";

const COMPETITION_IMAGES = {
  0: "/Prathyusha Engineering College.png",
  1: "/Karpaga Vinayaga College of Engineering and Technology, Chengalpattu.jpg",
  2: "/KPR College of Engineering & Technology.png",
  3: "/Hindustan College of Engineering and Technology & Karimotor Speedway, Coimbatore.jpg",
  4: "/Sri Ramakrishna Institute of Technology, Coimbatore.png",
};

const NAV_ITEMS = [
  "About",
  "Experience",
  "Academics",
  "Research",
  "Mentorship",
  "SAE Club",
  "Competitions",
  "Workshops",
  "Contact",
];

const slug = (item) => `#${item.toLowerCase().replace(/\s+/g, "-")}`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeYear, setActiveYear] = useState("All");
  const [expandedPub, setExpandedPub] = useState(null);
  const [activeWorkshop, setActiveWorkshop] = useState("organized");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const heroRef = useRef(null);

  const years = useMemo(
    () => [
      "All",
      ...new Set(publications.map((p) => p.y).sort((a, b) => b - a)),
    ],
    []
  );

  const filteredPublications = useMemo(() => {
    if (activeYear === "All") return publications;
    return publications.filter((p) => p.y === Number(activeYear));
  }, [activeYear]);

  useEffect(() => {
    const progress = document.querySelector(".progress-fill");
    const onScroll = () => {
      const docH =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      if (progress) progress.style.width = `${pct}%`;
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link-desktop");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove("active"));
            document
              .querySelector(`.nav-link-desktop[href="#${entry.target.id}"]`)
              ?.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const text =
      "Wire Arc Additive Manufacturing • Welding Metallurgy • Superalloys";
    const el = document.querySelector(".typing-text");
    if (!el) return;
    let i = 0;
    const id = setInterval(() => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
      } else {
        clearInterval(id);
      }
    }, 50);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxImage]);

  return (
    <div className="site">
      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" />
      </div>

      <div
        className="cursor-glow"
        aria-hidden="true"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />

      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? "navbar-shrink" : ""}`}>
        <div className="nav-container">
          <a href="#top" className="brand" aria-label="Home">
            <span className="brand-mark">RV</span>
            <span className="brand-text">
              RAJKUMAR V
              <small>ASSOCIATE PROFESSOR</small>
            </span>
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={slug(item)} className="nav-link-desktop">
                {item}
              </a>
            ))}
          </nav>

          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MOBILE POPUP OVERLAY */}
      <div
        className={`nav-popup ${menuOpen ? "open" : ""}`}
        aria-label="Mobile Navigation"
      >
        <div className="nav-popup-inner">
          <div className="nav-popup-header">
            <span className="nav-popup-title">Navigation</span>
            <button
              className="nav-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          <div className="nav-links">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item}
                href={slug(item)}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <span>{item}</span>
                <span className="nav-link-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </div>

          <div className="nav-popup-footer">
            <div className="nav-contact-info">
              <span>rajkmech42@gmail.com</span>
            </div>
            <div className="nav-social-links">
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                LinkedIn
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      <main id="top">
        {/* HERO */}
        <section className="hero" ref={heroRef}>
          <div className="hero-background" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="container hero-container">
            <div className="hero-content">
              <div className="hero-left professional-hero-layout">
                <div className="hero-title-wrapper animate-slide-up">
                  <h1>
                    Rajkumar <em>Vasu</em>
                  </h1>
                </div>

                <div className="hero-role-wrapper animate-slide-up-delay">
                  <div className="hero-role">
                    Associate Professor of Mechanical &amp; Mechatronics
                    Engineering
                  </div>
                </div>

                <div className="hero-typing-wrapper animate-fade-in-delay-2">
                  <p className="typing-text" />
                  <span className="typing-cursor">|</span>
                </div>

                <p className="hero-description animate-fade-in-delay-3">
                  Researching wire arc additive manufacturing, welding
                  metallurgy, and hot corrosion behaviour of superalloys.
                </p>

                <div className="hero-line animate-width" />

                <p className="hero-quote animate-fade-in-delay-4">
                  “Seeking appointment offering challenges and responsibility
                  to commensurate with teaching skills and experience.”
                </p>

                <div className="hero-actions animate-fade-in-delay-5">
                  <a href="#research" className="hero-button">
                    Explore research
                    <span aria-hidden="true">↗</span>
                  </a>
                  <div className="hero-scroll-indicator">
                    <span>Scroll</span>
                    <div className="scroll-line">
                      <div className="scroll-dot" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-photo animate-slide-up-delay-2">
                <div className="hero-photo-wrapper">
                  <div className="hero-photo-frame">
                    <img
                      src="/rajkumar.png"
                      alt="Dr. V. Rajkumar"
                      className="hero-profile-image"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>

                <div className="hero-photo-badge">
                  <span aria-hidden="true">✦</span>
                  <span>13+ Years</span>
                </div>
              </div>
            </div>

            <div className="hero-stats animate-fade-in-delay-6">
              <Stat number="13+" label="Years in academia" />
              <Stat number="18" label="Peer-reviewed publications" />
              <Stat number="4" label="PhD scholars guided" />
              <Stat number="99" label="Students mentored" />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about-section">
          <div className="container">
            <SectionHeading
              number="02"
              kicker="CAREER PROFILE"
              title="Career conspectus"
              description="A teaching career built around materials engineering research, academic administration, and practical laboratory leadership."
            />

            <div className="about-grid">
              <div className="about-intro">
                <span className="vertical-label">PHILOSOPHY</span>
                <h3>
                  Teaching with
                  <span> purpose.</span>
                </h3>
              </div>

              <div className="principles">
                {[
                  "Focused on excelling in a teaching career while putting subject expertise to full use.",
                  "Socially confident, and quick to establish rapport with students and colleagues.",
                  "Adaptable to changes in academic systems and administrative procedures.",
                  "Methodical, focused approach to classroom teaching.",
                  "Approachable, and receptive to new ideas.",
                ].map((item, i) => (
                  <div className="principle reveal" key={item}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section dark-section">
          <div className="dark-section-grid" aria-hidden="true" />
          <div className="container relative-z">
            <SectionHeading
              number="03"
              kicker="ACADEMIC JOURNEY"
              title="Experience"
              description="All roles held at Coimbatore Institute of Engineering & Technology, Coimbatore."
              light
            />

            <div className="timeline">
              <Experience year="2025 — Present" role="Associate Professor" />
              <Experience
                year="2024 — 2025"
                role="Head of Department, Mechatronics Engineering"
              />
              <Experience
                year="2019 — 2023"
                role="Associate Professor, Deputy Controller of Examinations"
              />
              <Experience
                year="2019 — 2023"
                role="Assistant Professor, Assistant Controller of Examinations"
              />
              <Experience year="2013 — 2022" role="Assistant Professor" />
            </div>

            <div className="responsibilities">
              <div>
                <p className="mini-title">RESPONSIBILITIES HELD</p>
                <ul>
                  <li>
                    Deputy Controller of Examinations — internal exams,
                    end-semester theory pre-process, conduction, valuation,
                    and results publishing
                  </li>
                  <li>Value Added Course In-charge</li>
                  <li>CAD Lab In-charge</li>
                </ul>
              </div>

              <div>
                <p className="mini-title">SUBJECTS HANDLED</p>
                <div className="tags">
                  {[
                    "Engineering Graphics",
                    "Basic Civil & Mechanical Engineering",
                    "Strength of Materials",
                    "Manufacturing Technology I",
                    "Unconventional Machining Process",
                    "Kinematics of Machinery",
                    "Power Plant Engineering",
                  ].map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMICS */}
        <section id="academics" className="section">
          <div className="container">
            <SectionHeading
              number="04"
              kicker="EDUCATION"
              title="Academic details"
              description="Academic qualifications spanning SSLC through doctoral coursework and professional development."
            />

            <div className="academic-table">
              <AcademicRow
                course="SSLC"
                institution="Nehru Matriculation School, Mailam"
                university="State Board"
                year="2005"
              />
              <AcademicRow
                course="HSC"
                institution="Monfort Matric Higher Secondary School, Tindivanam"
                university="State Board"
                year="2007"
              />
              <AcademicRow
                course="B.E, Mechanical Engineering"
                institution="Mailam Engineering College, Mailam, Tindivanam"
                university="Anna University, Chennai"
                year="2011"
                score="77%"
              />
              <AcademicRow
                course="M.E, Manufacturing Engineering"
                institution="Sri Ramakrishna Engineering College, Coimbatore"
                university="Anna University, Chennai"
                year="2013"
                score="7.98 CGPA"
              />
              <AcademicRow
                course="Ph.D, Coursework"
                institution="Coimbatore Institute of Engineering, Coimbatore"
                university="Anna University, Chennai"
                year="2021"
                score="7.5 CGPA"
              />
              <AcademicRow
                course="AICTE-QIP Programme"
                institution="IIIT Trichy"
                university="IIIT Trichy"
                year="2026"
                score="8.85 CGPA"
              />
            </div>
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="section research-section">
          <div className="container">
            <SectionHeading
              number="05"
              kicker="RESEARCH & PUBLICATIONS"
              title="Research output"
              description="Peer-reviewed research across additive manufacturing, welding metallurgy, corrosion, materials characterization, and mechanical engineering."
            />

            <div className="research-header">
              <div>
                <strong>{publications.length}</strong>
                <span>publications</span>
              </div>

              <div className="filter-wrapper">
                {years.map((year) => (
                  <button
                    key={year}
                    className={`filter ${activeYear === year ? "active" : ""}`}
                    onClick={() => {
                      setActiveYear(year);
                      setExpandedPub(null);
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="publication-list">
              {filteredPublications.map((p, i) => (
                <article
                  className={`publication ${expandedPub === i ? "expanded" : ""}`}
                  key={`${p.y}-${p.title}`}
                  onClick={() => setExpandedPub(expandedPub === i ? null : i)}
                >
                  <div className="publication-year">{p.y}</div>
                  <div className="publication-main">
                    <h3>{p.title}</h3>
                    <p>{p.journal}</p>
                    <div className="publication-details">
                      <span>Publisher: {p.publisher}</span>
                      <span>ISSN: {p.issn}</span>
                    </div>
                  </div>
                  <div className="publication-impact">
                    <small>IF</small>
                    <strong>{p.impact}</strong>
                  </div>
                  <div className="publication-arrow" aria-hidden="true">
                    {expandedPub === i ? "×" : "+"}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MENTORSHIP */}
        <section id="mentorship" className="section mentorship-section">
          <div className="container">
            <SectionHeading
              number="06"
              kicker="DOCTORAL GUIDESHIP"
              title="Mentorship"
              description="Four scholars registered under Anna University; two have completed their doctorates."
            />

            <div className="scholar-grid">
              {scholars.map((scholar, i) => (
                <article
                  className={`scholar-card reveal scholar-${scholar.type}`}
                  key={scholar.reg}
                >
                  <div className="scholar-card-top">
                    <span className="scholar-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`status ${scholar.type}`}>
                      <span className="status-dot" />
                      {scholar.type === "completed"
                        ? "COMPLETED"
                        : "IN PROGRESS"}
                    </span>
                  </div>

                  <div className="scholar-photo-wrapper">
                    <img
                      src={scholar.photo}
                      alt={`${scholar.name} — Research Scholar`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <div className="scholar-info">
                    <span className="scholar-label">RESEARCH SCHOLAR</span>
                    <h3>{scholar.name}</h3>
                    <p className="registration">
                      <span>REGISTRATION NO.</span>
                      {scholar.reg}
                    </p>
                    <div className="scholar-divider" />
                    <div className="scholar-status">
                      <span className="status-label">ACADEMIC STATUS</span>
                      <p>{scholar.status}</p>
                    </div>
                  </div>

                  <div className="scholar-card-footer">
                    <span>ANNA UNIVERSITY</span>
                    <span>Ph.D. GUIDESHIP</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="funding-card reveal">
              <div className="funding-left">
                <span className="funding-label">RESEARCH FUNDING</span>
                <div className="funding-amount">₹13,500</div>
                <span className="funding-sanctioned">
                  TNSCST — SANCTIONED
                </span>
              </div>

              <div className="funding-content">
                <span className="mini-title">STUDENT PROJECT SCHEME</span>
                <h3>
                  Design and Fabrication of a Lightweight
                  Stretcher-cum-Wheelchair
                </h3>
                <p>
                  Development of a lightweight mobility solution designed for
                  the easy movement and transportation of patients.
                </p>
                <div className="funding-meta">
                  <span>PROJECT SUPPORT</span>
                  <span>TNSCST</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SAE CLUB */}
        <section id="sae-club" className="section dark-section sae-section">
          <div className="dark-section-grid" aria-hidden="true" />
          <div className="container relative-z">
            <SectionHeading
              number="07"
              kicker="STUDENT DEVELOPMENT"
              title="SAE Club Faculty Advisor"
              description="Dr. Rajkumar V serves as the Faculty Advisor for the SAE Club, guiding students in automotive engineering and motorsports competitions."
              light
            />

            <div className="sae-profile">
              <div className="sae-profile-card">
                <div className="sae-profile-header">
                  <div className="sae-avatar">SAE</div>
                  <div>
                    <h3>Dr. V. Rajkumar M.E., Ph.D.</h3>
                    <p className="sae-designation">Associate Professor</p>
                    <p className="sae-role">Faculty Advisor — SAE Club</p>
                  </div>
                </div>

                <div className="sae-contact">
                  <div className="sae-contact-item">
                    <span>Email</span>
                    <a href="mailto:rajkmech42@gmail.com">
                      rajkmech42@gmail.com
                    </a>
                  </div>

                </div>
              </div>
            </div>

            <div className="sae-timeline">
              {saeDetails.map((item) => (
                <div className="sae-year-card reveal" key={item.year}>
                  <div className="sae-year-badge">{item.year}</div>
                  <div className="sae-year-content">
                    <h4>{item.role}</h4>
                    <p className="sae-department">{item.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPETITIONS */}
        <section
          id="competitions"
          className="section dark-section competition-section"
        >
          <div className="dark-section-grid" aria-hidden="true" />
          <div className="container relative-z">
            <SectionHeading
              number="08"
              kicker="STUDENT COMPETITIONS"
              title="Mentoring beyond the classroom"
              description="Guided 99 undergraduate students across five national-level engineering competitions."
              light
            />

            <div className="competition-showcase">
              {competitions.map((c, i) => {
                const imageSrc = COMPETITION_IMAGES[i];
                return (
                  <article className="competition-card" key={c.comp}>
                    <div className="competition-card-image">
                      <img
                        src={imageSrc}
                        alt={c.comp}
                        loading="lazy"
                        onClick={() => setLightboxImage(imageSrc)}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="competition-card-content">
                      <h3>{c.comp}</h3>
                      <p>{c.venue}</p>
                      <div className="competition-card-footer">
                        <span>{c.students}</span>
                        <strong>{c.award}</strong>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* WORKSHOPS */}
        <section id="workshops" className="section">
          <div className="container">
            <SectionHeading
              number="09"
              kicker="FACULTY DEVELOPMENT"
              title="Workshops & FDPs"
              description="Three funded programmes organized as coordinator, and fifteen attended as a participant."
            />

            <div className="workshop-tabs">
              <button
                className={`workshop-tab ${activeWorkshop === "organized" ? "active" : ""
                  }`}
                onClick={() => setActiveWorkshop("organized")}
              >
                Organized <span>03</span>
              </button>
              <button
                className={`workshop-tab ${activeWorkshop === "attended" ? "active" : ""
                  }`}
                onClick={() => setActiveWorkshop("attended")}
              >
                Attended <span>15</span>
              </button>
            </div>

            {activeWorkshop === "organized" ? (
              <div className="workshop-list">
                {organized.map((item, i) => (
                  <article className="organized-item" key={item.title}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <div className="workshop-tags">
                        <b>{item.agency}</b>
                        <b>{item.role}</b>
                        <b>{item.amount}</b>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="attended-list">
                {attended.map((item, i) => (
                  <article
                    className="attended-item"
                    key={`${item.date}-${item.title}`}
                  >
                    <div className="date">{item.date}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.venue}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* RECORD */}
        <section className="section record-section">
          <div className="container">
            <SectionHeading
              number="10"
              kicker="ADDITIONAL RECORD"
              title="Chapters, courses & memberships"
              description="Two authored chapters, five completed NPTEL courses, and three professional-body memberships."
            />

            <div className="record-grid">
              <RecordColumn
                title="Book chapters"
                items={[
                  "Role of Optimization Techniques in Welding — in Industrial People Management (2020)",
                  "Digital Twin Technologies in Manufacturing Industries — in Efficient Energy Utilization and Emission Reduction Strategies in Plant Operations (2025)",
                ]}
              />
              <RecordColumn
                title="NPTEL courses completed"
                items={[
                  "OBE and Accreditation (Elite + Silver)",
                  "Automation in Manufacturing (Elite)",
                  "Fundamentals of Additive Manufacturing Technologies",
                  "Data Science Using Python",
                  "Welding Application Technology",
                ]}
              />
              <div className="record-column">
                <p className="mini-title">PROFESSIONAL MEMBERSHIPS</p>
                <div className="membership-list">
                  <span>SAE</span>
                  <span>ISME</span>
                  <span>ISTE</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="footer-dark">
        <div className="dark-section-grid" aria-hidden="true" />
        <div className="container relative-z">
          <div className="footer-main">
            <div>
              <p className="footer-label">11 / CONTACT</p>
              <h2>Let's connect.</h2>
              <p className="footer-description">
                Open to teaching appointments and research collaboration in
                materials engineering and additive manufacturing.
              </p>
              <div className="contact-list">
                <a href="mailto:rajkmech42@gmail.com" className="contact-link">
                  <Mail className="w-4 h-4" />
                  <span>rajkmech42@gmail.com</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            <div className="quickfacts">
              <p className="mini-title">Quick Facts</p>
              <dl>
                <dt>Mother tongue</dt>
                <dd>Tamil</dd>
                <dt>Languages known</dt>
                <dd>Tamil, English</dd>
                <dt>Nationality</dt>
                <dd>Indian</dd>
                <dt>Hobbies</dt>
                <dd>Chess, badminton, and cricket</dd>
              </dl>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Dr. V. Rajkumar. All rights reserved.</span>
            <span>Academic Portfolio</span>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div
          className="lightbox"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxImage(null)}
          >
            ✕
          </button>
          <img src={lightboxImage} alt="Enlarged view" />
        </div>
      )}
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="stat">
      <strong>{number}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({ number, kicker, title, description, light = false }) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <div className="section-number">{number}</div>
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
        <p className="section-description">{description}</p>
      </div>
    </div>
  );
}

function Experience({ year, role }) {
  return (
    <article className="experience-item">
      <div className="experience-year">{year}</div>
      <div className="experience-line">
        <span />
      </div>
      <div>
        <h3>{role}</h3>
        <p>Coimbatore Institute of Engineering & Technology, Coimbatore</p>
      </div>
    </article>
  );
}

function AcademicRow({ course, institution, university, year, score }) {
  return (
    <article className="academic-row">
      <div className="academic-course">
        <h3>{course}</h3>
        <p>{institution}</p>
      </div>
      <div className="academic-university">{university}</div>
      <div className="academic-year">{year}</div>
      <div className="academic-score">{score}</div>
    </article>
  );
}

function RecordColumn({ title, items }) {
  return (
    <div className="record-column">
      <p className="mini-title">{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;