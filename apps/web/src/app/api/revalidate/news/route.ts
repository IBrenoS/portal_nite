import { revalidatePath, revalidateTag } from "next/cache";

import { handleNewsRevalidationRequest } from "@/lib/news-revalidation";
import { NITE_NEWS_CACHE_TAG } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret || secret.length < 32) {
    return Response.json(
      { error: "Revalidação não configurada." },
      {
        status: 503,
        headers: { "Cache-Control": "private, no-store" },
      },
    );
  }

  return handleNewsRevalidationRequest(request, {
    secret,
    async invalidate(payload) {
      revalidateTag(NITE_NEWS_CACHE_TAG, { expire: 0 });
      revalidatePath("/atualizacoes");
      revalidatePath(`/atualizacoes/${payload.slug}`);
      revalidatePath("/sitemap.xml");
    },
  });
}
