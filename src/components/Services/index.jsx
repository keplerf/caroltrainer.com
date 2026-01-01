import { Check, User, Clipboard, Users } from "react-feather";
import styles from "./Services.module.scss";

const content = [
  {
    id: "1-on-1-personal-training",
    icon: "user",
    title: "1-on-1 Personal Training",
    text: "Fully customized workouts with undivided attention at downtown gym or studio.",
    list: [
      "Tailored to your specific goals",
      "45-60 minute sessions",
      "Flexible scheduling",
    ],
    highlight: true,
  },
  {
    id: "semi-private-training",
    icon: "users",
    title: "Semi-Private Training",
    text: "Small group sessions (2-4 people) for friends or colleagues with similar goals.",
    list: [
      "More affordable than 1-on-1",
      "Group motivation & accountability",
      "Customized for the group",
    ],
  },
  {
    id: "custom-fitness-programs",
    icon: "clipboard",
    title: "Custom Fitness Programs",
    text: "For existing clients only: personalized workout plans for independent training.",
    list: [
      "Detailed exercise instructions",
      "Progress tracking included",
      "Weekly plan updates",
    ],
  },
];

const icons = {
  clipboard: Clipboard,
  users: Users,
  user: User,
};

function ServiceIcon({ icon }) {
  const Icon = icons[icon] || User;
  return (
    <div className={styles.iconWrapper}>
      <Icon size={28} strokeWidth={1.5} />
    </div>
  );
}

function ServiceList({ list }) {
  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item}>
          <Check size={18} className={styles.checkIcon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const Services = () => {
  function handleCtaClick(e, serviceId) {
    e.preventDefault();

    // Update URL hash with service parameter
    window.history.pushState(null, "", `#contact?service=${serviceId}`);

    // Scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    // Dispatch hashchange event so ContactForm can update
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return (
    <section
      className={styles.wrapper}
      id="services"
      aria-labelledby="services-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="services-heading" className={styles.title}>
            Services
          </h2>
          <p className={styles.subtitle}>
            Customized programs designed for your unique goals, schedule, and
            fitness level.
          </p>
        </header>

        <div className={styles.grid}>
          {content.map((service) => (
            <article
              key={service.id}
              className={`${styles.card} ${
                service.highlight ? styles.cardHighlight : ""
              }`}
            >
              <ServiceIcon icon={service.icon} />
              <h3 className={styles.cardTitle} id={service.id}>
                {service.title}
              </h3>
              <p className={styles.cardText}>{service.text}</p>
              <ServiceList list={service.list} />
              <a
                href={`#contact?service=${service.id}`}
                className={styles.cardCta}
                onClick={(e) => handleCtaClick(e, service.id)}
              >
                Get Started
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
