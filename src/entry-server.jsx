import React from 'react'
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import AppRoutes from './AppRoutes'
import ErrorBoundary from './components/ErrorBoundary'

export { getPageMeta, PRERENDER_PATHS, SITE_URL } from './data/pageMeta'

export function renderRoute(url) {
  return new Promise((resolve, reject) => {
    const chunks = []
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(chunk)
        callback()
      },
    })

    const { pipe } = renderToPipeableStream(
      <ErrorBoundary>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </ErrorBoundary>,
      {
        onAllReady() {
          sink.on('finish', () => resolve(Buffer.concat(chunks).toString('utf8')))
          pipe(sink)
        },
        onShellError: reject,
        onError: reject,
      }
    )
  })
}
