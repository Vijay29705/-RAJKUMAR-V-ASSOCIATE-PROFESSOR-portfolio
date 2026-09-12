// App.jsx - Updated Navbar with all links visible in desktop + Hero with Photo
import { useEffect, useMemo, useState, useRef } from "react";
import React from "react";
import {
  publications,
  organized,
  attended,
  competitions,
  scholars,
  saeDetails,
} from "./data";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeYear, setActiveYear] = useState("All");
  const [expandedPub, setExpandedPub] = useState(null);
  const [activeWorkshop, setActiveWorkshop] = useState("organized");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  const years = useMemo(
    () => [
      "All",
      ...new Set(
        publications
          .map((item) => item.y)
          .sort((a, b) => b - a)
      ),
    ],
    []
  );

  const filteredPublications = useMemo(() => {
    if (activeYear === "All") return publications;
    return publications.filter(
      (publication) => publication.y === Number(activeYear)
    );
  }, [activeYear]);

  // Scroll progress
  useEffect(() => {
    const progress = document.querySelector(".progress-fill");
    const handleScroll = () => {
      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percentage =
        documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
      progress.style.width = `${percentage}%`;

      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active nav link
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link-desktop");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => link.classList.remove("active"));
            const activeLink = document.querySelector(
              `.nav-link-desktop[href="#${entry.target.id}"]`
            );
            activeLink?.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Typing animation for hero
  useEffect(() => {
    const text = "Wire Arc Additive Manufacturing • Welding Metallurgy • Superalloys";
    let index = 0;
    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {
      const interval = setInterval(() => {
        if (index <= text.length) {
          typingElement.textContent = text.slice(0, index);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, []);

  const navItems = ["About", "Experience", "Academics", "Research", "Mentorship", "SAE Club", "Workshops", "Contact"];

  return (
    <div className="site">
      {/* SCROLL PROGRESS */}
      <div className="progress-track">
        <div className="progress-fill" />
      </div>

      {/* CURSOR GLOW */}
      <div
        className="cursor-glow"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />

      {/* NAVIGATION */}
      <header className={`navbar ${scrolled ? "navbar-shrink" : ""}`}>
        <div className="nav-container">
          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Brand */}
          <a href="#top" className="brand">
            <span className="brand-mark">RV</span>
            <span className="brand-text">
              RAJKUMAR V
              <small>ASSOCIATE PROFESSOR</small>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="nav-link-desktop"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile Popup Navigation */}
          <nav className={`nav-popup ${menuOpen ? "open" : ""}`}>
            <div className="nav-popup-inner">
              <div className="nav-popup-header">
                <span className="nav-popup-title">Navigation</span>
                <button
                  className="nav-close"
                  onClick={() => setMenuOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="nav-links">
                {navItems.map((item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="nav-link-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </a>
                ))}
              </div>
              <div className="nav-popup-footer">
                <div className="nav-contact-info">
                  <span>rajkmech42@gmail.com</span>
                  <span>+91 88700 55922</span>
                </div>
                <div className="nav-social-links">
                  <a href="#">in</a>
                  <a href="#">tw</a>
                  <a href="#">gh</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO - Animated with Photo */}
        <section className="hero" ref={heroRef}>
          <div className="hero-background">
            <div className="hero-particles">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${5 + Math.random() * 10}s`,
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                  }}
                />
              ))}
            </div>
            <div className="hero-gradient-orb hero-gradient-orb-1" />
            <div className="hero-gradient-orb hero-gradient-orb-2" />
            <div className="hero-gradient-orb hero-gradient-orb-3" />
          </div>

          <div className="hero-grid" />

          <div className="container hero-container">
            <div className="hero-topline animate-slide-down">

            </div>

            <div className="hero-content">
              <div className="hero-number animate-fade-in">01</div>
              <div className="hero-main-content">


                <div className="hero-title-wrapper animate-slide-up">
                  <h1>
                    Rajkumar .
                    <em> V</em>
                  </h1>
                </div>

                <div className="hero-role-wrapper animate-slide-up-delay">
                  <div className="hero-role">
                    Associate Professor of Mechanical & Mechatronics Engineering
                  </div>
                </div>

                <div className="hero-typing-wrapper animate-fade-in-delay-2">
                  <p className="typing-text"></p>
                  <span className="typing-cursor">|</span>
                </div>

                <p className="hero-description animate-fade-in-delay-3">
                  Researching wire arc additive manufacturing, welding metallurgy,
                  and hot corrosion behaviour of superalloys.
                </p>

                <div className="hero-line animate-width" />

                <p className="hero-quote animate-fade-in-delay-4">
                  “Seeking appointment offering challenges and responsibility to
                  commensurate with teaching skills and experience.”
                </p>

                <div className="hero-actions animate-fade-in-delay-5">
                  <a href="#research" className="hero-button">
                    Explore research
                    <span>↗</span>
                  </a>
                  <div className="hero-scroll-indicator">
                    <span>Scroll</span>
                    <div className="scroll-line">
                      <div className="scroll-dot" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Photo */}
              <div className="hero-photo animate-slide-up-delay-2">
                <div className="hero-photo-wrapper">

                  {/* Main Photo Frame */}
                  <div className="hero-photo-frame">
                    <img
                      src="/rajkumar.png"
                      alt="Dr. V. Rajkumar"
                      className="hero-profile-image"
                    />
                  </div>

                  {/* Animated Rings */}
                  <div className="hero-photo-ring hero-photo-ring-1"></div>
                  <div className="hero-photo-ring hero-photo-ring-2"></div>
                  <div className="hero-photo-ring hero-photo-ring-3"></div>

                  {/* Glow */}
                  <div className="hero-photo-glow"></div>
                </div>

                {/* Experience Badge */}
                <div className="hero-photo-badge">
                  <span>✦</span>
                  <span>13+ Years</span>
                </div>
              </div>

              <div className="hero-stats animate-fade-in-delay-6">
                <Stat number="13+" label="Years in academia" />
                <Stat number="18" label="Peer-reviewed publications" />
                <Stat number="4" label="PhD scholars guided" />
                <Stat number="99" label="Students mentored" />
              </div>

            </div>

            <div className="hero-scroll-down">
              <div className="scroll-arrow">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </section>

        {/* REST OF THE SECTIONS - Same as before */}
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
                ].map((item, index) => (
                  <div className="principle reveal" key={item}>
                    <span>0{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section dark-section">
          <div className="container">
            <SectionHeading
              number="03"
              kicker="ACADEMIC JOURNEY"
              title="Experience"
              description="All roles held at Coimbatore Institute of Engineering & Technology, Coimbatore."
              light
            />

            <div className="timeline">
              <Experience year="2025 — Present" role="Associate Professor" />
              <Experience year="2024 — 2025" role="Head of Department, Mechatronics Engineering" />
              <Experience year="2019 — 2023" role="Associate Professor, Deputy Controller of Examinations" />
              <Experience year="2019 — 2023" role="Assistant Professor, Assistant Controller of Examinations" />
              <Experience year="2013 — 2022" role="Assistant Professor" />
            </div>

            <div className="responsibilities">
              <div>
                <p className="mini-title">RESPONSIBILITIES HELD</p>
                <ul>
                  <li>Deputy Controller of Examinations — internal exams, end-semester theory pre-process, conduction, valuation, and results publishing</li>
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
                  ].map((subject) => (
                    <span key={subject}>{subject}</span>
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
                score="67.63%"
              />
              <AcademicRow
                course="HSC"
                institution="Monfort Matric Higher Secondary School, Tindivanam"
                university="State Board"
                year="2007"
                score="66.25%"
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
                    className={activeYear === year ? "filter active" : "filter"}
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
              {filteredPublications.map((publication, index) => (
                <article
                  className={expandedPub === index ? "publication expanded" : "publication"}
                  key={`${publication.y}-${publication.title}`}
                  onClick={() => setExpandedPub(expandedPub === index ? null : index)}
                >
                  <div className="publication-year">{publication.y}</div>
                  <div className="publication-main">
                    <h3>{publication.title}</h3>
                    <p>{publication.journal}</p>
                    <div className="publication-details">
                      <span>Publisher: {publication.publisher}</span>
                      <span>ISSN: {publication.issn}</span>
                    </div>
                  </div>
                  <div className="publication-impact">
                    <small>IF</small>
                    <strong>{publication.impact}</strong>
                  </div>
                  <div className="publication-arrow">{expandedPub === index ? "×" : "+"}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MENTORSHIP */}
        <section id="mentorship" className="section">
          <div className="container">
            <SectionHeading
              number="06"
              kicker="DOCTORAL GUIDESHIP"
              title="Mentorship"
              description="Four scholars registered under Anna University; two have completed their doctorates."
            />

            <div className="scholar-grid">
              {scholars.map((scholar, index) => (
                <article className="scholar-card reveal" key={scholar.reg}>
                  <span className="scholar-index">0{index + 1}</span>
                  <h3>{scholar.name}</h3>
                  <p className="registration">Reg. No. {scholar.reg}</p>
                  <span className={scholar.type === "completed" ? "status completed" : "status progress"}>
                    {scholar.status}
                  </span>
                </article>
              ))}
            </div>

            <div className="funding-card">
              <div className="funding-amount">
                ₹13,500
                <small>TNSCST — SANCTIONED</small>
              </div>
              <div>
                <span className="mini-title">STUDENT PROJECT SCHEME</span>
                <h3>Design and Fabrication of a Lightweight Stretcher-cum-Wheelchair</h3>
                <p>For easy movement of patients.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SAE CLUB */}
        <section id="sae-club" className="section dark-section sae-section">
          <div className="container">
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
                    <a href="mailto:rajkmech42@gmail.com">rajkmech42@gmail.com</a>
                  </div>
                  <div className="sae-contact-item">
                    <span>Mobile</span>
                    <a href="tel:+918870055922">+91 88700 55922</a>
                  </div>
                  <div className="sae-contact-item">
                    <span>Location</span>
                    <p>Narasipuram (PO), Thondamuthur Via, Coimbatore – 641109</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sae-timeline">
              <div className="sae-timeline-header">
                <h3>Academic Year-wise SAE Club Involvement</h3>
              </div>

              {saeDetails.map((item, index) => (
                <div className="sae-year-card reveal" key={item.year}>
                  <div className="sae-year-badge">{item.year}</div>
                  <div className="sae-year-content">
                    <h4>{item.role}</h4>
                    <p className="sae-department">{item.department}</p>
                    <div className="sae-year-details">
                      <span className="sae-tag">Designation: {item.designation}</span>
                      <span className="sae-tag">Email: {item.email}</span>
                      <span className="sae-tag">Mobile: {item.mobile}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sae-note">
              <p className="sae-note-text">
                <strong>Note:</strong> Departmental affiliation varies by academic year —
                <span className="sae-highlight"> AY 2025–2026: Mechatronics Engineering</span> |
                <span className="sae-highlight"> AY 2024–2025: Mechanical Engineering</span>
              </p>
            </div>
          </div>
        </section>

        {/* COMPETITIONS */}
        <section id="competitions" className="section dark-section competition-section">
          <div className="container">
            <SectionHeading
              number="08"
              kicker="STUDENT COMPETITIONS"
              title="Mentoring beyond the classroom"
              description="Guided 99 undergraduate students across five national-level engineering competitions."
              light
            />

            <div className="competition-list">
              {competitions.map((competition, index) => (
                <article className="competition" key={competition.comp}>
                  <div className="competition-number">0{index + 1}</div>
                  <div>
                    <h3>{competition.comp}</h3>
                    <p>{competition.venue}</p>
                    <span>{competition.students}</span>
                  </div>
                  <div className="award">{competition.award}</div>
                </article>
              ))}
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
                className={activeWorkshop === "organized" ? "workshop-tab active" : "workshop-tab"}
                onClick={() => setActiveWorkshop("organized")}
              >
                Organized
                <span>03</span>
              </button>
              <button
                className={activeWorkshop === "attended" ? "workshop-tab active" : "workshop-tab"}
                onClick={() => setActiveWorkshop("attended")}
              >
                Attended
                <span>15</span>
              </button>
            </div>

            {activeWorkshop === "organized" ? (
              <div className="workshop-list">
                {organized.map((item, index) => (
                  <article className="organized-item" key={item.title}>
                    <span>0{index + 1}</span>
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
                {attended.map((item, index) => (
                  <article className="attended-item" key={`${item.date}-${item.title}`}>
                    <div className="date">{item.date}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.venue}</p>
                    </div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
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
      <footer id="contact">
        <div className="container">
          <div className="footer-main">
            <div>
              <p className="footer-label">11 / CONTACT</p>
              <h2>
                Let's connect
                <span>.</span>
              </h2>
              <p className="footer-description">
                Open to teaching appointments and research collaboration in materials
                engineering and additive manufacturing.
              </p>

              <div className="contact-list">
                <Contact label="EMAIL" value="rajkmech42@gmail.com" href="mailto:rajkmech42@gmail.com" />
                <Contact label="PHONE" value="+91 88700 55922" href="tel:+918870055922" />
                <Contact label="LOCATION" value="Tindivanam, Tamil Nadu, India" />
              </div>
            </div>

            <div className="quickfacts">
              <p className="mini-title">QUICK FACTS</p>
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
            <span>RAJKUMAR V / CIET</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

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
    <div className={light ? "section-heading light" : "section-heading"}>
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
      <div className="experience-line"><span /></div>
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

function Contact({ label, value, href }) {
  return (
    <div className="contact-item">
      <span>{label}</span>
      {href ? <a href={href}>{value}</a> : <p>{value}</p>}
    </div>
  );
}

export default App;