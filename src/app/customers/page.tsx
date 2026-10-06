"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Star, Database } from "lucide-react";
import Image from "next/image";

export default function CustomersPage() {
  const { data, loading, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_CUSTOMERS);
  const customers = data?.customers || [];

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `customers`
        </div>
        <h2>Customer Wall of Love</h2>
        <p>Verified testimonials and feedback retrieved directly via GraphQL query resolvers.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `customers` query...</div>
      ) : (
        <div className="grid grid-2" style={{ gap: 28 }}>
          {customers.map((item: any) => (
            <div key={item.id} className="card card-glow" style={{ padding: 28 }}>
              <div style={{ display: "flex", gap: 4, color: "#fbbf24", marginBottom: 16 }}>
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#fbbf24" />
                ))}
              </div>
              <p style={{ fontSize: 17, fontStyle: "italic", marginBottom: 24, color: "var(--text-primary)" }}>
                "{item.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={44}
                  height={44}
                  style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <strong style={{ fontSize: 15, display: "block" }}>{item.name}</strong>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.role}, {item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
