import { createServerSupabaseClient } from '@/shared/lib/supabase-server';
import type { Category } from '@/shared/types/database';

let cachedCategories: Category[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000;

const DIACRITICS_RE = new RegExp('[\u0300-\u036f]', 'g');

function normalize(str: string): string {
  return str.normalize('NFD').replace(DIACRITICS_RE, '').toLowerCase();
}

export async function getCategories(): Promise<Category[]> {
  const now = Date.now();
  if (cachedCategories && now - cacheTimestamp < CACHE_TTL) {
    return cachedCategories;
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, description, expense_type_id, keywords')
    .order('id');

  if (error) throw error;

  cachedCategories = (data || []) as Category[];
  cacheTimestamp = now;
  return cachedCategories;
}

export async function suggestCategory(description: string): Promise<Category | null> {
  const categories = await getCategories();
  const words = normalize(description).split(/\s+/);

  let bestMatch: Category | null = null;
  let bestScore = 0;

  for (const cat of categories) {
    if (!cat.keywords || cat.keywords.length === 0) continue;

    let score = 0;
    for (const keyword of cat.keywords) {
      const normalizedKeyword = normalize(keyword);
      for (const word of words) {
        if (word === normalizedKeyword) {
          score += 2;
        } else if (word.includes(normalizedKeyword) || normalizedKeyword.includes(word)) {
          score += 1;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = cat;
    }
  }

  return bestMatch;
}
