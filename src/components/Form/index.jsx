import { useState, useEffect } from "react";
import styles from "./ContactForm.module.scss";
import { FormField } from "./FormField";
import { useGetParamsFromURL } from "/src/hooks/useGetParamsFromURL";
import Button from "../Atoms/Button";

const SERVER_POST = "https://www.caroltrainer.com/app/contact.php";

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service..." },
  { value: "1-on-1-personal-training", label: "1-on-1 Personal Training" },
  { value: "semi-private-training", label: "Semi-Private Training" },
  { value: "custom-fitness-programs", label: "Custom Fitness Programs" },
  { value: "other", label: "Other / Not sure" },
];

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle" });
  const [errors, setErrors] = useState([]);
  const [honeypotStatus, setHoneypotStatus] = useState(false);
  const [touched, setTouched] = useState({});
  const [formValue, setFormValue] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    function updateServiceFromURL() {
      const serviceFromURL = useGetParamsFromURL("service");
      const isValidService = SERVICE_OPTIONS.some(
        (opt) => opt.value === serviceFromURL
      );
      if (serviceFromURL && isValidService) {
        setFormValue((prev) => ({ ...prev, service: serviceFromURL }));
      }
    }

    updateServiceFromURL();
    window.addEventListener("hashchange", updateServiceFromURL);
    return () => window.removeEventListener("hashchange", updateServiceFromURL);
  }, []);

  function getFieldError(fieldName) {
    return errors.find((e) => e.field === fieldName)?.message;
  }

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
      newErrors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    }

    return newErrors;
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
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
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
      const result = await axios.post(SERVER_POST, formValue, {
        headers: { "content-type": "application/json" },
      });

      if (result.data.success) {
        setStatus({ state: "submitted" });
      } else {
        const serverErrors = result.data.errors?.map((msg) => ({
          field: "server",
          message: msg,
        })) || [{ field: "server", message: "Something went wrong" }];
        setErrors(serverErrors);
        setStatus({ state: "error" });
      }
    } catch {
      setErrors([
        {
          field: "server",
          message: "Failed to send message. Please try again.",
        },
      ]);
      setStatus({ state: "error" });
    }
  }

  const isSubmitting = status.state === "submitting";
  const serverErrors = errors.filter((e) => e.field === "server");

  if (status.state === "submitted") {
    return (
      <section className={styles.wrapper} id="contact">
        <div className={styles.container}>
          <div
            className={styles.successMessage}
            role="status"
            aria-live="polite"
          >
            <div className={styles.successIcon} aria-hidden="true">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Thank you!</h3>
            <p>
              Your message has been sent successfully. We'll be in touch within
              24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={styles.wrapper}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="contact-heading" className={styles.title}>
            Get In Touch
          </h2>
          <p className={styles.subtitle}>
            Ready to start your fitness journey? Send us a message and we'll get
            back to you shortly.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          noValidate
          className={styles.form}
          aria-label="Contact form"
        >
          <div className={styles.row}>
            <FormField
              id="firstName"
              label="First Name"
              required
              error={getFieldError("firstName")}
              touched={touched.firstName}
            >
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                required
                aria-required="true"
                aria-invalid={
                  touched.firstName && getFieldError("firstName")
                    ? "true"
                    : undefined
                }
                aria-describedby={
                  getFieldError("firstName") ? "firstName-error" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </FormField>

            <FormField
              id="lastName"
              label="Last Name"
              required
              error={getFieldError("lastName")}
              touched={touched.lastName}
            >
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                required
                aria-required="true"
                aria-invalid={
                  touched.lastName && getFieldError("lastName")
                    ? "true"
                    : undefined
                }
                aria-describedby={
                  getFieldError("lastName") ? "lastName-error" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </FormField>
          </div>

          {/* Honeypot field */}
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px" }}
          >
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

          <div className={styles.row}>
            <FormField
              id="phone"
              label="Phone"
              required
              error={getFieldError("phone")}
              touched={touched.phone}
            >
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(604) 555-0123"
                required
                aria-required="true"
                aria-invalid={
                  touched.phone && getFieldError("phone") ? "true" : undefined
                }
                aria-describedby={
                  getFieldError("phone") ? "phone-error" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </FormField>

            <FormField
              id="email"
              label="Email"
              required
              error={getFieldError("email")}
              touched={touched.email}
            >
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                aria-required="true"
                aria-invalid={
                  touched.email && getFieldError("email") ? "true" : undefined
                }
                aria-describedby={
                  getFieldError("email") ? "email-error" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
            </FormField>
          </div>

          <FormField id="service" label="Service Interested In">
            <select
              id="service"
              name="service"
              value={formValue.service}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="message" label="Message">
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your fitness goals..."
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
          </FormField>

          {serverErrors.length > 0 && (
            <div
              className={styles.serverError}
              role="alert"
              aria-live="assertive"
            >
              {serverErrors.map((err, index) => (
                <p key={index}>{err.message}</p>
              ))}
            </div>
          )}

          <Button full type="submit" disabled={honeypotStatus || isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
}
