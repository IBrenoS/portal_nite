"use client";

import { ChevronRightIcon } from "lucide-react";
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
      className="mt-6 grid gap-6"
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
          className="text-sm font-normal leading-5 text-[rgb(161_164_165)]"
        >
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          placeholder="Enter your email"
          className="h-8 w-full rounded-xl border border-[rgb(176_199_217_/_0.145)] bg-[rgb(24_25_28_/_0.88)] px-3 text-sm leading-5 text-[rgb(240_240_240)] outline-none transition duration-200 placeholder:text-white/28 focus-visible:border-white/25 focus-visible:bg-[rgb(24_25_28_/_0.96)] focus-visible:ring-2 focus-visible:ring-white/20"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-normal leading-5 text-[rgb(161_164_165)]"
        >
          Como podemos ajudar?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          value={message}
          placeholder="Gostaria de saber como o NITE pode ajudar com..."
          className="h-[120px] w-full resize-none rounded-xl border border-[rgb(176_199_217_/_0.145)] bg-[rgb(24_25_28_/_0.88)] p-3 text-sm leading-5 text-[rgb(240_240_240)] outline-none transition duration-200 placeholder:text-white/28 focus-visible:border-white/25 focus-visible:bg-[rgb(24_25_28_/_0.96)] focus-visible:ring-2 focus-visible:ring-white/20"
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={!isReadyToSubmit}
        className="group relative inline-flex h-10 min-w-[6.1rem] cursor-pointer select-none items-center justify-center gap-2 justify-self-start rounded-[16px] border-[2px] border-white/5 bg-[linear-gradient(104deg,rgb(253_253_253_/_0.05)_5%,rgb(240_240_228_/_0.1)_100%)] bg-origin-border px-4 text-sm font-semibold text-white shadow-sm outline-hidden backdrop-blur-[25px] transition-all duration-200 ease-in-out hover:bg-white/90 hover:text-black hover:shadow-[0_0_28px_rgb(255_255_255_/_0.16)] focus-visible:bg-white/90 focus-visible:text-black focus-visible:ring-4 focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:text-white/50 disabled:hover:bg-[linear-gradient(104deg,rgb(253_253_253_/_0.05)_5%,rgb(240_240_228_/_0.1)_100%)] disabled:hover:text-white/50 disabled:hover:shadow-sm"
      >
        <span className="absolute inset-0 flex w-full items-center justify-center opacity-0 pointer-events-none">
          <span className="inline-flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-white/70" />
            <span className="h-1 w-1 rounded-full bg-white/70" />
            <span className="h-1 w-1 rounded-full bg-white/70" />
          </span>
        </span>
        <span className="inline-flex min-w-0 items-center justify-center gap-1 opacity-100">
          Submit
        </span>
        <span className="-mr-2 text-[#70757E] opacity-100 transition-all group-hover:invert">
          <ChevronRightIcon aria-hidden="true" className="size-3.5" />
        </span>
      </button>
    </form>
  );
}
