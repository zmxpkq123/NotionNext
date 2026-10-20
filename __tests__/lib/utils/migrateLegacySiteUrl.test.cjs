const assert = require('node:assert/strict')
const { test } = require('node:test')
const { migrateLegacySiteUrl } = require('../../../lib/utils/migrateLegacySiteUrl')

test('preserves the encoded category, query string and anchor', () => {
  assert.equal(
    migrateLegacySiteUrl(
      'https://crybaby.hoyue.fun/category/%E6%9C%AD%E8%AE%B0?sort=new#posts'
    ),
    '/category/%E6%9C%AD%E8%AE%B0?sort=new#posts'
  )
})

test('handles HTTP, protocol-relative URLs, case and Chinese paths', () => {
  for (const origin of [
    'http://crybaby.hoyue.fun',
    '//crybaby.hoyue.fun',
    'https://CRYBABY.HOYUE.FUN'
  ]) {
    assert.equal(
      migrateLegacySiteUrl(`${origin}/category/札记`),
      '/category/%E6%9C%AD%E8%AE%B0'
    )
  }
})

test('uses the new absolute origin for stale site configuration', () => {
  assert.equal(
    migrateLegacySiteUrl('https://crybaby.hoyue.fun', true),
    'https://zmxpkq.de/'
  )
  assert.equal(
    migrateLegacySiteUrl('https://crybaby.hoyue.fun/article/demo#top', true),
    'https://zmxpkq.de/article/demo#top'
  )
})

test('matches the exact legacy host without changing third-party links', () => {
  for (const href of [
    'https://example.com/?next=https://crybaby.hoyue.fun',
    'https://crybaby.hoyue.fun.example.com/path',
    'https://crybaby.hoyue.fun@example.com/path',
    'https://other.hoyue.fun/path',
    'https://zmxpkq.de/category/notes',
    'ftp://crybaby.hoyue.fun/path'
  ]) {
    assert.equal(migrateLegacySiteUrl(href), href)
  }
})

test('keeps local paths, anchors, special protocols and invalid input', () => {
  for (const href of [
    '/category/notes', '#posts', 'mailto:hello@example.com', 'tel:123',
    'https://', '', null, undefined, 42
  ]) {
    assert.equal(migrateLegacySiteUrl(href), href)
  }
})

test('never creates a protocol-relative redirect from a legacy path', () => {
  assert.equal(
    migrateLegacySiteUrl('https://crybaby.hoyue.fun//example.com/path'),
    '/example.com/path'
  )
})
