import parse from "html-react-parser";
import { ChevronDown } from "react-feather";
import styles from "./FAQ.module.scss";

function FAQItem({ question, answer }) {
  return (
    <details className={styles.item}>
      <summary className={styles.question}>
        <span>{question}</span>
        <ChevronDown size={20} className={styles.icon} aria-hidden="true" />
      </summary>
      <div className={styles.answer}>{parse(answer)}</div>
    </details>
  );
}

export default function FAQ({ data }) {
  return (
    <section className={styles.wrapper} id="faq" aria-labelledby="faq-heading">
      <div className={styles.container}>
        <h2 id="faq-heading" className={styles.title}>
          Frequently Asked Questions
        </h2>
        <div className={styles.list}>
          {data.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
