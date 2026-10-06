"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Building2, TrendingUp, Database } from "lucide-react";

export default function CaseStudiesPage() {
  const { data, loading, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_CASE_STUDIES);
  const studies = data?.caseStudies || [];

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `caseStudies`
        </div>
        <h2>Enterprise Case Studies</h2>
        <p>Real-world results achieved by teams deploying NovaFlow's GraphQL engine.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `caseStudies` query...</div>
      ) : (
        <div className="grid grid-2" style={{ gap: 28 }}>
          {studies.map((item: any) => (
            <div key={item.id} className="card card-glow" style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span className="badge" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)" }}>
                  {item.industry}
                </span>
                <strong style={{ fontSize: 18, fontFamily: "var(--font-heading)" }}>{item.logoText}</strong>
              </div>
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 24 }}>{item.summary}</p>
              
              <div style={{ padding: 16, background: "var(--bg-app)", borderRadius: 12, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
                <TrendingUp size={28} style={{ color: "#10b981", flexShrink: 0 }} />
                <div>
                  <strong style={{ fontSize: 24, display: "block" }} className="gradient-text">{item.resultMetric}</strong>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.resultLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
