export function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div className="eyebrow">About</div>
          <h2>Tell your company story.</h2>
          <p className="muted">Reusable about-page composition.</p>
        </div>
        <div className="grid grid-3">
          {["Mission", "Values", "Team"].map((x) => (
            <div className="card" key={x}>
              <h3>{x}</h3>
              <p className="muted">Replace with real content.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
