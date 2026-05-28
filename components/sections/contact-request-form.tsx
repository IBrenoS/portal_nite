"use client";

import { useMemo, useState } from "react";

type ContactRequestFormProps = {
  contactEmail: string;
};

export function ContactRequestForm({ contactEmail }: ContactRequestFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isReadyToSubmit = email.trim().length > 0 && message.trim().length > 0;
  const mailtoHref = useMemo(() => {
    const subject = "Contato pelo Portal NITE";
    const body = [`Email de retorno: ${email.trim()}`, "", message.trim()].join(
      "\n",
    );

    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [contactEmail, email, message]);

  return (
    <form
      className="mt-8 grid gap-6"
      onSubmit={(event) => {
        event.preventDefault();

        if (!isReadyToSubmit) {
          return;
        }

        window.location.href = mailtoHref;
      }}
    >
      <div className="grid gap-2">
        <label
          htmlFor="contact-email"
          className="text-sm font-normal text-white/74"
        >
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          placeholder="seu.email@exemplo.com"
          className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.055] px-3 text-base text-white outline-none transition duration-200 placeholder:text-white/28 focus-visible:border-white/22 focus-visible:bg-white/[0.075] focus-visible:ring-2 focus-visible:ring-white/20 sm:text-sm"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-normal text-white/74"
        >
          Como podemos ajudar?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          value={message}
          placeholder="Gostaria de saber como o NITE pode ajudar com..."
          className="h-[120px] w-full resize-none rounded-xl border border-white/10 bg-white/[0.055] p-3 text-base text-white outline-none transition duration-200 placeholder:text-white/28 focus-visible:border-white/22 focus-visible:bg-white/[0.075] focus-visible:ring-2 focus-visible:ring-white/20 sm:text-sm"
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={!isReadyToSubmit}
        className="relative inline-flex h-10 w-fit items-center justify-center gap-2 rounded-2xl border-2 border-white/5 bg-[linear-gradient(104deg,rgb(253_253_253_/_0.06)_5%,rgb(240_240_228_/_0.12)_100%)] px-4 text-sm font-semibold text-white shadow-sm outline-none backdrop-blur-2xl transition-all duration-200 hover:bg-white/90 hover:text-black hover:shadow-[0_0_28px_rgb(255_255_255_/_0.16)] focus-visible:bg-white/90 focus-visible:text-black focus-visible:ring-4 focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:text-white/50 disabled:hover:bg-[linear-gradient(104deg,rgb(253_253_253_/_0.06)_5%,rgb(240_240_228_/_0.12)_100%)] disabled:hover:text-white/50 disabled:hover:shadow-sm"
      >
        Submit
      </button>
    </form>
  );
}
