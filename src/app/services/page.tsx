import { graphql } from "graphql";
import { schema, ServiceItem } from "@/lib/graphql/schema";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { ServicesClientView } from "./ServicesClientView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Microservices & Solutions Catalog — NovaFlow GraphQL",
  description: "Server-side pre-rendered catalog powered by Next.js and GraphQL executable schema.",
};

async function loadServices() {
  const startTime = performance.now();

  // Execute GraphQL Query on the server side during SSR
  const result = await graphql({
    schema,
    source: GRAPHQL_QUERIES.GET_SERVICES,
  });

  const durationMs = Number((performance.now() - startTime).toFixed(2));
  const initialServices: ServiceItem[] = result.data?.services
    ? JSON.parse(JSON.stringify(result.data.services))
    : [];

  return { initialServices, durationMs };
}

export default async function ServicesPage() {
  const { initialServices, durationMs } = await loadServices();
  return <ServicesClientView initialServices={initialServices} initialExecutionTime={durationMs} />;
}
