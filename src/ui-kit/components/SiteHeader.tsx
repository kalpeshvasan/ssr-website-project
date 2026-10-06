"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { GraphQLStatusBadge } from "./GraphQLStatusBadge";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "GraphQL Hub", href: "/graphql", isNew: true },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "UI Kit", href: "/ui-kit" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/" className="logo" aria-label="NovaFlow home">
            <span className="logo-mark">
              <Code2 size={22} />
            </span>
            <span>
              Nova<span className="gradient-text">Flow</span>
            </span>
          </Link>
          {/* <GraphQLStatusBadge /> */}
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
                {link.isNew && <span className="badge-glow">v2.0 GraphQL</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ThemeToggle />
          <Link href="/graphql" className="btn btn-primary" style={{ height: 40, padding: "0 16px", fontSize: "14px" }}>
            <Sparkles size={16} /> Explorer
          </Link>
          <button
            className="mobile-menu-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "none",
              border: "1px solid var(--border)",
              background: "var(--bg-surface)",
              borderRadius: 8,
              padding: 8,
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile navigation"
          style={{
            background: "var(--bg-surface)",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label} {link.isNew && "🔥 (GraphQL)"}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
