import Link from "next/link";
import { Code2, Heart, Zap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: 12 }}>
              <span className="logo-mark">
                <Code2 size={22} />
              </span>
              <span>Nova<span className="gradient-text">Flow</span></span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, maxWidth: 300 }}>
              Modern Next.js application framework with integrated GraphQL engine, glassmorphic UI kit, and dual theme support.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 16, marginBottom: 16 }}>GraphQL & API</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <Link href="/graphql" style={{ color: "var(--text-secondary)" }}>GraphQL Hub</Link>
              <Link href="/graphql" style={{ color: "var(--text-secondary)" }}>Interactive Explorer</Link>
              <Link href="/api/graphql" target="_blank" style={{ color: "var(--text-secondary)" }}>
                API Endpoint (/api/graphql)
              </Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 16, marginBottom: 16 }}>Product & UI</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <Link href="/ui-kit" style={{ color: "var(--text-secondary)" }}>UI Kit Components</Link>
              <Link href="/services" style={{ color: "var(--text-secondary)" }}>Services</Link>
              <Link href="/pricing" style={{ color: "var(--text-secondary)" }}>Pricing Plans</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 16, marginBottom: 16 }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <Link href="/about" style={{ color: "var(--text-secondary)" }}>About Us</Link>
              <Link href="/contact" style={{ color: "var(--text-secondary)" }}>Contact & Support</Link>
              <Link href="/privacy" style={{ color: "var(--text-secondary)" }}>Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NovaFlow. All rights reserved.</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Powered by Next.js & GraphQL <Zap size={14} className="gradient-text" />
          </span>
        </div>
      </div>
    </footer>
  );
}
