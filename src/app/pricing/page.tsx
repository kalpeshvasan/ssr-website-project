import { graphql } from "graphql";
import { schema, PricingPlan } from "@/lib/graphql/schema";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { PricingClientView } from "./PricingClientView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans — NovaFlow GraphQL",
  description: "Flexible SaaS pricing plans pre-rendered on the server via GraphQL.",
};

export default async function PricingPage() {
  const startTime = performance.now();
  const result = await graphql({
    schema,
    source: GRAPHQL_QUERIES.GET_PRICING,
  });

  const durationMs = Number((performance.now() - startTime).toFixed(2));
  const initialPlans: PricingPlan[] = result.data?.pricingPlans
    ? JSON.parse(JSON.stringify(result.data.pricingPlans))
    : [];

  return (
    <PricingClientView
      initialPlans={initialPlans}
      initialExecutionTime={durationMs}
    />
  );
}
