"use client";

import {
  BotIcon,
  BrainCircuitIcon,
  Code2Icon,
  GraduationCapIcon,
  MonitorSmartphoneIcon,
  WorkflowIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const builds = [
  {
    icon: Code2Icon,
    title: "Software aplicado",
    description:
      "Interfaces, sistemas web e ferramentas digitais para transformar desafios acadêmicos em produtos testáveis.",
    output: "landing pages, sistemas internos, protótipos navegáveis",
  },
  {
    icon: BrainCircuitIcon,
    title: "Dados e IA",
    description:
      "Organização, análise e uso responsável de dados para apoiar decisões, automações e experimentos acadêmicos.",
    output: "painéis, assistentes, relatórios exploratórios",
  },
  {
    icon: BotIcon,
    title: "Robótica e prototipagem",
    description:
      "Experimentos físicos e digitais que aproximam ideia, sensor, automação e validação em laboratório.",
    output: "provas de conceito, robôs didáticos, integrações com hardware",
  },
  {
    icon: MonitorSmartphoneIcon,
    title: "Experiência digital",
    description:
      "Fluxos, interfaces e páginas que tornam serviços, projetos e jornadas mais claros para a comunidade.",
    output: "wireframes, sites, jornadas navegáveis, documentação visual",
  },
  {
    icon: WorkflowIcon,
    title: "Automação e processos",
    description:
      "Rotinas e integrações que reduzem trabalho manual e criam rastreabilidade para equipes acadêmicas.",
    output:
      "formulários conectados, scripts, integrações, checklists operacionais",
  },
  {
    icon: GraduationCapIcon,
    title: "Oficinas e aprendizagem prática",
    description:
      "Atividades orientadas para estudantes e professores aprenderem construindo com ferramentas reais.",
    output: "oficinas, trilhas curtas, guias, projetos práticos",
  },
] as const;

export function BuildsCardsGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid gap-5 sm:grid-cols-2" data-builds-grid="">
      {builds.map((build, index) => {
        const Icon = build.icon;

        return (
          <motion.article
            key={build.title}
            className="group flex min-h-[14.75rem] flex-col rounded-lg border border-white/[0.055] bg-card/58 p-5 transition-colors duration-brand-micro ease-brand-out hover:border-white/[0.12] hover:bg-card/78 lg:p-6"
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : index * 0.045,
              duration: shouldReduceMotion ? 0 : 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="inline-flex size-10 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.025] text-brand-circuit-bright transition-colors duration-brand-micro group-hover:border-brand-circuit-bright/24 group-hover:bg-brand-circuit-bright/[0.07]">
              <Icon className="size-5" aria-hidden="true" />
            </span>

            <h3 className="mt-5 font-heading text-[1.08rem] font-semibold leading-snug text-foreground sm:text-lg">
              {build.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {build.description}
            </p>
            <p className="mt-auto border-t border-white/[0.055] pt-4 text-sm leading-6 text-brand-steel">
              <span className="font-semibold text-foreground">Saídas:</span>{" "}
              {build.output}.
            </p>
          </motion.article>
        );
      })}
    </div>
  );
}
