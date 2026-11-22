import { Fragment } from "react";

/**
 * Headline com entrada palavra por palavra (fade + subida curta).
 * Funciona em Server Components, sem biblioteca de animação.
 */
export function AnimatedHeadline({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const words = children.trim().split(/\s+/);
  return (
    <span className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span
              className="word-rise inline-block"
              style={{ animationDelay: `${Math.min(i * 50, 600)}ms` }}
            >
              {word}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
