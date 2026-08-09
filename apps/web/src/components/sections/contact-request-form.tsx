"use client";

import { ChevronRightIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
          className="text-sm font-normal leading-5 text-nite-text-secondary"
        >
          E-mail
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          placeholder="Enter your email"
          className="h-8"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-normal leading-5 text-nite-text-secondary"
        >
          Como podemos ajudar?
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          value={message}
          placeholder="Gostaria de saber como o NITE pode ajudar com..."
          className="h-[120px] resize-none"
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>

      <Button
        type="submit"
        disabled={!isReadyToSubmit}
        className="group relative min-w-[6.1rem] justify-self-start rounded-[16px]"
      >
        <span className="absolute inset-0 flex w-full items-center justify-center opacity-0 pointer-events-none">
          <span className="inline-flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-nite-action-text/70" />
            <span className="h-1 w-1 rounded-full bg-nite-action-text/70" />
            <span className="h-1 w-1 rounded-full bg-nite-action-text/70" />
          </span>
        </span>
        <span className="inline-flex min-w-0 items-center justify-center gap-1 opacity-100">
          Submit
        </span>
        <span className="-mr-2 text-nite-icon-muted opacity-100 transition-colors group-hover:text-nite-action-hover-text/55">
          <ChevronRightIcon aria-hidden="true" className="size-3.5" />
        </span>
      </Button>
    </form>
  );
}
