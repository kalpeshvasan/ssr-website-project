"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Check, Sparkles, Database } from "lucide-react";
import { PricingPlan } from "@/lib/graphql/schema";

interface PricingClientViewProps {
  initialPlans: PricingPlan[];
  initialExecutionTime: number;
}

export function PricingClientView({ initialPlans, initialExecutionTime }: PricingClientViewProps) {
  const { data, executionTime } = useGraphQLQuery<{ pricingPlans: PricingPlan[] }>(GRAPHQL_QUERIES.GET_PRICING);
  const plans = data?.pricingPlans || initialPlans;
  const latency = executionTime || initialExecutionTime;

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> Server-Side Pre-Rendered (SSR) + GraphQL
        </div>
        <h2>Flexible SaaS Pricing Plans</h2>
        <p>Pricing data and features are pre-rendered on the server via GraphQL for instant loading and full SEO indexability.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL SSR Latency: {latency}ms
        </span>
      </div>

      <div className="grid grid-3" style={{ gap: 28 }}>
        {plans.map((plan: PricingPlan) => (
          <div
            key={plan.id}
            className={`card ${plan.popular ? "card-glow" : ""}`}
            style={{
              borderColor: plan.popular ? "var(--accent-primary)" : "var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {plan.badge && (
                <span className="badge badge-success" style={{ marginBottom: 16 }}>
                  <Sparkles size={12} /> {plan.badge}
                </span>
              )}
              <h3 style={{ fontSize: 24, marginBottom: 8 }}>{plan.name}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>{plan.description}</p>

              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 48, fontWeight: 800, fontFamily: "var(--font-heading)" }} className="gradient-text">
                  ${plan.price}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: 14 }}>/{plan.interval}</span>
              </div>

              <ul className="stack" style={{ listStyle: "none", gap: 12, marginBottom: 32 }}>
                {plan.features.map((feat: string, idx: number) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                    <Check size={16} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`btn ${plan.popular ? "btn-primary" : "btn-outline"}`}
              style={{ width: "100%" }}
            >
              {plan.ctaText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
