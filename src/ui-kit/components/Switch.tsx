"use client";

import React from "react";

export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        userSelect: "none",
        fontSize: 14,
        fontWeight: 500,
        color: "var(--text-primary)",
      }}
    >
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 999,
          background: checked ? "var(--accent-primary)" : "var(--border)",
          position: "relative",
          transition: "background-color 0.2s ease",
          padding: 2,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#ffffff",
            transform: checked ? "translateX(20px)" : "translateX(0)",
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}
