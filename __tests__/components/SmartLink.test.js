import { render, screen } from '@testing-library/react'
import SmartLink from '@/components/SmartLink'

jest.mock('@/lib/config', () => ({
  siteConfig: () => 'https://zmxpkq.de'
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>{children}</a>
  )
}))

describe('SmartLink domain migration', () => {
  it('migrates cached legacy menu links before choosing a link renderer', () => {
    render(
      <SmartLink
        href='https://crybaby.hoyue.fun/category/%E6%9C%AD%E8%AE%B0?sort=new#posts'
        target='_blank'>
        Notes
      </SmartLink>
    )

    const link = screen.getByRole('link', { name: 'Notes' })
    expect(link).toHaveAttribute('href', '/category/%E6%9C%AD%E8%AE%B0?sort=new#posts')
    expect(link).toHaveAttribute('target', '_self')
  })

  it('keeps third-party external links unchanged', () => {
    render(<SmartLink href='https://example.com/notes'>External</SmartLink>)

    const link = screen.getByRole('link', { name: 'External' })
    expect(link).toHaveAttribute('href', 'https://example.com/notes')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
