export function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function humanizeSlug(slug) {
  return String(slug || '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function titleCase(value) {
  return humanizeSlug(value)
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function joinSlugParts(...parts) {
  return parts
    .flatMap(part => String(part || '').split('-'))
    .map(p => p.trim())
    .filter(Boolean)
    .join('-')
    .replace(/--+/g, '-')
}
