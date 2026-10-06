"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { User, Key, Shield, HardDrive, Database } from "lucide-react";

export default function AccountPage() {
  const { data, loading, executionTime } = useGraphQLQuery(GRAPHQL_QUERIES.GET_USER_PROFILE);
  const profile = data?.userProfile;

  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> GraphQL Query: `userProfile`
        </div>
        <h2>User Account Profile</h2>
        <p>Developer credentials and subscription status queried live via GraphQL.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL Query Latency: {executionTime}ms
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Executing GraphQL `userProfile` query...</div>
      ) : profile ? (
        <div className="card card-glass card-glow" style={{ padding: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent-gradient)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 24 }}>
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 style={{ fontSize: 22, marginBottom: 4 }}>{profile.name}</h3>
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{profile.email}</span>
            </div>
            <span className="badge badge-success" style={{ marginLeft: "auto" }}>{profile.tier}</span>
          </div>

          <div className="stack" style={{ gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dashed var(--border)" }}>
              <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Role</span>
              <strong style={{ fontSize: 14 }}>{profile.role}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dashed var(--border)" }}>
              <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Active API Keys</span>
              <strong style={{ fontSize: 14 }}>{profile.apiKeysCount} Keys Active</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dashed var(--border)" }}>
              <span style={{ color: "var(--text-muted)", fontSize: 14 }}>GraphQL Traffic Executed</span>
              <strong style={{ fontSize: 14 }} className="gradient-text">{profile.activeQueriesCount.toLocaleString()} queries</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
              <span style={{ color: "var(--text-muted)", fontSize: 14 }}>Cache Storage Used</span>
              <strong style={{ fontSize: 14 }}>{profile.storageUsed}</strong>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
