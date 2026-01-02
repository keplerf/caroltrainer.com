import styles from "./ContactForm.module.scss";

export function FormField({ id, label, required, error, touched, children }) {
  const showError = touched && error;

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {children}
      {showError && (
        <span id={`${id}-error`} className={styles.fieldError} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
