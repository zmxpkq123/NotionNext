/**
 * @jest-environment node
 */

import { adjustPageProperties } from '@/lib/db/notion/getPageProperties'

jest.mock('notion-utils', () => ({
  getDateValue: jest.fn(),
  getTextContent: jest.fn()
}))

jest.mock('@/lib/db/notion/getNotionAPI', () => ({
  __esModule: true,
  default: {
    getUsers: jest.fn()
  }
}))

describe('adjustPageProperties', () => {
  it.each(['Menu', 'SubMenu', 'Page', 'Post'])(
    'migrates retired blog URLs in %s entries without adding .html',
    type => {
      const page = {
        id: 'legacy-link',
        type,
        slug: 'https://crybaby.hoyue.fun/category/%E6%9C%AD%E8%AE%B0?sort=new#posts'
      }

      adjustPageProperties(page, { PSEUDO_STATIC: true })

      expect(page.href).toBe('/category/%E6%9C%AD%E8%AE%B0?sort=new#posts')
      expect(page.target).toBe('_self')
    }
  )

  it('keeps unrelated external menu links unchanged', () => {
    const page = {
      id: 'external-link',
      type: 'Menu',
      slug: 'https://example.com/category/notes'
    }

    adjustPageProperties(page, {})

    expect(page.href).toBe(page.slug)
    expect(page.target).toBe('_blank')
  })

  it('uses category mapping for pages only when the page category is mapped', () => {
    const NOTION_CONFIG = {
      POST_URL_PREFIX: '%category%/%year%/%month%/%day%',
      POST_URL_PREFIX_MAPPING_CATEGORY: {
        Guide: 'manual'
      },
      PSEUDO_STATIC: false
    }

    const mappedPage = {
      id: 'page-id',
      type: 'Page',
      slug: 'a-manual',
      category: 'Guide'
    }
    const plainPage = {
      id: 'plain-id',
      type: 'Page',
      slug: 'a-book',
      category: 'Book'
    }

    adjustPageProperties(mappedPage, NOTION_CONFIG)
    adjustPageProperties(plainPage, NOTION_CONFIG)

    expect(mappedPage.slug).toBe('manual/a-manual')
    expect(mappedPage.href).toBe('/manual/a-manual')
    expect(plainPage.slug).toBe('a-book')
    expect(plainPage.href).toBe('/a-book')
  })
})
