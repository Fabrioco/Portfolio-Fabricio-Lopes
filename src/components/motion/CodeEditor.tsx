"use client";

import { Fragment, useEffect, useState } from "react";

type Token = readonly [text: string, className: string];

const K = "text-[#c792ea]";
const S = "text-accent";
const P = "text-sub";
const I = "text-ink";

const lines: Token[][] = [
  [
    ["const", K],
    [" ", ""],
    ["solution", I],
    [" ", ""],
    ["= {", P],
  ],
  [
    ["  ", ""],
    ["product", I],
    [":", P],
    [" ", ""],
    ['"sob medida"', S],
    [",", P],
  ],
  [
    ["  ", ""],
    ["architecture", I],
    [":", P],
    [" ", ""],
    ['"multi-tenant"', S],
    [",", P],
  ],
  [
    ["  ", ""],
    ["experience", I],
    [":", P],
    [" ", ""],
    ['"simples"', S],
    [",", P],
  ],
  [
    ["  ", ""],
    ["impact", I],
    [":", P],
    [" ", ""],
    ['"escalável"', S],
    [",", P],
  ],
  [["};", P]],
];

const tokens: Token[] = lines.flatMap((line, i) =>
  i < lines.length - 1 ? [...line, ["\n", ""] as Token] : line,
);
const full = tokens.map(([t]) => t).join("");
const total = full.length;

/**
 * Janela de código que "digita" o texto. O texto ainda não digitado fica invisível
 * (mas ocupa espaço), então a janela não muda de tamanho durante a animação.
 */
export function CodeEditor() {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      return;
    }
    const id = window.setTimeout(() => setStarted(true), 900); // espera a headline
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!started || count >= total) return;
    // Pausa maior nas quebras de linha e uma leve variação entre as letras.
    const delay = full[count] === "\n" ? 180 : 22 + ((count * 7) % 5) * 6;
    const id = window.setTimeout(() => setCount((c) => c + 1), delay);
    return () => window.clearTimeout(id);
  }, [started, count]);

  const done = count >= total;

  // Em qual token fica o cursor: logo depois do último caractere digitado.
  let acc = 0;
  let caretAt = tokens.length - 1;
  for (let i = 0; i < tokens.length; i++) {
    acc += tokens[i][0].length;
    if (count <= acc) {
      caretAt = i;
      break;
    }
  }

  let remaining = count;

  return (
    <div className="relative">
      <div aria-hidden className="glow absolute -inset-10 -z-10" />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-xs text-muted">
            architecture.ts
          </span>
        </div>

        {/* Leitores de tela leem o código completo uma vez; a versão animada é decorativa. */}
        <pre className="sr-only">{full}</pre>
        <pre
          aria-hidden
          className="overflow-x-auto p-5 font-mono text-sm leading-7 sm:p-6 sm:text-[15px]"
        >
          <code>
            {tokens.map(([text, cls], i) => {
              const shown = Math.max(0, Math.min(text.length, remaining));
              remaining -= shown;
              return (
                <Fragment key={i}>
                  <span className={cls}>{text.slice(0, shown)}</span>
                  {caretAt === i && (
                    <span className="caret motion-reduce:hidden" />
                  )}
                  <span className="invisible">{text.slice(shown)}</span>
                </Fragment>
              );
            })}
          </code>
        </pre>

        <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[11px] text-muted">
          <span>TypeScript</span>
          <span
            className={`flex items-center gap-1.5 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            Build concluído
          </span>
        </div>
      </div>
    </div>
  );
}
