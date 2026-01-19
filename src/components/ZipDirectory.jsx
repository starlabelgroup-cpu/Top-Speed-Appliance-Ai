import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ZIP_DIRECTORY } from '../data/zipDirectory'
import { buildServiceLocationSlug } from '../data/seoLeadData'

const SORT_OPTIONS = [
  { id: 'zip', label: 'ZIP Code' },
  { id: 'population', label: 'Population' },
  { id: 'density', label: 'Density' }
]

const COUNTY_OPTIONS = Array.from(new Set(ZIP_DIRECTORY.map(entry => entry.county || 'Unknown County'))).sort()

function formatNumber(value) {
  if (typeof value !== 'number' || value <= 0) return '—'
  return value.toLocaleString('en-US')
}

function formatDensity(value) {
  if (typeof value !== 'number' || value <= 0) return '—'
  return `${Math.round(value).toLocaleString('en-US')} / sq mi`
}

function formatArea(value) {
  if (typeof value !== 'number' || value <= 0) return '—'
  return `${value.toFixed(1)} sq mi`
}

function getBadge(entry) {
  if (entry.populationDensity > 6000) return 'High-Density Urban'
  if (entry.areaSquareMiles > 15) return 'Large Coverage Area'
  return null
}

export default function ZipDirectory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSort, setActiveSort] = useState('zip')
  const [countyFilter, setCountyFilter] = useState('all')

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const totalZipCount = ZIP_DIRECTORY.length
  const countyCount = COUNTY_OPTIONS.length

  const filteredZips = useMemo(() => {
    let baseList = normalizedSearch
      ? ZIP_DIRECTORY.filter(entry => entry.zip.includes(normalizedSearch) || entry.city.toLowerCase().includes(normalizedSearch))
      : ZIP_DIRECTORY

    if (countyFilter !== 'all') {
      baseList = baseList.filter(entry => entry.county === countyFilter)
    }

    const sortedList = [...baseList]
    sortedList.sort((a, b) => {
      if (activeSort === 'population') {
        return (b.population || 0) - (a.population || 0)
      }
      if (activeSort === 'density') {
        return (b.populationDensity || 0) - (a.populationDensity || 0)
      }
      return a.zip.localeCompare(b.zip)
    })
    return sortedList
  }, [normalizedSearch, activeSort, countyFilter])

  const { avgPopulation, avgDensity } = useMemo(() => {
    if (!filteredZips.length) return { avgPopulation: 0, avgDensity: 0 }

    const sumPopulation = filteredZips.reduce((sum, entry) => {
      if (entry.population && entry.population > 0) return sum + entry.population
      return sum
    }, 0)

    const sumDensity = filteredZips.reduce((sum, entry) => {
      if (entry.populationDensity && entry.populationDensity > 0) return sum + entry.populationDensity
      return sum
    }, 0)

    return {
      avgPopulation: Math.round(sumPopulation / filteredZips.length),
      avgDensity: Math.round(sumDensity / filteredZips.length)
    }
  }, [filteredZips])

  const resultsSuffix = countyFilter !== 'all' ? ` in ${countyFilter}` : ''

  return (
    <section className="zip-directory-section">
      <div className="zip-directory-header">
        <div>
          <p className="zip-directory-badge">Official ZIP Directory</p>
          <h2 className="zip-directory-title">Full Searchable ZIP Coverage</h2>
          <p className="zip-directory-description">
            Cross-reference every South Florida ZIP we service. Share these links in directory listings, concierge scripts, and QR flyers.
          </p>
        </div>
        <div className="zip-directory-summary">
          <div className="zip-directory-summary-item">
            <span className="zip-directory-summary-label">ZIPs Listed</span>
            <span className="zip-directory-summary-value">{totalZipCount}</span>
          </div>
          <div className="zip-directory-summary-item">
            <span className="zip-directory-summary-label">Avg Population</span>
            <span className="zip-directory-summary-value">{formatNumber(avgPopulation)}</span>
          </div>
          <div className="zip-directory-summary-item">
            <span className="zip-directory-summary-label">Avg Density</span>
            <span className="zip-directory-summary-value">
              {avgDensity > 0 ? `${avgDensity.toLocaleString('en-US')} / sq mi` : '—'}
            </span>
          </div>
          <div className="zip-directory-summary-item">
            <span className="zip-directory-summary-label">Counties Covered</span>
            <span className="zip-directory-summary-value">{countyCount}</span>
          </div>
        </div>
      </div>

      <div className="zip-directory-controls">
        <label className="zip-directory-search">
          <span className="zip-directory-search-label">Search ZIP or city</span>
          <input
            className="zip-directory-input"
            type="text"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            placeholder="Example: 33021 or Hollywood"
            aria-label="Search ZIP directory by zip code or city"
          />
        </label>

        <div className="zip-directory-sort-group" role="group" aria-label="Sort ZIP directory">
          {SORT_OPTIONS.map(option => (
            <button
              key={option.id}
              type="button"
              className={`zip-directory-sort-button${activeSort === option.id ? ' is-active' : ''}`}
              onClick={() => setActiveSort(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="zip-directory-filter-wrapper">
          <span className="zip-directory-filter-label">County focus</span>
          <div className="zip-directory-filter-group" role="group" aria-label="Filter ZIP directory by county">
            <button
              type="button"
              className={`zip-directory-filter-button${countyFilter === 'all' ? ' is-active' : ''}`}
              onClick={() => setCountyFilter('all')}
            >
              All Counties
            </button>
            {COUNTY_OPTIONS.map(county => (
              <button
                key={county}
                type="button"
                className={`zip-directory-filter-button${countyFilter === county ? ' is-active' : ''}`}
                onClick={() => setCountyFilter(county)}
              >
                {county.replace(' County', '')}
              </button>
            ))}
          </div>
        </div>

        <p className="zip-directory-results">
          Showing <strong>{filteredZips.length}</strong> of {totalZipCount} ZIP codes{resultsSuffix}
        </p>
      </div>

      {filteredZips.length ? (
        <div className="zip-directory-grid">
          {filteredZips.map(entry => {
            const slug = buildServiceLocationSlug('appliance-repair', entry.city)
            const badge = getBadge(entry)
            return (
              <article key={entry.zip} className="zip-directory-card">
                <div className="zip-directory-card-header">
                  <div className="zip-directory-card-location">
                    <span className="zip-directory-zip">ZIP {entry.zip}</span>
                    <span className="zip-directory-city">{entry.city}, {entry.state}</span>
                  </div>
                  {badge ? <span className="zip-directory-badge-pill">{badge}</span> : null}
                </div>

                <dl className="zip-directory-metrics">
                  <div className="zip-directory-metric">
                    <dt>Population</dt>
                    <dd>{formatNumber(entry.population)}</dd>
                  </div>
                  <div className="zip-directory-metric">
                    <dt>Density</dt>
                    <dd>{formatDensity(entry.populationDensity)}</dd>
                  </div>
                  <div className="zip-directory-metric">
                    <dt>Area</dt>
                    <dd>{formatArea(entry.areaSquareMiles)}</dd>
                  </div>
                </dl>

                <div className="zip-directory-card-meta">
                  <div className="zip-directory-meta-block">
                    <span className="zip-directory-footer-label">County</span>
                    <span className="zip-directory-county-name">{entry.county}</span>
                  </div>
                  <div className="zip-directory-meta-block">
                    <span className="zip-directory-footer-label">Area Codes</span>
                    <div className="zip-directory-area-codes">
                      {entry.areaCodes.map(code => (
                        <span key={`${entry.zip}-${code}`} className="zip-directory-area-code">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="zip-directory-card-footer">
                  <span className="zip-directory-footer-label">City page:</span>
                  <Link className="zip-directory-link" to={`/${slug}`}>
                    /{slug}
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="zip-directory-empty-state">
          <p>No ZIP codes match that search. Try another ZIP, city name, or clear your filters.</p>
        </div>
      )}
    </section>
  )
}
