import styles from "./Typography.module.scss";

const Typography = ({ as = p, invert, children, ...props }) => {
  const Component = as;
  const componentClass = styles.typography;

  return (
    <Component
      className={`${styles.typography} ${invert ? styles.invert : ""}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
