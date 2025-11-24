// src/utils/imageOptimization.ts
// Utilities for optimizing Shopify images

/**
 * Shopify image URL optimization
 * Adds width, height, and crop parameters
 */
export function optimizeShopifyImage(
  url: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    quality?: 'auto' | number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string {
  if (!url) return '';

  const {
    width = 300,
    height = 300,
    crop = 'center',
    quality = 'auto',
    format = 'webp',
  } = options;

  const params = new URLSearchParams();
  params.set('w', width.toString());
  params.set('h', height.toString());
  params.set('fit', 'crop');
  params.set('crop', crop);
  params.set('q', quality === 'auto' ? 'auto' : quality.toString());
  params.set('auto', 'format');

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
}

/**
 * Generate srcset for responsive images
 */
export function generateImageSrcSet(
  url: string,
  sizes: number[] = [300, 600, 900, 1200]
): string {
  return sizes
    .map((size) => `${optimizeShopifyImage(url, { width: size, height: size })} ${size}w`)
    .join(', ');
}

/**
 * Get image alt text fallback
 */
export function getImageAltText(
  altText: string | null | undefined,
  productTitle: string,
  index: number = 0
): string {
  if (altText) return altText;
  if (index === 0) return productTitle;
  return `${productTitle} - View ${index + 1}`;
}

/**
 * Preload critical images
 */
export function preloadImages(urls: string[]): void {
  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Lazy load image with fallback
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  srcSet?: string
): void {
  img.src = src;
  if (srcSet) {
    img.srcset = srcSet;
  }
  img.loading = 'lazy';
  img.decoding = 'async';
}

/**
 * Get responsive image sizes attribute
 */
export function getImageSizes(breakpoints: Record<string, number> = {}): string {
  const defaultBreakpoints = {
    mobile: 100,
    tablet: 50,
    desktop: 33,
  };

  const bp = { ...defaultBreakpoints, ...breakpoints };
  return `(max-width: 640px) ${bp.mobile}vw, (max-width: 768px) ${bp.tablet}vw, ${bp.desktop}vw`;
}

/**
 * Convert image URL to WebP with fallback
 */
export function getWebPUrl(url: string, fallbackFormat: 'jpg' | 'png' = 'jpg'): string {
  if (!url) return '';

  // Check if browser supports WebP
  const webpSupport = document.createElement('canvas').toDataURL('image/webp').indexOf('image/webp') === 5;

  if (webpSupport) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}format=webp`;
  }

  return url;
}

/**
 * Blur hash or placeholder while image loads
 */
export function generatePlaceholder(
  backgroundColor: string = '#f3f4f6',
  width: number = 300,
  height: number = 300
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL('image/png');
}
