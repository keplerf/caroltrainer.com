import styles from "./StatsBar.module.scss";

const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "100+", label: "Clients Trained" },
  { value: "3", label: "Professional Certifications" },
  { value: "1:1", label: "Personalized Training" },
];

const StatsBar = () => {
  return (
    <section className={styles.statsBar}>
      <ul className={styles.list}>
        {stats.map(({ value, label }) => (
          <li key={label} className={styles.item}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StatsBar;
