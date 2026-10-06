import { Button } from "../components/Button";
export function HeroTemplate({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="actions">
            <Button href={primary.href}>{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} variant="secondary">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
        <div className="card center">
          <BadgeText />
        </div>
      </div>
    </section>
  );
}
function BadgeText() {
  return (
    <>
      <span className="badge">UI KIT</span>
      <h2>Reusable by design</h2>
      <p className="muted">Build pages from consistent building blocks.</p>
    </>
  );
}
