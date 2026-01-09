import styles from "./Button.module.scss";
import { motion } from "motion/react";

const Button = ({
  appearance = "primary",
  full = false,
  href,
  children,
  stiffness = 300,
  damping = 15,
  ...props
}) => {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stiffness, damping, duration: 10 }}
      href={href}
      className={`${styles.btn} ${styles[appearance]} ${full && styles.full}`}
      {...props}
    >
      <span>{children}</span>
    </Component>
  );
};

export default Button;
