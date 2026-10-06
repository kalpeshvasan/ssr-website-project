"use client";

import Link from "next/link";
import { Sparkles, Terminal, ArrowRight, Zap, Code2, Database } from "lucide-react";
import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";

export default function Home() {
  const { data: metricsData, loading } = useGraphQLQuery(GRAPHQL_QUERIES.GET_METRICS);
  const metrics = (
    metricsData as
      | {
          metrics?: {
            totalUsers: number;
            responseTimeMs: number;
            apiRequestsPerMin: number;
            serverHealth?: string;
          };
        }
      | undefined
  )?.metrics;

  return (
    <>
      {/* Modern Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} /> Next.js 16 + GraphQL Architecture
            </div>
            <h1>
              Build high-performance web apps with{" "}
              <span className="gradient-text">GraphQL & Modern UI</span>
            </h1>
            <p
              style={{
                marginTop: 16,
                marginBottom: 32,
                fontSize: 19,
                color: "var(--text-secondary)",
              }}
            >
              Ultra-fast server-side rendering, dual light/dark themes, glassmorphism UI components,
              and a live interactive GraphQL query playground.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link
                href="/graphql"
                className="btn btn-primary"
                style={{ padding: "14px 28px", fontSize: 16 }}
              >
                <Terminal size={18} /> Launch GraphQL Explorer
              </Link>
              <Link
                href="/ui-kit"
                className="btn btn-secondary"
                style={{ padding: "14px 28px", fontSize: 16 }}
              >
                <Code2 size={18} /> Explore UI Kit
              </Link>
            </div>
          </div>

          {/* Interactive Live GraphQL Code Widget in Hero */}
          <div className="code-window card-glow" style={{ boxShadow: "var(--shadow-glow)" }}>
            <div className="code-header">
              <div className="window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="badge badge-success" style={{ fontSize: 11 }}>
                <span className="pulse-dot" /> Live GraphQL API
              </span>
            </div>
            <pre
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "#38bdf8",
                padding: "20px",
                margin: 0,
                lineHeight: 1.6,
                background: "var(--code-bg)",
                overflow: "auto",
              }}
            >
              <code>
                <span style={{ color: "#c084fc" }}>query</span>{" "}
                <span style={{ color: "#60a5fa" }}>GetLiveMetrics</span> &#123;
                <br />
                {"  "}metrics &#123;
                <br />
                {"    "}totalUsers:{" "}
                <span style={{ color: "#f43f5e" }}>{loading ? "..." : metrics?.totalUsers}</span>
                <br />
                {"    "}responseTime:{" "}
                <span style={{ color: "#34d399" }}>
                  &quot;{metrics ? `${metrics.responseTimeMs}ms` : "..."}&quot;
                </span>
                <br />
                {"    "}serverHealth:{" "}
                <span style={{ color: "#fbbf24" }}>
                  &quot;{metrics?.serverHealth || "OPERATIONAL"}&quot;
                </span>
                <br />
                {"  "}&#125;
                <br />
                &#125;
              </code>
            </pre>
            <div
              style={{
                padding: "12px 20px",
                background: "rgba(255,255,255,0.03)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 12,
                color: "#94a3b8",
              }}
            >
              <span>Endpoint: POST /api/graphql</span>
              <Link
                href="/graphql"
                style={{
                  color: "var(--accent-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Run Query <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live GraphQL Stats Section */}
      <section
        className="section"
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container">
          <div className="grid grid-4" style={{ gap: 24 }}>
            <div className="card center card-glow">
              <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600 }}>
                Total Active Users
              </span>
              <strong
                style={{
                  fontSize: 40,
                  fontFamily: "var(--font-heading)",
                  margin: "8px 0",
                  display: "block",
                }}
                className="gradient-text"
              >
                {metrics ? metrics.totalUsers.toLocaleString() : "14,250+"}
              </strong>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                Fetched via GraphQL Query
              </span>
            </div>

            <div className="card center card-glow">
              <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600 }}>
                Avg Response Latency
              </span>
              <strong
                style={{
                  fontSize: 40,
                  fontFamily: "var(--font-heading)",
                  margin: "8px 0",
                  display: "block",
                }}
                className="gradient-text"
              >
                {metrics ? `${metrics.responseTimeMs}ms` : "< 5ms"}
              </strong>
              <span style={{ fontSize: 13, color: "#10b981", fontWeight: 600 }}>
                Sub-millisecond GraphQL engine
              </span>
            </div>

            <div className="card center card-glow">
              <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600 }}>
                API Throughput
              </span>
              <strong
                style={{
                  fontSize: 40,
                  fontFamily: "var(--font-heading)",
                  margin: "8px 0",
                  display: "block",
                }}
                className="gradient-text"
              >
                {metrics ? `${metrics.apiRequestsPerMin}/m` : "3,840/m"}
              </strong>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                Real-time Query Stream
              </span>
            </div>

            <div className="card center card-glow">
              <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600 }}>
                SLA Availability
              </span>
              <strong
                style={{
                  fontSize: 40,
                  fontFamily: "var(--font-heading)",
                  margin: "8px 0",
                  display: "block",
                }}
                className="gradient-text"
              >
                99.98%
              </strong>
              <span style={{ fontSize: 13, color: "#10b981", fontWeight: 600 }}>
                Zero downtime deployments
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow">
              <Zap size={14} /> Full Stack Architecture
            </div>
            <h2>Everything you need for modern production applications</h2>
            <p>
              Designed with glassmorphic aesthetic, flexible GraphQL resolvers, and prebuilt UI
              templates.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 28 }}>
            <div className="card card-glass card-glow">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--accent-primary-light)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 20,
                }}
              >
                <Terminal size={24} className="gradient-text" />
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 10 }}>Interactive GraphQL Explorer</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
                Test GraphQL queries, inspect variables, view syntax-highlighted JSON responses, and
                execute live mutations in browser.
              </p>
            </div>

            <div className="card card-glass card-glow">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--accent-primary-light)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 20,
                }}
              >
                <Sparkles size={24} className="gradient-text" />
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 10 }}>Dual Light / Dark SaaS Theme</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
                Built-in CSS variables, glassmorphic cards, radiant glows, fluid typography, and
                zero-flash theme switching.
              </p>
            </div>

            <div className="card card-glass card-glow">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--accent-primary-light)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 20,
                }}
              >
                <Database size={24} className="gradient-text" />
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 10 }}>Type-Safe Schema Resolvers</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
                Next.js Route Handlers at `/api/graphql` powered by `@graphql-tools/schema` and
                custom React hooks (`useGraphQLQuery`).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="section"
        style={{ background: "var(--accent-gradient-glow)", textAlign: "center" }}
      >
        <div className="container">
          <div
            className="card card-glass card-glow"
            style={{ padding: "64px 32px", maxWidth: 800, margin: "0 auto" }}
          >
            <div className="eyebrow" style={{ display: "inline-flex", margin: "0 auto 16px" }}>
              Ready to explore?
            </div>
            <h2 style={{ fontSize: 38, marginBottom: 16 }}>Start querying with GraphQL now</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 18, marginBottom: 32 }}>
              Experience the live GraphQL query runner, inspect metrics, and toggle feature flags in
              real-time.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/graphql"
                className="btn btn-primary"
                style={{ padding: "14px 32px", fontSize: 16 }}
              >
                Open GraphQL Playground <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
