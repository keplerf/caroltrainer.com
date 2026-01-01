import { useState } from "react";
import axios from "axios";
import styles from "./ContactForm.module.scss";

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle" });
  const [errors, setErrors] = useState([]);
  const [honeypotStatus, setHoneypotStatus] = useState(false);
  const [touched, setTouched] = useState({});
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  function validateForm() {
    const newErrors = [];

    if (!formValue.firstName.trim()) {
      newErrors.push({ field: "firstName", message: "First name is required" });
    }

    if (!formValue.lastName.trim()) {
      newErrors.push({ field: "lastName", message: "Last name is required" });
    }

    if (!formValue.phone.trim()) {
      newErrors.push({ field: "phone", message: "Phone number is required" });
    }

    if (!formValue.email.trim()) {
      newErrors.push({ field: "email", message: "Email is required" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue.email)) {
      newErrors.push({ field: "email", message: "Please enter a valid email address" });
    }

    return newErrors;
  }

  function getFieldError(fieldName) {
    return errors.find((e) => e.field === fieldName)?.message;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setTouched({ firstName: true, lastName: true, phone: true, email: true });
      return;
    }

    setStatus({ state: "submitting" });
    setErrors([]);

    try {
      const result = await axios({
        method: "POST",
        url: "https://www.caroltrainer.com/app/contact.php",
        headers: { "content-type": "application/json" },
        data: formValue,
      });

      if (result.data.success) {
        setStatus({ state: "submitted" });
      } else {
        setErrors(
          result.data.errors?.map((msg, i) => ({ field: "server", message: msg })) ||
          [{ field: "server", message: "Something went wrong" }]
        );
        setStatus({ state: "error" });
      }
    } catch (err) {
      setErrors([{ field: "server", message: "Failed to send message. Please try again." }]);
      setStatus({ state: "error" });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));

    if (name === "midName" && value) {
      setHoneypotStatus(true);
    }

    if (touched[name]) {
      setErrors((prev) => prev.filter((err) => err.field !== name));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  const isSubmitting = status.state === "submitting";
  const serverErrors = errors.filter((e) => e.field === "server");

  return (
    <div className={styles.section} id="contact">
      {status.state === "submitted" ? (
        <div className={styles.successMessage} role="status" aria-live="polite">
          <h3>Thank you!</h3>
          <p>Your message has been sent. We'll be in touch soon.</p>
        </div>
      ) : (
        <div>
          <h3>Contact</h3>
          <form onSubmit={handleSubmit} noValidate className={styles.form} aria-label="Contact form">
            <div className={styles.fieldGroup}>
              <label htmlFor="firstName" className={styles.label}>
                First Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                aria-required="true"
                aria-invalid={touched.firstName && getFieldError("firstName") ? "true" : undefined}
                aria-describedby={getFieldError("firstName") ? "firstName-error" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.firstName && getFieldError("firstName") && (
                <span id="firstName-error" className={styles.fieldError} role="alert">
                  {getFieldError("firstName")}
                </span>
              )}
            </div>

            {/* Honeypot field - hidden from real users */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
              <label htmlFor="midName">Leave this empty</label>
              <input
                id="midName"
                name="midName"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                aria-required="true"
                aria-invalid={touched.lastName && getFieldError("lastName") ? "true" : undefined}
                aria-describedby={getFieldError("lastName") ? "lastName-error" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.lastName && getFieldError("lastName") && (
                <span id="lastName-error" className={styles.fieldError} role="alert">
                  {getFieldError("lastName")}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone <span aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                aria-required="true"
                aria-invalid={touched.phone && getFieldError("phone") ? "true" : undefined}
                aria-describedby={getFieldError("phone") ? "phone-error" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.phone && getFieldError("phone") && (
                <span id="phone-error" className={styles.fieldError} role="alert">
                  {getFieldError("phone")}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={touched.email && getFieldError("email") ? "true" : undefined}
                aria-describedby={getFieldError("email") ? "email-error" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.email && getFieldError("email") && (
                <span id="email-error" className={styles.fieldError} role="alert">
                  {getFieldError("email")}
                </span>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </div>

            {serverErrors.length > 0 && (
              <div className={styles.serverError} role="alert" aria-live="assertive">
                {serverErrors.map((err, index) => (
                  <p key={index}>{err.message}</p>
                ))}
              </div>
            )}

            <button
              className={styles.button}
              type="submit"
              disabled={honeypotStatus || isSubmitting}
              aria-disabled={honeypotStatus || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
