import React, { useState, useEffect, useRef } from 'react'
import { getOptimizedImageUrl } from '../utils/imageOptimization'

export default function LazyImage({ src, alt, className, width, height, priority = false }) {
  const [imageSrc, setImageSrc] = useState(priority ? src : null)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (priority) {
      setImageSrc(src)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setImageSrc(src)
        observer.unobserve(entry.target)
      }
    }, { rootMargin: '50px' })

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src, priority])

  const optimizedSrc = imageSrc ? getOptimizedImageUrl(imageSrc) : null

  return (
    <img
      ref={imgRef}
      src={optimizedSrc}
      alt={alt}
      className={`${className || ''} ${isLoaded ? 'loaded' : 'loading'}`}
      width={width}
      height={height}
      onLoad={() => setIsLoaded(true)}
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}
