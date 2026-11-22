"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import { Loader2 } from "lucide-react";
import { EASE, duration } from "@/lib/motion";

const types = [
  "Sistema para minha empresa",
  "Desenvolvedor para o time",
  "Parceria em um produto",
  "Outro projeto",
];
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

const MAX_MESSAGE = 1000;
const field =
  "mt-2 w-full min-h-11 rounded-xl border border-line-strong bg-bg2 px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";
const label =
  "text-sm font-medium transition-colors duration-200 group-focus-within:text-accent";
const DEFAULT_ERROR =
  "Não foi possível enviar a mensagem agora. Tente novamente em instantes.";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [len, setLen] = useState(0);
  const submittingRef = useRef(false);

  // Leva o foco ao título de sucesso quando ele aparece (acessibilidade).
  const focusOnMount = useCallback((el: HTMLElement | null) => {
    el?.focus();
  }, []);

  const clearError = (k: Field) =>
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));

  function reset() {
    setStatus("idle");
    setErrors({});
    setErrorMessage("");
    setLen(0);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots costumam preencher campos ocultos. Se preenchido, simulamos sucesso sem enviar.
    if (String(data.get("_gotcha") ?? "").trim() !== "") {
      setStatus("success");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const contactType = String(data.get("type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Informe um e-mail válido.";
    if (message.length < 10) next.message = "Escreva pelo menos 10 caracteres.";
    setErrors(next);

    const firstInvalid = (["name", "email", "message"] as const).find(
      (k) => next[k],
    );
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      setStatus("idle");
      setErrorMessage("");
      return;
    }

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formId) {
      console.warn(
        "NEXT_PUBLIC_FORMSPREE_ID não está definida. Configure a variável de ambiente para ativar o envio do formulário.",
      );
      setErrorMessage(DEFAULT_ERROR);
      setStatus("error");
      return;
    }

    submittingRef.current = true;
    setErrorMessage("");
    setStatus("sending");

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          type: contactType,
          message,
          _subject: `Novo contato pelo portfólio: ${contactType}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setErrorMessage(DEFAULT_ERROR);
        setStatus("error");
      }
    } catch {
      setErrorMessage(DEFAULT_ERROR);
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  }

  const isSending = status === "sending";
  const err = (id: Field) =>
    errors[id] && (
      <m.p
        key={`${id}-erro`}
        id={`${id}-erro`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.micro, ease: EASE }}
        className="mt-1.5 text-sm text-[#ff7a7a]"
      >
        {errors[id]}
      </m.p>
    );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <m.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="rounded-2xl border border-accent/40 bg-accent-soft p-8"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-accent"
          >
            <m.circle
              cx="12"
              cy="12"
              r="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
            <m.path
              d="m8 12 3 3 5-6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, ease: EASE, delay: 0.35 }}
            />
          </svg>
          <h2
            ref={focusOnMount}
            tabIndex={-1}
            className="mt-4 font-display text-2xl font-semibold focus:outline-none"
          >
            Mensagem enviada
          </h2>
          <p className="mt-2 text-sub">
            Obrigado pelo contato. Responderei em breve.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            Enviar outra mensagem
          </button>
        </m.div>
      ) : (
        <m.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          aria-busy={isSending}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8"
        >
          {status === "error" && (
            <m.p
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.micro, ease: EASE }}
              className="rounded-xl border border-[#ff7a7a]/40 bg-[#ff7a7a]/10 px-4 py-3 text-sm text-[#ff7a7a]"
            >
              {errorMessage || DEFAULT_ERROR}
            </m.p>
          )}

          <div className="hidden" aria-hidden="true">
            <label htmlFor="_gotcha">Deixe este campo em branco</label>
            <input
              id="_gotcha"
              name="_gotcha"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="group">
            <label htmlFor="name" className={label}>
              Nome
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              className={field}
              onChange={() => clearError("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-erro" : undefined}
            />
            {err("name")}
          </div>

          <div className="group">
            <label htmlFor="email" className={label}>
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={field}
              onChange={() => clearError("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-erro" : undefined}
            />
            {err("email")}
          </div>

          <div className="group">
            <label htmlFor="type" className={label}>
              Tipo de contato
            </label>
            <select
              id="type"
              name="type"
              className={field}
              defaultValue={types[0]}
            >
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="group">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="message" className={label}>
                Mensagem
              </label>
              <span
                aria-hidden
                className={`font-mono text-xs tabular-nums transition-colors ${len > MAX_MESSAGE * 0.9 ? "text-accent" : "text-muted"}`}
              >
                {len}/{MAX_MESSAGE}
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={MAX_MESSAGE}
              className={field}
              onChange={(e) => {
                setLen(e.target.value.length);
                clearError("message");
              }}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-erro" : undefined}
            />
            {err("message")}
          </div>

          <m.button
            type="submit"
            disabled={isSending}
            whileHover={isSending ? undefined : { y: -1 }}
            whileTap={isSending ? undefined : { scale: 0.98 }}
            transition={{ duration: duration.micro, ease: EASE }}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg transition-[filter,opacity] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSending && (
              <Loader2 aria-hidden size={16} className="animate-spin" />
            )}
            {isSending ? "Enviando..." : "Enviar mensagem"}
          </m.button>
        </m.form>
      )}
    </AnimatePresence>
  );
}
