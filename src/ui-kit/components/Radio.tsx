import React from "react";

export function Radio({
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
        type="radio"
        style={{
          width: 18,
          height: 18,
          accentColor: "var(--accent-primary)",
          cursor: "pointer",
        }}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
