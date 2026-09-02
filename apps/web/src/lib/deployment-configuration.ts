import { readPublicNewsConfiguration } from "@nite/news";

type EnvironmentSource = Readonly<Record<string, string | undefined>>;

function usesHttps(value: string | undefined) {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function assertProductionDeploymentConfiguration(
  environment: EnvironmentSource,
) {
  const issues: string[] = [];
  const source = environment.NITE_NEWS_SOURCE;

  if (!usesHttps(environment.NEXT_PUBLIC_SITE_URL)) {
    issues.push("NEXT_PUBLIC_SITE_URL");
  }

  if (source !== "static" && source !== "api") {
    issues.push("NITE_NEWS_SOURCE");
  }

  if (source === "api") {
    const newsConfiguration = readPublicNewsConfiguration(environment);
    if (!newsConfiguration.configured) {
      issues.push(...newsConfiguration.missing);
    }
    if (!usesHttps(environment.NITE_NEWS_MEDIA_URL)) {
      issues.push("NITE_NEWS_MEDIA_URL");
    }
  }

  const previewEndpoint = environment.CMS_PREVIEW_RESOLVE_URL;
  if (previewEndpoint && !usesHttps(previewEndpoint)) {
    issues.push("CMS_PREVIEW_RESOLVE_URL");
  }

  const uniqueIssues = [...new Set(issues)];
  if (uniqueIssues.length > 0) {
    throw new Error(
      `Configuracao de producao invalida: ${uniqueIssues.join(", ")}.`,
    );
  }
}
