type EnvironmentSource = Readonly<Record<string, string | undefined>>;

type PublicNewsConfiguration =
  | { source: "static" }
  | { source: "api"; apiUrl: string };

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
  if (environment.NITE_NEWS_SOURCE && environment.NITE_NEWS_SOURCE !== "api") {
    return { configured: false, missing: ["NITE_NEWS_SOURCE"] };
  }

  const missing: string[] = [];
  if (!hasProtocol(environment.CMS_PUBLIC_API_URL, ["https:"])) {
    missing.push("CMS_PUBLIC_API_URL");
  }
  if (missing.length > 0) return { configured: false, missing };

  return {
    configured: true,
    configuration: {
      source: "api",
      apiUrl: environment.CMS_PUBLIC_API_URL!,
    },
  };
}
