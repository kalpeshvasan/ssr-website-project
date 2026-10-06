"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { HelpCircle, Database } from "lucide-react";

export default function FAQPage() {
  const { data, loading, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_FAQS);
  const faqs = data?.faqs || [];

  return (
    <div className="container section" style={{ maxWidth: 880 }}>
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `faqs`
        </div>
        <h2>Frequently Asked Questions</h2>
        <p>Answers to common questions regarding our GraphQL API, Next.js App Router setup, and UI components.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `faqs` query...</div>
      ) : (
        <div className="stack" style={{ gap: 20 }}>
          {faqs.map((item: any) => (
            <div key={item.id} className="card card-glow" style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h3 style={{ fontSize: 18, color: "var(--text-primary)" }}>{item.question}</h3>
                <span className="badge" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)", fontSize: 11 }}>
                  {item.category}
                </span>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.6 }}>{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
