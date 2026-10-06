"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Zap, CheckCircle, Database } from "lucide-react";

export default function IntegrationsPage() {
  const { data, loading, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_INTEGRATIONS);
  const integrations = data?.integrations || [];

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `integrations`
        </div>
        <h2>Integrations & Ecosystem</h2>
        <p>Integrate GraphQL Schema Gateway with your existing Next.js, Prisma, Apollo, and Vercel infrastructure.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `integrations` query...</div>
      ) : (
        <div className="grid grid-2" style={{ gap: 24 }}>
          {integrations.map((item: any) => (
            <div key={item.id} className="card card-glow" style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span className="badge" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)" }}>
                  {item.category}
                </span>
                <span className="badge badge-success" style={{ fontSize: 11 }}>
                  <CheckCircle size={12} /> {item.status}
                </span>
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 8 }}>{item.name}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
