"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Activity } from "lucide-react";

export function GraphQLStatusBadge() {
  const { data, loading, error, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_METRICS);

  if (loading) {
    return (
      <div className="badge badge-warning">
        <span className="pulse-dot" /> GraphQL Connecting...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="badge" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}>
        <Activity size={13} /> GraphQL Offline
      </div>
    );
  }

  return (
    <div className="badge badge-success" title={`Server Health: ${data.metrics.serverHealth} (${executionTime}ms response)`}>
      <span className="pulse-dot" />
      <span>GraphQL Live</span>
      <span style={{ opacity: 0.7, fontSize: "11px", marginLeft: "2px" }}>{executionTime}ms</span>
    </div>
  );
}
