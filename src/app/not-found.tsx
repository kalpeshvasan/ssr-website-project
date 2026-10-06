import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section center">
      <span className="badge">404</span>
      <h1>Page not found</h1>
      <Link className="btn btn-primary" href="/">
        Back home
      </Link>
    </div>
  );
}
