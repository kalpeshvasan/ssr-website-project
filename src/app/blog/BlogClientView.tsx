"use client";

import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { Database } from "lucide-react";
import { BlogPost } from "@/lib/graphql/schema";

interface BlogClientViewProps {
  initialPosts: BlogPost[];
  initialExecutionTime: number;
}

export function BlogClientView({ initialPosts, initialExecutionTime }: BlogClientViewProps) {
  const { data, executionTime } = useGraphQLQuery<{ blogPosts: BlogPost[] }>(GRAPHQL_QUERIES.GET_BLOG_POSTS);
  const posts = data?.blogPosts || initialPosts;
  const latency = executionTime || initialExecutionTime;

  return (
    <div className="container section">
      <div className="section-heading">
        <div className="eyebrow">
          <Database size={14} /> Server-Side Pre-Rendered (SSR) + GraphQL
        </div>
        <h2>Engineering Blog & Insights</h2>
        <p>Technical articles pre-rendered on the server via GraphQL schema execution for view-source completeness.</p>
        <span className="badge badge-success" style={{ marginTop: 12 }}>
          <span className="pulse-dot" /> GraphQL SSR Latency: {latency}ms
        </span>
      </div>

      <div className="grid grid-3" style={{ gap: 28 }}>
        {posts.map((post: BlogPost) => (
          <div key={post.id} className="card card-glow" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span className="badge" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)" }}>
                  {post.category}
                </span>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{post.readTime}</span>
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 12, lineHeight: 1.3 }}>{post.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>{post.excerpt}</p>
            </div>

            <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{post.author}</strong>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{post.authorRole}</span>
              </div>
              <span style={{ fontSize: 12, color: "var(--accent-primary)", fontWeight: 600 }}>
                {post.publishedAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
