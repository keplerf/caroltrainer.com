import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import { motion } from "motion/react";

const Button = ({
  appearance,
  effect,
  full = false,
  href,
  dark,
  children,
  stiffness = 300,
  damping = 15,
  ...props
}) => {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stiffness, damping, duration: 10 }}
      href={href}
      className={`${styles.btn} ${styles[appearance]} ${full ? styles.full : ""} ${dark ? styles.dark : ""}`}
      {...props}
    >
      <span>{children}</span>
    </Component>
  );
};

Button.propTypes = {
  appearance: PropTypes.oneOf(["primary", "secondary", "outline"]),
  full: PropTypes.bool,
  href: PropTypes.string,
  dark: PropTypes.bool,
  children: PropTypes.node,
  stiffness: PropTypes.number,
  damping: PropTypes.number,
};

export default Button;
