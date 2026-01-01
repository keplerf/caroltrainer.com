import { Check, User, Clipboard, Calendar } from "react-feather";
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
  },
  {
    id: "semi-private-training",
    icon: "calendar",
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
      "45-60 minute sessions",
      "Flexible scheduling",
    ],
  },
];

const icons = {
  clipboard: Clipboard,
  calendar: Calendar,
  user: User,
};

function ServiceIcon({ icon, ...props }) {
  const Icon = icons[icon] || User;
  return <Icon {...props} />;
}

function ServiceList({ list }) {
  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item}>
          <Check color="green" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const Services = () => {
  return (
    <div className={styles.wrapper}>
      <article className="container">
        <h2 id="services">Services</h2>
        <p>
          Customized programs designed for your unique goals, schedule, and
          fitness level.
        </p>
        <section className={styles.section}>
          {content.map((service) => (
            <div key={service.id} className={styles.service}>
              <h3 id={service.id}>
                <ServiceIcon icon={service.icon} color="#f78948" />
                {service.title}
              </h3>
              <p>{service.text}</p>
              <ServiceList list={service.list} />
            </div>
          ))}
        </section>
      </article>
    </div>
  );
};

export default Services;
