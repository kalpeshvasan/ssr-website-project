"use client";

import { useState } from "react";
import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Database } from "lucide-react";
import { ServiceItem } from "@/lib/graphql/schema";

interface ServicesClientViewProps {
  initialServices: ServiceItem[];
  initialExecutionTime: number;
}

export function ServicesClientView({
  initialServices,
  initialExecutionTime,
}: ServicesClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const isFiltering = selectedCategory !== "All" || search.trim() !== "";

  const { data, loading, executionTime } = useGraphQLQuery<{ services: ServiceItem[] }>(
    GRAPHQL_QUERIES.GET_SERVICES,
    {
      category: selectedCategory,
      search: search,
    }
  );

  // Use live client query data if filtering/querying, otherwise default to server-side pre-rendered initialServices
  const services = isFiltering ? data?.services || [] : data?.services || initialServices;
  const latency = isFiltering ? executionTime : initialExecutionTime;

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> Server-Side Pre-Rendered (SSR) + GraphQL
        </div>
        <h2>Microservices & Solutions Catalog</h2>
        <p>
          All microservices listed below are pre-rendered on the server via GraphQL (SSR) so they appear instantly in <strong>View Source</strong> and search engines.
        </p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL SSR Latency: {latency}ms
        </span>
      </div>

      {/* Filter and Search controls */}
      <div className="card card-glass" style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["All", "Architecture", "Gateway", "Client", "Performance", "Security"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? "btn-primary" : "btn-outline"}`}
                style={{ height: 36, padding: "0 16px", fontSize: 13 }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ minWidth: 260 }}>
            <input
              type="text"
              className="input"
              style={{ height: 38, fontSize: 14 }}
              placeholder="Search via GraphQL..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {isFiltering && loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
          Executing GraphQL Filter Query...
        </div>
      ) : services.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>
          No services matched your GraphQL query.
        </div>
      ) : (
        <div className="grid grid-3" style={{ gap: 24 }}>
          {services.map((srv: ServiceItem) => (
            <div key={srv.id} className="card card-glow">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span className="badge badge-success" style={{ fontSize: 12 }}>
                  {srv.category}
                </span>
                <strong style={{ fontSize: 20, color: "var(--accent-primary)" }}>
                  ${srv.price}
                  <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 400 }}>
                    /mo
                  </span>
                </strong>
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 8 }}>{srv.title}</h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  marginBottom: 20,
                  minHeight: 48,
                }}
              >
                {srv.description}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 12,
                  borderTop: "1px solid var(--border)",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                <span>Rating: {srv.rating} / 5</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>
                  GraphQL ID: {srv.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
