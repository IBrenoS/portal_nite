type EnvironmentSource = Readonly<Record<string, string | undefined>>;

function usesHttps(value: string | undefined) {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function assertPreviewDeploymentConfiguration(
  environment: EnvironmentSource,
) {
  const issues: string[] = [];

  if (!usesHttps(environment.NEXT_PUBLIC_SITE_URL)) {
    issues.push("NEXT_PUBLIC_SITE_URL");
  }
  if (environment.NITE_NEWS_SOURCE !== "api") {
    issues.push("NITE_NEWS_SOURCE");
  }
  if (!usesHttps(environment.CMS_PUBLIC_API_URL)) {
    issues.push("CMS_PUBLIC_API_URL");
  }
  if (!usesHttps(environment.NITE_NEWS_MEDIA_URL)) {
    issues.push("NITE_NEWS_MEDIA_URL");
  }
  if (!usesHttps(environment.CMS_PREVIEW_RESOLVE_URL)) {
    issues.push("CMS_PREVIEW_RESOLVE_URL");
  }

  if (issues.length > 0) {
    throw new Error(`Configuracao de producao invalida: ${issues.join(", ")}.`);
  }
}
