import { ImageResponse } from "next/og";

import { siteConfig } from "@/biblioteca/site-config";

export const alt = "NITE UNIJORGE com visual tecnologico azul e fundo escuro.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#000000",
        color: "#f0f0f0",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        padding: 72,
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          maxWidth: 720,
          position: "relative",
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            border: "1px solid rgba(56,189,248,0.56)",
            borderRadius: 999,
            color: "#38bdf8",
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.22em",
            padding: "12px 22px",
            textTransform: "uppercase",
          }}
        >
          {siteConfig.name} / {siteConfig.institution}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
            }}
          >
            Inovacao, tecnologia e projetos aplicados
          </div>
          <div
            style={{
              color: "#a1a4a5",
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
            }}
          >
            Presenca institucional para conectar ideias, aprendizado pratico e
            impacto.
          </div>
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          border: "1px solid rgba(176,199,217,0.26)",
          borderRadius: 28,
          boxShadow: "0 0 90px rgba(56,189,248,0.22)",
          display: "flex",
          height: 280,
          justifyContent: "center",
          position: "relative",
          width: 280,
        }}
      >
        <div
          style={{
            color: "#38bdf8",
            display: "flex",
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: "-0.08em",
          }}
        >
          N
        </div>
      </div>
    </div>,
    size,
  );
}
