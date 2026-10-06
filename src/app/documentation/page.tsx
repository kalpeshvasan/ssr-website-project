"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { BookOpen, ArrowRight, Database } from "lucide-react";
import Link from "next/link";

export default function DocumentationPage() {
  const { data, loading, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_DOCS);
  const articles = data?.documentation || [];

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `documentation`
        </div>
        <h2>Documentation & Guides</h2>
        <p>Developer guides, GraphQL schema definitions, and Next.js client integration manuals.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `documentation` query...</div>
      ) : (
        <div className="grid grid-3" style={{ gap: 24 }}>
          {articles.map((art: any) => (
            <div key={art.id} className="card card-glow" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="badge" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)", marginBottom: 12 }}>
                  {art.section}
                </span>
                <h3 style={{ fontSize: 20, marginBottom: 8 }}>{art.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 20 }}>{art.summary}</p>
              </div>

              <div style={{ paddingTop: 12, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{art.readTime}</span>
                <Link href="/graphql" style={{ color: "var(--accent-primary)", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  Read in Playground <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
