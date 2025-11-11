import { useState } from "react";
import axios from "axios";
import styles from "./ContactForm.module.scss";
export default function ContactForm() {
  const [mailSent, setmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ state: "idle" });
  const [honeypotStatus, sethoneypotStatus] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submited");
    setStatus({ state: "submitting" });

    const form = e.currentTarget;
    const fd = form;
    axios({
      method: "POST",
      url: "https://www.caroltrainer.com/app/contact.php",
      headers: { "content-type": "application/json" },
      data: formValue,
    })
      .then((result) => {
        if (result.data.success) {
          setmailSent(result.data.success);
          setStatus({ state: "submited" });
          setError(false);
        } else {
          setmailSent(false);
          // console.log("result", result.data.errors);
          setError(result.data.errors);
        }
      })
      .catch((error) => {
        setError(error);
      });
    console.log("kep", error);
  }

  function honeypotActive(e) {
    if (e.name === "midName" && e.value) {
      sethoneypotStatus(true);
      return true;
    }
    sethoneypotStatus(false);
    return false;
  }

  function handleChange(e) {
    let label = e.target.name;
    setFormValue((prev) => ({ ...prev, [label]: e.target.value }));
    honeypotActive(e.target);
  }

  return (
    <div className={styles.section} id="contact">
      {status.state === "submited" ? (
        <h3>Thank you</h3>
      ) : (
        <div>
          <h3>Contact</h3>
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <label>
              <input
                placeholder="Name"
                name="firstName"
                type="text"
                required
                onChange={handleChange}
              />
            </label>
            <label style={{ height: 0, overflow: "hidden", display: "block" }}>
              <input
                name="midName"
                type="text"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                placeholder=" Last Name"
                name="lastName"
                type="text"
                required
                onChange={handleChange}
              />
            </label>

            <label>
              <input
                placeholder="Phone"
                name="phone"
                type="phone"
                required
                onChange={handleChange}
              />
            </label>

            <label>
              <input
                placeholder="Email"
                name="email"
                type="email"
                required
                onChange={handleChange}
              />
            </label>

            <label>
              <textarea
                placeholder=" Message"
                name="message"
                rows={5}
                onChange={handleChange}
              />
            </label>
            {error &&
              error.map((i) => {
                return <p>* {i}</p>;
              })}

            {error && (
              <>
                <h3>"Something went wrong. Please try again"</h3>
              </>
            )}

            <button
              className={styles.button}
              type="submit"
              disabled={honeypotStatus}
            >
              {status.state === "submitting"
                ? !Error
                  ? "Sending..."
                  : "Try again"
                : "Send"}
            </button>

            {status.state === "success" && (
              <p style={{ color: "green" }}>{status.message}</p>
            )}
            {status.state === "error" && (
              <p style={{ color: "crimson" }}>{status.message}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
