"use client";
import { useState } from "react";
export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="stack">
      {items.map((x, i) => (
        <div className="accordion-item" key={x.question}>
          <button
            className="accordion-trigger"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{x.question}</span>
            <span>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div className="accordion-content">{x.answer}</div>}
        </div>
      ))}
    </div>
  );
}
