"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { MapPin, Database } from "lucide-react";
import Image from "next/image";
import { TeamMember } from "@/lib/graphql/schema";

interface AboutClientViewProps {
  initialTeam: TeamMember[];
  initialExecutionTime: number;
}

export function AboutClientView({ initialTeam, initialExecutionTime }: AboutClientViewProps) {
  const { data, executionTime } = useGraphQLQuery<{ teamMembers: TeamMember[] }>(
    GRAPHQL_QUERIES.GET_ABOUT,
  );
  const team = data?.teamMembers || initialTeam;
  const latency = executionTime || initialExecutionTime;

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> Server-Side Pre-Rendered (SSR) + GraphQL
        </div>
        <h2>Meet the Engineering Team</h2>
        <p>
          NovaFlow is built by passionate GraphQL architects, Next.js core engineers, and UI design
          specialists.
        </p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL SSR Latency: {latency}ms
        </span>
      </div>

      <div className="grid grid-3" style={{ gap: 28 }}>
        {team.map((member: TeamMember) => (
          <div key={member.id} className="card card-glow center">
            <Image
              src={member.avatar}
              alt={member.name}
              width={96}
              height={96}
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                objectFit: "cover",
                margin: "0 auto 16px",
                border: "2px solid var(--accent-primary)",
              }}
            />
            <h3 style={{ fontSize: 20, marginBottom: 4 }}>{member.name}</h3>
            <span
              className="gradient-text"
              style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 12 }}
            >
              {member.role}
            </span>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 16 }}>
              {member.bio}
            </p>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <MapPin size={14} /> {member.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
