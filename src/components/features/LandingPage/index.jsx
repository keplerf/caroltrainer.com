import { useState, useRef } from "react";
import { motion } from "motion/react";
import { ResponsiveImage } from "@responsive-image/react";
import {
  Check,
  ChevronDown,
  Award,
  Calendar,
  TrendingUp,
  Heart,
  Users,
  Clock,
  MapPin,
} from "react-feather";
import axios from "axios";
import Button from "../../Atoms/Button";
import styles from "./LandingPage.module.scss";
import img1 from "../../../assets/images/g01.jpeg?responsive";
import img2 from "../../../assets/images/g02.jpeg?responsive";
import img3 from "../../../assets/images/g03.jpeg?responsive";
import img4 from "../../../assets/images/g04.jpeg?responsive";
import img5 from "../../../assets/images/g05.jpg?responsive";
import img6 from "../../../assets/images/g06.jpeg?responsive";

// ─── Headline Options ──────────────────────────────────────────────────────────
// 1. "Downtown Vancouver's Personal Trainer for Busy Professionals"  ← default
// 2. "Personal Training That Works Around Your Downtown Life"
// 3. "The Personal Trainer Vancouver Professionals Actually Show Up For"
// ──────────────────────────────────────────────────────────────────────────────

const HEADLINE = "Downtown Vancouver's Personal Trainer for Busy Professionals";
const SERVER_POST = "https://www.caroltrainer.com/app/contact.php";

// ─── Animation variant ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// ─── Sections ─────────────────────────────────────────────────────────────────

const MOSAIC_IMAGES = [
  {
    src: img1,
    alt: "Woman running on treadmill in modern gym",
    pos: "left-top",
  },
  {
    src: img2,
    alt: "Woman stretching and training",
    pos: "left-bottom",
  },
  {
    src: img3,
    alt: "Athlete lifting weights in the gym — main feature",
    pos: "center-main",
  },
  {
    src: img4,
    alt: "Person running outdoors at sunrise",
    pos: "center-bottom",
  },
  {
    src: img5,
    alt: "Smiling woman after a workout",
    pos: "right-top",
  },
  {
    src: img6,
    alt: "Person doing dumbbell exercises",
    pos: "right-bottom",
  },
];

function Hero({ onCtaClick }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroInner}>
        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.span className={styles.heroBadge} variants={fadeUp}>
            <MapPin size={14} />
            Downtown Vancouver · Free First Session
          </motion.span>

          <motion.h1
            id="hero-heading"
            className={styles.heroHeadline}
            variants={fadeUp}
          >
            {HEADLINE}
          </motion.h1>

          <motion.p className={styles.heroSub} variants={fadeUp}>
            Real results without rearranging your life. Book a complimentary
            one-on-one session — no commitment, no pressure.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Button appearance="primary" onClick={onCtaClick} href="#book">
              Book Your Free Session
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroImageWrap}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&auto=format&fit=crop&q=80&crop=top"
            alt="Personal trainer coaching a client in a modern gym"
            className={styles.heroImage}
            width={900}
            height={1100}
          />
        </motion.div>
      </div>
    </section>
  );
}

export function PhotoGallery() {
  return (
    <section className={styles.photoGallery} aria-label="Training gallery">
      <motion.div
        className={styles.galleryGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {MOSAIC_IMAGES.map((img) => (
          <motion.div
            key={img.pos}
            className={`${styles.galleryCell} ${styles[`g_${img.pos.replace("-", "_")}`]}`}
            variants={fadeUp}
          >
            <ResponsiveImage
              src={img.src}
              alt={img.alt}
              className={styles.galleryImg}
            />
            <div className={styles.galleryOverlay} aria-hidden="true" />
          </motion.div>
        ))}

        {/* Quote card overlaid on center-main */}
        <div className={styles.galleryQuote} aria-hidden="true">
          <span className={styles.galleryQuoteMark}>"</span>
          <p>Results that actually fit your life</p>
        </div>
      </motion.div>
    </section>
  );
}

function SocialProofBar() {
  const items = [
    { label: "NASM Certified" },
    { label: "ACE Certified" },
    { label: "10+ Years Experience" },
    { label: "200+ Clients Transformed" },
    { label: "Downtown Vancouver" },
  ];

  return (
    <div className={styles.proofBar} aria-label="Credentials">
      <div className={styles.proofBarInner}>
        {items.map((item, i) => (
          <span key={i} className={styles.proofItem}>
            <Award size={15} className={styles.proofIcon} aria-hidden="true" />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function IntroVideo() {
  return (
    <section className={styles.videoSection} aria-labelledby="video-heading">
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Meet Carol
          </motion.p>
          <motion.h2
            id="video-heading"
            className={styles.sectionTitle}
            variants={fadeUp}
          >
            Your partner in lasting results
          </motion.h2>
          <motion.p className={styles.sectionSub} variants={fadeUp}>
            Carol has helped hundreds of Vancouver professionals get fit without
            sacrificing their schedules or sanity.
          </motion.p>

          <motion.div className={styles.videoPlaceholder} variants={fadeUp}>
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1280&auto=format&fit=crop&q=75"
              alt="Modern gym interior"
              className={styles.videoThumb}
            />
            <div className={styles.videoOverlay} aria-hidden="true" />
            <div className={styles.playBtn} aria-label="Play intro video">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span className={styles.videoLabel}>60-second intro video</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  const items = [
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      text: "Early mornings, lunch breaks, evenings — sessions built around your downtown schedule.",
    },
    {
      icon: TrendingUp,
      title: "Personalized Program",
      text: "No cookie-cutter workouts. Every session is designed for your goals and current fitness level.",
    },
    {
      icon: Heart,
      title: "Accountability & Support",
      text: "Weekly check-ins, progress tracking, and a coach who actually knows your name.",
    },
    {
      icon: Users,
      title: "Nutrition Guidance",
      text: "Simple, realistic advice that works with your lifestyle — not against it.",
    },
    {
      icon: Clock,
      title: "Efficient 45–60 min Sessions",
      text: "Get in, work hard, get results. Designed for people who value their time.",
    },
    {
      icon: MapPin,
      title: "Downtown Location",
      text: "Train steps from your office or condo — no long commutes to a far-off gym.",
    },
  ];

  return (
    <section className={styles.whatYouGet} aria-labelledby="services-heading">
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            What You Get
          </motion.p>
          <motion.h2
            id="services-heading"
            className={styles.sectionTitle}
            variants={fadeUp}
          >
            Personal training built for the way you live
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.featuresGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={i}
                className={styles.featureCard}
                variants={fadeUp}
              >
                <div className={styles.featureIconWrap} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={styles.featureText}>{item.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks({ onCtaClick }) {
  const steps = [
    {
      num: "01",
      title: "Book Your Free Session",
      text: "Fill out the short form below. We'll reach out within 24 hours to confirm your time.",
    },
    {
      num: "02",
      title: "Get Your Custom Plan",
      text: "Carol assesses your goals, schedule, and fitness level to design a program just for you.",
    },
    {
      num: "03",
      title: "Start Seeing Results",
      text: "Train consistently with expert guidance and watch your energy, strength, and confidence grow.",
    },
  ];

  return (
    <section className={styles.howItWorks} aria-labelledby="how-heading">
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            How It Works
          </motion.p>
          <motion.h2
            id="how-heading"
            className={styles.sectionTitle}
            variants={fadeUp}
          >
            Three steps to your strongest self
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.stepsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              className={styles.step}
              variants={fadeUp}
            >
              <span className={styles.stepNum}>{step.num}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.stepsCta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Button appearance="primary" onClick={onCtaClick} href="#book">
            I'm Ready — Book My Free Session
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "I've tried every gym in downtown Vancouver. Carol is the first trainer who actually designed a program around my insane schedule. I'm in the best shape of my life at 42.",
      name: "Michael T.",
      role: "Senior Manager, Financial District",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "I was intimidated to start personal training. Carol made it approachable, challenging, and fun. I've lost 18 lbs and feel genuinely strong for the first time.",
      name: "Sarah L.",
      role: "Marketing Director, Yaletown",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "Twelve-hour workdays used to be my excuse. Carol showed me that 45 minutes, done right, is all you need. Completely changed my relationship with fitness.",
      name: "David K.",
      role: "Partner, Law Firm, Coal Harbour",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section
      className={styles.testimonials}
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            Client Results
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            className={styles.sectionTitle}
            variants={fadeUp}
          >
            Real professionals, real results
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.testimonialsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {items.map((item, i) => (
            <motion.blockquote
              key={i}
              className={styles.testimonialCard}
              variants={fadeUp}
            >
              <div className={styles.stars} aria-label="5 stars">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className={styles.star} aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>
              <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
              <footer className={styles.testimonialFooter}>
                <img
                  src={item.avatar}
                  alt={item.name}
                  className={styles.avatar}
                  width={40}
                  height={40}
                />
                <div>
                  <cite className={styles.clientName}>{item.name}</cite>
                  <span className={styles.clientRole}>{item.role}</span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const credentials = [
    "NASM Certified Personal Trainer",
    "ACE Certified Health Coach",
    "10+ years training downtown Vancouver professionals",
    "Specializes in strength, weight loss & sustainable fitness",
    "Fluent in English & Portuguese",
  ];

  return (
    <section className={styles.about} aria-labelledby="about-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.aboutGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div className={styles.aboutImageWrap} variants={fadeUp}>
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80&crop=faces,top"
              alt="Carol Almeida, personal trainer in downtown Vancouver"
              className={styles.aboutImage}
              width={800}
              height={1000}
            />
          </motion.div>

          <motion.div className={styles.aboutContent} variants={fadeUp}>
            <p className={styles.eyebrow}>About Carol</p>
            <h2 id="about-heading" className={styles.sectionTitle}>
              A personal trainer who gets your life
            </h2>
            <p className={styles.aboutText}>
              Carol Almeida has spent over a decade helping busy downtown
              Vancouver professionals build strength, lose weight, and feel
              genuinely good in their bodies — without sacrificing the career or
              life they've worked hard to build.
            </p>
            <p className={styles.aboutText}>
              Her approach is direct, warm, and results-driven. She meets you
              where you are and builds a program that grows with you — not one
              you abandon after two weeks.
            </p>
            <ul className={styles.credentialsList}>
              {credentials.map((c, i) => (
                <li key={i} className={styles.credential}>
                  <Check
                    size={16}
                    className={styles.checkIcon}
                    aria-hidden="true"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      q: "What happens at the free session?",
      a: "We start with a 15-minute conversation about your goals, schedule, and current fitness level. Then Carol takes you through a sample workout tailored to you. You leave with a clear picture of what training with Carol looks like — zero pressure.",
    },
    {
      q: "Where are sessions held?",
      a: "Sessions take place at a private studio in downtown Vancouver, walking distance from most offices and condos in the core. Exact location is shared after booking.",
    },
    {
      q: "I haven't worked out in years. Is this for me?",
      a: 'Absolutely. Carol works with all fitness levels. In fact, getting started from scratch is one of her specialties — she\'s helped hundreds of people who swore they were "not the gym type."',
    },
    {
      q: "How often do I need to train?",
      a: "Most clients see strong results with 2–3 sessions per week. Carol will recommend a frequency that makes sense for your goals and schedule after your free session.",
    },
    {
      q: "What's the cancellation policy?",
      a: "Life happens. Carol just asks for 24 hours notice for cancellations or reschedules so she can offer that slot to another client.",
    },
  ];

  return (
    <section className={styles.faq} aria-labelledby="faq-heading">
      <div className={styles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            FAQ
          </motion.p>
          <motion.h2
            id="faq-heading"
            className={styles.sectionTitle}
            variants={fadeUp}
          >
            Common questions
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.faqList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((item, i) => (
            <motion.div key={i} className={styles.faqItem} variants={fadeUp}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`${styles.faqChevron} ${openIndex === i ? styles.faqChevronOpen : ""}`}
                  aria-hidden="true"
                />
              </button>
              {openIndex === i && (
                <motion.p
                  className={styles.faqAnswer}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {item.a}
                </motion.p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Booking Form ──────────────────────────────────────────────────────────────

const FORM_INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

function BookingForm({ sectionRef }) {
  const [form, setForm] = useState(FORM_INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Required";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "midName") {
      setHoneypot(value);
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  }

  function handleBlur(e) {
    setTouched((p) => ({ ...p, [e.target.name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (honeypot) return;

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ firstName: true, lastName: true, email: true, phone: true });
      return;
    }

    setStatus("submitting");
    try {
      const payload = {
        ...form,
        service: "1-on-1-personal-training",
        message: form.message || "Free session inquiry via landing page",
      };
      const res = await axios.post(SERVER_POST, payload, {
        headers: { "content-type": "application/json" },
      });
      if (res.data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section
        className={`${styles.bookingSection} ${styles.bookingDark}`}
        id="book"
        ref={sectionRef}
      >
        <div className={styles.container}>
          <div className={styles.successWrap}>
            <div className={styles.successIcon} aria-hidden="true">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className={styles.successTitle}>You're on Carol's list!</h3>
            <p className={styles.successText}>
              Expect a message from Carol within 24 hours to lock in your free
              session.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <section
      className={styles.bookingSection}
      id="book"
      ref={sectionRef}
      aria-labelledby="booking-heading"
    >
      <div className={styles.container}>
        <motion.div
          className={styles.bookingInner}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <div className={styles.bookingHeader}>
            <motion.p className={styles.eyebrowLight} variants={fadeUp}>
              Limited Spots Available
            </motion.p>
            <motion.h2
              id="booking-heading"
              className={styles.bookingTitle}
              variants={fadeUp}
            >
              Book your free personal training session
            </motion.h2>
            <motion.p className={styles.bookingSubtitle} variants={fadeUp}>
              One session. No commitment. 100% tailored to you.
            </motion.p>
          </div>

          <motion.form
            className={styles.bookingForm}
            onSubmit={handleSubmit}
            noValidate
            variants={fadeUp}
            aria-label="Book a free session"
          >
            {/* Honeypot */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px" }}
            >
              <label htmlFor="midName">Leave this empty</label>
              <input
                id="midName"
                name="midName"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="lp-firstName" className={styles.formLabel}>
                  First Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="lp-firstName"
                  name="firstName"
                  type="text"
                  placeholder="Sarah"
                  className={`${styles.formInput} ${touched.firstName && errors.firstName ? styles.inputError : ""}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  autoComplete="given-name"
                />
                {touched.firstName && errors.firstName && (
                  <span className={styles.errorMsg} role="alert">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="lp-lastName" className={styles.formLabel}>
                  Last Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="lp-lastName"
                  name="lastName"
                  type="text"
                  placeholder="Chen"
                  className={`${styles.formInput} ${touched.lastName && errors.lastName ? styles.inputError : ""}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  autoComplete="family-name"
                />
                {touched.lastName && errors.lastName && (
                  <span className={styles.errorMsg} role="alert">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="lp-email" className={styles.formLabel}>
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="lp-email"
                  name="email"
                  type="email"
                  placeholder="sarah@company.com"
                  className={`${styles.formInput} ${touched.email && errors.email ? styles.inputError : ""}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                {touched.email && errors.email && (
                  <span className={styles.errorMsg} role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.formField}>
                <label htmlFor="lp-phone" className={styles.formLabel}>
                  Phone <span aria-hidden="true">*</span>
                </label>
                <input
                  id="lp-phone"
                  name="phone"
                  type="tel"
                  placeholder="(604) 555-0100"
                  className={`${styles.formInput} ${touched.phone && errors.phone ? styles.inputError : ""}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  autoComplete="tel"
                />
                {touched.phone && errors.phone && (
                  <span className={styles.errorMsg} role="alert">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formField}>
              <label htmlFor="lp-message" className={styles.formLabel}>
                Anything you'd like Carol to know?{" "}
                <span className={styles.optional}>(optional)</span>
              </label>
              <textarea
                id="lp-message"
                name="message"
                rows={3}
                placeholder="Your goals, schedule, injuries, etc."
                className={styles.formTextarea}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </div>

            {status === "error" && (
              <p className={styles.serverError} role="alert">
                Something went wrong. Please try again or reach out directly.
              </p>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Claim My Free Session →"}
            </button>

            <p className={styles.formDisclaimer}>
              No spam. No commitment. Carol will reach out within 24 hours.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const bookRef = useRef(null);

  function scrollToBook(e) {
    e?.preventDefault();
    bookRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={styles.page}>
      <Hero onCtaClick={scrollToBook} />
      <SocialProofBar />
      <IntroVideo />
      <WhatYouGet />
      <HowItWorks onCtaClick={scrollToBook} />
      <PhotoGallery />
      <Testimonials />
      <About />
      <FAQSection />
      <BookingForm sectionRef={bookRef} />
    </div>
  );
}
