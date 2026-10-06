import React from "react";

export function Checkbox({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label
      className={`row ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        userSelect: "none",
        fontSize: 14,
        fontWeight: 500,
        color: "var(--text-primary)",
      }}
    >
      <input
        {...props}
        type="checkbox"
        style={{
          width: 18,
          height: 18,
          accentColor: "var(--accent-primary)",
          cursor: "pointer",
          borderRadius: 4,
        }}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
