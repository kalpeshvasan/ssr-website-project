import { SectionHeading } from "../components/SectionHeading";
export function FeatureSection() {
  const a = [
    ["Reusable", "Shared components reduce duplication."],
    ["Responsive", "Mobile-first layouts and navigation."],
    ["SEO-ready", "Metadata and sitemap foundations."],
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Why this starter"
          title="A scalable frontend foundation"
          description="Compose many pages without duplicating UI."
        />
        <div className="grid grid-3">
          {a.map(([x, y]) => (
            <div className="card" key={x}>
              <span className="badge">{x}</span>
              <p>{y}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
