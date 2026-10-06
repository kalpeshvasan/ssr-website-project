"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Zap, Code2, Layers, CheckCircle, Terminal, SunMoon, Database } from "lucide-react";

export default function FeaturesPage() {
  const { data, loading, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_FEATURES);
  const features = data?.features || [];

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `features`
        </div>
        <h2>Full-Stack System Features</h2>
        <p>Explore the full feature matrix queried live from the Next.js GraphQL endpoint.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `features` query...</div>
      ) : (
        <div className="grid grid-3" style={{ gap: 28 }}>
          {features.map((feat: any) => (
            <div key={feat.id} className="card card-glow">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span className="badge" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)" }}>
                  {feat.category}
                </span>
                {feat.badge && <span className="badge badge-success" style={{ fontSize: 11 }}>{feat.badge}</span>}
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 10 }}>{feat.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{feat.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
