"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Download, FileText, Database } from "lucide-react";

export default function ResourcesPage() {
  const { data, loading, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_RESOURCES);
  const resources = data?.resources || [];

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `resources`
        </div>
        <h2>Developer Resources & Downloads</h2>
        <p>Cheatsheets, architectural blueprints, and starter templates queried live via GraphQL.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `resources` query...</div>
      ) : (
        <div className="grid grid-2" style={{ gap: 24 }}>
          {resources.map((item: any) => (
            <div key={item.id} className="card card-glow" style={{ padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span className="badge" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)", marginBottom: 8 }}>
                  {item.type} ({item.format})
                </span>
                <h3 style={{ fontSize: 18, marginBottom: 6 }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{item.description}</p>
              </div>

              <button className="btn btn-outline" style={{ height: 40, padding: "0 16px", fontSize: 13, gap: 6 }}>
                <Download size={16} /> Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
