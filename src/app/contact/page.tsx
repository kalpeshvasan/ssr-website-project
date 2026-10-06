"use client";

import { useState } from "react";
import { useGraphQLMutation } from "@/lib/graphql/hooks";
import { GRAPHQL_MUTATIONS } from "@/lib/graphql/client";
import { Send, CheckCircle, Mail, Database } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { executeMutation, loading, error, executionTime } = useGraphQLMutation(GRAPHQL_MUTATIONS.SUBMIT_CONTACT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await executeMutation({ name, email, message });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container section" style={{ maxWidth: 680 }}>
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Mutation: `submitContactMessage`
        </div>
        <h2>Get in Touch</h2>
        <p>Send a direct message. Submission payload is processed through an executable GraphQL mutation.</p>
      </div>

      <div className="card card-glass card-glow" style={{ padding: 32 }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "32px 16px" }}>
            <CheckCircle size={48} style={{ color: "#10b981", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 24, marginBottom: 8 }}>Message Sent via GraphQL!</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 16 }}>
              Mutation processed in <strong className="gradient-text">{executionTime}ms</strong>. We will get back to you shortly.
            </p>
            <button
              onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); }}
              className="btn btn-outline"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="stack" style={{ gap: 20 }}>
            {error && (
              <div style={{ padding: 12, background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", borderRadius: 8, fontSize: 14 }}>
                GraphQL Error: {error}
              </div>
            )}

            <div>
              <label className="label">Your Name</label>
              <input
                type="text"
                className="input"
                required
                placeholder="Alex Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input"
                required
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Message</label>
              <textarea
                className="textarea"
                rows={4}
                required
                placeholder="Describe your GraphQL architecture inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%" }}>
              {loading ? "Executing GraphQL Mutation..." : "Submit Message via GraphQL"} <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
