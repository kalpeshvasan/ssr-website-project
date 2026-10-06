"use client";

import { useState } from "react";
import { Play, Copy, Check, RefreshCw, Zap, Sparkles, Server } from "lucide-react";
import { useGraphQLQuery } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES } from "@/lib/graphql/client";
import { GraphQLTemplate } from "@/lib/graphql/schema";

export function GraphQLExplorer() {
  const { data: templatesData } = useGraphQLQuery<{ graphqlTemplates: GraphQLTemplate[] }>(GRAPHQL_QUERIES.GET_TEMPLATES);
  
  const defaultQuery = `query GetMetrics {
  metrics {
    totalUsers
    apiRequestsPerMin
    responseTimeMs
    uptimePercentage
    activeQueriesCount
    serverHealth
    environment
  }
}`;

  const [query, setQuery] = useState<string>(defaultQuery);
  const [variables, setVariables] = useState<string>("{\n  \n}");
  const [response, setResponse] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"query" | "variables">("query");

  const handleExecute = async () => {
    setLoading(true);
    setResponse(null);
    const start = performance.now();

    try {
      let parsedVars = undefined;
      if (variables.trim()) {
        parsedVars = JSON.parse(variables);
      }

      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: parsedVars }),
      });

      const json = await res.json();
      const end = performance.now();
      setExecutionTime(Number((end - start).toFixed(2)));
      setResponse(JSON.stringify(json, null, 2));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Execution error";
      setResponse(JSON.stringify({ errors: [{ message }] }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const loadTemplate = (tmpl: GraphQLTemplate) => {
    setQuery(tmpl.query);
    setVariables(tmpl.variables || "{}");
    setResponse(null);
    setExecutionTime(null);
  };

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="stack gap-6">
      {/* Template Quick Selection */}
      <div className="card card-glass">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Zap className="gradient-text" size={22} />
            <h3 style={{ fontSize: "18px" }}>GraphQL Query Presets</h3>
          </div>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Select a template to auto-populate</span>
        </div>

        <div className="grid grid-4" style={{ gap: 12 }}>
          {templatesData?.graphqlTemplates ? (
            templatesData.graphqlTemplates.map((tmpl: GraphQLTemplate) => (
              <button
                key={tmpl.id}
                onClick={() => loadTemplate(tmpl)}
                className="btn btn-outline"
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  padding: "12px 14px",
                  height: "auto",
                  fontSize: "13px",
                  gap: 4,
                  borderColor: query.trim() === tmpl.query.trim() ? "var(--accent-primary)" : "var(--border)",
                  background: query.trim() === tmpl.query.trim() ? "var(--accent-primary-light)" : "transparent",
                }}
              >
                <strong style={{ color: "var(--text-primary)" }}>{tmpl.title}</strong>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", lineClamp: 2 }}>{tmpl.description}</span>
              </button>
            ))
          ) : (
            <div style={{ padding: 12, color: "var(--text-muted)", fontSize: 14 }}>Loading GraphQL presets...</div>
          )}
        </div>
      </div>

      {/* Main GraphQL Playground Layout */}
      <div className="grid grid-2" style={{ gap: 24 }}>
        {/* Left Panel: Code Editor */}
        <div className="code-window">
          <div className="code-header">
            <div className="window-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setActiveTab("query")}
                style={{
                  background: activeTab === "query" ? "rgba(255,255,255,0.15)" : "transparent",
                  color: "#fff",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                GraphQL Document
              </button>
              <button
                onClick={() => setActiveTab("variables")}
                style={{
                  background: activeTab === "variables" ? "rgba(255,255,255,0.15)" : "transparent",
                  color: "#fff",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Variables (JSON)
              </button>
            </div>

            <button
              onClick={handleExecute}
              disabled={loading}
              className="btn btn-primary"
              style={{ minHeight: 32, padding: "4px 14px", fontSize: "13px", borderRadius: 6 }}
            >
              {loading ? <RefreshCw className="spin" size={14} /> : <Play size={14} />}
              <span>Execute</span>
            </button>
          </div>

          {activeTab === "query" ? (
            <textarea
              className="code-editor-area"
              rows={14}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Write your GraphQL query or mutation here..."
              spellCheck={false}
            />
          ) : (
            <textarea
              className="code-editor-area"
              rows={14}
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
              placeholder='{\n  "search": "GraphQL"\n}'
              spellCheck={false}
            />
          )}
        </div>

        {/* Right Panel: JSON Execution Result */}
        <div className="code-window">
          <div className="code-header">
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: "13px" }}>
              <Server size={14} />
              <span>Response Data</span>
              {executionTime !== null && (
                <span className="badge badge-success" style={{ padding: "2px 8px", fontSize: "11px" }}>
                  {executionTime}ms
                </span>
              )}
            </div>

            {response && (
              <button
                onClick={handleCopy}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "12px",
                }}
              >
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            )}
          </div>

          <div style={{ position: "relative", minHeight: 300, background: "var(--code-bg)" }}>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 300,
                  color: "#94a3b8",
                  gap: 12,
                }}
              >
                <RefreshCw size={28} className="spin" style={{ color: "var(--accent-primary)" }} />
                <span>Executing GraphQL request...</span>
              </div>
            ) : response ? (
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "#38bdf8",
                  padding: "18px",
                  margin: 0,
                  overflow: "auto",
                  maxHeight: "360px",
                  lineHeight: 1.5,
                }}
              >
                {response}
              </pre>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 300,
                  color: "#64748b",
                  gap: 8,
                }}
              >
                <Sparkles size={32} opacity={0.5} />
                <span>Click "Execute" to run the GraphQL request</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
