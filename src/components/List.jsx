import React, { use, useState } from "react";
import axios from "axios";
export default function ContactForm() {
  const [mailSent, setmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ state: "idle" });
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [cityInput, setCityInput] = useState("dff");
  const [list, setList] = useState([{ id: "Fortaleza", text: "Fortaleza" }]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submited");
    // setStatus({ state: "submitting" });

    const form = e.currentTarget;
    const fd = form;
    axios({
      method: "POST",
      url: "https://www.caroltrainer.com/app/contact.php",
      headers: { "content-type": "application/json" },
      data: formValue,
    })
      .then((result) => {
        console.log("kep data ", result);
        if (result.data.success) {
          setmailSent(result.data.success);
          setError(false);
          console.log("kep ", result.data.success);
        } else {
          console.log("kep ", result.data.success);
          setmailSent(false);
          setError(true);
        }
      })
      .catch((error) => setError(error.message));

    // try {
    //   const res = await fetch("https://www.caroltrainer.com/app/contact.php", {
    //     method: "POST",
    //     body: formValue,
    //     // Do NOT set Content-Type; the browser will set it (multipart/form-data)
    //   });

    //   const data = await res.json();

    //   console.log("kep body", formValue);

    //   if (data.success === true) {
    //     setStatus({
    //       state: "success",
    //       message: data.message || "Thanks! We’ll be in touch.",
    //     });
    //     form.reset();
    //   } else if (data.status === "validation_failed") {
    //     const invalid =
    //       (data.invalid_fields || []).map((f) => ({
    //         field: (f.into || "").replace(".wpcf7-form-control-wrap.", ""),
    //         message: f.message,
    //       })) ?? [];
    //     setStatus({
    //       state: "error",
    //       message: data.message || "Please fix the highlighted fields.",
    //       invalid,
    //     });
    //   } else {
    //     setStatus({
    //       state: "error",
    //       message: data.message || "Something went wrong. Please try again.",
    //     });
    //   }
    // } catch (err) {
    //   setStatus({ state: "error", message: err?.message || "Network error." });
    // }
  }

  function handleChange(e) {
    let label = e.target.name;
    setFormValue((prev) => ({ ...prev, [label]: e.target.value }));
  }

  // function errorFor(name) {
  //   if (status.state !== "error" || !status.invalid) return null;
  //   const hit = status.invalid.find((i) => i.field.includes(name));
  //   return hit ? (
  //     <small style={{ color: "crimson" }}>{hit.message}</small>
  //   ) : null;
  // }
  function errorFor(name) {
    if (error !== "error" || !status.invalid) return null;
    const hit = status.invalid.find((i) => i.field.includes(name));
    return hit ? (
      <small style={{ color: "crimson" }}>{hit.message}</small>
    ) : null;
  }

  return (
    <>
      <h3>{error && "Something went wrong. Please try again"}</h3>
      <h3>{mailSent && "Thank you"}</h3>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input
            name="firstName"
            type="text"
            required
            onChange={handleChange}
          />
          {errorFor("firstName")}
        </label>
        <label>
          Last Name
          <input name="lastName" type="text" required onChange={handleChange} />
          {errorFor("lasttName")}
        </label>

        <label>
          Phone
          <input name="phone" type="phone" required onChange={handleChange} />
          {errorFor("phone")}
        </label>

        <label>
          Email
          <input name="email" type="email" required onChange={handleChange} />
          {errorFor("email")}
        </label>

        <label>
          Message
          <textarea name="message" rows={5} onChange={handleChange} />
          {errorFor("message")}
        </label>

        <button type="submit" disabled={status.state === "submitting"}>
          {status.state === "submitting" ? "Sending..." : "Send"}
        </button>

        {status.state === "success" && (
          <p style={{ color: "green" }}>{status.message}</p>
        )}
        {status.state === "error" && (
          <p style={{ color: "crimson" }}>{status.message}</p>
        )}
      </form>
    </>
  );
}
