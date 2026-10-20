const LEGACY_HOST = 'crybaby.hoyue.fun'
const SITE_ORIGIN = 'https://zmxpkq.de'

/** Keep links from the retired blog on this site, including their query/hash. */
function migrateLegacySiteUrl(href, absolute = false) {
  if (typeof href !== 'string' || !/^(?:https?:)?\/\//i.test(href.trim())) {
    return href
  }

  try {
    const url = new URL(href, SITE_ORIGIN)
    if (url.hostname !== LEGACY_HOST) {
      return href
    }

    // A relative URL must start with a single slash, never a new authority.
    const path = `/${url.pathname.replace(/^\/+/, '')}${url.search}${url.hash}`
    return absolute ? SITE_ORIGIN + path : path
  } catch {
    return href
  }
}

module.exports = { migrateLegacySiteUrl }
