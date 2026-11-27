import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const serverEntry = pathToFileURL(path.join(distDir, 'server', 'entry-server.js')).href

const { renderRoute, getPageMeta, PRERENDER_PATHS, SITE_URL } = await import(serverEntry)

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')

function applyMeta(html, pagePath, meta) {
  const url = `${SITE_URL}${pagePath}`
  const title = escapeAttr(meta.title)
  const description = escapeAttr(meta.description)

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${escapeAttr(url)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace('</head>', `    <link rel="canonical" href="${escapeAttr(url)}" />\n  </head>`)
}

for (const pagePath of PRERENDER_PATHS) {
  const appHtml = await renderRoute(pagePath)
  const meta = getPageMeta(pagePath)
  const page = applyMeta(template, pagePath, meta).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )

  const outDir = pagePath === '/' ? distDir : path.join(distDir, pagePath)
  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(path.join(outDir, 'index.html'), page)
  console.log(`prerendered ${pagePath}`)
}
