create table if not exists public.seo_locations (
  slug text primary key,
  name text not null,
  county_slug text not null,
  county_name text not null,
  lat double precision not null,
  lng double precision not null,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.seo_locations enable row level security;

drop policy if exists "Public can read active service areas" on public.seo_locations;
create policy "Public can read active service areas"
  on public.seo_locations
  for select
  to anon, authenticated
  using (active);

insert into public.seo_locations (slug, name, county_slug, county_name, lat, lng) values
  ('west-palm-beach', 'West Palm Beach', 'palm-beach-county', 'Palm Beach County', 26.7153, -80.0534),
  ('boca-raton', 'Boca Raton', 'palm-beach-county', 'Palm Beach County', 26.3683, -80.1289),
  ('delray-beach', 'Delray Beach', 'palm-beach-county', 'Palm Beach County', 26.4615, -80.0728),
  ('boynton-beach', 'Boynton Beach', 'palm-beach-county', 'Palm Beach County', 26.5253, -80.0662),
  ('jupiter', 'Jupiter', 'palm-beach-county', 'Palm Beach County', 26.9342, -80.0942),
  ('palm-beach-gardens', 'Palm Beach Gardens', 'palm-beach-county', 'Palm Beach County', 26.8234, -80.1387),
  ('wellington', 'Wellington', 'palm-beach-county', 'Palm Beach County', 26.6618, -80.2684),
  ('fort-lauderdale', 'Fort Lauderdale', 'broward-county', 'Broward County', 26.1224, -80.1373),
  ('hollywood', 'Hollywood', 'broward-county', 'Broward County', 26.0112, -80.1495),
  ('pembroke-pines', 'Pembroke Pines', 'broward-county', 'Broward County', 26.0078, -80.2963),
  ('coral-springs', 'Coral Springs', 'broward-county', 'Broward County', 26.2712, -80.2706),
  ('pompano-beach', 'Pompano Beach', 'broward-county', 'Broward County', 26.2379, -80.1248),
  ('sunrise', 'Sunrise', 'broward-county', 'Broward County', 26.167, -80.2564),
  ('deerfield-beach', 'Deerfield Beach', 'broward-county', 'Broward County', 26.3184, -80.0998),
  ('miami', 'Miami', 'miami-dade-county', 'Miami-Dade County', 25.7617, -80.1918),
  ('hialeah', 'Hialeah', 'miami-dade-county', 'Miami-Dade County', 25.8576, -80.2781),
  ('miami-beach', 'Miami Beach', 'miami-dade-county', 'Miami-Dade County', 25.7907, -80.13),
  ('doral', 'Doral', 'miami-dade-county', 'Miami-Dade County', 25.8195, -80.3553),
  ('kendall', 'Kendall', 'miami-dade-county', 'Miami-Dade County', 25.6794, -80.317),
  ('homestead', 'Homestead', 'miami-dade-county', 'Miami-Dade County', 25.4687, -80.4776)
on conflict (slug) do nothing;
