import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode | null;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`max-w-md rounded-xl bg-darkGloss p-4 shadow-cardDrop shadow-cardGlow ${className}`}
    >
      {children}
    </section>
  );
}
