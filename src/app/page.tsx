"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { BrandIcon } from "@/components/BrandIcon";
import { TiltCard } from "@/components/TiltCard";
import { siteConfig } from "@/config/site";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ContactIcon({ type }: { type: "email" | "phone" }) {
  return type === "email" ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M7.2 3.8 4.7 5c-.8.4-1.1 1.3-.9 2.2 1.3 5.7 5.7 10.1 11.4 11.4.9.2 1.8-.2 2.2-.9l1.2-2.5-4.1-2-1.5 1.8a12.4 12.4 0 0 1-4.6-4.6l1.8-1.5-2-4.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("barani-theme");
    if (savedTheme === "dark") {
      document.documentElement.dataset.theme = "dark";
      setDarkTheme(true);
    }
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" onClick={closeMenu}>
        <span>BARANI</span>
        <span className="wordmark-dot">.</span>
        <span className="wordmark-caption">Founder / Builder</span>
      </a>
      <button
        aria-controls="site-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        className={`menu-toggle${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
      </button>
      <nav
        aria-label="Main navigation"
        className={`site-nav${menuOpen ? " is-open" : ""}`}
        id="site-navigation"
      >
        <a href="#ventures" onClick={closeMenu}>
          Ventures
        </a>
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        <a href="#social" onClick={closeMenu}>
          Connect
        </a>
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          Let&apos;s Talk <ArrowIcon />
        </a>
      </nav>
      <button
        aria-label={`Switch to ${darkTheme ? "light" : "dark"} theme`}
        className="theme-toggle"
        onClick={() => {
          const nextTheme = !darkTheme;
          setDarkTheme(nextTheme);
          document.documentElement.dataset.theme = nextTheme ? "dark" : "light";
          window.localStorage.setItem("barani-theme", nextTheme ? "dark" : "light");
        }}
        type="button"
      >
        <span aria-hidden="true">{darkTheme ? "☼" : "☾"}</span>
        <span>{darkTheme ? "Light" : "Dark"}</span>
      </button>
    </header>
  );
}

function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span className="section-index">{index}</span>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}

function Hero() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          {siteConfig.role}
        </p>
        <h1>
          {siteConfig.headline[0]}
          <br />
          <span>{siteConfig.headline[1]}</span>
        </h1>
        <p className="hero-intro">{siteConfig.introduction}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#ventures">
            Explore My Ventures <ArrowIcon />
          </a>
          <button className="button button-quiet" onClick={() => setContactOpen(true)} type="button">
            Connect With Me
          </button>
        </div>
        <div className="hero-footnote">
          <span className="status-dot" />
          Building across marketing, automation &amp; technology
        </div>
      </div>
      <div className="portrait-stage" aria-label="Portrait of Barani Kumar G">
        <div className="portrait-orbit orbit-one" />
        <div className="portrait-orbit orbit-two" />
        <div className="portrait-frame">
          <Image
            alt="Barani Kumar G"
            className="portrait-image"
            fill
            priority
            sizes="(max-width: 700px) 78vw, (max-width: 1100px) 42vw, 440px"
            src={siteConfig.portrait}
          />
        </div>
        <div className="portrait-caption">
          <span>01 / FOUNDER</span>
          <span>BARANI KUMAR G</span>
        </div>
        <div className="portrait-crosshair crosshair-top" />
        <div className="portrait-crosshair crosshair-bottom" />
      </div>
      <a className="scroll-cue" href="#ventures">
        <span className="scroll-cue-line" />
        Scroll to explore
      </a>
      <ContactModal onClose={() => setContactOpen(false)} open={contactOpen} />
    </section>
  );
}

function BusinessSection() {
  return (
    <section className="content-section section-shell" id="ventures">
      <SectionHeading
        description="A collection of businesses focused on growth, marketing, and intelligent automation."
        index="01 — VENTURES"
        title="What I’m Building"
      />
      <div className="business-grid">
        {siteConfig.businesses.map((business, index) => (
          <TiltCard
            className="business-card"
            key={business.name}
          >
            <div className="card-topline">
              <span className="card-category">{business.category}</span>
              <span className="card-number">0{index + 1}</span>
            </div>
            <div className="brand-logo-frame">
              <div className="brand-logo-wrap">
              <Image
                alt={`${business.name} logo`}
                className="business-logo"
                height={100}
                src={business.logo}
                width={260}
              />
              </div>
            </div>
            <div className="business-card-content">
              <h3>{business.name}</h3>
              <p>{business.description}</p>
            </div>
            <div className="card-actions">
              <a
                className="text-link"
                href={business.website}
                rel="noopener noreferrer"
                target="_blank"
              >
                {business.action} <ArrowIcon />
              </a>
              <a
                aria-label={`${business.name} on Instagram`}
                className="mini-social"
                href={business.instagram}
                rel="noopener noreferrer"
                target="_blank"
              >
                <BrandIcon name="instagram" />
              </a>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function ProductAndPartner() {
  return (
    <>
      <section className="content-section section-shell" id="products">
        <SectionHeading
          description="Tools and platforms shaped around better ways to work."
          index="02 — PRODUCT"
          title="Products & Platforms"
        />
        <TiltCard className="feature-card product-card">
        <div className="feature-art product-art" aria-hidden="true">
            <div className="brand-logo-frame feature-logo-frame"><div className="product-mark">AxxChat</div></div>
            <div className="product-ring ring-a" />
            <div className="product-ring ring-b" />
          </div>
          <div className="feature-content">
            <span className="card-category">{siteConfig.product.category}</span>
            <h3>{siteConfig.product.name}</h3>
            <p>{siteConfig.product.description}</p>
            <a
              className="text-link"
              href={siteConfig.product.website}
              rel="noopener noreferrer"
              target="_blank"
            >
              {siteConfig.product.action} <ArrowIcon />
            </a>
          </div>
          <span className="feature-index">P / 01</span>
        </TiltCard>
      </section>

      <section className="content-section partner-section section-shell">
        <SectionHeading
          description="Working with ventures and people building meaningful things."
          index="03 — COLLABORATION"
          title="Partnering & Collaborations"
        />
        <TiltCard className="partner-card">
          <div className="brand-logo-frame partner-logo-frame" aria-hidden="true"><div className="partner-monogram">O<span>.</span></div></div>
          <div className="partner-details">
            <span className="card-category">{siteConfig.partner.category}</span>
            <h3>{siteConfig.partner.name}</h3>
            <p>{siteConfig.partner.description}</p>
          </div>
          <a
            aria-label={`${siteConfig.partner.action} (opens in a new tab)`}
            className="round-link"
            href={siteConfig.partner.website}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ArrowIcon />
          </a>
        </TiltCard>
      </section>
    </>
  );
}

function AboutSection() {
  return (
    <section className="about-section section-shell" id="about">
      <div className="about-mark" aria-hidden="true">
        B<span>.</span>
      </div>
      <div className="about-copy">
        <span className="section-index">04 — A LITTLE ABOUT ME</span>
        <h2>A Little About Me</h2>
        <p>
          Building smart AI automation systems and powerful digital marketing strategies that help businesses grow faster. Focused on creating innovative solutions, streamlining workflows, and turning creative ideas into real-world results. Combining technology, automation, and marketing to build smarter, scalable business solutions.
        </p>
      </div>
      <span className="about-side-note">CURIOUS BY NATURE. BUILT TO BUILD.</span>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="content-section social-section section-shell" id="social">
      <SectionHeading
        description="Follow my work, ideas, and conversations."
        index="05 — BEYOND THE BUSINESSES"
        title="Beyond the Businesses"
      />
      <div className="social-grid">
        {siteConfig.social.map((account, index) => (
          <TiltCard className="social-card" key={account.url}>
            <a
              aria-label={`${account.action}: ${account.name} on ${account.label} (opens in a new tab)`}
              className="social-card-link"
              href={account.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className={`social-icon social-icon-${account.platform}`}>
                <BrandIcon name={account.platform} />
              </span>
              <span className="social-card-copy">
                <span className="card-category">{account.label}</span>
                <strong>{account.name}</strong>
                <span className="social-action">{account.action}</span>
              </span>
              <span className="social-arrow"><ArrowIcon /></span>
              <span className="social-card-number">0{index + 1}</span>
            </a>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const message = [
      "Hello Barani, I'd like to discuss a project.",
      "",
      `Name: ${String(fields.get("name") ?? "")}`,
      `Email: ${String(fields.get("email") ?? "")}`,
      `Phone: ${String(fields.get("phone") ?? "")}`,
      `Service: ${String(fields.get("service") ?? "")}`,
    ].join("\n");
    window.location.assign(
      `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`,
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input autoComplete="name" name="name" placeholder="Your name" required />
      </label>
      <label>
        <span>Email address</span>
        <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
      </label>
      <label>
        <span>Phone number</span>
        <input autoComplete="tel" name="phone" placeholder="Your phone number" required type="tel" />
      </label>
      <label>
        <span>Service</span>
        <select defaultValue="" name="service" required>
          <option disabled value="">Choose a service</option>
          <option>Axxeler Media — Marketing</option>
          <option>Axxeler AI — Automation</option>
          <option>AxxChat</option>
          <option>Partnership or other</option>
        </select>
      </label>
      <button className="contact-submit" type="submit">Continue to WhatsApp <ArrowIcon /></button>
      <p className="form-note">Your details will be added to a WhatsApp message for you to review and send.</p>
    </form>
  );
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      aria-labelledby="contact-modal-title"
      className="contact-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={onClose}
      ref={dialogRef}
    >
      <div className="contact-modal-body">
        <button aria-label="Close contact form" className="contact-modal-close" onClick={onClose} type="button">
          ×
        </button>
        <span className="section-index">LET&apos;S CONNECT</span>
        <h2 id="contact-modal-title">Tell me about your project.</h2>
        <p>Share a few details and continue the conversation on WhatsApp.</p>
        <ContactForm />
      </div>
    </dialog>
  );
}

function ContactSection() {
  return (
    <section className="contact-section section-shell" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <span className="section-index">06 — NEXT CHAPTER</span>
      <h2>Let&apos;s Build Something Meaningful.</h2>
      <p>Have a project, an automation challenge, a marketing opportunity, or an interesting collaboration in mind? Let&apos;s connect.</p>
      <div className="contact-actions">
        <a className="button button-primary" href={siteConfig.contact.emailUrl}><ContactIcon type="email" /><span><strong>Email Me</strong><small>{siteConfig.contact.email}</small></span></a>
        <a className="button button-quiet" href={siteConfig.contact.telephoneUrl}><ContactIcon type="phone" /><span><strong>Call Me</strong><small>{siteConfig.contact.phone}</small></span></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-brand">
        <a className="wordmark" href="#home">
          <span>BARANI</span>
          <span className="wordmark-dot">.</span>
        </a>
        <p>Building Brands. Automating Growth.</p>
      </div>
      <div className="footer-links" aria-label="External links">
        {siteConfig.businesses.map((business) => (
          <a
            href={business.website}
            key={business.name}
            rel="noopener noreferrer"
            target="_blank"
          >
            {business.name}
          </a>
        ))}
        <a
          href={siteConfig.product.website}
          rel="noopener noreferrer"
          target="_blank"
        >
          {siteConfig.product.name}
        </a>
        <a
          href={siteConfig.partner.website}
          rel="noopener noreferrer"
          target="_blank"
        >
          {siteConfig.partner.name}
        </a>
        {siteConfig.social.map((account) => (
          <a
            href={account.url}
            key={account.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {account.name} · {account.label}
          </a>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Barani Kumar G</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BusinessSection />
        <ProductAndPartner />
        <AboutSection />
        <SocialSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
