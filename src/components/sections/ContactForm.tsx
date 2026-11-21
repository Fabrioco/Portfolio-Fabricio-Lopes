"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

const types = ["Sistema para minha empresa", "Desenvolvedor para o time", "Parceria em um produto", "Outro projeto"];
type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "success" | "error";

const field = "mt-2 w-full min-h-11 rounded-xl border border-line-strong bg-bg2 px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";
const DEFAULT_ERROR = "Não foi possível enviar a mensagem agora. Tente novamente em instantes.";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Informe um e-mail válido.";
    if (message.length < 10) next.message = "Escreva pelo menos 10 caracteres.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("idle");
      setErrorMessage("");
      return;
    }

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formId) {
      console.warn(
        "NEXT_PUBLIC_FORMSPREE_ID não está definida. Configure a variável de ambiente para ativar o envio do formulário."
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

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-accent/40 bg-accent-soft p-8">
        <CheckCircle2 aria-hidden className="text-accent" size={28} />
        <h2 className="mt-4 font-display text-2xl font-semibold">Mensagem enviada</h2>
        <p className="mt-2 text-sub">Obrigado pelo contato. Responderei em breve.</p>
      </div>
    );
  }

  const isSending = status === "sending";
  const err = (id: keyof Errors) => errors[id] && <p id={`${id}-erro`} className="mt-1.5 text-sm text-[#ff7a7a]">{errors[id]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={isSending} className="space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-[#ff7a7a]/40 bg-[#ff7a7a]/10 px-4 py-3 text-sm text-[#ff7a7a]">
          {errorMessage || DEFAULT_ERROR}
        </p>
      )}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Deixe este campo em branco</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="name" className="text-sm font-medium">Nome</label>
        <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-erro" : undefined} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-erro" : undefined} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="type" className="text-sm font-medium">Tipo de contato</label>
        <select id="type" name="type" className={field} defaultValue={types[0]}>{types.map((t) => <option key={t}>{t}</option>)}</select>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
        <textarea id="message" name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-erro" : undefined} />
        {err("message")}
      </div>
      <button type="submit" disabled={isSending} className="min-h-11 w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
        {isSending ? "Enviando..." : "Enviar mensagem"}
      </button>
    </form>
  );
}
