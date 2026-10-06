"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Briefcase, MapPin, DollarSign, Database } from "lucide-react";

export default function CareersPage() {
  const { data, loading, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_CAREERS);
  const jobs = data?.careers || [];

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `careers`
        </div>
        <h2>Open Engineering Positions</h2>
        <p>Join the team building the future of GraphQL & Next.js web performance.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `careers` query...</div>
      ) : (
        <div className="stack" style={{ gap: 20 }}>
          {jobs.map((job: any) => (
            <div key={job.id} className="card card-glow" style={{ padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                  <h3 style={{ fontSize: 20 }}>{job.title}</h3>
                  <span className="badge" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)" }}>{job.department}</span>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--text-muted)" }}>
                  <span>📍 {job.location}</span>
                  <span>💼 {job.type}</span>
                  <span style={{ color: "#10b981", fontWeight: 600 }}>💰 {job.salary}</span>
                </div>
              </div>
              <button className="btn btn-primary" style={{ height: 40, padding: "0 20px", fontSize: 14 }}>
                Apply via GraphQL
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
