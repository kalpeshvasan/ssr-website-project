import { graphql } from "graphql";
import { schema, TeamMember } from "@/lib/graphql/schema";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { AboutClientView } from "./AboutClientView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — NovaFlow GraphQL",
  description: "Engineering team pre-rendered on the server via GraphQL.",
};

async function fetchAboutData() {
  const startTime = performance.now();
  const result = await graphql({
    schema,
    source: GRAPHQL_QUERIES.GET_ABOUT,
  });

  const durationMs = Number((performance.now() - startTime).toFixed(2));
  const initialTeam: TeamMember[] = result.data?.teamMembers
    ? JSON.parse(JSON.stringify(result.data.teamMembers))
    : [];

  return { initialTeam, durationMs };
}

export default async function AboutPage() {
  const { initialTeam, durationMs } = await fetchAboutData();

  return (
    <AboutClientView
      initialTeam={initialTeam}
      initialExecutionTime={durationMs}
    />
  );
}
