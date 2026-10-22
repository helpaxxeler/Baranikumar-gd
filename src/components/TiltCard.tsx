"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      card.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        card.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  function updateTilt(event: PointerEvent<HTMLElement>) {
    if (
      (event.pointerType !== "mouse" && event.pointerType !== "pen") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const maxTilt = 5;

    card.style.setProperty("--rotate-x", `${(0.5 - y) * maxTilt}deg`);
    card.style.setProperty("--rotate-y", `${(x - 0.5) * maxTilt}deg`);
    card.style.setProperty("--spot-x", `${x * 100}%`);
    card.style.setProperty("--spot-y", `${y * 100}%`);
  }

  function resetTilt(event: PointerEvent<HTMLElement>) {
    const card = event.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  }

  return (
    <article
      className={`tilt-card ${className}`}
      ref={cardRef}
      onPointerLeave={resetTilt}
      onPointerMove={updateTilt}
    >
      {children}
    </article>
  );
}
