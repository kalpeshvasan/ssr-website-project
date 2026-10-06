import { graphql } from "graphql";
import { schema, BlogPost } from "@/lib/graphql/schema";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { BlogClientView } from "./BlogClientView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Blog — NovaFlow GraphQL",
  description: "Technical guides pre-rendered on the server via GraphQL.",
};

export default async function BlogPage() {
  const startTime = performance.now();
  const result = await graphql({
    schema,
    source: GRAPHQL_QUERIES.GET_BLOG_POSTS,
  });

  const durationMs = Number((performance.now() - startTime).toFixed(2));
  const initialPosts: BlogPost[] = result.data?.blogPosts
    ? JSON.parse(JSON.stringify(result.data.blogPosts))
    : [];

  return (
    <BlogClientView
      initialPosts={initialPosts}
      initialExecutionTime={durationMs}
    />
  );
}
