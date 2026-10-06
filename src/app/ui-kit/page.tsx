"use client";

import { useState } from "react";
import {
  Accordion,
  Alert,
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Pagination,
  Radio,
  Select,
  Skeleton,
  Spinner,
  Switch,
  Table,
  Tabs,
  Textarea,
} from "@/ui-kit/components";
import { Layers, Sparkles, Layout } from "lucide-react";

export default function UIKit() {
  const [enabled, setEnabled] = useState(true);
  const [radioVal, setRadioVal] = useState("opt1");

  return (
    <div className="container section" style={{ paddingTop: 40, paddingBottom: 80 }}>
      {/* Page Title & Spacing Header */}
      <div className="section-heading" style={{ textAlign: "center", marginBottom: 48 }}>
        <div className="eyebrow" style={{ display: "inline-flex", margin: "0 auto 16px" }}>
          <Layers size={14} /> Design System & UI Tokens
        </div>
        <h1 style={{ fontSize: "clamp(34px, 5vw, 52px)" }}>
          NovaFlow <span className="gradient-text">UI Kit Showcase</span>
        </h1>
        <p style={{ maxWidth: 640, margin: "16px auto 0" }}>
          Consistent spacing, glassmorphic cards, accessible form controls, and modern component primitives.
        </p>
      </div>

      {/* Showcase Grid with Spacing Polish */}
      <div className="grid grid-2" style={{ gap: 32 }}>
        {/* Buttons Showcase Card */}
        <div className="card card-glass card-glow" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <Sparkles size={20} className="gradient-text" /> Buttons & Triggers
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
            Primary, secondary, and icon buttons with hover lift & shadow glows.
          </p>

          <div className="actions" style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <Button>Primary Gradient</Button>
            <Button variant="secondary">Secondary Glass</Button>
            <Button variant="ghost">Outline Border</Button>
          </div>
        </div>

        {/* Form Controls Showcase Card */}
        <div className="card card-glass card-glow" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <Layout size={20} className="gradient-text" /> Form Inputs & Controls
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
            Inputs, selects, textareas, custom toggles, checkboxes, and radio buttons.
          </p>

          <div className="stack" style={{ gap: 20 }}>
            <div>
              <label className="label">Standard Input</label>
              <Input placeholder="Enter email or username..." />
            </div>

            <div>
              <label className="label">Dropdown Select</label>
              <Select>
                <option>Select environment...</option>
                <option>Production (Edge)</option>
                <option>Staging Gateway</option>
              </Select>
            </div>

            <div>
              <label className="label">Multiline Textarea</label>
              <Textarea rows={3} placeholder="Write a description or GraphQL document..." />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 8, borderTop: "1px solid var(--border)" }}>
              <Checkbox label="Accept terms and conditions" defaultChecked />
              
              <div style={{ display: "flex", gap: 20 }}>
                <Radio
                  label="Option A"
                  name="demo-radio"
                  checked={radioVal === "opt1"}
                  onChange={() => setRadioVal("opt1")}
                />
                <Radio
                  label="Option B"
                  name="demo-radio"
                  checked={radioVal === "opt2"}
                  onChange={() => setRadioVal("opt2")}
                />
              </div>

              <Switch label="Enable Realtime WebSockets" checked={enabled} onChange={setEnabled} />
            </div>
          </div>
        </div>

        {/* Feedback & Indicators Card */}
        <div className="card card-glass card-glow" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Feedback & Status Indicators</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
            Alert banners, status badges, pulsing indicators, and loading skeletons.
          </p>

          <div className="stack" style={{ gap: 20 }}>
            <Alert>System operational. GraphQL resolvers responding under 4.2ms.</Alert>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span className="badge badge-success">
                <span className="pulse-dot" /> GraphQL Live
              </span>
              <span className="badge badge-warning">Connecting...</span>
              <span className="badge-glow">v2.0 GraphQL</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Spinner />
              <div style={{ flex: 1 }}>
                <Skeleton />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation & Tabs Card */}
        <div className="card card-glass card-glow" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Navigation & Breadcrumbs</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
            Breadcrumbs, pagination, and dropdown menus.
          </p>

          <div className="stack" style={{ gap: 24 }}>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "UI Kit", href: "/ui-kit" }, { label: "Components" }]} />
            
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Dropdown label="System Menu">
                <div style={{ padding: 12, fontSize: 14 }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>NovaFlow v2.0</p>
                  <p style={{ margin: "4px 0 0", color: "var(--text-muted)", fontSize: 12 }}>GraphQL Gateway</p>
                </div>
              </Dropdown>
            </div>

            <Pagination pages={4} />
          </div>
        </div>

        {/* Tabs & Accordion Card */}
        <div className="card card-glass card-glow" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Tabs & Accordions</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
            Accessible tabbed views and collapsible accordion item components.
          </p>

          <div className="stack" style={{ gap: 24 }}>
            <Tabs
              items={[
                { label: "Overview", content: <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 12 }}>First tab displaying component specifications.</p> },
                { label: "GraphQL Specs", content: <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 12 }}>GraphQL schema type definitions and directives.</p> },
              ]}
            />

            <Accordion
              items={[
                { question: "Is this design system responsive?", answer: "Yes, built with fluid typography and CSS grid tokens." },
                { question: "Are all components dark mode ready?", answer: "Integrated CSS custom properties ensure zero-flash theme switching." },
              ]}
            />
          </div>
        </div>

        {/* Avatars & Data Tables Card */}
        <div className="card card-glass card-glow" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Avatars & Data Tables</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24 }}>
            User avatars and structured tabular data presentation.
          </p>

          <div className="stack" style={{ gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Avatar name="Alex Vance" />
              <Avatar name="Sophia Chen" />
              <Avatar name="Elena Rostova" />
            </div>

            <Table
              rows={[
                { name: "GraphQL Route Handler", status: "Operational", value: "4.2ms" },
                { name: "Schema Stitching Gateway", status: "Active", value: "0.8ms" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
