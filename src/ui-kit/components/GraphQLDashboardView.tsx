"use client";

import { useState } from "react";
import { useGraphQLQuery, useGraphQLMutation } from "@/lib/graphql/hooks";
import { GRAPHQL_QUERIES, GRAPHQL_MUTATIONS } from "@/lib/graphql/client";
import { Activity, Server, Cpu, Clock, Plus, Search, CheckCircle, ShieldCheck, Zap, Sparkles } from "lucide-react";

export function GraphQLDashboardView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("Architecture");
  const [newPrice, setNewPrice] = useState<number>(49);
  const [newDescription, setNewDescription] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addMessage, setAddMessage] = useState<string | null>(null);

  // Live GraphQL Queries
  const { data: metricsData, refetch: refetchMetrics } = useGraphQLQuery(GRAPHQL_QUERIES.GET_METRICS);
  const { data: statusData, refetch: refetchStatus } = useGraphQLQuery(GRAPHQL_QUERIES.GET_SYSTEM_STATUS);
  const { data: servicesData, refetch: refetchServices } = useGraphQLQuery(
    GRAPHQL_QUERIES.GET_SERVICES,
    { category: selectedCategory, search: searchTerm }
  );

  // Live GraphQL Mutations
  const { executeMutation: createService, loading: creating } = useGraphQLMutation(GRAPHQL_MUTATIONS.CREATE_SERVICE);
  const { executeMutation: toggleFlag } = useGraphQLMutation(GRAPHQL_MUTATIONS.TOGGLE_FEATURE_FLAG);

  const handleToggleFlag = async (flagId: string) => {
    try {
      await toggleFlag({ id: flagId });
      refetchStatus();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;

    try {
      await createService({
        title: newTitle,
        description: newDescription,
        category: newCategory,
        price: Number(newPrice),
      });
      setAddMessage("Service successfully created via GraphQL mutation!");
      setNewTitle("");
      setNewDescription("");
      setIsAdding(false);
      refetchServices();
      setTimeout(() => setAddMessage(null), 4000);
    } catch (err: any) {
      console.error(err);
    }
  };

  const metrics = metricsData?.metrics;

  return (
    <div className="stack gap-6">
      {/* Metrics Banner */}
      <div className="grid grid-4" style={{ gap: 20 }}>
        <div className="card card-glow">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>Active Users</span>
            <Activity size={20} className="gradient-text" />
          </div>
          <strong style={{ fontSize: 32, fontFamily: "var(--font-heading)" }}>
            {metrics ? metrics.totalUsers.toLocaleString() : "..."}
          </strong>
          <span style={{ fontSize: 12, color: "#10b981", marginTop: 4, display: "block" }}>
            ↑ 12.4% real-time increase
          </span>
        </div>

        <div className="card card-glow">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>Throughput (req/min)</span>
            <Server size={20} className="gradient-text" />
          </div>
          <strong style={{ fontSize: 32, fontFamily: "var(--font-heading)" }}>
            {metrics ? metrics.apiRequestsPerMin.toLocaleString() : "..."}
          </strong>
          <span style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, display: "block" }}>
            GraphQL Query Latency: {metrics ? `${metrics.responseTimeMs}ms` : "..."}
          </span>
        </div>

        <div className="card card-glow">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>System Uptime</span>
            <ShieldCheck size={20} style={{ color: "#10b981" }} />
          </div>
          <strong style={{ fontSize: 32, fontFamily: "var(--font-heading)" }}>
            {metrics ? `${metrics.uptimePercentage}%` : "..."}
          </strong>
          <span className="badge badge-success" style={{ marginTop: 6, fontSize: 11 }}>
            <span className="pulse-dot" /> SLA Operational
          </span>
        </div>

        <div className="card card-glow">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>Active GraphQL Queries</span>
            <Cpu size={20} className="gradient-text" />
          </div>
          <strong style={{ fontSize: 32, fontFamily: "var(--font-heading)" }}>
            {metrics ? metrics.activeQueriesCount : "..."}
          </strong>
          <button
            onClick={() => { refetchMetrics(); refetchStatus(); refetchServices(); }}
            style={{ background: "none", border: "none", color: "var(--accent-primary)", fontSize: 12, cursor: "pointer", marginTop: 4, textAlign: "left", padding: 0 }}
          >
            ↻ Refresh Metrics
          </button>
        </div>
      </div>

      {/* Feature Flags & Live System Health */}
      <div className="grid grid-2" style={{ gap: 24 }}>
        <div className="card card-glass">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Zap size={20} className="gradient-text" />
              GraphQL Feature Flags
            </h3>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Interactive GraphQL Mutations</span>
          </div>

          <div className="stack" style={{ gap: 12 }}>
            {statusData?.featureFlags ? (
              statusData.featureFlags.map((flag: any) => (
                <div
                  key={flag.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: "var(--bg-surface)",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 14, display: "block" }}>{flag.name}</strong>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{flag.description}</span>
                  </div>
                  <button
                    onClick={() => handleToggleFlag(flag.id)}
                    className={`btn ${flag.enabled ? "btn-primary" : "btn-outline"}`}
                    style={{ minHeight: 32, padding: "4px 12px", fontSize: 12 }}
                  >
                    {flag.enabled ? "ENABLED" : "DISABLED"}
                  </button>
                </div>
              ))
            ) : (
              <div style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading feature flags...</div>
            )}
          </div>
        </div>

        {/* System Health Component */}
        <div className="card card-glass">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={20} className="gradient-text" />
              GraphQL System Status
            </h3>
            <span className="badge badge-success" style={{ fontSize: 11 }}>
              <span className="pulse-dot" /> Operational
            </span>
          </div>

          {statusData?.systemStatus ? (
            <div className="stack" style={{ gap: 12, fontSize: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dashed var(--border)" }}>
                <span style={{ color: "var(--text-muted)" }}>GraphQL Server</span>
                <strong style={{ color: "var(--text-primary)" }}>{statusData.systemStatus.graphqlServer}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dashed var(--border)" }}>
                <span style={{ color: "var(--text-muted)" }}>Database Connector</span>
                <strong style={{ color: "var(--text-primary)" }}>{statusData.systemStatus.database}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dashed var(--border)" }}>
                <span style={{ color: "var(--text-muted)" }}>Cache Layer</span>
                <strong style={{ color: "var(--text-primary)" }}>{statusData.systemStatus.cache}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ color: "var(--text-muted)" }}>Last Ping</span>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {new Date(statusData.systemStatus.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ color: "var(--text-muted)", fontSize: 14 }}>Fetching system health...</div>
          )}
        </div>
      </div>

      {/* Services List fetched via GraphQL */}
      <div className="card card-glass">
        {addMessage && (
          <div
            style={{
              padding: "12px 16px",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#10b981",
              borderRadius: 8,
              marginBottom: 16,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <CheckCircle size={18} /> {addMessage}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div>
            <h3 style={{ fontSize: 22 }}>Microservices Catalog</h3>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>Data retrieved live via GraphQL `services(category, search)` query</p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", minWidth: 220 }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="text"
                className="input"
                style={{ paddingLeft: 36, height: 40, fontSize: 14 }}
                placeholder="Search via GraphQL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="select"
              style={{ width: "auto", height: 40, fontSize: 14 }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Architecture">Architecture</option>
              <option value="Gateway">Gateway</option>
              <option value="Client">Client</option>
              <option value="Performance">Performance</option>
              <option value="Security">Security</option>
            </select>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="btn btn-primary"
              style={{ height: 40, padding: "0 16px", fontSize: 14 }}
            >
              <Plus size={16} /> Add via GraphQL
            </button>
          </div>
        </div>

        {/* Add Service Modal / Form */}
        {isAdding && (
          <form
            onSubmit={handleCreateService}
            style={{
              padding: 20,
              background: "var(--bg-app)",
              borderRadius: 12,
              border: "1px solid var(--border)",
              marginBottom: 24,
            }}
          >
            <h4 style={{ marginBottom: 16, fontSize: 16 }}>Execute `createService` Mutation</h4>
            <div className="grid grid-3" style={{ gap: 16, marginBottom: 16 }}>
              <div>
                <label className="label">Title</label>
                <input
                  type="text"
                  className="input"
                  required
                  placeholder="e.g. Edge Subscriptions"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Category</label>
                <select
                  className="select"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="Architecture">Architecture</option>
                  <option value="Gateway">Gateway</option>
                  <option value="Performance">Performance</option>
                  <option value="Security">Security</option>
                </select>
              </div>
              <div>
                <label className="label">Price ($/mo)</label>
                <input
                  type="number"
                  className="input"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Description</label>
              <textarea
                className="textarea"
                rows={2}
                required
                placeholder="Describe what this GraphQL microservice does..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button type="submit" disabled={creating} className="btn btn-primary" style={{ height: 38, fontSize: 14 }}>
                {creating ? "Creating..." : "Submit Mutation"}
              </button>
              <button type="button" onClick={() => setIsAdding(false)} className="btn btn-outline" style={{ height: 38, fontSize: 14 }}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Services Grid */}
        <div className="grid grid-3" style={{ gap: 20 }}>
          {servicesData?.services ? (
            servicesData.services.map((srv: any) => (
              <div key={srv.id} className="card card-glow" style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span className="badge" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)" }}>
                    {srv.category}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: 18, color: "var(--accent-primary)" }}>
                    ${srv.price}<span style={{ fontSize: 12, fontWeight: 400, color: "var(--text-muted)" }}>/mo</span>
                  </span>
                </div>
                <h4 style={{ fontSize: 18, marginBottom: 8 }}>{srv.title}</h4>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, minHeight: 44 }}>{srv.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--border)", fontSize: 13, color: "var(--text-muted)" }}>
                  <span>⭐ {srv.rating} / 5.0</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>id: {srv.id}</span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: 20, color: "var(--text-muted)" }}>Querying GraphQL services...</div>
          )}
        </div>
      </div>
    </div>
  );
}
