export function getImageSrcSet(featuredImage) {
  const sizes = featuredImage?.media_details?.sizes;
  if (!sizes) return null;

  // Build srcset from available sizes, sorted by width
  const srcsetEntries = Object.values(sizes)
    .filter((size) => size.source_url && size.width)
    .sort((a, b) => a.width - b.width)
    .map((size) => `${size.source_url} ${size.width}w`);

  if (srcsetEntries.length === 0) return null;

  return srcsetEntries.join(", ");
}
