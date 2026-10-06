"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Activity, Server, Cpu, ShieldCheck, Database, RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const { data, loading, refetch, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_METRICS);
  const metrics = data?.metrics;

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `metrics`
        </div>
        <h2>Real-Time GraphQL Operations Dashboard</h2>
        <p>Live metrics telemetry stream fetched from the GraphQL endpoint.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <button onClick={() => refetch()} className="btn btn-outline" style={{ height: 38, fontSize: 13, gap: 6 }}>
          <RefreshCw size={14} /> Refresh GraphQL Telemetry
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `metrics` query...</div>
      ) : (
        <div className="grid grid-4" style={{ gap: 20 }}>
          <div className="card card-glow">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Total Users</span>
              <Activity size={20} className="gradient-text" />
            </div>
            <strong style={{ fontSize: 36, fontFamily: "var(--font-heading)" }}>
              {metrics?.totalUsers.toLocaleString()}
            </strong>
            <span style={{ fontSize: 12, color: "#10b981", marginTop: 4, display: "block" }}>Live GraphQL resolver payload</span>
          </div>

          <div className="card card-glow">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Req / Min</span>
              <Server size={20} className="gradient-text" />
            </div>
            <strong style={{ fontSize: 36, fontFamily: "var(--font-heading)" }}>
              {metrics?.apiRequestsPerMin.toLocaleString()}
            </strong>
            <span style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, display: "block" }}>Latency: {metrics?.responseTimeMs}ms</span>
          </div>

          <div className="card card-glow">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>SLA Uptime</span>
              <ShieldCheck size={20} style={{ color: "#10b981" }} />
            </div>
            <strong style={{ fontSize: 36, fontFamily: "var(--font-heading)" }}>
              {metrics?.uptimePercentage}%
            </strong>
            <span style={{ fontSize: 12, color: "#10b981", marginTop: 4, display: "block" }}>System Operational</span>
          </div>

          <div className="card card-glow">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Active Streams</span>
              <Cpu size={20} className="gradient-text" />
            </div>
            <strong style={{ fontSize: 36, fontFamily: "var(--font-heading)" }}>
              {metrics?.activeQueriesCount}
            </strong>
            <span style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, display: "block" }}>GraphQL Query Threads</span>
          </div>
        </div>
      )}
    </div>
  );
}
