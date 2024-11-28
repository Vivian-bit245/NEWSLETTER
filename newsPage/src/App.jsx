import React, { useState } from "react";
import "./App.css";
const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("Please enter a valid email");
      return;
    }

    setLoading(true);
    setStatus("Submitting...");

    try {
      const response = await fetch("http://localhost:5003/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("Successfully subscribed!");
      } else {
        setStatus("Something went wrong. Try again!");
      }
    } catch (error) {
      setStatus("Error connecting to the server.");
    }
    setLoading(false);
  };

  return (
    <section className="secNewsletter">
      <div className="newsletter-signup">
        <div className="newsletter-content">
          <h2>
            Stay inspired by stories of how GLAD Technology is creating
            opportunities and transforming lives globally. Sign up for our email
            newsletter.
          </h2>
          <div className="mailchimp-form">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={loading}>
                {loading ? "Subscribing..." : "Sign Up"}
              </button>
            </form>
          </div>
          {status && <p>{status}</p>}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
