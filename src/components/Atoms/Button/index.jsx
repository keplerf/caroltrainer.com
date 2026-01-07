import styles from "./Button.module.scss";
import parse from "html-react-parser";

const Button = ({
  appearance = "primary",
  as = "button",
  full = false,
  href,
  children,
  ...props
}) => {
  const ButtonAs = href ? "a" : "button";

  return (
    <ButtonAs
      href={href}
      className={`${styles.btn} ${styles[appearance]} ${full && styles.full}`}
      {...props}
    >
      <span>{parse(children)} </span>
    </ButtonAs>
  );
};

export default Button;
