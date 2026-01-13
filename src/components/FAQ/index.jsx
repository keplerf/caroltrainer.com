// import React, { useState } from "react";
import parse from "html-react-parser";
import { ChevronDown } from "react-feather";
import Typography from "../Atoms/Typography";
import styles from "./FAQ.module.scss";

import { faq } from "../../content/faq";

// Compount Component Pattern

// function FAQCustomItem({ children }) {
//   const [on, setOn] = useState(false);
//   const toggle = () => setOn(!on);

//   return React.Children.map(children, (child) => {
//     if (typeof child === "string") {
//       return child;
//     }
//     const newChild = React.cloneElement(child, [on, toggle]);
//     return newChild;
//   });
// }

function FAQItem({ question, answer }) {
  return (
    <details className={styles.item}>
      <summary className={styles.question}>
        <Typography as="span">{question}</Typography>
        <ChevronDown size={20} className={styles.icon} aria-hidden="true" />
      </summary>

      <Typography as="div" className={styles.answer}>
        {parse(answer)}
      </Typography>
    </details>
  );
}

export default function FAQ() {
  return (
    <section className={styles.wrapper} id="faq" aria-labelledby="faq-heading">
      <div className={styles.container}>
        <Typography as="h2" id="faq-heading" center>
          Frequently Asked Questions
        </Typography>
        <div className={styles.list}>
          {/* <FAQCustomItem> */}
          {faq.map((item) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
          {/* </FAQCustomItem> */}
        </div>
      </div>
    </section>
  );
}
