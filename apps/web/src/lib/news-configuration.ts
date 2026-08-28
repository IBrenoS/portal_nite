type EnvironmentSource = Readonly<Record<string, string | undefined>>;

type PublicNewsConfiguration =
  | { source: "static" }
  | { source: "database"; databaseUrl: string; mediaBaseUrl: string };

type PublicNewsConfigurationResult =
  | { configured: false; missing: string[] }
  | { configured: true; configuration: PublicNewsConfiguration };

function hasProtocol(value: string | undefined, protocols: string[]) {
  if (!value) return false;
  try {
    return protocols.includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function readPublicNewsConfiguration(
  environment: EnvironmentSource,
): PublicNewsConfigurationResult {
  if (environment.NITE_NEWS_SOURCE === "static") {
    return { configured: true, configuration: { source: "static" } };
  }
  if (
    environment.NITE_NEWS_SOURCE &&
    environment.NITE_NEWS_SOURCE !== "database"
  ) {
    return { configured: false, missing: ["NITE_NEWS_SOURCE"] };
  }

  const missing: string[] = [];
  if (
    !hasProtocol(environment.DATABASE_PUBLIC_URL, ["postgres:", "postgresql:"])
  ) {
    missing.push("DATABASE_PUBLIC_URL");
  }
  if (!hasProtocol(environment.R2_PUBLIC_BASE_URL, ["https:", "http:"])) {
    missing.push("R2_PUBLIC_BASE_URL");
  }
  if (missing.length > 0) return { configured: false, missing };

  return {
    configured: true,
    configuration: {
      source: "database",
      databaseUrl: environment.DATABASE_PUBLIC_URL!,
      mediaBaseUrl: environment.R2_PUBLIC_BASE_URL!,
    },
  };
}
