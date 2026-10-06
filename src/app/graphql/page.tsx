"use client";

import { useState } from "react";
import { GraphQLExplorer } from "@/ui-kit/components/GraphQLExplorer";
import { GraphQLDashboardView } from "@/ui-kit/components/GraphQLDashboardView";
import { Code2, LayoutDashboard, Terminal, CheckCircle2, Zap, Database, ArrowRight, ShieldAlert } from "lucide-react";

export default function GraphQLHubPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "explorer" | "docs">("dashboard");

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
      {/* Hero Header */}
      <div className="section-heading" style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="eyebrow" style={{ display: "inline-flex", margin: "0 auto 16px" }}>
          <Zap size={14} /> Full-Stack GraphQL Hub
        </div>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          Modern GraphQL API & <span className="gradient-text">Interactive Playground</span>
        </h1>
        <p style={{ maxWidth: 680, margin: "16px auto 0" }}>
          Powered by Next.js Route Handlers, executable schemas, type-safe client hooks, and live real-time query execution.
        </p>
      </div>

      {/* Tabs Control */}
      <div className="tabs-header" style={{ justifyContent: "center", marginBottom: 36 }}>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <LayoutDashboard size={18} />
          <span>Live Data Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab("explorer")}
          className={`tab-btn ${activeTab === "explorer" ? "active" : ""}`}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <Terminal size={18} />
          <span>GraphQL Explorer & Playground</span>
        </button>

        <button
          onClick={() => setActiveTab("docs")}
          className={`tab-btn ${activeTab === "docs" ? "active" : ""}`}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <Code2 size={18} />
          <span>GraphQL vs REST Architecture</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "dashboard" && <GraphQLDashboardView />}

      {activeTab === "explorer" && <GraphQLExplorer />}

      {activeTab === "docs" && (
        <div className="stack gap-6">
          <div className="grid grid-2" style={{ gap: 24 }}>
            <div className="card card-glass card-glow">
              <h3 style={{ fontSize: 22, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle2 size={24} style={{ color: "#10b981" }} />
                Why GraphQL in NovaFlow?
              </h3>
              <ul className="stack" style={{ listStyle: "none", gap: 14 }}>
                <li style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>✓</span>
                  <div>
                    <strong>No Over-fetching or Under-fetching</strong>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                      Clients declare the exact shape of data required. Only the requested fields are sent over the wire.
                    </p>
                  </div>
                </li>
                <li style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>✓</span>
                  <div>
                    <strong>Single Endpoint Architecture (`/api/graphql`)</strong>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                      Eliminates dozens of REST API endpoints. Fetch multiple data sources in a single HTTP request.
                    </p>
                  </div>
                </li>
                <li style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>✓</span>
                  <div>
                    <strong>Strongly Typed Schema</strong>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                      Self-documenting types (`MetricData`, `ServiceItem`, `FeatureFlag`) with compile-time & runtime validation.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card card-glass">
              <h3 style={{ fontSize: 22, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <Database size={24} className="gradient-text" />
                GraphQL API Route Reference
              </h3>
              <div className="code-window" style={{ marginBottom: 16 }}>
                <div className="code-header">
                  <span style={{ color: "#fff", fontSize: 12, fontFamily: "var(--font-mono)" }}>POST /api/graphql</span>
                </div>
                <pre style={{ color: "#38bdf8", padding: 16, margin: 0, fontSize: 13, fontFamily: "var(--font-mono)" }}>
{`// Sample fetch call in Next.js
const res = await fetch("/api/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: \`query { metrics { totalUsers uptimePercentage } }\`
  })
});`}
                </pre>
              </div>

              <div style={{ padding: 16, background: "var(--bg-app)", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14 }}>
                <strong>HTTP Response Headers:</strong>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, marginTop: 6, color: "var(--text-secondary)" }}>
                  X-GraphQL-Execution-Time: 4.2ms<br />
                  Content-Type: application/json
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
