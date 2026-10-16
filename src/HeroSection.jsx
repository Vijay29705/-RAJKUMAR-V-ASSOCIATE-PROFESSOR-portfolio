// src/HeroSection.jsx
// Production-ready Hero Section — uses inline styles for critical layout
// to avoid CSS specificity conflicts between Tailwind utilities & App.css.
// Color theme: Previous Cinematic Dark Blue (#090d16 → #1e293b) with Gold (#d2ad46) accents.

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Star,
  ShieldCheck,
  Play,
} from "lucide-react";

const SCHOLAR_AVATARS = [
  { name: "Dr. Dhineswaran M", src: "/scholars/scholar-dhineswaran.jpeg" },
  { name: "Dr. Maadesh Kumar M", src: "/scholars/maadesh-kumar.jpg" },
  { name: "Dr. Prasath S", src: "/scholars/prasath-s.jpg" },
  { name: "Dr. Winstor Jebakumar J", src: "/scholars/winstor-jebakumar.jpg" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection({ heroRef }) {
  const [typingText, setTypingText] = useState("");
  const fullText = "Wire Arc Additive Manufacturing • Welding Metallurgy • Superalloys";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      // Inline styles for ALL critical layout — immune to CSS specificity fights
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // 64px navbar + generous breathing room
        paddingTop: "clamp(100px, 14vh, 160px)",
        paddingBottom: "clamp(40px, 5vh, 64px)",
        background: "linear-gradient(135deg, #090d16 0%, #1e293b 50%, #0f1727 100%)",
        color: "#ffffff",
        overflow: "hidden",
      }}
      aria-label="Hero Introduction"
    >
      {/* ===== BACKGROUND: Grid + Ambient Glows ===== */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} aria-hidden="true">
        {/* 48px grid — identical to previous .hero-grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            zIndex: 1,
          }}
        />
        {/* Radial glow overlays — identical to previous .hero-background::after */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.08) 0%, transparent 40%)," +
              "radial-gradient(circle at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 40%)," +
              "radial-gradient(circle at 70% 20%, rgba(210,173,70,0.06) 0%, transparent 35%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ===== MAIN CONTENT — uses site .container for navbar alignment ===== */}
      <div className="container" style={{ position: "relative", zIndex: 3, flex: "1 0 auto", display: "flex", alignItems: "center" }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%" }}
        >
          {/* 2-column grid: text left, photo right. Single column on mobile. */}
          <div className="hero-new-grid">
            {/* ===== LEFT: TEXT CONTENT ===== */}
            <div className="hero-new-left">
              {/* Badge Pill */}
              <motion.div variants={itemVariants} style={{ marginBottom: 20 }}>
                <span className="hero-new-badge">
                  <span className="hero-new-badge-dot" />
                  <span style={{ color: "#e5c86e", fontWeight: 600 }}>⚡ Faculty Portfolio</span>
                  <span style={{ color: "rgba(255,255,255,0.35)", margin: "0 4px" }}>•</span>
                  <span style={{ color: "rgba(255,255,255,0.65)" }}>Advanced Manufacturing</span>
                </span>
              </motion.div>

              {/* H1 — fluid typography matching original */}
              <motion.h1 variants={itemVariants} className="hero-new-h1">
                Rajkumar <em>Vasu</em>
              </motion.h1>

              {/* Role */}
              <motion.div variants={itemVariants} className="hero-new-role">
                Associate Professor of Mechanical &amp; Mechatronics Engineering
              </motion.div>

              {/* Typewriter */}
              <motion.div variants={itemVariants} className="hero-new-typing">
                <span style={{ color: "#d2ad46" }}>✦</span>
                <span>{typingText}</span>
                <span className="hero-new-cursor" />
              </motion.div>

              {/* Description */}
              <motion.p variants={itemVariants} className="hero-new-desc">
                Researching wire arc additive manufacturing, welding metallurgy, and
                hot corrosion behaviour of superalloys.
              </motion.p>

              {/* Divider */}
              <motion.div variants={itemVariants} style={{ width: 48, height: 2, background: "rgba(255,255,255,0.25)", margin: "24px 0 16px" }} />

              {/* Quote */}
              <motion.p variants={itemVariants} className="hero-new-quote">
                "Seeking appointment offering challenges and responsibility to
                commensurate with teaching skills and experience."
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="hero-new-actions">
                <a href="#research" className="hero-new-btn-primary">
                  Explore Research
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </a>
                <a href="#about" className="hero-new-btn-secondary">
                  <Play style={{ width: 14, height: 14, color: "#d2ad46" }} />
                  Academic Profile
                </a>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={itemVariants} className="hero-new-proof">
                <div className="hero-new-proof-left">
                  <div className="hero-new-avatars">
                    {SCHOLAR_AVATARS.map((s, i) => (
                      <img
                        key={i}
                        src={s.src}
                        alt={s.name}
                        className="hero-new-avatar"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ))}
                    <span className="hero-new-avatar-count">+4</span>
                  </div>
                  <div>
                    <div className="hero-new-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} style={{ width: 14, height: 14, color: "#d2ad46", fill: "#d2ad46" }} />
                      ))}
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginLeft: 4, fontFamily: "var(--font-mono)" }}>5.0</span>
                    </div>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                      4 PhD Scholars Guided • 99 Students Mentored
                    </span>
                  </div>
                </div>
                <div className="hero-new-indexed">
                  <ShieldCheck style={{ width: 16, height: 16, color: "#d2ad46", flexShrink: 0 }} />
                  <span>Elsevier &amp; Scopus Indexed</span>
                </div>
              </motion.div>
            </div>

            {/* ===== RIGHT: PROFILE PHOTO CARD ===== */}
            <motion.div variants={itemVariants} className="hero-new-right">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Photo frame — aspect 4/5, object-position top */}
                <div className="hero-new-photo-frame">
                  <img
                    src="/rajkumar.png"
                    alt="Dr. V. Rajkumar"
                    className="hero-new-photo-img"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="hero-new-photo-overlay" />

                  {/* Badge: Years */}
                  <div className="hero-new-photo-badge">
                    <span style={{ color: "#a8622f" }}>✦</span>
                    <span>13+ Years</span>
                  </div>

                  {/* Badge: Lab */}
                  <div className="hero-new-photo-lab">
                    <span className="hero-new-lab-dot" />
                    WAAM LAB
                  </div>
                </div>

                {/* Bottom Telemetry */}
                <div className="hero-new-photo-tele">
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Sparkles style={{ width: 14, height: 14, color: "#d2ad46" }} />
                    <span>Top Impact Factor</span>
                  </div>
                  <span style={{ fontWeight: 700, color: "#fff" }}>8.0 • Elsevier</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ===== STATS STRIP ===== */}
      <div className="container" style={{ position: "relative", zIndex: 3, marginTop: "clamp(40px, 5vh, 64px)" }}>
        <div className="hero-new-stats">
          <div className="hero-new-stat">
            <strong>13+</strong>
            <span>Years in academia</span>
          </div>
          <div className="hero-new-stat">
            <strong>18</strong>
            <span>Peer-reviewed publications</span>
          </div>
          <div className="hero-new-stat">
            <strong>4</strong>
            <span>PhD scholars guided</span>
          </div>
          <div className="hero-new-stat">
            <strong>99</strong>
            <span>Students mentored</span>
          </div>
        </div>
      </div>
    </section>
  );
}
