import styles from "./Typography.module.scss";

const Typography = ({ as = "p", invert, children, center, ...props }) => {
  const Component = as;
  const componentClass = styles.typography;

  return (
    <Component
      className={`${styles.typography} ${invert ? styles.invert : ""} ${
        center ? styles.center : ""
      }`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
