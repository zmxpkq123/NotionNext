import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
/**
 * Logo
 * 支持透明图片和站点标题
 * @param {*} props
 * @returns
 */
const Logo = props => {
  const { siteInfo } = props
  const logo = siteConfig('SITE_LOGO')
  const title = siteInfo?.title || siteConfig('TITLE')
  return (
    <SmartLink
      href='/'
      aria-label={title}
      className='flex items-center gap-1.5 cursor-pointer'>
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt=''
          width={30}
          height={30}
          className='h-[30px] w-[30px] shrink-0 object-contain'
        />
      )}
      <span className='font-bold text-lg py-1.5 rounded dark:border-white dark:text-white menu-link transform duration-200'>
        {title}
      </span>
    </SmartLink>
  )
}
export default Logo
