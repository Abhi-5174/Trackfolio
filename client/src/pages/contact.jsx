import React, { useState } from "react";
import "../styles/contact.css";
import { Chatbot } from "../components/chatBot";

const Contact = () => {
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const URL = `${BACKEND_URL}/contact`;
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          alert("Failed to submit the form. Please try again later.");
          setIsSubmitting(false);
          return;
        }

        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        console.error("Submission error:", error);
        alert("Error submitting form: " + error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="contact-container">
      {/* Contact Form */}
      <div className="contact-form-container">
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <label>Message</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
          ></textarea>
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

          <button type="submit" className="contact-button" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Address Box */}
      <div className="address-box">
        <h2>Our Address</h2>
        <p>🏢 Investment Portfolio Tracker</p>
        <p>📍 123 Finance Street, New Delhi, NY 10001</p>
        <p>📞 Phone: +91 123456789</p>
        <p>📧 Email: abckewat@gmail.com</p>
        <p>⏰ Business Hours: Mon-Fri, 9 AM - 5 PM</p>
      </div>

      <Chatbot />
    </div>
  );
};

export default Contact;