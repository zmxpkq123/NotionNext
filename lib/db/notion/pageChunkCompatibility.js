import { parsePageId } from 'notion-utils'

const LOAD_CACHED_PAGE_CHUNK_V2 = 'loadCachedPageChunkV2'

/**
 * Notion's public page API started returning the CRDT wrapper used by
 * loadCachedPageChunkV2 in October 2026. notion-client still expects the
 * legacy RecordMap shape, so unwrap every record before handing it back.
 */
function normalizeV2RecordMap(recordMap = {}) {
  const normalized = {}

  for (const [table, records] of Object.entries(recordMap)) {
    if (table === '__version__' || !records || typeof records !== 'object') {
      normalized[table] = records
      continue
    }

    normalized[table] = Object.fromEntries(
      Object.entries(records).map(([id, record]) => [
        id,
        record?.value ?? record
      ])
    )
  }

  return normalized
}

function mergeRecordMaps(target, source) {
  for (const [table, records] of Object.entries(source)) {
    if (table === '__version__' || !records || typeof records !== 'object') {
      target[table] = records
      continue
    }

    const mergedTable = { ...(target[table] || {}) }
    for (const [id, record] of Object.entries(records)) {
      // A later chunk may only contain a role pointer for a record whose full
      // value was already returned. Do not replace the complete record.
      if (mergedTable[id]?.value && !record?.value) continue
      mergedTable[id] = record
    }
    target[table] = mergedTable
  }

  return target
}

function getErrorStatus(error) {
  return error?.response?.status ?? error?.statusCode ?? error?.status
}

async function getPageRawV2(
  notion,
  pageId,
  { ofetchOptions, chunkLimit = 100, chunkNumber = 0 } = {}
) {
  const parsedPageId = parsePageId(pageId)
  if (!parsedPageId) throw new Error(`invalid notion pageId "${pageId}"`)

  const recordMap = {}
  let cursor = { stack: [] }
  let currentChunk = chunkNumber

  // Keep a hard ceiling so a malformed cursor can never make a build loop
  // forever. Article pages normally finish in one or two chunks.
  for (let page = 0; page < 100; page++) {
    const chunk = await notion.fetch({
      endpoint: LOAD_CACHED_PAGE_CHUNK_V2,
      body: {
        page: { id: parsedPageId },
        limit: chunkLimit,
        cursor,
        chunkNumber: currentChunk,
        verticalColumns: false
      },
      ofetchOptions
    })

    mergeRecordMaps(recordMap, normalizeV2RecordMap(chunk?.recordMap))

    const nextCursor = chunk?.cursors?.[0]
    if (!nextCursor?.stack?.length) {
      return { recordMap, cursor: nextCursor ?? cursor }
    }

    cursor = { stack: nextCursor.stack }
    currentChunk += 1
  }

  throw new Error(
    `Notion page pagination exceeded 100 chunks for "${parsedPageId}"`
  )
}

export function installPageChunkCompatibility(notion) {
  const getLegacyPageRaw = notion.getPageRaw.bind(notion)

  notion.getPageRaw = async (pageId, options = {}) => {
    try {
      return await getPageRawV2(notion, pageId, options)
    } catch (error) {
      // Custom Notion proxies and older private workspaces may not expose the
      // V2 endpoint yet. Preserve the old endpoint as a compatibility fallback.
      if ([400, 404, 405].includes(getErrorStatus(error))) {
        console.warn(
          `[NotionAPI] ${LOAD_CACHED_PAGE_CHUNK_V2} unavailable; falling back to loadPageChunk`
        )
        return getLegacyPageRaw(pageId, options)
      }
      throw error
    }
  }

  return notion
}
