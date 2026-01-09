import styles from "./Button.module.scss";

import { motion, useAnimationFrame } from "motion/react";

const Button = ({
  appearance = "primary",
  as = "button",
  full = false,
  href,
  children,
  stifness = 300,
  damping = 15,
  ...props
}) => {
  const ButtonAs = href ? "a" : "button";

  return (
    <motion.ButtonAs
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stifness, damping }}
      href={href}
      className={`${styles.btn} ${styles[appearance]} ${full && styles.full}`}
      {...props}
    >
      <span>{children} </span>
    </motion.ButtonAs>
  );
};

export default Button;
