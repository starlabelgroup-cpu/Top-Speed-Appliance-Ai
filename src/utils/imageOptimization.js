export const getOptimizedImageUrl = (url, width = 800) => {
  if (!url) return ''
  
  if (url.includes('cdn.builder.io')) {
    return `${url}&width=${width}&quality=80`
  }
  
  return url
}

export const getSrcSet = (url, formats = [320, 640, 1024]) => {
  return formats.map(w => `${getOptimizedImageUrl(url, w)} ${w}w`).join(', ')
}

export const preloadImage = (src) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  }
}
