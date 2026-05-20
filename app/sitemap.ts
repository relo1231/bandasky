import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://bandasky.sk'

  const { data: produkty } = await supabase
    .from('produkty')
    .select('slug, updated_at')
    .eq('aktivny', true)

  const produktyUrls: MetadataRoute.Sitemap = (produkty ?? []).map((p) => ({
    url: `${base}/produkty/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/produkty`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...produktyUrls,
  ]
}
